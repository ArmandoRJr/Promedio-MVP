const express = require('express')
const router = express.Router()
const { getSheets } = require('../controllers/sheetController.js')

module.exports = router

router.get('/', getSheets)