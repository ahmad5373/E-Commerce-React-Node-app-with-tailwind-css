const sequelize = require("sequelize");
const database = require("../database/connection");

const product = database.define(
  "product",
  {
    product_id: {
      type: sequelize.BIGINT(255),
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: sequelize.STRING(255),
      defaultValue: null, // or whatever you would like
    },
    description: {
      type: sequelize.STRING(255),
    },

    price: {
      type: sequelize.BIGINT(25),
    },
    image: {
      type: sequelize.STRING(255),
    },
  },

  {
    paranoid: true,
    timestamps: true,
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
    // define the table's name
    tableName: "product",
  }
);
module.exports = product;
