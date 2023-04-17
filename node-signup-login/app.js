const express = require("express");
const app = express();
const connection = require("./database/connection");
const user = require("./routes/user");
const product = require("./routes/product");
const order = require("./routes/order");
const cart = require("./routes/cart");
const cors = require("cors");
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const PORT = process.env.PORT || 9000;

app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname,'../vue-signup/public/index.html'))
  res.send("This is test");
});

app.use(cors());
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "secret" }));

// // serving front end Public statics Folder
// app.use(express.static("/../react-js-login-registration-hooks/public"));

app.use(cookieParser());

// app.use(express.json()) use as a middleware
app.use(express.json());

// Using Express middleware
app.use("/user", user);
app.use("/product", product);
app.use("/order", order);
app.use("/cart", cart);

app.listen(PORT, () => {
  console.log(`app is listening on: http://localhost:${PORT}`);
});
