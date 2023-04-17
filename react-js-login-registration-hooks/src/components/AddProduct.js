import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import NavBar from "./Nav";
import ProductService from "../services/product.service";
import { Link } from "react-router-dom";

const AddProduct = () => {
  const form = useRef();
  const checkBtn = useRef();

  // initialize Product value
  const initialProductState = {
    id: null,
    title: "",
    description: "",
    price: "",
    image: "",
  };
  //Set States for add product field
  const [Product, SetProduct] = useState(initialProductState);
  const [fileData, setFileData] = useState(initialProductState.image);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  //Onchange handler for input field value
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    SetProduct({ ...Product, [name]: value });
  };

  //Onchange handler for only input field value of file
  const handleFileInputChange = (e) => {
    setFileData(e.target.files[0]);
  };

  //Handling The Form submit
  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();

    const formData = new FormData();
    formData.append("title", Product.title);
    formData.append("description", Product.description);
    formData.append("price", Product.price);
    formData.append("image", fileData);
    //Check if Product created successfully
    if (checkBtn.current.context._errors.length === 0) {
      ProductService.AddProduct(formData)
        .then((response) => {
          console.log("Product", response.data);
        })
        .catch((error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setSuccessful(false);
        });
    }
  };
  return (
    <>
      <header className="sticky top-0 h-fit z-20 bg-gray-100 dark:bg-gray-900">
        <NavBar />
      </header>
      <div className="bg-no-repeat	bg-cover bg-center bg-hero-pattern">
        <div className="flex flex-col items-center px-6 py-4 mx-auto lg:py-0">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="mt-2 flex items-center mb-6 rounded-full  w-20 h-20"
          />
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight text-center text-gray-900 md:text-2xl dark:text-white">
                ADD PRODUCT
              </h1>
              <Form className="" onSubmit={handleRegister} ref={form}>
                {!successful && (
                  <div>
                    <div>
                      <label
                        className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="first_name"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        placeholder="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        name="title"
                        value={Product.title}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label
                        className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="last_name"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        id="description"
                        placeholder="description"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                        name="description"
                        value={Product.description}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label
                        className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="email"
                      >
                        Price
                      </label>
                      <input
                        type="text"
                        id="price"
                        placeholder="price"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        name="price"
                        value={Product.price}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label
                        className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="password"
                      >
                        Image
                      </label>
                      <input
                        type="file"
                        id="file"
                        placeholder="image"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        name="image"
                        value={fileData.image}
                        onChange={handleFileInputChange}
                      />
                    </div>

                    <div className="flex items-start mt-4">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          aria-describedby="terms"
                          type="checkbox"
                          className="mt-5 w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                          required=""
                        />
                      </div>
                      <div className="ml-3 text-md">
                        <label
                          htmlFor="terms"
                          className="font-light text-gray-500 dark:text-gray-300"
                        >
                          I accept the{" "}
                          <Link
                            className="font-medium text-blue-700 hover:underline dark:text-blue-500"
                            to={"#"}
                          >
                            Terms and Conditions
                          </Link>
                        </label>
                      </div>
                    </div>
                    <div className="">
                      <button className="md:ml-16 mt-8 w-60 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600">
                        AddProduct
                      </button>
                    </div>
                  </div>
                )}
                {message && (
                  <div>
                    <div
                      className={
                        successful
                          ? "alert alert-success"
                          : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {message}
                    </div>
                  </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddProduct;
