import express from "express";
import * as authController from "../controllers/authController";

const Router = express.Router();

Router.route("/login").post(authController.loginUser);

Router.route("/register").post(authController.registerUser);

export default Router;
