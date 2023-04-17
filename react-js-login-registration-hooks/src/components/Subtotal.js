import React, { useState } from "react";
import ProductService from "../services/product.service";

function Subtotal() {
  const [basket, setbasket] = useState([]);
  //Get UserID From Local Storage
  let user = JSON.parse(localStorage.getItem("user"));
  const { userId } = user;
  //Function to get Cart item against specific user with userID
  React.useEffect(() => {
    async function BasketData() {
      ProductService.GetUserCart(userId)
        .then((response) => {
          setbasket(response.data.data);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
    BasketData();
  }, []);
  <div>
    {basket.map((item) => (
      <div key={item.id}>{item.price}</div>
    ))}
  </div>;

  // Calculate Total Price of All item in user Cart
  const getTotalCost = (item) => {
    return item.reduce(
      (totalPrice, { price: itemPrice }) => totalPrice + parseFloat(itemPrice),
      0
    );
  };
  return (
    <div className="bg-white w-1/3 md:w-2/12 ml-5 px-2 py-3 rounded-md">
      <h1 className="text-3xl font-thin mb-4">Price Details</h1>
      <div className="flex w-full place-content-between">
        <span>Price </span>
        {/* get price of product in Cart */}
        <span>{getTotalCost(basket)} </span>{" "}
      </div>
      <div className="flex w-full place-content-between">
        <span>Discount Price</span>
        {/*Discount of 10% on each product in cart*/}
        <span>{getTotalCost(basket) / 10}</span>{" "}
      </div>
      <div className="flex w-full place-content-between">
        <span>Delivery Charges</span>
        <span>{50}</span>
      </div>
      <hr className="border-gray-400 mt-4" />
      <div className="flex w-full place-content-between">
        <span>Total</span>
        <span>
          {/*get total price of product in Cart  remove discount prize and add delivery charges*/}
          {getTotalCost(basket) - getTotalCost(basket) / 10 + 50}
        </span>
      </div>
    </div>
  );
}
export default Subtotal;
