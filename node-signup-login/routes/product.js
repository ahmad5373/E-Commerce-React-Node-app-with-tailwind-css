const express = require("express");
const Router = express.Router();
const product_controller = require("../controller/product_controller");
const upload = require("../middleware/middleware");

// routes for create new product
Router.post(
  "/create_product",
  upload.single("image"),
  product_controller.create
);

Router.get("/getproduct", product_controller.getproduct);

Router.get("/get/:product_id", product_controller.get);

Router.put("/update/:id", product_controller.update);

Router.delete("/delete/:id", product_controller.delete);

module.exports = Router;
