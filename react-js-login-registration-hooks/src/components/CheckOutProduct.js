import React from "react";
import ProductService from "../services/product.service";

// This is the component that will be used to display the product description of the products in cart
const CheckOutProduct = ({ id, title, image, price, quantity }) => {
  //  Remove Product From Cart
  async function DeleteProduct() {
    ProductService.deletecartproduct(id)
      .then((response) => {
        if (response) {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }
  return (
    <div className="shadow-md mt-2">
      <div className="flex">
        <img className="w-20 h-20" src={image} alt={title} />
        <div className="ml-4 w-2/3">
          <h4 className="text-sm">{title}</h4>
          <p className=" text-sm">₹{price}</p>
          <p className=" text-sm">{quantity}</p>
        </div>
        <div className="flex justify-between">
          <button className="text-sm" onClick={DeleteProduct}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOutProduct;
