const category = require("../models/academicCategoryModel");

// backend api controller to update a user's data based on their email
const addCategory = (req, res, next) => {
  const userId = req.body.id;
  const courseId = req.body.name;
  const categories = req.body.email;
  const weight = req.body.email;
  const mark = req.body.email;

  let newCategory = new category({
    userId: req.body.userId,
    courseId: req.body.courseId,
    categories: req.body.courseId,
    weight: req.body.weight,
    mark: req.body.mark,
  });
};

module.exports = {
  addCategory,
  editCategory,
  deleteCategory,
};
