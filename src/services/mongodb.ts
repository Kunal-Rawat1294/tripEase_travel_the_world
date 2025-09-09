/**
 * @fileOverview Service for interacting with the MongoDB database.
 */
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error('MongoDB connection URI is not configured in environment variables.');
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let dbConnection: any = null;

async function connectToDb() {
    if (dbConnection) {
        return dbConnection;
    }
    try {
        await client.connect();
        dbConnection = client.db("tripease");
        console.log("Successfully connected to MongoDB!");
        return dbConnection;
    } catch (e) {
        console.error("Could not connect to MongoDB", e);
        // Clean up the client on a failed connection attempt
        await client.close();
        dbConnection = null; // Reset connection
        throw e; // Re-throw error to be handled by caller
    }
}


export async function getMongoDocsForCountry(countryName: string) {
    try {
        const db = await connectToDb();
        const collection = db.collection('docs');

        // Case-insensitive search for the country name
        const countryData = await collection.findOne({
            country_name: { $regex: new RegExp(`^${countryName}$`, 'i') }
        });

        return countryData;
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        return null; // Return null on error
    }
}
