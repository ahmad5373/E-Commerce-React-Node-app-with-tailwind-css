const express = require("express");
const Cart = require("../model/cart");
const Op = require("sequelize").Op;
const product = require("../model/products");
const { ApiOk, ApiError } = require("../utils/resStatus");
const cart = require("../model/cart");

//End point for create a new cart
exports.createcart = async (req, res, next) => {
  try {
    if (!req.body) {
      ApiError(req, res, "content can not be empty!", 302);
      return;
    }
    const { product_id: productId, userId, price } = req.body;
    const defaultQuantity = 1;
    const cartItem = await Cart.findOne({
      where: {
        [Op.and]: [{ productId, userId, deletedAt: null }],
      },
    });
    if (cartItem) {
      // Product already exists in cart, update quantity and price
      const newPrice = cartItem.price + price;
      const newQuantity = cartItem.quantity + 1;
      await cartItem.update({ quantity: newQuantity, price: newPrice });
      ApiOk(req, res, "Cart updated successfully", 201);
    } else {
      // Product doesn't exist in cart, create new CartProduct record
      await Cart.create({
        productId: productId,
        userId: userId,
        quantity: defaultQuantity,
        price: price,
      });
      ApiOk(req, res, "Item inserted successfully", 201);
    }
  } catch (error) {
    console.log("error!", error);
    ApiError(req, res, "some Error occurs while creating cart", error, 400);
  }
};

//Fetch  all cart
exports.getcart = async (req, res, next) => {
  try {
    const data = await Cart.findAll({});
    ApiOk(req, res, "Data fetched successfully.", 201, data);
  } catch (error) {
    console.log("Error", error);
    ApiError(req, res, "could not get cart", 302);
  }
};

//Get all Cart with Product
exports.getcartwith = async (req, res, next) => {
  try {
    const data = await Cart.findAll({
      include: [
        {
          model: product,
        },
      ],
    });
    ApiOk(req, res, "Data fetched successfully.", 201, data);
  } catch (error) {
    console.log("error", error);
    ApiError(req, res, "could not get cart with product ", 302);
  }
};

//Get User Cart by specific id
exports.getcartwithuser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const data = await Cart.findAll({
      include: [
        {
          model: product,
        },
      ],
      where: { userId: userId, deletedAt: null },
    });
    if (data !== null) {
      ApiOk(req, res, "Data fetched successfully.", 201, data);
    } else {
      ApiError(req, res, `cannot find user Cart with id ${userId}.`, 404);
    }
  } catch (error) {
    console.log(error);
    ApiError(req, res, "could not get User cart", 302);
  }
};

//Delete Cart with productId
exports.deleteCartWithId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.params.userId;
    const data = await Cart.destroy({
      where: {
        productId: id,
        userId: userId,
        deletedAt: null,
      },
    });
    if (data !== null) {
      ApiOk(req, res, `cart has been deleted with id ${id}.`, 201, data);
    } else {
      ApiError(req, res, `cart cannot be deleted with id${userId}.`, 404);
    }
  } catch (error) {
    ApiError(req, res, "could not get User cart", 302);
  }
};

//Delete Cart with specific User id
exports.fullDelete = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const data = await Cart.destroy({
      include: [
        {
          model: product,
        },
      ],

      where: { userId: userId, deletedAt: null },
    });
    if (data !== null) {
      ApiOk(req, res, `User Cart has been deleted`, 201, data);
    } else {
      ApiError(req, res, `cannot find user Cart with id ${userId}.`, 404);
    }
  } catch (error) {
    console.log(error);
    ApiError(req, res, "could not get User cart", 302);
  }
};
