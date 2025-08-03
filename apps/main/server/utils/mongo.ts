import { MongoClient, type Db } from 'mongodb'

let client: MongoClient
let db: Db

export async function getDb(): Promise<Db> {
  if (!client || !db) {
    const uri = process.env.MONGO_URI
    if (!uri) {
      throw new Error('MONGO_URI environment variable not found')
    }

    client = new MongoClient(uri)
    await client.connect()
    db = client.db('flow')
    console.log('Connected to MongoDB')
  }

  return db
}

export async function closeDb() {
  if (client) {
    client.close()
  } else {
    throw new Error(`Can't close MongoDB connection, it doesn't exist!`)
  }
}