const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");
const { isAuth } = require('../middleware/auth');
const { signup_validation, login_validation } = require('../utils/validation/user.validation');

router.post("/signup", signup_validation, user.signup);
router.post("/login", login_validation, user.login);
router.post("/logout",isAuth, user.logout);

module.exports = router;


