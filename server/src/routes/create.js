const express = require("express");
const router = express.Router();

const createController = require("../app/controllers/CreateController");

router.post("/", createController.index);

module.exports = router;