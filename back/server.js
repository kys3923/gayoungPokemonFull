const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db/db')

connectDB()

const app = express();

// middleware
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(bodyParser.json())

// routes
app.get('/', (req, res) => {
  res.json({
    message: 'Server is running'
  })
})

// controllers
app.use('/auth', require('./routes/auth'))

let server = app.listen(process.env.PORT || 8000, () => console.log(`server is running at ${process.env.PORT || 8000}`))

module.exports = server