const express = require('express');
const router = express.Router();
const node = require('../models/node');

router.get('/', (req, res) => {
    res.send('NodeJS');
});

//get all resources
router.get('/all', (req, res) => {
    
});

//get one resource
router.get('/:id', (req, res) => {
   
});

//create new resource
router.post('/', (req, res) => {
    
});

//update resource
router.get('/:id', (req, res) => {
    
});

//delete resource
router.get('/:id', (req, res) => {
    
});
module.exports = router;