const express = require('express');
const router = express.Router();
const nodeController = require('../controllers/node');



//get all resources
router.get('/', nodeController.getAllNodeData);

//get one resource
router.get('/:id', nodeController.getNodeById);

//create new resource
router.post('/', nodeController.createNodeData);

//update resource
router.put('/:id', nodeController.updateNodeData);

//delete resource
router.delete('/:id', nodeController.deleteNodeData);

module.exports = router;