const ApiOk = (
  req,
  res,
  msg = "Data fetched successfully.",
  status = 200,
  data = {}
) => {
  return res.status(status).send({
    message: msg,
    data,
  });
};

const ApiError = (req, res, msg = "Something went wrong.", status = 400) => {
  return res.status(status).send({
    message: msg,
  });
};

module.exports = { ApiOk, ApiError };
