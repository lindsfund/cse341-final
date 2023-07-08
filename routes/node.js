const express = require('express');
const router = express.Router();
const nodeController = require('../controllers/node');

router.get('/', nodeController.getAllNodeData);

router.get('/:id', nodeController.getNodeById);

router.post('/', nodeController.createNodeData);

router.put('/:id', nodeController.updateNodeData);

router.delete('/:id', nodeController.deleteNodeData);

module.exports = router;