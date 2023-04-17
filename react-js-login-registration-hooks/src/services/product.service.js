import axios from "axios";

//Get UserID From Local Storage
let user = JSON.parse(localStorage.getItem("user"));
const { userId } = user || {};

//Api call for Add New Product
const AddProduct = async (value) => {
  return axios
    .post("http://localhost:9000/product/create_product", value)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log("Err", error);
    });
};

//Api call for Add To Basket item
// const addToBasket = async (userId, product_id) => {
//   return axios
//     .get(`http://localhost:9000/cart/createcart/${userId}/${product_id}`)
//     .then(function (response) {
//       return response;
//     })
//     .catch(function (error) {
//       console.log("Err", error);
//     });
// };

//Get Api call to Retrieve All Product
const GetProducts = async () => {
  return axios
    .get("http://localhost:9000/product/getproduct")
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log("Err", error);
    });
};

//Get Api call to show  product With Id
const GetProductId = async (product_id) => {
  return axios
    .get(`http://localhost:9000/product/get/${product_id}`)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log("Err", error);
    });
};

//Get Api call to Retrieve All Item in cart
const GetCart = async () => {
  return axios
    .get("http://localhost:9000/cart/getcart")
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log("Err", error);
    });
};
//Get Api call to Retrieve  product detail
const GetCartProduct = async () => {
  return axios
    .get("http://localhost:9000/cart/getcartwith")
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log("Err", error);
    });
};

// get Cart item with specific UserId
const GetUserCart = async () => {
  return axios
    .get(`http://localhost:9000/cart/getcartwithuser/${userId}`)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log("Err", error);
    });
};
// Delete Cart item with specific UserId
const DeleteCartItem = async () => {
  return axios
    .delete(`http://localhost:9000/cart/deletecartwithuser/${userId}`)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log("Err", error);
    });
};

// Delete Cart item with specific Id
const deletecartproduct = async (id) => {
  return axios
    .delete(`http://localhost:9000/cart/delete/${userId}/product/${id}`)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log("Err", error);
    });
};

//Api call for Order item in cart
const OrderPlace = async (value) => {
  return axios
    .post("http://localhost:9000/order/createorder", value)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log("Err", error);
    });
};

const ProductService = {
  AddProduct,
  // addToBasket,
  GetProducts,
  GetProductId,
  GetCart,
  GetCartProduct,
  GetUserCart,
  DeleteCartItem,
  deletecartproduct,
  OrderPlace,
};

export default ProductService;
