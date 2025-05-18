import axios from "axios";

// Create axios instance with default config
const baseApi = axios.create({
  baseURL: "/", // Base URL for all requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to attach token to every request
baseApi.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    // If token exists, add it to the request headers
    if (token) {
      config.headers["x-fake-header"] = `${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default baseApi;
