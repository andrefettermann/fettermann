
import dotenv from 'dotenv';
import { Db, MongoClient } from "mongodb";

let singleton: Db;

dotenv.config();

export default async (): Promise<Db> => {
    if (singleton) return singleton;

    const client = new MongoClient(`${process.env.MONGO_HOST}`);

    await client.connect();

    singleton = client.db(process.env.MONGO_DB);

    return singleton;
}
