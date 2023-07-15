const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')

router.get('/login', authController.authenticateWithGoogle);

router.get('/google/callback', 
    authController.handleGoogleCallback
);

router.get('/logout', (req, res, next) => {
    res.logout()
})
 
const userRouter = require('./user');
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