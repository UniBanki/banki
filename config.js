import { MongoClient } from "mongodb";

const MONGO_URL = "mongodb://127.0.0.1:27017";

export let dbo = await connectMongo();

async function connectMongo() {
  try {
    return (await MongoClient.connect(MONGO_URL)).db("banki");
  } catch (error) {
    throw error;
  }
}