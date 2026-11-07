import mongoose, { Schema, type Model } from "mongoose";

export interface IApiRateLimit {
  key: string;
  windowStart: Date;
  count: number;
}

const ApiRateLimitSchema = new Schema<IApiRateLimit>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    windowStart: {
      type: Date,
      required: true,
      expires: 120,
    },
    count: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    collection: "api_rate_limits",
    versionKey: false,
  }
);

const ApiRateLimit: Model<IApiRateLimit> =
  (mongoose.models.ApiRateLimit as Model<IApiRateLimit>) ||
  mongoose.model<IApiRateLimit>(
    "ApiRateLimit",
    ApiRateLimitSchema
  );

export default ApiRateLimit;
