import axios from 'axios';
import axiosCookieJarSupport from "axios-cookiejar-support";

axiosCookieJarSupport(axios);

const api = axios.create({
        baseURL: process.env.NODE_ENV !== "production" ? "http://localhost:3333" : process.env.REACT_APP_API_BASE_URL,
        withCredentials: true,
});

export const authorization = `bearer ${localStorage.getItem("token")}`

export default api