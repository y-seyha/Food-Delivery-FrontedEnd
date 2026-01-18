import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//request intercepter
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

//response intercepter
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem("token");
      console.warn("Unauthorized! Please try again.");
    }

    if (status >= 500) console.error("Server error. Please try again later.");

    if (error.code === "ECONNABORTED")
      console.error("Request timeout. Please check your connection.");

    console.error("API Error", error.response?.data || error.message);

    return Promise.reject(error);
  },
);

export default axiosInstance;
