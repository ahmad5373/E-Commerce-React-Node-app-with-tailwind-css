const user = require("../model/user");
//For Password Hashing
const bcrypt = require("bcrypt");
const { ApiError, ApiOk } = require("../utils/resStatus");

//Create A New User
exports.createUser = async (req, res, next) => {
  try {
    if (!req.body) {
      ApiError(req, res, "content cannot be empty!", 302);
      return;
    }
    const { first_name, last_name, email, password } = req.body;
    await user
      .findOne({ where: { email: email, deletedAt: null } })
      .then(async function (userData) {
        if (userData) {
          ApiError(req, res, "This email is already exist.", 304);
        } else {
          const roleId = "1";
          const userName = first_name + " " + last_name;
          const encryptpassword = await bcrypt.hash(password, 10); //Encrypt password using bcrypt technique
          const data = {
            userName: userName,
            email: email,
            password: encryptpassword,
            roleId: roleId,
          };
          // console.log("data",data)
          const userData = await user.create(data);
          ApiOk(req, res, "User created successfully.", 201, userData);
        }
      });
  } catch (error) {
    console.log("error occur while creating new user", error);
    ApiError(req, res, "error occurs while creating new user", error, 401);
  }
};

// Login User functionality
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("email", email);
  user
    .findOne({ where: { email: email, deletedAt: null } })
    .then(async function (userData) {
      if (!userData) {
        ApiError(req, res, "Invalid Email Address", 401);
      } else {
        response_compare = await bcrypt.compare(password, userData.password);
        if (response_compare) {
          ApiOk(req, res, "Login successfully.", 201, userData);
        } else {
          ApiError(
            req,
            res,
            "Incorrect password please enter valid password",
            401
          );
        }
      }
    });
};

//Get all User
exports.getUser = async (req, res, next) => {
  try {
    const data = await user.findAll({});
    res.send({ data });
  } catch (error) {
    console.log("error", error);
    ApiError(req, res, "could not get user", 401);
  }
};

//Get User With Id
exports.get = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("ID", id);
    const data = await user.findOne({
      where: { id: id, deletedAt: null },
    });
    if (data !== null) {
      ApiOk(req, res, "Data fetched successfully.", 200, data);
    } else {
      ApiError(req, res, `cannot find user with id=${id}.`, 404);
    }
  } catch (error) {
    ApiError(req, res, error.message, 505);
    console.log(error.message);
  }
};

//Update User by id
exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("ID", id);
    const data = await user.update(req.body, {
      where: {
        id: id,
      },
    });
    if (data !== null) {
      ApiOk(req, res, `user updated Successfully with id =${id}.`, 200, data);
    } else {
      ApiError(
        req,
        res,
        `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`,
        302
      );
    }
  } catch (error) {
    ApiError(req, res, error.message, 505);
  }
};

//Delete User by id
exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(req.body);
    const data = await user.destroy({
      where: {
        id: id,
      },
    });
    if (data !== null) {
      ApiOk(req, res, `user has been deleted with id ${id}.`, 200);
    } else {
      ApiError(req, res, `user cannot be deleted with id ${id}.`, 400);
    }
  } catch (error) {
    ApiError(req, res, error.message, 505);
  }
};

//logout current login user
exports.logout = async (req, res) => {
  if (req.user) {
    req.session.destroy();
    res.clearCookie("connect.sid"); // clean up!
    console.log("logout000", req.session);
    console.log("cookie", clearCookie);
    return res.json({ msg: "logging you out" });
  } else {
    return res.json({ msg: "no user to log out!" });
  }
};
