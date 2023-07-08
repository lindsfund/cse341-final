const express = require('express');
const router = express.Router();

//router.use('/', require('./swagger'));
router.use('/render', require('./render'));
router.use('/mongodb', require('./mongodb'));
router.use('/node', require('./node'));
router.use('/users', require('./users'));

module.exports = router;