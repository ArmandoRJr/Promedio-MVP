const mongoose = require('mongoose')

const connectDatabase = async () => {
    try {
        // Second param for 'conn' is to account for older versions of mongo and/or mongoose
        const conn = await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
        console.log(`MongoDB connected ${conn.connection.host}, we're good!`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = { connectDatabase }