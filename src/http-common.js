import axios from "axios";

export default await axios.create({
  baseURL: "https://apiwebservice-eb09.onrender.com/api",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  method: "POST",

});