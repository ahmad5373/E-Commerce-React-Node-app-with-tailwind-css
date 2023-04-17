import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserService from "../services/user.service";
import { Link } from "react-router-dom";
import NavBar from "./Nav";

const Update = () => {
  // initialize user value
  const initialUserState = {
    id: null,
    userName: "",
    email: "",
  };
  //set states for Current user
  const [currentUser, setCurrentUser] = useState(initialUserState);
  const [message, setMessage] = useState("");
  //Get ID from url
  const { id } = useParams();
  //Api call  to get user with id whose value will be update
  const getCurrentUser = async () => {
    UserService.getCurrentUser(id)
      .then((response) => {
        setCurrentUser(response.data.data);
      })
      .catch((error) => {
        console.log("Err", error);
      });
  };
  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line
  }, []);

  //Onchange handler for input field value
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };
  //Update user
  const updateUser = () => {
    UserService.update(id, currentUser)
      .then((response) => {
        setMessage("User updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <header className="sticky top-0 h-fit z-20 bg-gray-100 dark:bg-gray-90">
        <NavBar />
      </header>
      <div className="bg-no-repeat	bg-cover bg-center bg-hero-pattern">
        <div className="flex flex-col items-center px-6 py-4 mx-auto md:h-screen lg:py-0">
          <div className="m-auto w-full bg-white rounded-lg shadow dark:border  sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              {currentUser ? (
                <div>
                  <div className="mb-8 text-xl font-bold  text-black-600 md:text-2xl">
                    <h4>{currentUser.userName}</h4>
                  </div>
                  <form>
                    <div className="">
                      <input
                        type="text"
                        className="mb-8 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                        id="username"
                        name="userName"
                        value={currentUser.userName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        id="email"
                        name="email"
                        value={currentUser.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </form>

                  <button
                    type="submit"
                    className="md:ml-16  mt-8 w-60 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={updateUser}
                  >
                    Update
                  </button>
                  <p className="mt-4 text-green-600 font-bold">{message}</p>

                  <Link
                    to={`/profile/${id}`}
                    className="mt-4  font-md text-blue-600"
                  >
                    Back to Your profile
                  </Link>
                </div>
              ) : (
                <div>
                  <br />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Update;
