const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://mouli:Bmouli%4012@cluster0.8pf7l.mongodb.net/RestaurantData?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db("RestaurantData"); // Return the database instance
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    throw err;
  }
}

async function fetchRestaurants() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("Restaurants");
    return await collection.find({}).toArray();
  } catch (err) {
    console.error("Error fetching restaurants:", err);
    throw err;
  }
}

module.exports = { fetchRestaurants };
