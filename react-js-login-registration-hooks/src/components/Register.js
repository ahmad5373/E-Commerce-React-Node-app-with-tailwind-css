import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import NavBar from "./Nav";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";

//Validation for Required field
const required = (value) => {
  if (!value) {
    return <div className="text-red-500">This field is required!</div>;
  }
};
//Email formate validation
const validEmail = (value) => {
  if (!isEmail(value)) {
    return <div className="text-red-500">This is not a valid email.</div>;
  }
};
//Password length must be greater than 4 letters
const vpassword = (value) => {
  if (value.length < 4 || value.length > 40) {
    return (
      <div className="text-red-500">
        The password must be between 4 and 40 characters.
      </div>
    );
  }
};
const Register = () => {
  const form = useRef();
  const checkBtn = useRef();
  //Navigate Help to Move Another component If User Successfully Signup
  const navigate = useNavigate();

  // initialize user value
  const initialUserState = {
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };
  //Set States for Login field
  const [User, setUser] = useState(initialUserState);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  //Onchange handler for input field value
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...User, [name]: value });
  };
  //Handling The Form submits
  const handleRegister = (e) => {
    e.preventDefault();
    form.current.validateAll();

    //Check if user created successfully then navigate to profile
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(
        User.first_name,
        User.last_name,
        User.email,
        User.password
      )
        .then((response) => {
          const obj = {
            userId: response.data.data.id,
            email: response.data.data.email,
          };
          // store the user in localStorage
          localStorage.setItem("user", JSON.stringify(obj));
          //navigate to profile page and show user data
          navigate(`/profile/${response.data.data.id}`);
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
              <h1 className="text-xl font-bold leading-tight  text-gray-900 md:text-2xl dark:text-white">
                Create and account
              </h1>
              <Form className="" onSubmit={handleRegister} ref={form}>
                {!successful && (
                  <div>
                    <div>
                      <label
                        className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="first_name"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        placeholder="First_Name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        name="first_name"
                        value={User.first_name}
                        onChange={handleInputChange}
                        validations={[required]}
                      />
                    </div>
                    <div>
                      <label
                        className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="last_name"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        placeholder="Last_Name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                        name="last_name"
                        value={User.last_name}
                        onChange={handleInputChange}
                        validations={[required]}
                      />
                    </div>
                    <div>
                      <label
                        className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="name@company.com"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        name="email"
                        value={User.email}
                        onChange={handleInputChange}
                        validations={[required, validEmail]}
                      />
                    </div>

                    <div>
                      <label
                        className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
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
                        validations={[required, vpassword]}
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
                        Sign Up
                      </button>
                    </div>
                    <p className="mt-4 text-md font-light text-gray-500 dark:text-gray-400">
                      Already have an account?{" "}
                      <Link
                        to={"/login"}
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Login here
                      </Link>
                    </p>
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
export default Register;
