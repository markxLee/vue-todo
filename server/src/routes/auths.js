const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/auth.js")

const authController = require("../app/controllers/AuthController.js");

router.get('/test', (req, res) => {
    res.send('test ok');
})
router.post("/login", authController.login);
router.post("/token", authController.token);
router.delete("/logout", verifyToken, authController.logout);

module.exports = router;