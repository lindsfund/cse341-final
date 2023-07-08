const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllRenderData = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('teamProject').collection('render').find();
    result.toArray().then((render) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(render);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRenderById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Use a valid id to find the data!');
    }
    const renderId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('teamProject')
      .collection('render')
      .find({ _id: renderId });
    result.toArray().then((render) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(render[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createRenderData = async (req, res) => {
  try {
    const render = {
      title: req.body.title,
      description: req.body.description,
      sources: req.body.sources
    };

    const response = await mongodb.getDb().db('teamProject').collection('render').insertOne(render);
    if (response.acknowledged) {
      console.log('Created successfully!');
      res.setHeader('Content-Type', 'application/json');
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(response.error || 'An error occurred while creating the trip!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const updateRenderData = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Use a valid id to update the data!');
    }
    const renderId = new ObjectId(req.params.id);
    const render = {
      title: req.body.title,
      description: req.body.description,
      source: req.body.source
    };
    const response = await mongodb
      .getDb()
      .db('teamProject')
      .collection('render')
      .replaceOne({ _id: renderId }, render);
    console.log(response);
    if (response.modifiedCount === 1) {
      console.log('Updated successfully!');
      res.setHeader('Content-Type', 'application/json');
      res.status(204).json(response).send;
    } else {
      res.status(500).json(response.error || 'An error occurred while updating data!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const deleteRenderData = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Use a valid id to delete the data!');
    }
    const renderId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db('teamProject')
      .collection('render')
      .deleteOne({ _id: renderId });
    if (response.deletedCount === 1) {
      console.log('Deleted successfully');
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(response).send;
    } else {
      res.status(500).json(response.error || 'An error occurred while deleting data!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

module.exports = {
  getAllRenderData,
  getRenderById,
  createRenderData,
  updateRenderData,
  deleteRenderData
};
