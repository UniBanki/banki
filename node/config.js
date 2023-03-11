import { MongoClient } from "mongodb";

const MONGO_URL = (process.env.MONGODB_IN_CONTAINER === "1") ? "mongodb://root:passwort@mongodb:27017/?authSource=admin" : "mongodb://root:passwort@127.0.0.1:27017/?authSource=admin";

export let dbo = await connectMongo();

async function connectMongo() {
  try {
    return (await MongoClient.connect(MONGO_URL)).db("banki");
  } catch (error) {
    throw error;
  }
}