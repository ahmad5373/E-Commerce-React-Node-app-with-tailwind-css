import React, { useState } from "react";
import CheckOutProduct from "./CheckOutProduct";
import NavBar from "./Nav";
import Subtotal from "./Subtotal";
import ProductService from "../services/product.service";

const CheckOut = () => {
  const [ShowModal, SetShowModal] = useState(false);
  const [basket, setbasket] = React.useState([]);
  //Get UserID From Local Storage
  let user = JSON.parse(localStorage.getItem("user"));
  const { userId } = user;

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

  //Call for Place Order
  const PlaceOrder = () => {
    SetShowModal(true);
    ProductService.DeleteCartItem(userId)
      .then((response) => {})
      .catch((error) => {
        console.log("Error", error);
      });
  };
  return (
    <>
      <header className="sticky top-0 h-fit z-20 bg-gray-100 dark:bg-gray-900">
        <NavBar />
      </header>
      <div className="bg-gray-300">
        {ShowModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="flex w-60 relative my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="text-center text-lg border-0 rounded-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-40 w-40 text-green-500 self-center"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h1 className="font-bold">Order Placed Successfully!</h1>
                  <h1>It will be delivered in 5 days</h1>

                  {/*footer*/}
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => SetShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
        <div className="flex flex-row w-full h-full py-10 justify-center">
          <div className="bg-white w-full md:w-1/2 px-2 py-3 rounded-md">
            <div className="px-3">
              {basket?.length === 0 ? (
                <div>
                  <h2 className="text-3xl">Your Shopping Basket is empty</h2>
                  <p>
                    You have no items in your basket. To add items to the
                    basket, click "Add to Basket" next to the item
                  </p>
                </div>
              ) : (
                // display the items in the basket
                <div>
                  <h2 className="text-3xl">Your Cart</h2>
                  {basket.map((product) => (
                    <div key={product.id}>
                      <CheckOutProduct
                        id={product.product.product_id}
                        title={product.product.title}
                        image={product.product.image}
                        price={product.product.price}
                        quantity={product.quantity}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* component for calculating and displaying total price  */}
          <Subtotal />
        </div>
        <button
          onClick={PlaceOrder}
          className="ml-28 md:ml-60 lg:ml-54 bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded"
        >
          PLACE ORDER
        </button>
      </div>
    </>
  );
};

export default CheckOut;
