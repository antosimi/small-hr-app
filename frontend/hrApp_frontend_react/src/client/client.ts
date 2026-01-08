import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * Request Interceptor:
 * Automatically attach the JWT token to every outgoing request.
 */
client.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

/**
 * Response Interceptor:
 * Specifically checking for the TOKEN_EXPIRED_OR_INVALID message.
 */
client.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        // Accessing the custom message sent by your Spring Boot Backend
        const serverMessage = error.response?.data?.message;

        if (status === 401) {
            if (serverMessage === "TOKEN_EXPIRED_OR_INVALID") {
                console.warn("Critical: Token is expired or invalid. Logging out.");
                localStorage.removeItem("token");
                window.location.href = "/"; // Redirect to login
            } else {
                /** * Handle other types of 401 errors here if necessary 
                 * (e.g., wrong username/password during login)
                 */
                console.warn("Unauthorized, but not due to token expiration:", serverMessage);
            }
        } 
        
        else if (status === 403) {
            console.error("Access Forbidden: Insufficient permissions.");
            alert("You don't have the required role to access this resource.");
        }

        return Promise.reject(error);
    }
);

export default client;