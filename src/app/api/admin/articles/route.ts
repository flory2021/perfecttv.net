import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Article from "@/models/Article";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function createSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET() {
  try {
    await connectDB();

    const articles = await Article.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      articles,
    });
  } catch (error) {
    console.error("Erreur récupération articles :", error);

    return NextResponse.json(
      { success: false, message: "Impossible de récupérer les articles." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const title = String(body.title || "").trim();
    const excerpt = String(body.excerpt || "").trim();
    const category = String(body.category || "").trim();

    if (!title || !excerpt || !category) {
      return NextResponse.json(
        {
          success: false,
          message: "Le titre, le résumé et la catégorie sont obligatoires.",
        },
        { status: 400 }
      );
    }

    const slug = createSlug(String(body.slug || title));

    if (!slug) {
      return NextResponse.json(
        { success: false, message: "Le slug est invalide." },
        { status: 400 }
      );
    }

    const existingArticle = await Article.findOne({ slug }).lean();

    if (existingArticle) {
      return NextResponse.json(
        { success: false, message: "Un article utilise déjà ce slug." },
        { status: 409 }
      );
    }

    const content = Array.isArray(body.content)
      ? body.content.map((item: unknown) => String(item).trim()).filter(Boolean)
      : [];

    const articleDate = body.date ? new Date(body.date) : new Date();

    if (Number.isNaN(articleDate.getTime())) {
      return NextResponse.json(
        { success: false, message: "La date indiquée est invalide." },
        { status: 400 }
      );
    }

    const article = await Article.create({
      title,
      slug,
      excerpt,
      content,
      image: String(body.image || "/images/hero.jpg").trim(),
      category,
      author: String(body.author || "Rédaction Perfect TV").trim(),
      date: articleDate,
      featured: Boolean(body.featured),
      status: body.status === "published" ? "published" : "draft",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Article créé avec succès.",
        article,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur création article :", error);

    return NextResponse.json(
      { success: false, message: "Erreur lors de la création de l'article." },
      { status: 500 }
    );
  }
}
