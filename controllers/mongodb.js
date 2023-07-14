const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const validation = require('../midware/validate');

const getAllMongoDbData = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('learnResources').collection('mongoDB').find();
    result.toArray().then((mongoDb) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(mongoDb);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMongoDbById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Use a valid id to find the data!');
    }
    const mongoDbId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('learnResources')
      .collection('mongoDB')
      .find({ _id: mongoDbId });
    result.toArray().then((mongoDb) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(mongoDb[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createMongoDbData = async (req, res) => {
  try {
    
    const mongoDb = {
      title: req.body.title,
      description: req.body.description,
      sources: req.body.sources
    };

    const validationResponse = validation.renderValidation(mongoDb);

    if (validationResponse !== true) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validationResponse,
      });
    }
    
    const response = await mongodb.getDb().db('learnResources').collection('mongoDB').insertOne(mongoDb);
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

const updateMongoDbData = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Use a valid id to update the data!');
    }
    const mongoDbId = new ObjectId(req.params.id);
    const mongoDb = {
      title: req.body.title,
      description: req.body.description,
      source: req.body.source
    };

    const validationResponse = validation.renderValidation(mongoDb);

    if (validationResponse !== true) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validationResponse,
      });
    }

    const response = await mongodb
      .getDb()
      .db('learnResources')
      .collection('mongoDB')
      .replaceOne({ _id: mongoDbId }, mongoDb);
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

const deleteMongoDbData = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Use a valid id to delete the data!');
    }
    const mongoDbId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db('learnResources')
      .collection('mongoDB')
      .deleteOne({ _id: mongoDbId });
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
  getAllMongoDbData,
  getMongoDbById,
  createMongoDbData,
  updateMongoDbData,
  deleteMongoDbData
};