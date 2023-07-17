const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')
const userRouter = require('./user');
const dbRouter =require('./mongoDB');
const nodeRouter = require('./node');
const renderRouter = require('./render');

router.get('/login', authController.authenticateWithGoogle);

router.get('/google/callback', 
    authController.handleGoogleCallback
);

router.post('/login',
    authController.handleLocalAuthentication
)

router.get('/logout', (req, res, next) => {
    res.clearCookie('jwt')
    delete res.locals.user
    delete res.locals.loggedin
    res.redirect('/')
})

router.get('/', (req, res) => {
    if (res.locals.loggedin) {
        res.send(`Logged in as ${res.locals.user.firstName}.`);
    } else {
        res.send('Logged out.');
    }
});

router.use('/users', userRouter);
router.use('/mongoDB', dbRouter);
router.use('/nodeJS', nodeRouter);
router.use('/render', renderRouter);

module.exports = router;