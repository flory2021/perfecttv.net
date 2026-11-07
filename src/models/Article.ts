import mongoose, { Schema, Document, Model } from "mongoose";

export interface IArticle extends Document {
  legacyId?: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  category: string;
  author: string;
  date: Date;
  featured: boolean;
  status: "draft" | "published";
  views: number;
  likes: number;
  dislikes: number;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    legacyId: {
      type: Number,
      default: undefined,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: "/images/hero.jpg",
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      default: "Redaction Perfect TV",
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Article: Model<IArticle> =
  mongoose.models.Article ||
  mongoose.model<IArticle>("Article", ArticleSchema);

export default Article;