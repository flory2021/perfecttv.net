import React from "react";

export default function ProductDetailExtraInfoSection() {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="flex gap-[53px]">
        <p className="text-customGray text-normal md:text-[24px] font-semibold">
          Description
        </p>
        <p className="text-customGray text-normal md:text-[24px]">
          Additional Information
        </p>
        <p className="text-customGray text-normal md:text-[24px]">
          Reviews [5]
        </p>
      </div>
      <div className="mt-[37px] ">
        <p className="text-customGray text-normal">
         En plus de l’enseignement et des cours de direction, &apos;n&apos; en particulier au Népal
           en Côte d’Ivoire et dans le Dem. Rep. Kongo, il développe également sa propre missionlogie et ses stratégies missionnaires,
          stimulées par sa connaissance de la Bible et les expériences spéciales qu’il a acquises.
        </p>
        <p className="text-customGray text-normal mt-[30px]">
         Écoutez également une interview à la radio par Grootnieuws Radio avec Bram Krol (juin 2014) sur son travail national et international.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-[37px]">
        <div className=" flex flex-col bg-primary-light  rounded-[8px] justify-center items-center">
          <img
            src={"/images/sofa.png"}
            alt="product"
            className="w-full object-cover"
          />
        </div>
        <div className=" flex flex-col bg-primary-light  rounded-[8px] justify-center items-center">
          <img
            src={"/images/sofa.png"}
            alt="product"
            className="w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
