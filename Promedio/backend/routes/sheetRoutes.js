const express = require('express')
const router = express.Router()
const { getSheets } = require('../controllers/sheetController.js')
const { connectDatabase } = require('../config/database')

connectDatabase()

module.exports = router

router.get('/', getSheets)