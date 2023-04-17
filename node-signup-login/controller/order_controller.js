const express = require("express");
const order = require("../model/order");

//End point for create a new order
exports.createorder = async (req, res, next) => {
  try {
    if (!req.body) {
      res.status(302).send({
        message: "content can not be empty!",
      });

      return;
    }
    //Create a new order
    const commen = {
      productId: req.body.productId,
      productId: req.body.productId,
    };

    // Save order in database
    const dt = await order.create(commen);
    return res.send({ data: dt });
  } catch (error) {
    console.log("error!", error);
    res.status(500).send({
      message: error.message || "some Error occurs while creating order",
    });
  }
};

//Retrieve  all order
exports.getorder = async (req, res, next) => {
  try {
    const data = await order.findAll({});

    res.send({ data });
  } catch (error) {
    console.log("Error", error);
    return res.status(302).send({
      message: "could not get order",
    });
  }
};
