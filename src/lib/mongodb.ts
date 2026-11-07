
import mongoose from "mongoose";

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error(
    "La variable MONGODB_URI est absente du fichier .env.local"
  );
}

const mongoUriValue: string = mongoUri;

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalWithMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

const cached =
  globalWithMongoose.mongooseCache ??
  (globalWithMongoose.mongooseCache = {
    conn: null,
    promise: null,
  });

async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
  cached.promise = mongoose.connect(mongoUriValue).catch((error) => {
    cached.promise = null;
    throw error;
  });
}

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
