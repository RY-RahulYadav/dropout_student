require('dotenv').config();
const mongoose = require('mongoose')
const mongouri = process.env.MONOGDB_URL

const connectToMongo = async () => {
    await mongoose.connect(mongouri)
    console.log("Connected to Mongodb Successfully")
}

module.exports = connectToMongo;