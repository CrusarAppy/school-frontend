import axios from "axios";
import { getCookie } from "../cookie/cookies";

const axiosInstance = ({ options, token }) => {
  return axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    ...options,
  });
};

export default axiosInstance;
