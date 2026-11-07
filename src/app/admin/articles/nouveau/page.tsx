"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Send, Loader2 } from "lucide-react";

export default function NewArticlePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "/images/hero.jpg",
    category: "",
    author: "Rédaction Perfect TV",
    date: new Date().toISOString().slice(0, 10),
    status: "draft",
    featured: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(
    field: keyof typeof form,
    value: string | boolean
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!form.title.trim() || !form.excerpt.trim() || !form.category.trim()) {
      setError("Le titre, le résumé et la catégorie sont obligatoires.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          content: form.content
            .split("\n")
            .map((paragraph) => paragraph.trim())
            .filter(Boolean),
          date: new Date(`${form.date}T12:00:00`).toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Impossible de créer l&apos;article.");
      }

      router.push("/admin/articles");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue."
      );
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-7 text-slate-900 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/admin/articles"
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-red-600"
        >
          <ArrowLeft size={17} />
          Retour aux articles
        </Link>

        <div className="mb-7">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Créer un nouvel article
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Rédigez et préparez une nouvelle publication pour Perfect TV.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Titre de l&apos;article *
              </label>
              <input
                required
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="Exemple : Actualité politique en RDC"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Slug personnalisé (facultatif)
              </label>
              <input
                value={form.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                placeholder="Laisser vide pour utiliser le titre"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500"
              />
              <p className="mt-1 text-xs text-slate-400">
                Utilisé dans l&apos;adresse URL de l&apos;article.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Résumé *
              </label>
              <textarea
                required
                rows={3}
                value={form.excerpt}
                onChange={(e) => updateField("excerpt", e.target.value)}
                placeholder="Présentez brièvement le sujet de l&apos;article..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Contenu de l&apos;article
              </label>
              <textarea
                rows={12}
                value={form.content}
                onChange={(e) => updateField("content", e.target.value)}
                placeholder={"Rédigez votre article ici...\n\nSéparez les paragraphes par une ligne."}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 leading-7 outline-none focus:border-red-500"
              />
              <p className="mt-1 text-xs text-slate-400">
                Chaque paragraphe séparé par un retour à la ligne sera enregistré distinctement.
              </p>
            </div>
          </section>

          <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="font-bold">Informations de publication</h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Catégorie *
                </label>
                <input
                  required
                  value={form.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  placeholder="Politique, Société, Sport..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Auteur
                </label>
                <input
                  value={form.author}
                  onChange={(e) => updateField("author", e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Date de publication
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Statut
                </label>
                <select
                  value={form.status}
                  onChange={(e) => updateField("status", e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-red-500"
                >
                  <option value="draft">Brouillon</option>
                  <option value="published">Publier immédiatement</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Image de couverture (URL ou chemin)
              </label>
              <input
                value={form.image}
                onChange={(e) => updateField("image", e.target.value)}
                placeholder="/images/mon-image.jpg"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500"
              />
            </div>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-slate-50 p-4">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => updateField("featured", e.target.checked)}
                className="h-4 w-4 accent-red-600"
              />
              <span className="text-sm font-medium">
                Mettre cet article en avant
              </span>
            </label>
          </section>

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <div className="flex flex-wrap justify-end gap-3">
            <Link
              href="/admin/articles"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Annuler
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
            >
              {loading ? (
                <Loader2 size={17} className="animate-spin" />
              ) : form.status === "published" ? (
                <Send size={17} />
              ) : (
                <Save size={17} />
              )}
              {loading
                ? "Enregistrement..."
                : form.status === "published"
                  ? "Publier l&apos;article"
                  : "Enregistrer le brouillon"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}