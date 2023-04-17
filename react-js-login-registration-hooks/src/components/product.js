import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Product({ productID: product_id, title, image, price }) {
  const navigate = useNavigate();

  // Add item to Cart
  const addToBasket = async () => {
    //Get UserID From Local Storage
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const { userId } = user;
      axios("http://localhost:9000/cart/createcart", {
        method: "POST",
        data: {
          userId: userId,
          product_id: product_id,
          price: price,
        },
      });
    } else {
      navigate("/login");
    }
  };

  // Add To Favorite  Axios Call
  const AddToFavorite = () => {
    // axios(`http://localhost:9000/favourites/`, {
    //   method: "POST",
    //   data: {
    //     id: product_id,
    //     title: title,
    //     image: image,
    //     price: price,
    //     rating: rating,
    //   },
    // }).then((res) => {
    //   console.log(res);
    // });
  };

  // PRODUCT CARD - displays product details on home/products page
  return (
    <div className=" hover:cursor-pointer flex flex-col items-center h-80 w-full bg-white m-2 rounded-md">
      <img
        src={image}
        alt=""
        className=" w-full h-64 object-cover mb-3 overflow-hidden"
        onClick={() => navigate(`/products/${product_id}`)}
      />
      <div className="p-2 h-fit mb-7">
        <p>{title}</p>
        <div className="mt-1">
          <div className="flex items-center justify-center bg-green-400 w-10 h-6 text-sm ">
            ₹{price}
          </div>
        </div>
      </div>
      <div className="flex w-full place-content-between px-1">
        <button onClick={AddToFavorite}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button onClick={addToBasket} className="">
          {/* <Link to={"/checkout"}> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {/* </Link> */}
        </button>
      </div>
    </div>
  );
}

export default Product;
