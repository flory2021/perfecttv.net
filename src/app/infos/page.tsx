import React from "react";

function InfosPage() {
    const data = [
    {
      imageUrl: "/images/jean_noel_barrot.png",
      title: "Jean-Noël Barrot",
      fonction: "Ministre des Affaires étrangères et de la Coopération internationale",
      description: "Jean-Noël Barrot est un homme politique français, membre du Mouvement démocrate (MoDem). Il est ministre des Affaires étrangères et de la Coopération internationale depuis 2023.",
    }
  ];
  return (
    <div>
      <section className="bg-shop-hero h-[316px] flex justify-center flex-col items-center">
        <p className="font-medium text-[48px]">Infos Générales</p>
        <div className="flex gap-2">
          <p className="font-bold">Perfecttv</p>
        </div>
      </section>
      <p className="text-[32px] font-bold text-center gap-[20px] mt-[30px] md:mt-[62px]">
        Infos Générales <br />
        Dans cette rubrique, nous informons de réalités quotidiennes concernant les faits sociaux qui nous entourent
      </p>
      <p className="text-[20px] text-center gap-[10px] mt-[15px] md:mt-[20px]">
        (Mise à jour à suivre)
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] mt-[30px] md:mt-[62px]">
        {data.map((item, index) => (
          <div key={index}>
            <div>
              <img
                src={item.imageUrl}
                alt="category image"
                className="h-[480px] rounded-[10px] object-cover"
              />
            </div>
            <p className="text-[19px] text-customBlack font-semibold mt-[30px] text-center">
              {item.title}
            </p>
            <p className="text-[16px] text-customGray text-center">
              {item.fonction}
            </p>
            <p className="text-[14px] text-customGray text-center mt-[10px]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfosPage;
