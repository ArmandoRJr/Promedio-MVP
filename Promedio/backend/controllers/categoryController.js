const category = require("../models/academicCategoryModel");

// backend api controller to update a user's data based on their email
const addCategory = (req, res, next) => {
  let newCategory = new category({
    courseId: req.body.courseId,
    name: req.body.name,
    weights: req.body.weights,
    numAssessments: req.body.numAssessments,
    grades: req.body.grades,
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
  const name = req.body.name;
  const numAssessments = req.body.numAssessments;
  const weights = req.body.weights;

  const grades = req.body.grades;

  category.findByIdAndUpdate(
    categoryId,
    {
      $set: {
        name: name,
        numAssessments: numAssessments,
        weights: weights,
        grades: grades,
      },
    },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }
      console.log(doc);
      res.status(200).json({
        message: "Category edited successfully.",
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

const getCategories = (req, res, next) => {
  const courseId = req.params.courseId;
  if (!courseId)
  {
      next({
          message: "Missing parameters.",
          status: 400,
          stack: "Missing parameters.",
      });
      return;
  }

  category.find({courseId: courseId}, (err, foundCategories) => {
      if (err) { next(err); }
      else
      {
          res.send(foundCategories);
      }
  })
}

module.exports = {
  addCategory,
  editCategory,
  deleteCategory,
  getCategories,
};
