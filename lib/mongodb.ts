import { MongoClient, type Db } from "mongodb"

const DB_NAME = "hireloopdb"

type MongoGlobal = typeof globalThis & {
    _hireloopMongoClient?: MongoClient
}

/**
 * One MongoClient per process (reused across hot reloads), so route handlers
 * and server actions don't open a new connection pool on every request.
 */
export function getMongoClient(): MongoClient {
    const globalWithMongo = globalThis as MongoGlobal

    if (!globalWithMongo._hireloopMongoClient) {
        const uri = process.env.BETTER_AUTH_DB_URI

        if (!uri) {
            throw new Error("BETTER_AUTH_DB_URI is not set")
        }

        globalWithMongo._hireloopMongoClient = new MongoClient(uri)
    }

    return globalWithMongo._hireloopMongoClient
}

export function getDb(): Db {
    return getMongoClient().db(DB_NAME)
}
