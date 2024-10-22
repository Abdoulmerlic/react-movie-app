const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();  // Load environment variables from a .env file

const uri = process.env.MONGO_URI;  // Use environment variable for connection string

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db('movieDB');  // Use your database name
  } catch (error) {
    console.error("Connection error:", error);
    process.exit(1);  // Exit if connection fails
  }
}

module.exports = connectToDatabase;
