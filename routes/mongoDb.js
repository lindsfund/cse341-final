const express = require("express");
const router = express.Router();
const mongodb = require("../controllers/mongodb");
const {isAuthenticated} = require("../midware/authenticate");

router.get("/", mongodb.getAllMongoDbData);

router.get("/:id", mongodb.getMongoDbById);

router.post("/", isAuthenticated, mongodb.createMongoDbData);

router.put("/:id", isAuthenticated, mongodb.updateMongoDbData);

router.delete("/:id", isAuthenticated, mongodb.deleteMongoDbData);

module.exports = router;
