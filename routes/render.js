const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('RENDER');
});

module.exports = router;