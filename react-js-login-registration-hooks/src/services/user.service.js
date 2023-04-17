import http from "./http-common";

//Get Api call to show current user
const getCurrentUser = async (id) => {
  return http
    .get(`/get/${id}`)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log("Err", error);
    });
};
//Get Api call to show all user from database
const getAllUser = async () => {
  return http
    .get("/getUser")
    .then(function (response) {
      // console.log("Response2", response);
      return response;
    })
    .catch(function (error) {
      console.log("Err", error);
    });
};
//Update Api call to update user
const update = async (id, data) => {
  return http
    .put(`/update/${id}`, data)
    .then(function (response) {
      // console.log("Response2", response);
      return response;
    })
    .catch(function (error) {
      console.log("Err", error);
    });
};
//Remove user with Id
const remove = (id) => {
  return http.delete(`/delete/${id}`);
};

const UserService = {
  getCurrentUser,
  getAllUser,
  update,
  remove,
};

export default UserService;
