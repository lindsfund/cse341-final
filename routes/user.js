const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const {isAuthenticated} = require("../midware/authenticate");

router.get("/", users.getAllUsers);

router.get("/:id", users.getUserById);

router.post("/", isAuthenticated, users.createUser);

router.put("/:id", isAuthenticated, users.updateUser);

router.delete("/:id", isAuthenticated, users.deleteUser);

module.exports = router;
