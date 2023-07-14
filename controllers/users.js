const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const validation = require('../midware/validate');

const getAllUsers = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db("learnResources")
      .collection("users")
      .find();
    result.toArray().then((users) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(users);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid id to find a user");
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("learnResources")
      .collection("users")
      .find({ _id: userId });
    result.toArray().then((users) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(users[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };

    const validationResponse = validation.userValidation(user);

    if (validationResponse !== true) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validationResponse,
      });
    }

    const response = await mongodb
      .getDb()
      .db("learnResources")
      .collection("users")
      .insertOne(user);
    if (response.acknowledged) {
      console.log("Created successfully");
      res.setHeader("Content-Type", "application/json");
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(response.error || "An error occurred while creating the user!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const updateUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid id to update a user");
    }
    const userId = new ObjectId(req.params.id);
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    };

    const validationResponse = validation.userValidation(user);

    if (validationResponse !== true) {
      return res.status(400).json({
        message: "Validation failed!",
        errors: validationResponse,
      });
    }

    const response = await mongodb
      .getDb()
      .db("learnResources")
      .collection("users")
      .replaceOne({ _id: userId }, user);
    console.log(response);
    if (response.modifiedCount === 1) {
      console.log("Updated successfully!");
      res.setHeader("Content-Type", "application/json");
      res.status(204).json(response).send;
    } else {
      res
        .status(500)
        .json(response.error || "An error occurred while updating the user!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid id to delete a user");
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db("learnResources")
      .collection("users")
      .deleteOne({ _id: userId });
    if (response.deletedCount === 1) {
      console.log("Deleted successfully!");
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(response).send;
    } else {
      res
        .status(500)
        .json(response.error || "An error occurred while deleting the user!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
