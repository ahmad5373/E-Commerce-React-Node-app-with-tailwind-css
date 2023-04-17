import axios from "axios";

//Make axios call common
export default axios.create({
  baseURL: "http://localhost:9000/user",
  headers: {
    "Content-type": "application/json",
  },
});
