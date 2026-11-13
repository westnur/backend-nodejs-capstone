const express = require('express')
const router = express.Router()
const connectToDatabase = require('../models/db')

// GET /api/secondchance/search - search for items
router.get('/', async (req, res, next) => {
  try {
    const db = await connectToDatabase()
    const collection = db.collection('secondChanceItems')

    // Initialize the query object
    const query = {}

    // Add the name filter to the query if the name parameter is not empty
    if (req.query.name && req.query.name.trim() !== '') {
      query.name = { $regex: req.query.name, $options: 'i' } // case-insensitive
    }

    // Filter on category
    if (req.query.category) {
      query.category = req.query.category
    }

    // Filter on condition
    if (req.query.condition) {
      query.condition = req.query.condition
    }

    // Filter on maximum age in years
    if (req.query.age_years) {
      query.age_years = { $lte: parseInt(req.query.age_years) }
    }

    const gifts = await collection.find(query).toArray()
    res.json(gifts)
  } catch (e) {
    next(e)
  }
})

module.exports = router
