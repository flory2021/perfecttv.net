
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronDown,
  Menu,
  X,
  Home,
  Newspaper,
  Megaphone,
  Radio,
  Image,
  Mic2,
  Info,
  Mail,
  Heart,
  ArrowRight,
} from "lucide-react";

type DropdownName = "actualites" | "Publications" | "medias" | null;

export default function NavBar() {
  const [openDropdown, setOpenDropdown] = useState<DropdownName>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<DropdownName>(null);

  const closeMenus = () => {
    setOpenDropdown(null);
    setMobileDropdown(null);
    setMobileOpen(false);
  };

  const toggleDropdown = (name: DropdownName) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const toggleMobileDropdown = (name: DropdownName) => {
    setMobileDropdown(mobileDropdown === name ? null : name);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top accent */}
      <div className="h-1 bg-gradient-to-r from-blue-700 via-blue-600 to-red-600" />

      <nav className="border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* ================= LOGO ================= */}
          <Link
            href="/"
            onClick={closeMenus}
            className="group flex shrink-0 items-center gap-3"
          >
            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
              <img
                src="/logo.png"
                alt="PERFECT TV"
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div className="hidden sm:block">
              <div className="text-xl font-extrabold tracking-tight text-slate-900">
                PERFECT<span className="text-red-700"> TV</span>
              </div>

              <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                LA PERFECTION DANS LA SIMPLICITE
              </div>
            </div>
          </Link>

          {/* ================= DESKTOP MENU ================= */}
          <div className="hidden items-center gap-1 lg:flex">

            {/* Accueil */}
            <Link
              href="/"
              className="group flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-700"
            >
              <Home className="h-4 w-4 transition-transform group-hover:scale-110" />
              Accueil
            </Link>
            {/* À propos */}

            {/* ================= ACTUALITÉS ================= */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown("actualites")}
                className={`group flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  openDropdown === "actualites"
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                        <Radio className="h-4 w-4" />
                      </span>

                ACTUALITÉS

                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    openDropdown === "actualites"
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {openDropdown === "actualites" && (
                <div className="absolute left-0 top-full pt-3">
                  <div className="w-64 origin-top rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-200">

                    <Link
                      href="/infos/articles"
                      onClick={closeMenus}
                      className="group flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-blue-50"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                        <Newspaper className="h-4 w-4" />
                      </span>

                      <span>
                        <span className="block text-sm font-bold text-slate-800">
                          Politique
                        </span>
                        <span className="text-xs text-slate-500">
                          Les dernières actualités
                        </span>
                      </span>
                    </Link>

                    <Link
                      href="/infos/articles"
                      onClick={closeMenus}
                      className="group flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-red-50"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 text-red-600">
                        <Megaphone className="h-4 w-4" />
                      </span>

                      <span>
                        <span className="block text-sm font-bold text-slate-800">
                          Économie
                        </span>
                        <span className="text-xs text-slate-500">
                          economie
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* ================= MÉDIAS ================= */}

            <Link
              href="/emissions"
              onClick={closeMenus}
              className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                <Newspaper className="h-4 w-4" />
                  </span>
              Emissions
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              className="group flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-700"
            >
              <Mail className="h-4 w-4 transition-transform group-hover:scale-110" />
              Contact
            </Link>
          </div>

          {/* ================= DON DESKTOP ================= */}
        
          <div className="flex flex-col items-center justify-center gap-1 rounded-xl px-3 py-3.5 text-center text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700">
            <div className="text-xl font-extrabold tracking-tight text-slate-900 lg:hidden">
              PERFECT<span className="text-red-700"> TV</span>
            </div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500 lg:hidden">
              LA PERFECTION DANS LA SIMPLICITE
            </div>
          </div>

          {/* ================= MOBILE BUTTON ================= */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-xl p-2.5 text-slate-700 transition hover:bg-slate-100 lg:hidden"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-7 w-7" />
            ) : (
              <Menu className="h-7 w-7" />
            )}
          </button>
          
        </div>

        {/* ================= MOBILE MENU ================= */}
       
        <div
          className={`overflow-hidden border-t border-slate-100 bg-white transition-all duration-300 lg:hidden ${
            mobileOpen
              ? "max-h-[700px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          
          <div className="mx-auto max-w-7xl px-4 pb-5 pt-3 sm:px-6">

            {/* Accueil */}
            <Link
              href="/"
              onClick={closeMenus}
              className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700"
            >
              <Home className="h-5 w-5 text-blue-700" />
              Accueil
            </Link>
            {/* À propos */}

            {/* Actualités mobile */}
            <button
              type="button"
              onClick={() => toggleMobileDropdown("actualites")}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700"
            >
              <span className="flex items-center gap-3">
                <Newspaper className="h-5 w-5 text-blue-700" />
                ACTUALITÉS
              </span>

              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  mobileDropdown === "actualites"
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden pl-4 transition-all duration-300 ${
                mobileDropdown === "actualites"
                  ? "max-h-60 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <Link
                href="/infos/articles"
                onClick={closeMenus}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700"
              >
                <Newspaper className="h-4 w-4" />
                Politique
              </Link>

              <Link

                href="/infos/articles"
                onClick={closeMenus}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-red-50 hover:text-red-600"
              >
                <Megaphone className="h-4 w-4" />
                Economie
              </Link>
            </div>

            {/* Médias mobile */}
             <Link
              href="/emissions"
              onClick={closeMenus}
              className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                    <Newspaper className="h-4 w-4" />
                  </span>
              Emissions
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              onClick={closeMenus}
              className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700"
            >
              <Mail className="h-5 w-5 text-blue-700" />
              Contact
            </Link>

            {/* Don mobile */}
          </div>
        </div>
      </nav>
    </header>
  );
}


