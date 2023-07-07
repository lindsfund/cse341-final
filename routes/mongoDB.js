const express = require('express');
const router = express.Router();
const Mongodb = require('../models/mongodb');


router.get('/', (req, res) => {
    res.send('MongoDB');
});

//get all resources
router.get('/all', async (req, res) => {
    try {
        const resources = await Mongodb.find();
        res.json(resources);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//get one resource
router.get('/:id', getResourceById, (req, res) => {
    res.send(res.resource);
});

//create new resource
router.post('/', async (req, res) => {
    const resource = new Mongodb({
        title: req.body.title,
        description: req.body.description,
        source: req.body.source
    })

    try {
        const newResource = await resource.save();
        res.status(201).json(newResource);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
   
});

//update resource
router.patch('/:id', getResourceById, async (req, res) => {
    if (req.body.title != null){
        res.resource.title = req.body.title;
    }
    if (req.body.description != null){
        res.resource.description = req.body.description;
    }
    if (req.body.source != null){
        res.resource.source = req.body.source;
    }
    try {
        const updatedResource = await res.resource.save();
        res.json(updatedResource);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

//delete resource
router.delete('/:id', getResourceById, async (req, res) => {
   try {
    await res.resource.deleteOne();
    res.json({message:'Deleted Resource'})
   } catch (error) {
    res.status(500).json({message: error.message});
   }
});

async function getResourceById(req, res, next){
   
    let resource;
    
    try {
        resource = await Mongodb.findById(req.params.id);
        if (resource == null) {
            return res.status(404).json({message:'Cannot find Resource'});
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    res.resource = resource;
    next();
}

module.exports = router;