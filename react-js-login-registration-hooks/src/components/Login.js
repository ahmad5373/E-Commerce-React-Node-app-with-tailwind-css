import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import NavBar from "./Nav";

// Validation for input fields Value
const required = (value) => {
  if (!value) {
    return <div className="text-red-500">This field is required!</div>;
  }
};
const Login = () => {
  const formRef = useRef();
  const checkBtn = useRef();
  const emailFieldRef = useRef();

  // use EmailRef to focus on email field on login page
  useEffect(() => {
    if (emailFieldRef.current) {
      emailFieldRef.current.focus();
    }
  }, []);

  // initialize user value
  const initialUserState = {
    id: null,
    email: "",
    password: "",
  };
  //Set States for Login field
  const [User, setUser] = useState(initialUserState);
  const [message, setMessage] = useState("");

  // Use Navigate to Move to another Component
  const navigate = useNavigate();

  //Onchange handler for input field value
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...User, [name]: value });
  };

  //Handling login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    formRef.current.validateAll();

    // Check if not error  then login user successfully
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(User.email, User.password)
        .then((response) => {
          setUser(response.data);
          const obj = {
            userId: response.data.id,
            email: response.data.email,
          };
          // store the user in localStorage
          localStorage.setItem("user", JSON.stringify(obj));
          navigate(`/profile/${response.data.id}`);
        })
        .catch((error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          // console.log("ERROR:", resMessage);
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
          <div className="w-1/2 h-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-12">
              <h1 className="text-xl font-bold leading-tight  text-gray-900 md:text-2xl dark:text-white">
                Login
              </h1>
              <Form
                className="text-red-500 font-medium"
                onSubmit={handleLogin}
                ref={formRef}
              >
                <div className="">
                  <label
                    className="block mb-2  text-md font-medium text-gray-900 dark:text-white"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="name@company.com"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    name="email"
                    value={User.email}
                    onChange={handleInputChange}
                    validations={[required]}
                    ref={emailFieldRef}
                  />
                </div>
                <div className="">
                  <label
                    className="block mb-2  text-md font-medium text-gray-900 dark:text-white"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    name="password"
                    value={User.password}
                    onChange={handleInputChange}
                    validations={[required]}
                  />
                </div>
                <div className="">
                  <button
                    type="submit"
                    className="mt-8  md:ml-16 w-60 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600"
                  >
                    Login
                  </button>
                  {message && (
                    <div className="mt-4 items-center">
                      <div className="alert alert-danger" role="alert">
                        {message}
                      </div>
                    </div>
                  )}
                </div>
                <p className="mt-8 text-md font-medium text-gray-500 dark:text-gray-400">
                  Don't Have account create new account
                </p>
                <Link to={"/register"}>
                  <button
                    type="button"
                    className="mt-6 w-30 md:ml-24 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Create new account
                  </button>
                </Link>
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
