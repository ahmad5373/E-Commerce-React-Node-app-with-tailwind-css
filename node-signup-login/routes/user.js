const express = require("express");
const Router = express.Router();
//import user controller
const user_controller = require("../controller/user_controller");

// routes for signup & login
Router.post("/signup", user_controller.createUser);
Router.post("/login", user_controller.login);

//Route for get userData
Router.get("/getUser", user_controller.getUser);
Router.get("/get/:id", user_controller.get);

//Update User With Id
Router.put("/update/:id", user_controller.update);
//Delete User With Id
Router.delete("/delete/:id", user_controller.delete);

Router.get("/logout", user_controller.logout);

module.exports = Router;
