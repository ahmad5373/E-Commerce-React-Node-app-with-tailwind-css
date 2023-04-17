const multer = require("multer");
const path = require("path");
require("dotenv").config();

//Upload single file

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.PUBLIC_URL);
  },
  filename: (req, file, cb) => {
    // console.log("req,file", req.file);

    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload_image = multer({
  storage: fileStorageEngine,
  limits: {
    fileSize: 10000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error("Only Png / Jpg /Jpeg format is accepted"));
    }
    cb(undefined, true);
  },
});

module.exports = upload_image;
