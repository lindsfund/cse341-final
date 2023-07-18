const mongodb = require('../db/connect');
const bcrypt = require("bcryptjs")
const ObjectId = require('mongodb').ObjectId;
const userModel = require('../models/user');

const getAllUsers = async (req, res, next) => {
  try {
    const result = await userModel.getAll(mongodb);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } 
  catch (err) {
    res.status(500).json({err: err.message || "An error occured while retrieving the users' list."})
  }
 
}

const getSingleUser = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Use a valid user id to find your user.')
    }
    const userId = new ObjectId(req.params.id);
    const result = await userModel.getSingle(mongodb, userId);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } 
  catch (err) {
    res.status(500).json({"err": err.message || 'An error occured while finding your user.'})
  }

};

const createUser = async (req, res, next) => {
  try {
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      gender: req.body.gender,
      birthday: req.body.birthday,
      password: await bcrypt.hashSync(req.body.password, 10),
      city: req.body.city,
      country: req.body.country
    }
    const response = await userModel.createUser(mongodb, newUser);
    if (response.acknowledged) {
      res.status(201).json({"success" : "successful"})
    } else {
      res.status(500).json(
        response.error || 'An error occured while inserting the user.'
      )
    }
  } 
  catch (err) {
    res.status(500).json({err: err.message || 'An error occured while inserting the user.'})
  }
 
  
}

const updateUser = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Use a valid user id to update the user.')
    }
    const userId = new ObjectId(req.params.id)
    let hashedPassword = await bcrypt.hashSync(req.body.password, 10)
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        gender: req.body.gender,
        birthday: req.body.birthday,
        password: hashedPassword,
        city: req.body.city,
        country: req.body.country
    }
    const response = await userModel.updateUser(mongodb, userId, newUser);
    if (response.modifiedCount > 0) {
      res.status(204).send()
    } else {
      res.status(500).json(
        response.error || 'An error occured while updating the user'
      )
    }
  } 
  catch (err) {
    res.status(500).json({err: err.message || 'An error occured while updating the user.'})
  }
 
}


const deleteUser = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Use a valid user id to delete the user.')
    }
    const userId = new ObjectId(req.params.id)
    const response = await userModel.deleteUser(mongodb, userId);
    if (response.deletedCount > 0) {
      res.status(204).json({"success": "The user was deleted successfully"})
    } else {
      res.status(500).json(response.error || 'An error occured when removing the user')
    }
  } 
  catch (err) {
    res.status(500).json({err: err.message || 'An error occured while removing the user.'})
  }
 
}


module.exports = { 
  getAllUsers, 
  getSingleUser, 
  createUser, 
  updateUser, 
  deleteUser
};