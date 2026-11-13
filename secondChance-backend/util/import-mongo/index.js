require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const fs = require('fs')
const path = require('path')

// MongoDB connection URL with authentication options
const url = `${process.env.MONGO_URL}`
const filename = path.join(__dirname, 'secondChanceItems.json')
const dbName = 'secondChance'
const collectionName = 'secondChanceItems'

// Read the data file
const data = JSON.parse(fs.readFileSync(filename, 'utf8')).docs

// Connect to MongoDB and insert the data
async function loadData () {
  const client = new MongoClient(url)

  try {
    await client.connect()
    console.log('Connected successfully to server')

    const db = client.db(dbName)
    const collection = db.collection(collectionName)

    const documents = await collection.find({}).toArray()

    if (documents.length === 0) {
      const insertResult = await collection.insertMany(data)
      console.log('Inserted documents:', insertResult.insertedCount)
    } else {
      console.log('Items already exist in DB')
    }
  } catch (err) {
    console.error(err)
  } finally {
    await client.close()
  }
}

loadData()

module.exports = {
  loadData
}
