const express = require('express');

const router = express.Router();

const { register, profile, login, messages, people, logout } = require("../controllers/auth");

router.post("/register", register);
router.get("/profile", profile);
router.post("/login", login);
router.get("/messages/:userId", messages);
router.get("/people", people);
router.post("/logout", logout);


module.exports = router;