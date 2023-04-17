import http from "./http-common";

//Api call for user registration
const register = async (first_name, last_name, email, password) => {
  return http
    .post("/signup", {
      first_name,
      last_name,
      email,
      password,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log("Err", error);
    });
};

//Api call for user Login
const login = async (email, password) => {
  return http
    .post("/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.email) {
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return http.get("/logout").then((response) => {
    return response.data;
  });
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;
