const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/categoryController");
router.post("/addCategory", CategoryController.register);
router.post("/editCategory", CategoryController.edit);
router.post("/deleteCategory", CategoryController.delete);
module.exports = router;
