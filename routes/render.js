const express = require('express');
const router = express.Router();
const renderController = require('../controllers/render');
//const validation = require('../midware/validate');
//const {requiresAuth} = require('express-openid-connect');
//const {isAuthenticated} = require('../midware/authenticate');

router.get('/', renderController.getAllRenderData);

router.get('/:id', renderController.getRenderById);

router.post('/', requiresAuth(), isAuthenticated, validation.saveRender, renderController.createRenderData);

router.put('/:id', requiresAuth(), isAuthenticated, validation.saveRender, renderController.updateRenderData);

router.delete('/:id', requiresAuth(), isAuthenticated, renderController.deleteRenderData);

module.exports = router;
