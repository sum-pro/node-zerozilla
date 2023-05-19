const express = require("express");
const router = express.Router();
const agency = require("../controllers/agency.controller");
const { isAuth } = require('../middleware/auth');
const { create } = require('../utils/validation/agency.validation');

router.post("/", isAuth, create, agency.create);

module.exports = router;


