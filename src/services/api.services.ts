import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://mwdatabase.herokuapp.com",
});

export { axiosInstance };
