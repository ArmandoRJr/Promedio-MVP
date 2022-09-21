const asyncHandler = require('express-async-handler') // To avoid try-catching every time

// @desc    Get sheets
// @route   GET /api/sheets
// @access  Private
const getSheets = asyncHandler(async (req, res) => {
    res.status(200).json({message: `This will eventually send sheets (maybe),
    but in the meanwhile, you get me!`})
})

module.exports = {
    getSheets
}