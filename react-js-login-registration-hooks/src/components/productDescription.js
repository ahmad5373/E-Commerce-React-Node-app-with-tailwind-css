import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import NavBar from "./Nav";
import ProductService from "../services/product.service";
import axios from "axios";

const ProductDescription = () => {
  const { id } = useParams();
  const [product, SetProducts] = useState([]);
  const navigate = useNavigate();

  // Add item to Cart
  const addToBasket = () => {
    //Get UserID From Local Storage
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const { userId } = user;
      axios("http://localhost:9000/cart/createcart", {
        method: "POST",
        data: {
          userId: userId,
          product_id: id,
          price: product.price,
        },
      });
    } else {
      navigate("/login");
    }
  };
  console.log("price", product.price);

  // fetching products from the server
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    ProductService.GetProductId(id)
      .then((response) => {
        SetProducts(response.data.Data);
      })
      .catch((error) => {});
  }
  return (
    <>
      <header className="sticky top-0 h-fit z-20 bg-gray-100 dark:bg-gray-900">
        <NavBar />
      </header>
      <div className="bg-gray-300">
        {/* getting id parameter and using it to retrieve details of a specific product */}
        {product !== 0 ? (
          <div className="flex grid grid-cols-1 md:grid-cols-2 h-full flex-row justify-evenly p-4 md:p-16 lg:p-20  ">
            <div className="w-full">
              <img
                className="w-full md:w-3/4 h-56"
                src={`/${product.image}`}
                alt=""
              />
            </div>
            <div className="w-5/3 md:w-3/4 mt-6">
              <h1 className="text-4xl font-bold">{product.title}</h1>
              <p className="text-lg mt-4">{product.description}</p>
              <p className="text-3xl mt-8">{"₹" + product.price}</p>
              <div className="flex mt-5 gap-4">
                <button
                  onClick={addToBasket}
                  className="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded "
                >
                  <Link to={"/checkout"}>Buy Now</Link>
                </button>
                <button
                  onClick={addToBasket}
                  className="self-end bg-black hover:bg-white text-white font-semibold hover:text-black py-2 px-4 border border-black hover:border-transparent rounded"
                >
                  <Link to={"/checkout"}>Add to Cart</Link>
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};
export default ProductDescription;
