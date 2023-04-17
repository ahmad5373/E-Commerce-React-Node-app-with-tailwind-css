const sequelize = require("sequelize");
const database = require("../database/connection");
const user = require("./user");
const product = require("./products");

const order = database.define(
  "order",
  {
    id: {
      type: sequelize.BIGINT(),
      primaryKey: true,
      autoIncrement: true,
    },
    // It is possible to add foriegn keys:

    productId: {
      type: sequelize.BIGINT(),

      references: {
        //This is for reference  to another table
        model: "product",

        //This is the coulmn name of referenced table
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
  },

  {
    paranoid: true,
    timestamps: true,
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
    // define the table's name
    tableName: "order",
  }
);

order.belongsTo(product, { foreignKey: "productId" });
product.hasMany(order, { foreignKey: "productId" });

order.belongsTo(user, { foreignKey: "userId" });
user.hasMany(order, { as: "order", foreignKey: "userId" });

module.exports = order;
