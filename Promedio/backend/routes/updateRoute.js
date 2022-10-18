const express = require("express");
const router = express.Router();
const UpdateController = require("../controllers/updateController");
router.post("/update", UpdateController.userUpdate);
module.exports = router;
