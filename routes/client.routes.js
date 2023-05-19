const express = require("express");
const router = express.Router();
const client = require("../controllers/client.controller");
const { isAuth } = require('../middleware/auth');
const { update } = require('../utils/validation/client.validation');

router.put("/", isAuth, update, client.update);
router.get("/max-total-bill", isAuth, client.max_total_bill);

module.exports = router;


