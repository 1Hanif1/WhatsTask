const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const Router = express.Router();

Router.route("/").get(authController.protect, userController.getUserData);

Router.route("/task/list")
  .get(authController.protect, userController.getAllList)
  .post(authController.protect, userController.createList)
  .delete(authController.protect, userController.deleteList);

Router.route("/task/list/:id")
  .get(authController.protect, userController.getList)
  .post(authController.protect, userController.addTask)
  .patch(authController.protect, userController.updateTask)
  .delete(authController.protect, userController.deleteTask);

module.exports = Router;
