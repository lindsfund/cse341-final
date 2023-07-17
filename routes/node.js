const express = require('express');
const router = express.Router();
const nodeController = require('../controllers/node');
const { isAuthenticated } = require('../middlewares/authenticate');

router.get('/', 
    isAuthenticated,
    nodeController.getAllNodeData
);

router.get('/:id',
    isAuthenticated,
    nodeController.getNodeById
);

router.post('/', 
    isAuthenticated,
    nodeController.createNodeData
);

router.put('/:id',
    isAuthenticated,
    nodeController.updateNodeData
);

router.delete('/:id', 
    isAuthenticated,
    nodeController.deleteNodeData
);

module.exports = router;