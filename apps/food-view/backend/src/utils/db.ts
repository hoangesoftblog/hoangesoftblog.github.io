// File: src/utils/db.ts
// This file must be tested carefully with different scenarios,
// since related to connection

import { MongoClient, Db, MongoClientOptions, ServerApiVersion, Collection } from 'mongodb';
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.URI ?? "";
console.log(uri);
const client = new MongoClient(uri, ({
    serverApi: {
        version: ServerApiVersion.v1,
        strict: false,
        deprecationErrors: true,
    }
} as MongoClientOptions));

const databaseName = process.env.DB_NAME;
let database: Db | undefined;
export const connectDB = async () => {
    try {
        await client.connect();
        database = client.db(databaseName);
        console.log('Connected to the database - ' + database.databaseName);
        // const cs = await database.collections();
        // cs.forEach((e: Collection) => console.log(e.collectionName));
    } catch (error) {
        console.error('Error connecting to the database', error);
        throw error;
        // process.exit(1);
    }
};

export const getDB = () => {
    if (!database) {
        throw new Error('Database not connected');
    }
    return database;
};

export const createCollection = async (collectionName: string) => {
    if (!database) {
        throw new Error('Database not connected');
    }
    database.createCollection(collectionName);
}

export const closeDB = async () => {
    if (client) {
        try { 
            client.close(); 
            database = undefined;
        }
        catch (error) {
            throw error;
        }
    }
}
