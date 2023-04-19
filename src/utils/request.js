import axios from "axios";

// create an axios instance
const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	// baseURL: process.env.VUE_APP_BASE_HTTPS_API,
	timeout: 30 * 1000,
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
		return Promise.reject(error);
	}
);

export default service;
