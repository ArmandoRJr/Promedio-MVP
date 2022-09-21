//console.log("Hello, Promedio")

const express = require('express')
const dotenv = require('dotenv').config() // .env file
const server_port = process.env.SERVER_PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/sheets', require('./routes/sheetRoutes'))

app.listen(server_port, () => {
    console.log(`Server started on port ${server_port}`)
})