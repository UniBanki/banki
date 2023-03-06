import { MongoClient } from "mongodb";

const MONGO_URL = "mongodb://root:passwort@mongodb:27017/?authSource=admin";

export let dbo = await connectMongo();

async function connectMongo() {
  try {
    return (await MongoClient.connect(MONGO_URL)).db("banki");
  } catch (error) {
    throw error;
  }
}