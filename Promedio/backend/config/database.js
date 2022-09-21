const mongoose = require('mongoose')

const connectDatabase = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected ${conn.connection.host}, we're good!`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = { connectDatabase }