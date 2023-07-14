const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/render', require('./render'));
router.use('/mongoDB', require('./mongoDB'));
router.use('/node', require('./node'));
router.use('/user', require('./user'));

router.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

module.exports = router;