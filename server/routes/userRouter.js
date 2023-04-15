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

Router.route("/workspace")
  .get(authController.protect, userController.getWorkspace)
  .post(authController.protect, userController.createWorkspace)
  .delete(authController.protect, userController.deleteWorkspace);

Router.route("/workspace/:id")
  .post(authController.protect, userController.addWorkspaceTask)
  .delete(authController.protect, userController.deleteWorkspaceTask)
  .patch(authController.protect, userController.updateWorkspaceTask)
  .put(authController.protect, userController.addWorkspaceMember);

module.exports = Router;
