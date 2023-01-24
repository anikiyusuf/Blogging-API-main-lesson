const express = require("express");
const authController = require("../Controllers/auth.controller");

const authRouter = express.Router();

authRouter.get("/signup", authController.renderSignUp);

authRouter.get("/login", authController.renderLogIn);

authRouter.get("/logout", authController.logOut);

authRouter.post("/signup", authController.signUp);

authRouter.post("/login", authController.logIn);

module.exports = authRouter;
