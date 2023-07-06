const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('MongoDB');
});

//get all resources
//get one resource
router.get('/:id', (req, res) => {
    res.send('MongoDB');
});

//create new resource
router.post('/', (req, res) => {
    
});

//update resource
router.put('/:id', (req, res) => {
    
});

//delete resource
router.delete('/:id', (req, res) => {
    
});
module.exports = router;