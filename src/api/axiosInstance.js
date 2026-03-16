// Axios is an HTTP client for making API requests.
import axios from "axios";

// Centralized Axios client so all API calls share the same base URL.
// This avoids repeating the host in every request and makes future changes easy.
const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
});

export default axiosInstance;
