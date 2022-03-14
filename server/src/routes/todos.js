const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/auth")

const todoController = require("../app/controllers/TodoController.js");

router.get("/", verifyToken, todoController.index);
router.post("/create", todoController.create);
router.put("/done", todoController.done);
router.put("/check", todoController.check);
router.put("/pin", todoController.pin);
router.delete("/delete", todoController.delete);

module.exports = router;