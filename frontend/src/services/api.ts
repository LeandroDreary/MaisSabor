import axios from 'axios';
import axiosCookieJarSupport from "axios-cookiejar-support";
import tough from "tough-cookie";

axiosCookieJarSupport(axios);

const cookieJar = new tough.CookieJar();

const api = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        jar: cookieJar,
        withCredentials: true,
});

export const authorization = `bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRyZWFyeUBnbWFpbC5jb20iLCJpYXQiOjE2MjgxNjI2NjQsImV4cCI6MTYzMDc1NDY2NCwic3ViIjoiNjEwN2M2NDRhNzkyNTIyMzYwMmY3NzA3In0.x4BtN8VT48c4BAgved6xW0mOIRm49Q4zd1H6-ci1kyU"||localStorage.getItem("JsonWebToken")}`

export default api