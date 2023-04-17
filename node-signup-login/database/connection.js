require("dotenv").config();
const sequelize = require("sequelize");

const connection = new sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);
try {
  connection.authenticate();
  console.log("Database connection establish successfully.");
} catch (error) {
  console.log("Enable to connect with database", error);
}

connection
  .sync({
    logging: console.log,
    force: false,
  })
  .then(() => {
    console.log("Sync to database connection successfully.");
  })
  .catch((error) => {
    console.log("Enable to sync database connection", error);
  });

module.exports = connection;
