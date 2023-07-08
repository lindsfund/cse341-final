const express = require('express');
const router = express.Router();
const renderController = require('../controllers/render');
//const validation = require('../midware/validate');
//const {requiresAuth} = require('express-openid-connect');
//const {isAuthenticated} = require('../midware/authenticate');

router.get('/', renderController.getAllRenderData);

router.get('/:id', renderController.getRenderById);

router.post('/', renderController.createRenderData);

router.put('/:id', renderController.updateRenderData);

router.delete('/:id', renderController.deleteRenderData);

module.exports = router;
