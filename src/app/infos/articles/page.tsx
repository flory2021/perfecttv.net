import Link from "next/link";
import Image from "next/image";
import { Search, CalendarDays, User, ArrowRight } from "lucide-react";
import connectDB from "@/lib/mongodb";
import Article from "@/models/Article";

export const dynamic = "force-dynamic";

type SearchParams = {
  q?: string;
  category?: string;
  page?: string;
};

const ARTICLES_PER_PAGE = 6;

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  await connectDB();

  const allArticles = await Article.find({ status: "published" })
    .sort({ date: -1 })
    .lean();

  const articles = allArticles.map((article) => ({
    id: article._id.toString(),
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    image: article.image || "/images/hero.jpg",
    category: article.category,
    author: article.author,
    date: article.date,
  }));

  const query = searchParams.q?.trim().toLowerCase() || "";
  const category = searchParams.category || "Toutes";
  const currentPage = Math.max(Number(searchParams.page) || 1, 1);

  const categories = [
    "Toutes",
    ...Array.from(new Set(articles.map((article) => article.category))),
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      !query ||
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.author.toLowerCase().includes(query);

    const matchesCategory =
      category === "Toutes" || article.category === category;

    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.max(
    Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE),
    1
  );

  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * ARTICLES_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(
    start,
    start + ARTICLES_PER_PAGE
  );

  function makeUrl(page: number) {
    const search = new URLSearchParams();

    if (query) search.set("q", query);
    if (category !== "Toutes") search.set("category", category);

    search.set("page", String(page));

    return `/infos/articles?${search.toString()}`;
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 px-4 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-200">
            Infos generales
          </p>
          <h1 className="text-4xl font-black md:text-5xl">Articles</h1>
          <p className="mt-4 max-w-2xl text-blue-100">
            Retrouvez nos articles, analyses, informations et publications.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-2xl bg-white p-4 shadow-sm">
          <form
            action="/infos/articles"
            method="GET"
            className="flex flex-col gap-4 md:flex-row"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                name="q"
                defaultValue={searchParams.q || ""}
                placeholder="Rechercher un article..."
                className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <select
              name="category"
              defaultValue={category}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-600"
            >
              {categories.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

            <button
              type="submit"
              className="rounded-xl bg-blue-700 px-7 py-3 font-bold text-white transition hover:bg-blue-800"
            >
              Rechercher
            </button>
          </form>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""}
          </p>

          {query && (
            <p className="text-sm text-slate-600">
              Resultats pour : <strong className="text-blue-700">{query}</strong>
            </p>
          )}
        </div>

        {paginatedArticles.length === 0 ? (
          <div className="rounded-2xl bg-white px-6 py-20 text-center shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Aucun article publie
            </h2>
            <p className="mt-2 text-slate-500">
              Les articles publies apparaitront ici.
            </p>
            <Link
              href="/infos/articles"
              className="mt-6 inline-block rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white"
            >
              Voir tous les articles
            </Link>
          </div>
        ) : (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {paginatedArticles.map((article) => (
              <article
                key={article.id}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <Link href={`/infos/articles/${article.slug}`}>
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow">
                      {article.category}
                    </span>
                  </div>
                </Link>

                <div className="p-6">
                  <div className="mb-3 flex flex-wrap gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      {new Date(article.date).toLocaleDateString("fr-FR")}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {article.author}
                    </span>
                  </div>

                  <Link href={`/infos/articles/${article.slug}`}>
                    <h2 className="text-xl font-extrabold leading-tight text-slate-900 transition group-hover:text-blue-700">
                      {article.title}
                    </h2>
                  </Link>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                    {article.excerpt}
                  </p>

                  <Link
                    href={`/infos/articles/${article.slug}`}
                    className="mt-5 inline-flex items-center gap-2 font-bold text-blue-700 transition hover:text-red-600"
                  >
                    Lire l&apos;article
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            {safePage > 1 && (
              <Link
                href={makeUrl(safePage - 1)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 hover:bg-blue-50"
              >
                Precedent
              </Link>
            )}

            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;

              return (
                <Link
                  key={page}
                  href={makeUrl(page)}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold ${
                    page === safePage
                      ? "bg-blue-700 text-white"
                      : "border border-slate-200 bg-white text-slate-700 hover:bg-blue-50"
                  }`}
                >
                  {page}
                </Link>
              );
            })}

            {safePage < totalPages && (
              <Link
                href={makeUrl(safePage + 1)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 hover:bg-blue-50"
              >
                Suivant
              </Link>
            )}
          </div>
        )}
      </section>
    </main>
  );
}