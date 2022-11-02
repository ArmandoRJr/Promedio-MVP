const category = require("../models/academicCategoryModel");

// backend api controller to update a user's data based on their email
const addCategory = (req, res, next) => {
  let newCategory = new category({
    userId: req.body.userId,
    courseId: req.body.courseId,
    categories: req.body.categories,
    weight: req.body.weight,
    mark: req.body.mark,
  });

  newCategory
    .save()
    .then((newCategory) => {
      if (newCategory) {
        res.json({
          message: "Category added successfully.",
          category: {
            ...newCategory.toObject(),
          },
        });
      } else {
        next({
          message: "Category not added.",
          status: 500,
          stack: "Category not added.",
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

const editCategory = (req, res, next) => {
  const categoryId = req.body.id;
  const courseId = req.body.name;
  const categories = req.body.categories; // ['Exam', 'TT1', 'TT2']
  const weight = req.body.weight; // ['30', '40', '50']
  const mark = req.body.mark; // ['30', '40', '50']

  category.findByIdAndUpdate(
    categoryId,
    {
      $set: {
        courseId: courseId,
        categories: categories,
        weight: weight,
        mark: mark,
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }
      console.log(doc);
      res.status(200).json({
        message: "Category deleted successfully.",
      });
    }
  );
};

const deleteCategory = (req, res, next) => {
  const categoryId = req.body.id;

  category.deleteOne({ _id: categoryId }, (err, doc) => {
    if (err) {
      console.log("Something wrong when deleting data!");
    }
    console.log(doc);
    // return 200 on success
    res.status(200).json({
      message: "Category deleted successfully.",
    });
  });
};

module.exports = {
  addCategory,
  editCategory,
  deleteCategory,
};
