import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Article from "@/models/Article";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: {
    id: string;
  };
};

function createSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Identifiant invalide." },
        { status: 400 }
      );
    }

    await connectDB();

    const article = await Article.findById(id).lean();

    if (!article) {
      return NextResponse.json(
        { success: false, message: "Article introuvable." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, article });
  } catch (error) {
    console.error("Erreur lecture article :", error);

    return NextResponse.json(
      { success: false, message: "Impossible de récupérer cet article." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Identifiant invalide." },
        { status: 400 }
      );
    }

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
        { success: false, message: "Slug invalide." },
        { status: 400 }
      );
    }

    const duplicate = await Article.findOne({
      slug,
      _id: { $ne: id },
    }).lean();

    if (duplicate) {
      return NextResponse.json(
        { success: false, message: "Ce slug est déjà utilisé." },
        { status: 409 }
      );
    }

    const articleDate = body.date ? new Date(body.date) : new Date();

    if (Number.isNaN(articleDate.getTime())) {
      return NextResponse.json(
        { success: false, message: "Date invalide." },
        { status: 400 }
      );
    }

    const content = Array.isArray(body.content)
      ? body.content.map((item: unknown) => String(item).trim()).filter(Boolean)
      : [];

    const article = await Article.findByIdAndUpdate(
      id,
      {
        $set: {
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
        },
      },
      { new: true, runValidators: true }
    );

    if (!article) {
      return NextResponse.json(
        { success: false, message: "Article introuvable." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Article modifié avec succès.",
      article,
    });
  } catch (error) {
    console.error("Erreur modification article :", error);

    return NextResponse.json(
      { success: false, message: "Impossible de modifier cet article." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Identifiant invalide." },
        { status: 400 }
      );
    }

    await connectDB();

    const article = await Article.findByIdAndDelete(id);

    if (!article) {
      return NextResponse.json(
        { success: false, message: "Article introuvable." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Article supprimé avec succès.",
    });
  } catch (error) {
    console.error("Erreur suppression article :", error);

    return NextResponse.json(
      { success: false, message: "Impossible de supprimer cet article." },
      { status: 500 }
    );
  }
}