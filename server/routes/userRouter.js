const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const Router = express.Router();

Router.route("/").get(authController.protect, userController.getUserData);

module.exports = Router;
