
"use client";

import Link from "next/link";

const rubriques = [
  { label: "À LA UNE", href: "/infos/articles" },
  { label: "POLITIQUE", href: "/infos/articles?categorie=Politique" },
  { label: "SOCIÉTÉ", href: "/infos/articles?categorie=Société" },
  { label: "ÉCONOMIE", href: "/infos/articles?categorie=Économie" },
  { label: "SPORT", href: "/infos/articles?categorie=Sport" },
  { label: "CULTURE", href: "/infos/articles?categorie=Culture" },
  { label: "INTERNATIONAL", href: "/infos/articles?categorie=International" },
];

export default function SecondNavBar() {
  return (
    <nav className="w-full bg-red-700 text-white border-t border-white/20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap py-3 scrollbar-hide">
          {rubriques.map((rubrique) => (
            <Link
              key={rubrique.label}
              href={rubrique.href}
              className="text-xs sm:text-sm font-semibold tracking-wide transition-colors duration-200 hover:text-gray-400"
            >
              {rubrique.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
