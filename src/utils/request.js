import axios from "axios";
import store from "@/store";
import { Message } from "element-ui";
import { _cookie } from "./token";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000,
  headers: {
    authorization: `Bearer ${JSON.parse(_cookie.getCookie("user")).token}`,
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
    const res = response.data;
    return res;
  },
  (error) => {
    Message.error(error);
    return Promise.reject(error);
  }
);

export default service;
