import Image from "next/image";

const emissions = [
  {
    title: "Débat pour la nation",
    presenter: "DG Peter TIANI",
    image : "/images/peter.png",
    category: "Émission politique",
    description: "Les grands enjeux de la République démocratique du Congo.",
  },
  {
    title: "Perfect Actu",
    presenter: "Hervé ITOMA",
    image : "/images/herve.png",
    category: "Émission politique",
    description: "L'actualité politique et les grands enjeux de la République démocratique du Congo.",
  },
  {
    title: "Tosolola Mboka",
    presenter: "TATIANA OSANGO",
    image : "/images/tatiana.png",
    category: "Émission politique",
    description: "Un espace de dialogue et de réflexion autour de la vie politique nationale.",
  },
  {
    title: "Cris du Peuple",
    presenter: "Patricia MUTONKOLE",
    image : "/images/patricia.png",
    category: "Émission sociale",
    description: "Une émission consacrée aux réalités sociales et aux préoccupations de la population.",
  },
  {
    title: "Église et Réalité",
    presenter: "John FUAMBA",
    image : "/images/john.png",
    category: "Émission religieuse",
    description: "Un regard sur la foi, la vie chrétienne et les réalités de la société.",
  },
  {
    title: "En toute sportivité",
    presenter: "DOUDOU MBALA",
    image : "/images/doudou.png",
    category: "Émission sportive",
    description: "L'actualité sportive, les analyses et les grands rendez-vous du sport.",
  },
  {
    title: "Vrai Journal",
    presenter: "Phillipe MVIPI",
    category: "Journal télévisé",
    description: "Un rendez-vous d'information consacré aux événements et aux faits marquants.",
  },
  {
    title: "Perfect Gospel",
    presenter: "Faylord BOLA",
    image: "/images/faylord.png",
    category: "Journal télévisé",
    description: "Un rendez-vous d'information consacré aux événements chrétienne.",
  },
    {
    title: "Perfect Show",
    presenter: "Jeep YA RANDO",
    image: "/images/jeep.png",
    category: "Journal télévisé",
    description: "Un rendez-vous d'information consacré aux événements chrétienne.",
  },
];

export default function EmissionsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-blue-950 to-red-800 px-4 py-20 text-center text-white">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-blue-200">
          PERFECT TV
        </p>
        <h1 className="text-4xl font-extrabold md:text-6xl">
          Nos émissions
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-slate-200 md:text-lg">
          Découvrez nos programmes et les présentateurs qui vous accompagnent
          au quotidien.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-red-600">
            Notre programmation
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
            La grille des émissions
          </h2>
          <p className="mt-3 text-slate-600">
            les rendez-vous pour s&apos;informer, comprendre et se divertir.
          </p>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {emissions.map((emission, index) => (
            <article
              key={emission.title}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                
                <Image
                  src={emission.image ?? "/images/presentateur-default.png"}
                  alt={`Photo du présentateur ${emission.presenter}`}
                  fill
                  className="object-cover object-center transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow">
                  ÉMISSION {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="p-6">
                <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                  {emission.category}
                </span>

                <h3 className="mt-4 text-2xl font-extrabold text-slate-900">
                  {emission.title}
                </h3>

                <div className="mt-4 border-t border-slate-100 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Présentateur
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-800">
                    {emission.presenter}
                  </p>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {emission.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}