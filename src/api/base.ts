import axios from "axios";

// const API_BASE_URL = "https://social-dc1i.onrender.com/api/v1";

const API_BASE_URL = import.meta.env.VITE_URL || "http://localhost:5000/api/v1";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
