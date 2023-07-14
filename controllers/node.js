const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const validation = require('../midware/validate');

const getAllNodeData = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('learnResources').collection('nodeJS').find();
    result.toArray().then((node) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(node);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getNodeById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Use a valid id to find the data!');
    }
    const nodeId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('learnResources')
      .collection('nodeJS')
      .find({ _id: nodeId });
    result.toArray().then((node) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(node[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createNodeData = async (req, res) => {
  try {
    const node = {
      title: req.body.title,
      description: req.body.description,
      sources: req.body.sources
    };

    const validationResponse = validation.renderValidation(node);

    if (validationResponse !== true) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validationResponse,
      });
    }

    const response = await mongodb.getDb().db('learnResources').collection('nodeJS').insertOne(node);
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

const updateNodeData = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Use a valid id to update the data!');
    }
    const nodeId = new ObjectId(req.params.id);
    const node = {
      title: req.body.title,
      description: req.body.description,
      source: req.body.source
    };

    const validationResponse = validation.renderValidation(node);

    if (validationResponse !== true) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validationResponse,
      });
    }

    const response = await mongodb
      .getDb()
      .db('learnResources')
      .collection('nodeJS')
      .replaceOne({ _id: nodeId }, node);
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

const deleteNodeData = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Use a valid id to delete the data!');
    }
    const nodeId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db('learnResources')
      .collection('nodeJS')
      .deleteOne({ _id: nodeId });
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
  getAllNodeData,
  getNodeById,
  createNodeData,
  updateNodeData,
  deleteNodeData
};