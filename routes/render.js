const express = require('express');
const router = express.Router();
const renderController = require('../controllers/render');
const { isAuthenticated } = require('../middlewares/authenticate');

router.get('/', 
    isAuthenticated,
    renderController.getAllRenderData
);

router.get('/:id', 
    isAuthenticated,
    renderController.getRenderById
);

router.post('/', 
    isAuthenticated,
    renderController.createRenderData
);

router.put('/:id',
    isAuthenticated,
    renderController.updateRenderData
);

router.delete('/:id',
    isAuthenticated,
    renderController.deleteRenderData
);

module.exports = router;