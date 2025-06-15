// lib/mongodb.ts
import { MongoClient, ServerApiVersion } from "mongodb";

// const uri = process.env.URL!;
const uri = "mongodb+srv://Hawk:Hawk%40doccheck@cluster0.kc205jc.mongodb.net/doccheck?retryWrites=true&w=majority&appName=Cluster0";
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

// Global variable for reuse during development
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // Allow global var in types
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!process.env.URL) {
  throw new Error("Please add your MongoDB URL to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In dev, use a global variable to avoid re-creating on every hot reload
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise!;
} else {
  // In prod, no need for global caching
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
