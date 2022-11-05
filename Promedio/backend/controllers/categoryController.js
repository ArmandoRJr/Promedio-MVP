const category = require("../models/academicCategoryModel");

// backend api controller to update a user's data based on their email
const addCategory = (req, res, next) => {
  let newCategory = new category({
    courseId: req.body.courseId,
    name: req.body.name,
    weight: req.body.weight,
    numAssessments: req.body.numAssessments,
    marks: req.body.marks,
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
  const courseId = req.body.courseId;
  const name = req.body.name;
  const weight = req.body.weight;
  const numAssessments = req.body.numAssessments;
  const marks = req.body.marks;

  category.findByIdAndUpdate(
    categoryId,
    {
      $set: {
        courseId: courseId,
        name: name,
        weight: weight,
        numAssessments: numAssessments,
        marks: marks,
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
