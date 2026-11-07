import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import connectDB from "@/lib/mongodb";
import Article from "@/models/Article";
import ArticleReaction from "@/models/ArticleReaction";

type RouteContext = {
  params: {
    slug: string;
  };
};

function getVisitorId(request: NextRequest) {
  const existing = request.cookies.get("ptv_visitor")?.value;

  if (existing && /^[a-f0-9-]{36}$/i.test(existing)) {
    return existing;
  }

  return randomUUID();
}

function sendResponse(
  data: Record<string, unknown>,
  visitorId: string
) {
  const response = NextResponse.json(data);

  response.cookies.set("ptv_visitor", visitorId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    await connectDB();

    const article = await Article.findOne({
      slug: params.slug,
      status: "published",
    }).select("_id views likes dislikes");

    if (!article) {
      return NextResponse.json(
        { success: false, message: "Article introuvable." },
        { status: 404 }
      );
    }

    const visitorId = getVisitorId(request);

    const reaction = await ArticleReaction.findOne({
      articleId: article._id,
      visitorId,
    }).select("reaction");

    return sendResponse(
      {
        success: true,
        views: article.views ?? 0,
        likes: article.likes ?? 0,
        dislikes: article.dislikes ?? 0,
        myReaction: reaction?.reaction ?? null,
      },
      visitorId
    );
  } catch (error) {
    console.error("Erreur lecture interactions:", error);

    return NextResponse.json(
      { success: false, message: "Impossible de charger les interactions." },
      { status: 500 }
    );
  }
}

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

    const body = await request.json();

    if (body.reaction !== "like" && body.reaction !== "dislike") {
      return NextResponse.json(
        { success: false, message: "Réaction invalide." },
        { status: 400 }
      );
    }

    const visitorId = getVisitorId(request);

    const existing = await ArticleReaction.findOne({
      articleId: article._id,
      visitorId,
    });

    if (!existing) {
      try {
        await ArticleReaction.create({
          articleId: article._id,
          visitorId,
          reaction: body.reaction,
        });

        await Article.updateOne(
          { _id: article._id },
          { $inc: { [body.reaction === "like" ? "likes" : "dislikes"]: 1 } }
        );
      } catch (error: unknown) {
        const mongoError = error as { code?: number };

        if (mongoError.code !== 11000) {
          throw error;
        }
      }
    } else if (existing.reaction !== body.reaction) {
      const previousReaction = existing.reaction;

      existing.reaction = body.reaction;
      await existing.save();

      await Article.updateOne(
        { _id: article._id },
        {
          $inc: {
            [previousReaction === "like" ? "likes" : "dislikes"]: -1,
            [body.reaction === "like" ? "likes" : "dislikes"]: 1,
          },
        }
      );
    }

    const [updatedArticle, updatedReaction] = await Promise.all([
      Article.findById(article._id).select("views likes dislikes").lean(),
      ArticleReaction.findOne({
        articleId: article._id,
        visitorId,
      }).select("reaction"),
    ]);

    return sendResponse(
      {
        success: true,
        views: updatedArticle?.views ?? 0,
        likes: updatedArticle?.likes ?? 0,
        dislikes: updatedArticle?.dislikes ?? 0,
        myReaction: updatedReaction?.reaction ?? null,
      },
      visitorId
    );
  } catch (error) {
    console.error("Erreur enregistrement réaction:", error);

    return NextResponse.json(
      { success: false, message: "Impossible d'enregistrer votre réaction." },
      { status: 500 }
    );
  }
}