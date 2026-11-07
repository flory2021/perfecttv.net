import ProductCard from "@/components/cards/ProductCard";
import MainButton from "@/components/common/MainButton";
import React from "react";

function ProductDetailRelatedSection() {
  const data = [
    {
      id: "1",
      imageUrl: "/images/p_1.png",
      title: "Bram Krol",
      description: "Mission",
      price: "",
      otherPrice: "",
      type: "DISCOUNTED",
      typeValue: "%",
    },
    {
      id: "2",
      imageUrl: "/images/p_2.png",
      title: "Bram Krol",
      description: "Mission",
      price: "",
      otherPrice: "",
      type: "DISCOUNTED",
      typeValue: "%",
    },
    {
      id: "3",
      imageUrl: "/images/p_3.png",
      title: "Bram Krol",
      description: "Mission",
      price: "",
      otherPrice: "",
      type: "DISCOUNTED",
      typeValue: "%",
    },
    {
      id: "4",
      imageUrl: "/images/p_4.png",
      title: "Bram Krol",
      description: "Mission",
      price: "",
      otherPrice: "",
      type: "NEW",
      typeValue: "New",
    },
    {
      id: "5",
      imageUrl: "/images/p_5.png",
      title: "Bram Krol",
      description: "Mission",
      price: "",
      otherPrice: "",
      type: "NORMAL",
      typeValue: "",
    },

    {
      id: "6",
      imageUrl: "/images/p_6.png",
      title: "Bram Krol",
      description: "Mission",
      price: "",
      otherPrice: "",
      type: "NEW",
      typeValue: "New",
    },
    {
      id: "7",
      imageUrl: "/images/p_7.png",
      title: "Bram Krol",
      description: "Mission",
      price: "",
      otherPrice: "",
      type: "DISCOUNTED",
      typeValue: "-%",
    },

    {
      id: "8",
      imageUrl: "/images/p_8.png",
      title: "Bram Krol",
      description: "Mission",
      price: "",
      otherPrice: "",
      type: "NEW",
      typeValue: "New",
    },
  ];
  return (
    <section className="w-full overflow-x-hidden">
      <div>
        <p className="text-[32px] font-bold text-center">Cursus International</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px] mt-[30px]">
        {data.map((item, index) => (
          <ProductCard {...item} key={index} />
        ))}
      </div>
      <div className="flex justify-center mt-[32px]">
        <MainButton
          text="En ssavoir plus"
          classes="bg-transparent hover:bg-transparent text-primary font-bold border border-primary h-[48px]"
        />
      </div>
    </section>
  );
}

export default ProductDetailRelatedSection;
