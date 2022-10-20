const user = require("../models/user");

// backend api controller to update a user's data based on their email
const userUpdate = (req, res, next) => {
  // user will be found using the email and the things that will be updated are the Name, Password, and GPA
  const id = req.body.id; // if left empty then don't update
  const email = req.body.email; // if left empty then don't update
  const name = req.body.name; // if left empty then don't update

  user.findByIdAndUpdate(
    id,
    { $set: { email: email, name: name } },
    { new: true },
    (err, doc) => {
      if (err) return console.log(err);
      res.json(doc);
    }
  );
};

module.exports = {
  userUpdate,
};
