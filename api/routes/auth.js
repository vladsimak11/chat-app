const express = require('express');

const router = express.Router();

const { register, profile, login, messages, logout } = require("../controllers/auth");

router.post("/register", register);
router.get("/profile", profile);
router.post("/login", login);
router.get("/messages/:userId", messages);
router.post("/logout", logout);


module.exports = router;