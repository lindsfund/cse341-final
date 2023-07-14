const express = require('express');
const router = express.Router();
const mongoDbController = require('../controllers/mongoDb');

//get all resources
router.get('/', mongoDbController.getAllMongoDbData);

//get one resource
router.get('/:id', mongoDbController.getMongoDbById);

//create new resource
router.post('/', mongoDbController.createMongoDbData);

//update resource
router.put('/:id', mongoDbController.updateMongoDbData);

//delete resource
router.delete('/:id', mongoDbController.deleteMongoDbData);

module.exports = router;