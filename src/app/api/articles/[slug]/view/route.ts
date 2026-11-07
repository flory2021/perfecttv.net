import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import connectDB from "@/lib/mongodb";
import Article from "@/models/Article";
import ArticleView from "@/models/ArticleView";

type RouteContext = {
  params: {
    slug: string;
  };
};

export async function POST(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    await connectDB();

    const article = await Article.findOne({
      slug: params.slug,
      status: "published",
    }).select("_id views");

    if (!article) {
      return NextResponse.json(
        { success: false, message: "Article introuvable." },
        { status: 404 }
      );
    }

    let visitorId = request.cookies.get("ptv_visitor")?.value;

    if (!visitorId || !/^[a-f0-9-]{36}$/i.test(visitorId)) {
      visitorId = randomUUID();
    }

    let newView = false;

    try {
      await ArticleView.create({
        articleId: article._id,
        visitorId,
      });
      newView = true;
    } catch (error: unknown) {
      const mongoError = error as { code?: number };

      if (mongoError.code !== 11000) {
        throw error;
      }
    }

    if (newView) {
      await Article.updateOne(
        { _id: article._id },
        { $inc: { views: 1 } }
      );
    }

    const updatedArticle = await Article.findById(article._id)
      .select("views")
      .lean();

    const response = NextResponse.json({
      success: true,
      views: updatedArticle?.views ?? 0,
    });

    response.cookies.set("ptv_visitor", visitorId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });

    return response;
  } catch (error) {
    console.error("Erreur enregistrement vue article:", error);

    return NextResponse.json(
      { success: false, message: "Impossible d'enregistrer la vue." },
      { status: 500 }
    );
  }
}