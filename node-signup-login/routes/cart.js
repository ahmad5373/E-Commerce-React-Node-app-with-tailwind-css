const express = require("express");
const Router = express.Router();

const cart_controller = require("../controller/cart_controller");

//Create  New order
Router.post("/createcart", cart_controller.createcart);
// Retrieve all cart item
Router.get("/getcart", cart_controller.getcart);

Router.get("/getcartwith", cart_controller.getcartwith);

Router.get("/getcartwithuser/:userId", cart_controller.getcartwithuser);
// delete Cart with Id
Router.delete("/delete/:userId/product/:id", cart_controller.deleteCartWithId);
Router.delete("/deletecartwithuser/:userId", cart_controller.fullDelete);

module.exports = Router;
