const express = require("express");
const router = express.Router();

const todoController = require("../app/controllers/TodoController.js");

router.get("/", todoController.index);
router.post("/create", todoController.create);
router.put("/done", todoController.done);
router.delete("/delete", todoController.delete);

module.exports = router;