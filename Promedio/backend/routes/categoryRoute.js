const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/categoryController");
router.post("/addCategory", CategoryController.addCategory);
router.post("/editCategory", CategoryController.editCategory);
router.post("/deleteCategory", CategoryController.deleteCategory);

router.route("/categories/:courseId")
    .get(CategoryController.getCategories)
module.exports = router;
