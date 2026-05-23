const mongoose = require('mongoose')

let cached = global.mongooseConnection

if (!cached) {
  cached = global.mongooseConnection = { conn: null, promise: null }
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI

    if (!uri) {
      throw new Error('MONGODB_URI is required')
    }

    cached.promise = mongoose.connect(uri).then((connection) => connection)
  }

  cached.conn = await cached.promise
  return cached.conn
}

module.exports = connectToDatabase
