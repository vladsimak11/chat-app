const express = require('express');

const router = express.Router();

const { register, profile, login, logout } = require("../controllers/auth");

router.post("/register", register);
router.get("/profile", profile);
router.post("/login", login);
router.post("/logout", logout);


module.exports = router;