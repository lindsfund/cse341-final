const express = require('express');
const router = express.Router();
const mongoDbController = require('../controllers/mongoDb');

router.get('/', mongoDbController.getAllMongoDbData);

router.get('/:id', mongoDbController.getMongoDbById);

router.post('/', mongoDbController.createMongoDbData);

router.put('/:id', mongoDbController.updateMongoDbData);

router.delete('/:id', mongoDbController.deleteMongoDbData);

module.exports = router;