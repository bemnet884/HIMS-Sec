import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!;

// Define a type for the global mongoose cache
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Add the cache to the Node.js global object with a specific type
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const globalCache: MongooseCache = global.mongooseCache || { conn: null, promise: null };
global.mongooseCache = globalCache;

export const connect = async (): Promise<Mongoose> => {
  if (globalCache.conn) return globalCache.conn;

  if (!globalCache.promise) {
    globalCache.promise = mongoose.connect(MONGODB_URL, {
      dbName: "clerkauthv5",
      bufferCommands: false,
      connectTimeoutMS: 30000,
    });
  }

  globalCache.conn = await globalCache.promise;
  return globalCache.conn;
};
