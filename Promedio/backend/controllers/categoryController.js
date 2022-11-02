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


const editCategory = (req, res, next) => {
  const userId = req.body.id;
  const courseId = req.body.name;
  const categories = req.body.categories;
  const weight = req.body.weight;
  const mark = req.body.mark;

  category.findByIdAndUpdate(
    id,
    { $set: { userId: userId, courseId: courseId, categories: categories, weight: weight, mark: mark } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }

      console.log(doc);
    }
  ); 
};

module.exports = {
  addCategory,
  editCategory,
  deleteCategory,
};
