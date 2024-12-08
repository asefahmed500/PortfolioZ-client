import axios from "axios";

// Create a single Axios instance
const axiosPublic = axios.create({
  baseURL: "https://portfolioz-server.onrender.com",
  headers: {
    "Content-Type": "application/json", // Ensure JSON content-type for POST requests
  },
});

// Add interceptors once
axiosPublic.interceptors.request.use((request) => {
  console.log("Starting Request", request);
  return request;
});

// Handle response and errors
axiosPublic.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    console.error("Error in response:", error);
    return Promise.reject(error);
  }
);

const useAxiosPublic = () => axiosPublic; // Reuse the same Axios instance

export default useAxiosPublic;
