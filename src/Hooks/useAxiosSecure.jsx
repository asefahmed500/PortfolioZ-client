import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: "https://portfolio-z-server.vercel.app"
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    // Request interceptor to add token to headers
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.error("Token not found in localStorage.");
            navigate('/login');  // Redirect user to login page if token is missing
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    // Response interceptor to handle 401 and 403 errors
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
            // Handle unauthorized error: Log out the user and redirect to login
            await logout();
            navigate('/login');
        } else {
            // Handle other error statuses (optional)
            console.error("Error response:", error.response);
        }
        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;
