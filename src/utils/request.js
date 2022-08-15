import axios from "axios";
import { Message } from "element-ui";
import { _cookie } from "./token";

const user = JSON.parse(_cookie.getCookie("user"))

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000,
  headers: {
    authorization: `Bearer ${user ? user.token : ''}`,
  },
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    Message.error(error);
    return Promise.reject(error);
  }
);

export default service;
