const product = require("../model/products");
const fs = require("fs");

exports.create = async (req, res, next) => {
  try {
    if (!req.body) {
      res.status(302).send({
        message: "content cannot be empty!",
      });
      return;
    }
    const imgUrl = req.file.filename.replace(/\\/g, "/");
    const userData = await product.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image: imgUrl,
    });
    return res.status(201).json({
      message: "Product created successfully.",
      Data: userData,
    });
  } catch (error) {
    console.log("error occurs while creating new product", error);
    return res.status(401).json({
      message: "error occurs while creating new product",
      err: error,
    });
  }
};

//Retrieve  all product
exports.getproduct = async (req, res, next) => {
  try {
    const data = await product.findAll({});
    res.send({ data });
  } catch (error) {
    console.log("Error", error);
    return res.status(302).send({
      message: "could not get product",
    });
  }
};

//Get product by specific id
exports.get = async (req, res, next) => {
  try {
    const product_id = req.params.product_id;
    const data = await product.findOne({
      where: { product_id: product_id, deletedAt: null },
    });
    if (data !== null) {
      res.status(200).json({
        Data: data,
      });
      console.log("data", data);
    } else {
      res.status(404).json({
        message: `cannot find product with id=${product_id}.`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(302).json({
      error: error.message,
    });
  }
};

//Update product by id
exports.update = async (req, res, next) => {
  try {
    const product_id = req.params.id;
    const data = await product.update(req.body, {
      where: {
        product_id: product_id,
      },
    });
    if (data !== null) {
      res.status(200).json({
        message: `product has been updated  Successfully with id =${product_id}.`,
      });
    } else {
      res.status(400).json({
        message: `product cannot be updated with id=${product_id}.`,
      });
    }
  } catch (error) {
    res.status(505).json({
      error: error.message,
    });
  }
};

//Delete product by id
exports.delete = async (req, res, next) => {
  try {
    const product_id = req.params.id;
    console.log(req.body);
    const data = await product.destroy({
      where: {
        product_id: product_id,
      },
    });
    if (data !== null) {
      res.status(200).json({
        message: `product has been deleted Successfully with id =${product_id}.`,
      });
    } else {
      res.status(400).json({
        message: `product cannot be deleted with id=${product_id}.`,
      });
    }
  } catch (error) {
    res.status(505).json({
      error: error.message,
    });
  }
};
