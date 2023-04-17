import React, { useEffect, useState } from "react";
import NavBar from "./Nav";
import Product from "./product";
import ProductService from "../services/product.service";

function Home() {
  const [products, SetProducts] = useState([]);

  // fetching All products from the server and show on home/products page
  useEffect(() => {
    GetallProduct();
  }, []);

  async function GetallProduct() {
    ProductService.GetProducts()
      .then((response) => {
        SetProducts(response.data.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }
  return (
    <>
      <header className="sticky top-0 h-fit z-20 bg-gray-100 dark:bg-gray-900">
        <NavBar />
      </header>
      <div className="bg-gray-300   m-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  px-6 md:px-10 lg:px-20">
        {/* map products with product cards */}
        {products.map((product) => (
          <div
            className=" container flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-center "
            key={product.product_id}
          >
            <Product
              productID={product.product_id}
              title={product.title}
              image={product.image}
              price={product.price}
              rating={product.rating}
            />
          </div>
        ))}
      </div>
    </>
  );
}
export default Home;
