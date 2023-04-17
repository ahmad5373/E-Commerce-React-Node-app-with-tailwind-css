const sequelize = require("sequelize");
const database = require("../database/connection");
const user = require("./user");
const product = require("./products");

const cart = database.define(
  "cart",
  {
    id: {
      type: sequelize.BIGINT(),
      primaryKey: true,
      autoIncrement: true,
    },
    // It is possible to add foreign keys:

    productId: {
      type: sequelize.BIGINT(),

      references: {
        //This is for reference  to another table
        model: "product",

        //This is the column name of referenced table
        key: "product_id",
      },
    },

    userId: {
      type: sequelize.BIGINT(),
      references: {
        model: "user",
        key: "id",
      },
    },

    quantity: {
      type: sequelize.INTEGER(),
      allowNull: false,
    },

    price: {
      type: sequelize.FLOAT(),
      allowNull: false,
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
    tableName: "cart",
  }
);

cart.belongsTo(product, { foreignKey: "productId" });
product.hasMany(cart, { foreignKey: "productId" });

cart.belongsTo(user, { foreignKey: "userId" });
user.hasOne(cart, { as: "cart", foreignKey: "userId" });

module.exports = cart;
