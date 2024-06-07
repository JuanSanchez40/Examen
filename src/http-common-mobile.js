import axios from "axios";

export default axios.create({
  baseURL: "https://apinotification.onrender.com/api",
  headers: {
    "Content-type": "application/json"
  }
});