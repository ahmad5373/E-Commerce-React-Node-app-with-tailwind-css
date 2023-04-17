import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductService from "../services/product.service";

const NavBar = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [basket, setbasket] = React.useState([]);

  //Get current Login user from localStorage
  const auth = JSON.parse(localStorage.getItem("user")) || false;
  const { userId } = auth;

  //Check if user not logged in  than navigate to login page
  const CheckCart = () => {
    if (auth) {
      setLoggedIn(true);
    } else {
      navigate("/login");
    }
  };
  React.useEffect(() => {
    if (auth) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    // Get LoggedIn User Cart Item
    const BasketData = async () => {
      ProductService.GetUserCart(userId)
        .then((response) => {
          setbasket(response.data.data);
        })
        .catch((error) => {
          console.log("Error", error);
        });
    };
    BasketData();
  }, []);

  //Logout functionality to  remove user from localStorage
  const logOut = async (e) => {
    e.preventDefault();
    try {
      localStorage.clear();
      setLoggedIn(false);
      // ("Logout successfully");
      navigate("/login");
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <header className=" bg-blue-400 z-10 top-0 sticky">
      <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link className="block text-white no-underline font-sans" to={"/"}>
              <span className="sr-only">Home</span>
              <h1 className="text-3xl font-sans">ShopMart</h1>
            </Link>
          </div>

          <div className={"flex items-center md:gap-8 "}>
            <nav className=" sm-block mr-6" aria-labelledby="header-navigation">
              <h2 className="sr-only" id="header-navigation">
                Header navigation
              </h2>

              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="text-white transition hover:text-gray-500/75 nav-item"
                    to={"/products"}
                  >
                    Products
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="flex items-center gap-2">
              <div className="sm:gap-4 sm:flex">
                <button
                  className="px-5 py-2.5 text-sm font-medium text-white bg-teal-600 rounded-md shadow cursor-pointer"
                  onClick={logOut}
                >
                  {loggedIn === false ? "Login" : "Logout"}
                </button>
              </div>
            </div>
            <button onClick={CheckCart}>
              <Link to="/checkout" className="header__link">
                <div className="relative w-6 h-10">
                  {/* Shopping Basket Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 absolute top-3 right-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  {/* Number of items in the basket */}
                  <span className="bg-red-500 text-xs w-3 text-center rounded-full absolute top-0 right-0">
                    {basket?.length}
                  </span>
                </div>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
