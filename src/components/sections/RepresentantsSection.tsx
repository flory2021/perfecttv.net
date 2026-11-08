
"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

const representants = [
  {
    id: 1,
    nom: "Philippe MVIPI",
    fonction: "Directeur de la rédaction de Perfect TV",
    zone: "Kinshasa",
    image: "/images/philippe.png",
  },
  {
    id: 2,
    nom: "Micky EBOUNDE",
    fonction: "Directeur de la production de Perfect TV",
    zone: "Kinshasa",
    image: "/images/micky.png",
  },
  {
    id: 3,
    nom: "Patricia MUTONKOLE",
    fonction: "Caissere de Perfect TV",
    zone: "Kinshasa",
    image: "/images/patricia.png",
  },
  {
    id: 4,
    nom: "Sammuel TIANI",
    fonction: "Directeur de la ressource humaine de Perfect TV",
    zone: "Kinshasa",
    image: "/images/sam.jpg",
  },
  {
    id: 5,
    nom: "Nom du représentant",
    fonction: "Représentant provincial",
    zone: "Kinshasa",
    image: "/images/logo.png",
  },
  {
    id: 6,
    nom: "Nom du représentant",
    fonction: "Représentant provincial",
    zone: "Lualaba",
    image: "/images/logo.png",
  },
];

export default function RepresentantsSection() {
  return (
    <section className="overflow-hidden bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* EN-TÊTE */}
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-red-600">
              Notre réseau
            </p>

            <h2 className="text-3xl font-black text-slate-900 md:text-4xl">
              Nos représentants
            </h2>

            <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-blue-700 to-red-600" />

            <p className="mt-4 max-w-2xl text-slate-600">
              Découvrez les représentants qui accompagnent Perfect TV dans sa mission d’informer et de sensibiliser le public,
              à travers différentes provinces et régions.
            </p>
          </div>

          <Link
            href="/representants"
            className="group inline-flex items-center gap-2 font-bold text-blue-700 transition hover:text-red-600"
          >
            Voir tous les représentants
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* LISTE ANIMÉE */}
        <div className="relative">

          {/* Dégradés latéraux */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-slate-50 to-transparent" />

          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-slate-50 to-transparent" />

          <div className="representants-scroll flex gap-6 overflow-x-auto pb-5 scrollbar-hide">

            {representants.map((representant) => (
              <article
                key={representant.id}
                className="group min-w-[280px] flex-shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl"
              >
                {/* PHOTO */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-700 to-blue-900">

                  <Image
                    src={representant.image}
                    alt={representant.nom}
                    fill
                    className="object-cover p-1 transition duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-transparent to-transparent opacity-70" />

                  {/* Badge */}
                  <span className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
                    Perfect TV
                  </span>
                </div>

                {/* INFORMATIONS */}
                <div className="p-5">

                  <h3 className="text-lg font-extrabold text-slate-900 transition group-hover:text-blue-700">
                    {representant.nom}
                  </h3>

                  <p className="mt-1 text-sm font-semibold text-red-600">
                    {representant.fonction}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                    <MapPin className="h-4 w-4 text-blue-700" />
                    {representant.zone}
                  </div>

                  <Link
                    href={`/representants/${representant.id}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition hover:text-red-600"
                  >
                    Voir le profil
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}

          </div>
        </div>
      </div>

      {/* ANIMATION */}
      <style jsx>{`
        .representants-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .representants-scroll::-webkit-scrollbar {
          display: none;
        }

        @media (min-width: 1024px) {
          .representants-scroll {
            animation: representantsMove 30s linear infinite;
          }

          .representants-scroll:hover {
            animation-play-state: paused;
          }
        }

        @keyframes representantsMove {
          0% {
            transform: translateX(0);
          }

          50% {
            transform: translateX(-12%);
          }

          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
