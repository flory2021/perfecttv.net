import React from "react";
import RepresentantsSection from "./RepresentantsSection";

function BrowseTheRangeSection() {
  
  return (
    <section>
      <div>
        <p className="py-4 md:py-2 text-header text-center leading-tight md:text-large font-bold  text-red-600">
          L’Information au cœurs de Perfect TV 
          
        </p>
        <p className="text-[32px] font-bold text-center gap-[20px] mt-[30px] md:mt-[62px]">Aux commandes de Perfect Télévision, il a fait de son média un forum ouvert, vibrant et courageux. Un espace ou s’expriment les idées, les défis, les émotions – un espace qui secoue les consciences...</p>

      </div>
       <RepresentantsSection />
    </section>
  );
}

export default BrowseTheRangeSection;
