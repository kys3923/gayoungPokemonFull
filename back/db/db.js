const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('DB connected')
  } catch (error) {
    console.log(error, 'error at connecting to DB')
  }
}

module.exports = connectDB