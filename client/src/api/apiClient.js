import axios from "axios";
import { getToken } from "../utils/authStorage";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();

    console.log("Token being sent:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;