import React from "react";

function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 px-4 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-200">
            Infos générales
          </p>

          <p className="mt-4 max-w-2xl text-blue-100">
            Pour tous contact avec Perfect Tv 
          </p>
        </div>
      </section>
      
        
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="p-8 text-center text-2xl font-bold text-gray-800">
            Pour contacter Perfect TV, veuillez utiliser les informations ci-dessous. Nous sommes là pour répondre à vos questions et préoccupations.
          </h1>
        </div>
 
    </main>
  );
}

export default ContactPage;
