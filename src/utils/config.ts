import { MongoClient } from 'mongodb'

const {
  MONGODB_URL,
  MONGODB_PORT,
  MONGODB_URL_PREFIX,
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
} = process.env

const MONGODB_URI = `${MONGODB_URL_PREFIX}://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_URL}:${MONGODB_PORT}`
const mongoDBClient = new MongoClient(MONGODB_URI)
const database = mongoDBClient.db('recipedb')

export const userCollection = database.collection('users')
export const recipeCollection = database.collection('recipes')

export const JWT_SECRET = process.env.JWT_SECRET
