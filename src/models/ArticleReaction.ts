import mongoose, { Schema, Document, Model } from "mongoose";

export interface IArticleReaction extends Document {
  articleId: mongoose.Types.ObjectId;
  visitorId: string;
  reaction: "like" | "dislike";
  createdAt: Date;
  updatedAt: Date;
}

const ArticleReactionSchema = new Schema<IArticleReaction>(
  {
    articleId: {
      type: Schema.Types.ObjectId,
      ref: "Article",
      required: true,
    },
    visitorId: {
      type: String,
      required: true,
      trim: true,
    },
    reaction: {
      type: String,
      enum: ["like", "dislike"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ArticleReactionSchema.index(
  { articleId: 1, visitorId: 1 },
  { unique: true }
);

const ArticleReaction: Model<IArticleReaction> =
  mongoose.models.ArticleReaction ||
  mongoose.model<IArticleReaction>(
    "ArticleReaction",
    ArticleReactionSchema
  );

export default ArticleReaction;