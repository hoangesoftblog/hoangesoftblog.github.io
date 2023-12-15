// index.js
import express, { Express, Request, Response } from "express";
const { MongoClient, ServerApiVersion } = require('mongodb');
import dotenv from "dotenv";
import { closeDB, connectDB } from "@/utils/db";
import { userRouter } from "./routes";


dotenv.config();
// dotenv.config({ path: "./config.env" });

connectDB();

const port = process.env.PORT ?? 5172;
const app: Express = express();

// app.use("/users", userRouter);

process.on('SIGINT', async () => {
    await closeDB();
    process.exit(0);
})

// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello, World!');
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });


// const uri = process.env.URI ?? "";
// console.log(uri);
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);
