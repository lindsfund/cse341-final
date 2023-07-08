const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/render', require('./render'));

module.exports = router;