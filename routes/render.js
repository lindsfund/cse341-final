const express = require('express');
const router = express.Router();
const render = require('../controllers/render');
const {isAuthenticated} = require("../midware/authenticate");

router.get('/', render.getAllRenderData);

router.get('/:id', render.getRenderById);

router.post('/', isAuthenticated, render.createRenderData);

router.put('/:id', isAuthenticated, render.updateRenderData);

router.delete('/:id', isAuthenticated, render.deleteRenderData);

module.exports = router;
