import mongoose, { Schema, Document, Model } from "mongoose";

export interface IArticleView extends Document {
  articleId: mongoose.Types.ObjectId;
  visitorId: string;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleViewSchema = new Schema<IArticleView>(
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
  },
  { timestamps: true }
);

ArticleViewSchema.index(
  { articleId: 1, visitorId: 1 },
  { unique: true }
);

const ArticleView: Model<IArticleView> =
  mongoose.models.ArticleView ||
  mongoose.model<IArticleView>("ArticleView", ArticleViewSchema);

export default ArticleView;