import axios from "axios";


export const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;


const client = axios.create({
    baseURL: API_BASE_URL,
});


client.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error);
        return Promise.reject(error);
    }
);


export default client;