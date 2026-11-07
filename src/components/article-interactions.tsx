"use client";

import { useEffect, useState } from "react";
import { Eye, ThumbsUp, ThumbsDown } from "lucide-react";

type ArticleInteractionsProps = {
  slug: string;
};

type InteractionData = {
  views: number;
  likes: number;
  dislikes: number;
  myReaction: "like" | "dislike" | null;
};

export default function ArticleInteractions({
  slug,
}: ArticleInteractionsProps) {
  const [data, setData] = useState<InteractionData>({
    views: 0,
    likes: 0,
    dislikes: 0,
    myReaction: null,
  });

  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadInteractions() {
      try {
        const url = `/api/articles/${encodeURIComponent(slug)}/interactions`;

        const response = await fetch(url, {
          method: "GET",
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Chargement impossible.");
        }

        if (!active) return;

        setData({
          views: result.views ?? 0,
          likes: result.likes ?? 0,
          dislikes: result.dislikes ?? 0,
          myReaction: result.myReaction ?? null,
        });

        const viewResponse = await fetch(
          `/api/articles/${encodeURIComponent(slug)}/view`,
          {
            method: "POST",
          }
        );

        const viewResult = await viewResponse.json();

        if (!viewResponse.ok || !viewResult.success) {
          throw new Error(viewResult.message || "Vue non enregistrée.");
        }

        if (active) {
          setData((previous) => ({
            ...previous,
            views: viewResult.views ?? previous.views,
          }));
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Une erreur est survenue."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadInteractions();

    return () => {
      active = false;
    };
  }, [slug]);

  async function handleReaction(reaction: "like" | "dislike") {
    if (voting) return;

    setVoting(true);
    setError("");

    try {
      const response = await fetch(
        `/api/articles/${encodeURIComponent(slug)}/interactions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reaction }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Vote impossible.");
      }

      setData({
        views: result.views ?? 0,
        likes: result.likes ?? 0,
        dislikes: result.dislikes ?? 0,
        myReaction: result.myReaction ?? null,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Impossible d'enregistrer votre vote."
      );
    } finally {
      setVoting(false);
    }
  }

  return (
    <section
      className="mt-8 border-t border-gray-200 pt-5"
      aria-label="Interactions avec cet article"
    >
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700">
          <Eye size={18} />
          <span>{loading ? "..." : data.views.toLocaleString("fr-FR")}</span>
          <span>vues</span>
        </div>

        <button
          type="button"
          onClick={() => handleReaction("like")}
          disabled={loading || voting}
          aria-pressed={data.myReaction === "like"}
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition disabled:cursor-not-allowed disabled:opacity-50 ${
            data.myReaction === "like"
              ? "border-blue-600 bg-blue-50 text-blue-700"
              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          <ThumbsUp size={18} />
          <span>J&apos;aime</span>
          <span>{data.likes.toLocaleString("fr-FR")}</span>
        </button>

        <button
          type="button"
          onClick={() => handleReaction("dislike")}
          disabled={loading || voting}
          aria-pressed={data.myReaction === "dislike"}
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition disabled:cursor-not-allowed disabled:opacity-50 ${
            data.myReaction === "dislike"
              ? "border-red-600 bg-red-50 text-red-700"
              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          <ThumbsDown size={18} />
          <span>Je n&apos;aime pas</span>
          <span>{data.dislikes.toLocaleString("fr-FR")}</span>
        </button>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}