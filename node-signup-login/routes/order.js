const express = require("express");
const Router = express.Router();

//Import order controller
const order_controller = require("../controller/order_controller");

//Create  New order
Router.post("/createorder", order_controller.createorder);

//Getting All order
Router.get("/getorder", order_controller.getorder);

module.exports = Router;
