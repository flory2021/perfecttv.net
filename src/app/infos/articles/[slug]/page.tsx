
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SecondNavBar from "@/components/common/SecondNavBar";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  User,
  ArrowLeft,
  Tag,
} from "lucide-react";
import connectDB from "@/lib/mongodb";
import Article from "@/models/Article";
import ArticleInteractions from "@/components/article-interactions";
import ArticleShare from "@/components/article-share";

export const dynamic = "force-dynamic";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://perfecttv.fr"
).replace(/\/$/, "");

type PageProps = {
  params: {
    slug: string;
  };
};

// Métadonnées de partage propres à chaque article
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  await connectDB();

  const article = await Article.findOne({
    slug: params.slug,
    status: "published",
  })
    .select("title excerpt image")
    .lean();

  if (!article) {
    return {
      title: "Article introuvable | Perfect TV",
    };
  }

  const title = article.title;
  const description = article.excerpt || title;

  const imagePath = article.image || "/images/hero.jpg";
  const imageUrl = new URL(imagePath, SITE_URL).toString();

  const articleUrl = `${SITE_URL}/infos/articles/${encodeURIComponent(
    params.slug
  )}`;

  return {
    metadataBase: new URL(SITE_URL),

    title: `${title} | Perfect TV`,
    description,

    openGraph: {
      type: "article",
      title,
      description,
      url: articleUrl,
      siteName: "Perfect TV",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: PageProps) {
  await connectDB();

  const article = await Article.findOne({
    slug: params.slug,
    status: "published",
  }).lean();

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="relative h-[360px] overflow-hidden bg-slate-900 md:h-[500px]">
        <Image
          src={article.image || "/images/hero.jpg"}
          alt={article.title}
          fill
          priority
          unoptimized
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0">
          <div className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white">
              <Tag className="h-4 w-4" />
              {article.category}
            </span>

            <h1 className="mt-4 max-w-4xl text-3xl font-black leading-tight text-white md:text-5xl">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      <SecondNavBar />

      <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap gap-5 border-b border-slate-200 pb-6 text-sm text-slate-500">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-blue-700" />
            {new Date(article.date).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>

          <span className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-700" />
            {article.author}
          </span>
        </div>

        <p className="mb-8 text-xl font-medium leading-8 text-slate-700">
          {article.excerpt}
        </p>

        <div className="space-y-6 text-lg leading-8 text-slate-700">
          {article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <ArticleInteractions slug={article.slug} />

        <ArticleShare title={article.title} />

        <div className="mt-12 border-t border-slate-200 pt-8">
          <Link
            href="/infos/articles"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white transition hover:bg-blue-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux articles
          </Link>
        </div>
      </article>
    </main>
  );
}
