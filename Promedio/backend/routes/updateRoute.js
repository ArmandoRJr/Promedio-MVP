const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/updateController");

router.post("/update", AuthController.update);

module.exports = router;
