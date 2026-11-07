
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Newspaper,
  Image,
  ShoppingBag,
  ShoppingCart,
  Users,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Construction,
} from "lucide-react";

const modules = [
  {
    title: "Articles",
    description: "Créer, modifier et publier les actualités.",
    icon: Newspaper,
  },
  {
    title: "Photos et vidéos",
    description: "Organiser les contenus multimédias.",
    icon: Image,
  },
  {
    title: "Produits",
    description: "Gérer le catalogue de la boutique.",
    icon: ShoppingBag,
  },
  {
    title: "Commandes",
    description: "Consulter et suivre les commandes.",
    icon: ShoppingCart,
  },
  {
    title: "Utilisateurs",
    description: "Administrer les comptes utilisateurs.",
    icon: Users,
  },
  {
    title: "Paiements",
    description: "Suivre les paiements et transactions.",
    icon: CreditCard,
  },
  {
    title: "Paramètres",
    description: "Configurer les paramètres du site.",
    icon: Settings,
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");

  async function handleLogout() {
    setLoggingOut(true);
    setError("");

    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("La déconnexion a échoué.");
      }

      router.replace("/admin/login");
      router.refresh();
    } catch {
      setError("Impossible de vous déconnecter. Réessayez.");
      setLoggingOut(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col bg-slate-950 text-white lg:flex">
        <div className="flex h-20 items-center gap-3 border-b border-slate-800 px-7">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-xl font-extrabold">
            P
          </div>
          <div>
            <p className="font-bold tracking-wide">PERFECT TV</p>
            <p className="text-xs text-slate-400">Administration</p>
          </div>
        </div>

        <div className="px-5 py-7">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Navigation
          </p>
          <div className="flex items-center gap-3 rounded-xl bg-red-600 px-4 py-3 font-medium">
            <LayoutDashboard size={19} />
            Vue d&apos;ensemble
          </div>
        </div>

        <div className="mt-auto border-t border-slate-800 p-5">
          <div className="mb-5 flex items-center gap-3 rounded-xl bg-slate-900 p-3">
            <ShieldCheck className="text-green-400" size={22} />
            <div>
              <p className="text-sm font-semibold">Administrateur</p>
              <p className="text-xs text-slate-400">Session sécurisée</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-red-600 hover:text-white disabled:opacity-50"
          >
            <LogOut size={18} />
            {loggingOut ? "Déconnexion..." : "Se déconnecter"}
          </button>
        </div>
      </aside>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950 p-6 text-white lg:hidden">
          <div className="mb-10 flex items-center justify-between">
            <span className="font-bold">PERFECT TV ADMIN</span>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Fermer le menu"
            >
              <X size={25} />
            </button>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-red-600 p-4">
            <LayoutDashboard size={20} />
            Vue d&apos;ensemble
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="mt-8 flex w-full items-center gap-3 rounded-xl bg-slate-800 p-4"
          >
            <LogOut size={19} />
            Se déconnecter
          </button>
        </div>
      )}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(true)}
              className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
              aria-label="Ouvrir le menu"
            >
              <Menu size={23} />
            </button>
            <div>
              <h1 className="text-lg font-bold sm:text-xl">
                Tableau de bord
              </h1>
              <p className="hidden text-xs text-slate-500 sm:block">
                Gestion de votre plateforme Perfect TV
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Espace sécurisé
          </div>
        </header>

        <main className="mx-auto max-w-7xl p-5 sm:p-8">
          <div className="mb-8 rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
            <p className="mb-2 text-sm font-medium text-red-400">
              ESPACE D&apos;ADMINISTRATION
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Bienvenue sur Perfect TV
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Gérez les contenus, les médias et les activités de votre
              plateforme depuis un espace centralisé.
            </p>
          </div>

          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Modules de gestion</h2>
              <p className="mt-1 text-sm text-slate-500">
                Les espaces qui composeront votre administration.
              </p>
            </div>
            <span className="hidden rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 sm:inline-flex">
              Configuration en cours
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {modules.map((module) => {
              const Icon = module.icon;

              return (
                <article
                  key={module.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                      <Icon size={23} />
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                      À développer
                    </span>
                  </div>

                  <h3 className="font-bold">{module.title}</h3>
                  <p className="mt-2 min-h-10 text-sm leading-5 text-slate-500">
                    {module.description}
                  </p>
                  {module.title === "Articles" ? (
  <Link
    href="/admin/articles"
    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
  >
    <Newspaper size={16} />
    Gérer les articles
  </Link>
) : (
  <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-400">
    <Construction size={15} />
    Module non encore connecté
  </div>
)}
                </article>
              );
            })}
          </div>

          {error && (
            <p role="alert" className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 shrink-0 text-green-600" size={22} />
              <div>
                <h3 className="font-semibold">Sécurité de l&apos;administration</h3>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Votre espace est protégé par une session administrateur
                  sécurisée. La session expire automatiquement après huit heures.
                </p>
              </div>
            </div>
          </div>

          <footer className="mt-10 pb-5 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} Perfect TV — Administration
          </footer>
        </main>
      </div>
    </div>
  );
}
