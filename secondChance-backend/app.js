/* jshint esversion: 8 */
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const pinoLogger = require('./logger')
const pinoHttp = require('pino-http')

const connectToDatabase = require('./models/db')

const app = express()
app.use('*', cors())
const port = process.env.PORT || 3060

// Connect to MongoDB once at startup
connectToDatabase()
  .then(() => {
    pinoLogger.info('Connected to DB')
  })
  .catch((e) => console.error('Failed to connect to DB', e))

app.use(express.json())

// Route files
const secondChanceItemsRoutes = require('./routes/secondChanceItemsRoutes')
const searchRoutes = require('./routes/searchRoutes')
const authRoutes = require('./routes/authRoutes')

app.use(pinoHttp({ logger: pinoLogger }))

// Static files: landing page and uploaded images
app.use(express.static(path.join(__dirname, 'public')))

// Use routes
app.use('/api/secondchance/items', secondChanceItemsRoutes)
app.use('/api/secondchance/search', searchRoutes)
app.use('/api/auth', authRoutes)

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('Internal Server Error')
})

app.get('/health', (req, res) => {
  res.send('Inside the server')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
