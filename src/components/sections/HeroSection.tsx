import React from "react";
import Link from "next/link";
import MainButton from "../common/MainButton";

function HeroSection() {
  return (
    <section className="bg-hero flex flex-col justify-center items-end w-full h-[calc(100vh-73px)] bg-no-repeat bg-cover bg-bottom">
      <div className="bg-[#FFF3E3] mx-4 md:mr-[26px] md:ml-0 inline-block rounded-[10px] px-4 md:px-[25px] pt-[17px] md:pt-[32px] pb-[17px]">
        <p className="text-customBlack font-semibold text-normal">
          Bienvenue chez Perfect TV
        </p>

      

        <p className="text-customGray text-[9px] mb-[12px]">
          Au-delà des certaines exigence <br />
          Perfect tv vient d’acquérir désormais son site web :
          <Link href="/#">www.perfecttv.com</Link>
          <br />
          Et bientôt vous allez découvrir Perfect TV <br />
          <br />
          C’est un média du peuple, par le peuple, et pour le peuple
        </p>

        <MainButton text="En savoir plus..." classes="w-[222px]" />
      </div>
    </section>
  );
}

export default HeroSection;
