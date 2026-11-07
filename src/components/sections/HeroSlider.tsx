
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronRight,
} from "lucide-react";

const slides = [
  {
    id: 1,
    image: "/images/hero.jpg",
    category: "Actualité",
    title: "L'information au cœur de Perfect TV",
    description:
      "Découvrez les dernières informations, analyses et actualités à travers une plateforme moderne et accessible.",
    button: "Découvrir les articles",
    link: "/infos/articles",
  },
  {
    id: 2,
    image: "/images/hero.png",
    category: "Infos générales",
    title: "Restez informé de l'essentiel",
    description:
      "Retrouvez nos informations, annonces et publications régulièrement mises à jour.",
    button: "Voir les informations",
    link: "/infos",
  },
  {
    id: 3,
    image: "/images/hero.jpg",
    category: "Médias",
    title: "Découvrez nos contenus multimédias",
    description:
      "Photos, prédications et contenus exclusifs vous attendent dans notre espace médias.",
    button: "Explorer les médias",
    link: "/photos",
  },
  {
    id: 4,
    image: "/images/hero.png",
    category: "Perfect TV",
    title: "Une plateforme pensée pour vous",
    description:
      "Une expérience simple, moderne et accessible pour rester connecté à l'information.",
    button: "À propos de Perfect TV",
    link: "/about",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrent((previous) => (previous + 1) % totalSlides);
  };

  const previousSlide = () => {
    setCurrent((previous) =>
      previous === 0 ? totalSlides - 1 : previous - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrent((previous) => (previous + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, totalSlides]);

  const slide = slides[current];

  return (
    <section
      className="relative w-full overflow-hidden bg-slate-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* IMAGE */}
      <div className="absolute inset-0">
        {slides.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === current
                ? "scale-100 opacity-100"
                : "scale-105 opacity-0"
            }`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/20" />

        {/* Bottom overlay */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/80 to-transparent" />
      </div>

      {/* CONTENU */}
      <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <div
          key={slide.id}
          className="max-w-3xl animate-in fade-in slide-in-from-left-8 duration-700"
        >
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            {slide.category}
          </div>

          {/* Titre */}
          <h1 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {slide.title}
          </h1>

          {/* Ligne rouge */}
          <div className="mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-red-500" />

          {/* Description */}
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
            {slide.description}
          </p>

          {/* Boutons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={slide.link}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-900/30 transition-all duration-300 hover:-translate-y-1 hover:bg-red-700 hover:shadow-xl"
            >
              {slide.button}

              <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-slate-900"
            >
              Nous contacter
            </Link>
          </div>

          {/* Date / statut */}
          <div className="mt-8 flex items-center gap-2 text-sm text-slate-300">
            <CalendarDays className="h-4 w-4" />
            <span>Actualités et informations Perfect tv</span>
          </div>
        </div>
      </div>

      {/* FLECHES */}
      <button
        type="button"
        onClick={previousSlide}
        aria-label="Slide précédente"
        className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-blue-700 md:flex"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Slide suivante"
        className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-red-600 md:flex"
      >
        <ArrowRight className="h-5 w-5" />
      </button>

      {/* INDICATEURS */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {slides.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`Aller au slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              index === current
                ? "w-10 bg-red-500"
                : "w-2.5 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>

      {/* COMPTEUR */}
      <div className="absolute bottom-7 right-6 hidden items-center gap-2 text-sm font-bold text-white sm:flex md:right-10">
        <span className="text-xl">
          {String(current + 1).padStart(2, "0")}
        </span>

        <span className="text-white/40">/</span>

        <span className="text-white/50">
          {String(totalSlides).padStart(2, "0")}
        </span>
      </div>

      {/* BARRE DE PROGRESSION */}
      <div className="absolute bottom-0 left-0 h-1 bg-white/10">
        <div
          key={current}
          className="h-full bg-gradient-to-r from-blue-600 to-red-600"
          style={{
            animation: isPaused
              ? "none"
              : "heroProgress 5s linear forwards",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes heroProgress {
          from {
            width: 0%;
          }

          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}

