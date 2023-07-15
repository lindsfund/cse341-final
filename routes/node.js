const express = require('express');
const router = express.Router();
const node = require('../controllers/node');
const {isAuthenticated} = require("../midware/authenticate");

router.get('/', node.getAllNodeData);

router.get('/:id', node.getNodeById);

router.post('/', isAuthenticated, node.createNodeData);

router.put('/:id', isAuthenticated, node.updateNodeData);

router.delete('/:id', isAuthenticated, node.deleteNodeData);

module.exports = router;
