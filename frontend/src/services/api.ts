import axios from 'axios';
import axiosCookieJarSupport from "axios-cookiejar-support";
import tough from "tough-cookie";

axiosCookieJarSupport(axios);

const cookieJar = new tough.CookieJar();

const api = axios.create({
        baseURL: process.env.NODE_ENV !== "production" ? "http://localhost:3333" : process.env.REACT_APP_API_BASE_URL,
        jar: cookieJar,
        withCredentials: true,
});

export const authorization = `bearer ${localStorage.getItem("token")}`

export default api