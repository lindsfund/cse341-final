const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('NodeJS');
});

//get all resources
//get one resource
//create new resource
//update resource
//delete resource
module.exports = router;