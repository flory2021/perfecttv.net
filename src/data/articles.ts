
export type Article = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  category: string;
  author: string;
  date: string;
  featured?: boolean;
};

export const articles: Article[] = [
  {
    id: 1,
    slug: "perfect tv-au-coeur-de-l-information",
    title: "Perfect tv au cœur de l'information",
    excerpt:
      "Découvrez la vision de Perfect tv et son ambition de proposer une information accessible, claire et utile.",
    content: [
      "Perfect tv souhaite rapprocher l'information de son public en proposant des contenus accessibles et faciles à consulter.",
      "À travers ses différentes rubriques, la plateforme présente des actualités, des analyses, des annonces et différents contenus multimédias.",
      "Cette démarche repose sur une volonté de proposer une information structurée et régulièrement mise à jour.",
    ],
    image: "/images/hero.jpg",
    category: "Actualité",
    author: "Rédaction Perfect tv",
    date: "2026-10-05",
    featured: true,
  },
  {
    id: 2,
    slug: "comprendre-les-enjeux-de-l-information",
    title: "Comprendre les enjeux de l'information",
    excerpt:
      "Pourquoi l'accès à une information claire et fiable reste essentiel dans notre société.",
    content: [
      "L'information occupe une place importante dans la vie quotidienne.",
      "Comprendre les événements nécessite des contenus clairs, contextualisés et accessibles.",
      "Perfect tv souhaite contribuer à cette démarche à travers ses différentes publications.",
    ],
    image: "/images/hero.png",
    category: "Analyse",
    author: "Jean Mukendi",
    date: "2026-10-04",
  },
  {
    id: 3,
    slug: "les-nouvelles-rubriques-de-perfect tv",
    title: "Les nouvelles rubriques de Perfect tv",
    excerpt:
      "Découvrez les nouvelles sections consacrées aux informations, annonces, photos et prédications.",
    content: [
      "Perfect tv enrichit progressivement son espace d'information.",
      "Les nouvelles rubriques permettent de mieux organiser les contenus proposés aux visiteurs.",
      "Cette évolution vise également à faciliter la navigation sur ordinateur comme sur téléphone.",
    ],
    image: "/images/logo.png",
    category: "Perfect tv",
    author: "Rédaction Perfect tv",
    date: "2026-10-03",
  },
  {
    id: 4,
    slug: "le-chef-de-la-diplomatie-francaise-se-rend-a-kinshasa-pour-une-visite",
    title: "RDC: le chef de la diplomatie française se rend à Kinshasa pour une visite centrée sur la lutte contre Ebola.",
    excerpt:
      "RDC: le chef de la diplomatie française se rend à Kinshasa pour une visite centrée sur la lutte contre Ebola.",
    content: [
      "Le ministre français des Affaires étrangères Jean-Noël Barrot se rend vendredi 2 octobre à Kinshasa pour deux jours de visite, largement consacrée à l'épidémie d'Ebola qui sévit dans l'est de la RDC.",
      "Il doit se rendre samedi à Bunia, en Ituri, épicentre de cette 17e épidémie. À Kinshasa, il doit notamment rencontrer son homologue aux Affaires étrangères, ainsi que le ministre de la Justice. ",
      
    ],
    image: "/images/jean_noel_barrot.png",
    category: "Perfect tv",
    author: "Rédaction Perfect tv",
    date: "2026-10-03",
  },
];

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

