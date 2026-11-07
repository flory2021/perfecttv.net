import React from "react";

function ShopBannerSection() {
  const data = [
    {
      iconUrl: "/images/banner_icon_1.png",
      title: "Médaille",
      description: "crafted from top materials",
    },
    {
      iconUrl: "/images/banner_icon_2.png",
      title: "Rapport des voyages",
      description: "Formation pour les dirigeants des groupes de suivi",
    },
    {
      iconUrl: "/images/banner_icon_3.png",
      title: "Faire un don en ligne",
      description: "don de plus 150 $",
    },
    {
      iconUrl: "/images/banner_icon_4.png",
      title: "24 / 7 Support",
      description: "Dedicated support",
    },
  ];
  return (
    <section className="bg-[#FAF3EA] md:h-[270px] py-16 md:py-0 flex px-4 md:px-[53px]">
      <div className="flex flex-col gap-8 md:flex-row justify-between w-full">
        {data.map((item, index) => (
          <div key={index} className="flex gap-4 items-center">
            <div>
              <img src={item.iconUrl} alt="icon" />
            </div>
            <div>
              <p className="text-customBlack font-semibold text-normal xl:text-[25px]">
                {item.title}
              </p>
              <p className="text-customGray">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ShopBannerSection;
