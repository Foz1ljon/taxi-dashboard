import axios from "axios";

const instance = axios.create({
  baseURL: "http://45.130.148.194:5050/api",
});

export default instance;
