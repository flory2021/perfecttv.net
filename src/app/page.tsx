
import Image from "next/image";

import BrowseTheRangeSection from "@/components/sections/BrowseTheRangeSection";
import OurProductSection from "@/components/sections/OurProductSection";
import ShareSetupSection from "@/components/sections/ShareSetupSection";
import HeroSlider from "@/components/sections/HeroSlider";
import RepresentantsSection from "@/components/sections/RepresentantsSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Bannière principale */}
      <HeroSlider />

      {/* Présentation */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-600">
            Perfect TV
          </p>

          <h2 className="mt-2 text-3xl font-black text-slate-900 md:text-4xl">
            Bienvenue sur PERFECT TV
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            PERFECT Télévision n’est pas seulement une chaîne parmi tant
            d’autres. C’est un média du peuple, par le peuple et pour le peuple.
          </p>
        </div>

        {/* Nouvelle section avec la photo */}
        <div className="mt-16 grid items-center gap-10 md:grid-cols-2">

         

          <div className="space-y-5">
            <p className="text-sm font-bold uppercase tracking-widest text-red-600">
              Notre engagement
            </p>

            <h2 className="text-3xl font-black leading-tight text-slate-900 md:text-4xl">
              Directeur Général de Perfect Tv  <br/> Peter TIANI
            </h2>

            <p className="text-base leading-5 text-slate-30">
              La voix qui secoue le silence, le media qui bouscule le statuquo           
            </p>
  
            <p className="text-base leading-8 text-slate-600">
              PERFECT TV donne la parole à toutes les composantes de la
              société. À travers ses émissions, ses reportages et ses
              interventions, notre ambition est d&apos;informer, de sensibiliser
              et de contribuer au développement de notre société.
            </p>

            <div className="h-1 w-20 rounded-full bg-red-600" />
            
            <p className="font-semibold text-slate-800">
              PERFECT TV — Le média du peuple, par le peuple et pour le peuple.
            </p>
          </div>
           <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="/images/presentation.jpg"
              alt="Intervention lors d'une conférence"
              width={800}
              height={1200}
              priority
              className="h-auto w-full object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

        </div>
      </section>

      {/* Rubriques */}
      <div className="mx-4 flex flex-col gap-[56px] md:mx-[130px]">
       <BrowseTheRangeSection/>
       
      </div>

      <div className="mt-[56px]">
        <ShareSetupSection />
      </div>

    </main>
  );
}

