const express = require("express");
const router = express.Router();
const authenticate = require("../controllers/authenticate");

router.get("/", authenticate.loginLogout);

module.exports = router;
