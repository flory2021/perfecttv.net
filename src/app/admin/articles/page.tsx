"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Newspaper,
  Pencil,
  Trash2,
  RefreshCw,
  Eye,
} from "lucide-react";

type Article = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  date: string;
  status: "draft" | "published";
  featured: boolean;
};

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState("");

  const loadArticles = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/articles", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Impossible de charger les articles.");
      }

      setArticles(data.articles || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadArticles();
  }, [loadArticles]);

  async function handleDelete(id: string, title: string) {
    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer l'article "${title}" ?`
    );

    if (!confirmed) return;

    setDeleting(id);
    setError("");

    try {
      const response = await fetch(`/api/admin/articles/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "La suppression a échoué.");
      }

      setArticles((current) =>
        current.filter((article) => article._id !== id)
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Impossible de supprimer cet article."
      );
    } finally {
      setDeleting("");
    }
  }

  const published = articles.filter(
    (article) => article.status === "published"
  ).length;

  const drafts = articles.filter(
    (article) => article.status === "draft"
  ).length;

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-900 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              href="/admin"
              className="mb-4 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-red-600"
            >
              <ArrowLeft size={16} />
              Retour au tableau de bord
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <Newspaper size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold sm:text-3xl">
                  Gestion des articles
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Gérez les actualités de Perfect TV.
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/admin/articles/nouveau"
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
          >
            <Plus size={18} />
            Nouvel article
          </Link>
        </div>

        <div className="mb-7 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Total des articles</p>
            <p className="mt-2 text-3xl font-bold">{articles.length}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Articles publiés</p>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {published}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Brouillons</p>
            <p className="mt-2 text-3xl font-bold text-amber-600">
              {drafts}
            </p>
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5">
            <div>
              <h2 className="font-bold">Tous les articles</h2>
              <p className="mt-1 text-xs text-slate-500">
                Articles enregistrés dans votre base de données.
              </p>
            </div>

            <button
              onClick={loadArticles}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50 disabled:opacity-50"
            >
              <RefreshCw
                size={15}
                className={loading ? "animate-spin" : ""}
              />
              Actualiser
            </button>
          </div>

          {loading ? (
            <div className="p-12 text-center text-sm text-slate-500">
              Chargement des articles...
            </div>
          ) : articles.length === 0 ? (
            <div className="p-12 text-center">
              <Newspaper className="mx-auto mb-3 text-slate-300" size={40} />
              <h3 className="font-semibold">Aucun article enregistré</h3>
              <p className="mt-2 text-sm text-slate-500">
                Commencez par créer votre premier article.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Article</th>
                    <th className="px-5 py-4">Catégorie</th>
                    <th className="px-5 py-4">Date</th>
                    <th className="px-5 py-4">Statut</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {articles.map((article) => (
                    <tr key={article._id} className="hover:bg-slate-50">
                      <td className="max-w-sm px-5 py-4">
                        <p className="font-semibold text-slate-800">
                          {article.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {article.author}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {article.category}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {new Date(article.date).toLocaleDateString("fr-FR")}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            article.status === "published"
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {article.status === "published"
                            ? "Publié"
                            : "Brouillon"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          {article.status === "published" && (
                            <Link
                              href={`/infos/articles/${article.slug}`}
                              target="_blank"
                              title="Voir l'article"
                              className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                            >
                              <Eye size={16} />
                            </Link>
                          )}

                          <Link
                            href={`/admin/articles/${article._id}`}
                            title="Modifier"
                            className="rounded-lg border border-blue-200 p-2 text-blue-600 hover:bg-blue-50"
                          >
                            <Pencil size={16} />
                          </Link>

                          <button
                            onClick={() =>
                              handleDelete(article._id, article.title)
                            }
                            disabled={deleting === article._id}
                            title="Supprimer"
                            className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}