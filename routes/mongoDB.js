const express = require('express');
const router = express.Router();
const mongoDbController = require('../controllers/mongoDb');
const { isAuthenticated } = require('../middlewares/authenticate');

router.get('/',
    isAuthenticated, 
    mongoDbController.getAllMongoDbData
);

router.get('/:id',
    isAuthenticated,
    mongoDbController.getMongoDbById
);

router.post('/', 
    isAuthenticated,
    mongoDbController.createMongoDbData
);

router.put('/:id', 
    isAuthenticated,
    mongoDbController.updateMongoDbData
);

router.delete('/:id', 
    isAuthenticated,
    mongoDbController.deleteMongoDbData
);

module.exports = router;