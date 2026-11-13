const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const router = express.Router()
const connectToDatabase = require('../models/db')
const logger = require('../logger')

// Define the upload directory path
const directoryPath = path.join(__dirname, '..', 'public', 'images')

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdirSync(directoryPath, { recursive: true })
    cb(null, directoryPath)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

// GET /api/secondchance/items - get all secondChanceItems
router.get('/', async (req, res, next) => {
  logger.info('/ called')
  try {
    const db = await connectToDatabase()
    const collection = db.collection('secondChanceItems')
    const secondChanceItems = await collection.find({}).toArray()
    res.json(secondChanceItems)
  } catch (e) {
    logger.error('oops something went wrong', e)
    next(e)
  }
})

// POST /api/secondchance/items - add a new item (with file upload)
router.post('/', upload.single('file'), async (req, res, next) => {
  try {
    const db = await connectToDatabase()
    const collection = db.collection('secondChanceItems')
    let secondChanceItem = req.body

    // Generate the next id
    const lastItemQuery = await collection.find().sort({ id: -1 }).limit(1).toArray()
    const lastId = lastItemQuery.length > 0 ? parseInt(lastItemQuery[0].id) : 0
    secondChanceItem.id = (lastId + 1).toString()

    // Set the current date
    secondChanceItem.date_added = Math.floor(new Date().getTime() / 1000)

    if (req.file) {
      secondChanceItem.image = `/images/${req.file.originalname}`
    }

    const result = await collection.insertOne(secondChanceItem)
    secondChanceItem = { ...secondChanceItem, _id: result.insertedId }
    res.status(201).json(secondChanceItem)
  } catch (e) {
    next(e)
  }
})

// GET /api/secondchance/items/:id - get a single item by id
router.get('/:id', async (req, res, next) => {
  try {
    const db = await connectToDatabase()
    const collection = db.collection('secondChanceItems')
    const id = req.params.id
    const secondChanceItem = await collection.findOne({ id })

    if (!secondChanceItem) {
      return res.status(404).send('secondChanceItem not found')
    }

    res.json(secondChanceItem)
  } catch (e) {
    next(e)
  }
})

// PUT /api/secondchance/items/:id - update an existing item
router.put('/:id', async (req, res, next) => {
  try {
    const db = await connectToDatabase()
    const collection = db.collection('secondChanceItems')
    const id = req.params.id

    const secondChanceItem = await collection.findOne({ id })
    if (!secondChanceItem) {
      logger.error('secondChanceItem not found')
      return res.status(404).json({ error: 'secondChanceItem not found' })
    }

    const update = {
      category: req.body.category,
      condition: req.body.condition,
      age_days: req.body.age_days,
      description: req.body.description,
      age_years: Number((req.body.age_days / 365).toFixed(1)),
      updatedAt: new Date()
    }

    const updatedItem = await collection.findOneAndUpdate(
      { id },
      { $set: update },
      { returnDocument: 'after' }
    )

    if (updatedItem) {
      res.json({ uploaded: 'success' })
    } else {
      res.json({ uploaded: 'failed' })
    }
  } catch (e) {
    next(e)
  }
})

// DELETE /api/secondchance/items/:id - delete an existing item
router.delete('/:id', async (req, res, next) => {
  try {
    const db = await connectToDatabase()
    const collection = db.collection('secondChanceItems')
    const id = req.params.id

    const secondChanceItem = await collection.findOne({ id })
    if (!secondChanceItem) {
      logger.error('secondChanceItem not found')
      return res.status(404).json({ error: 'secondChanceItem not found' })
    }

    await collection.deleteOne({ id })
    res.json({ deleted: 'success' })
  } catch (e) {
    next(e)
  }
})

module.exports = router
