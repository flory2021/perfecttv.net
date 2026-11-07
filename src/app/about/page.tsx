import React from "react";
import Link from "next/link";

function AboutPage() {
  const data = [
    {
      imageUrl: "/images/livre1.png",
      title: "Le mouvement impétueux de JESUS",
      nom: "Révérend Pasteur Abrham Krol",
    },
    {
      imageUrl: "/images/livre2.png",
      title: "La croissance de l’église",
      nom: "Révérend Pasteur Abrham Krol",
    },
    {
      imageUrl: "/images/livre3.png",
      title: "De bulldoze van een opwekking",
      nom: "Révérend Pasteur Abrham Krol",
    },
    {
      imageUrl: "/images/livre4.png",
      title: "Pour des groupes dynamiques",
      nom: "Révérend Pasteur Abrham Krol",
    },
  ];
  return (
    <div>
  <section className="bg-shop-hero h-[316px] flex justify-center flex-col items-center">
      <p className="font-medium text-[48px]">
        Qui somme nous?
      </p>
      <div className="flex gap-2">
        <p className="font-bold">Perfect TV</p>
      </div>
    </section>
    <p className="text-[32px] font-bold text-center gap-[20px] mt-[30px] md:mt-[62px]">Mathieu : 28 :19 Allez, faites de toutes les nations des disciples, les baptisant au nom du Père, du fils et du saint Esprit</p>
    <p className="text-[20px] text-center gap-[10px] mt-[15px] md:mt-[20px]">Cet ordre ou commandement de notre seigneur jésus christ a été et continuer d’être d’actualité.</p>
    <p className="text-[20px] text-center gap-[10px] mt-[15px] md:mt-[20px]">C’est dans ce cadre que le ministère Facilite Fondation a fait de ce commandement du seigneur sa mission principale à travers le ministère de la formation pour la croissance de l’église qui est l’épouse du seigneur Jésus Christ.</p>
    <p className="text-[20px] text-center gap-[10px] mt-[15px] md:mt-[20px]">Ce Ministère a été créé par le serviteur de Dieu le Révérend Pasteur Abram Krol, missionnaire Hollandais. <br/> Ce ministère puissant et florissant s’est étendu de la hollande vers plusieurs nations dans les continents. <br/> En R.D.Congo ce Ministère est représenté par le Révérend Pasteur LUSWA KASESE Bernandin qui  est également le Directeur  Exécutif de AFRICE en Afrique   <br/>(Mise à jour à suivre)  </p>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] mt-[30px] md:mt-[62px]">
        {data.map((item, index) => (
          <div key={index}>
            <div>
              <img
                src={item.imageUrl}
                alt="category image"
                className="h-[480px] rounded-[10px] object-cover m-2" 
              />
            </div>
            <Link href="#" className="text-[19px] text-customBlack font-semibold mt-[30px] m-2 text-center">
              {item.title} <br/>Ecrit par : {item.nom}
            </Link>
          </div>
        ))}
      </div>
    </div>
    
);
}

export default AboutPage;
