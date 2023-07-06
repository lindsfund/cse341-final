const express = require('express');
const router = express.Router();

const userRouter = require('./users');
const dbRouter =require('./mongoDB');
const nodeRouter = require('./node');
const renderRouter = require('./render');

router.get('/', (req, res) => {
    res.send('HOMEPAGE')
});

router.use('/users', userRouter);
router.use('/mongoDB', dbRouter);
router.use('/nodeJS', nodeRouter);
router.use('/render', renderRouter);

module.exports = router;