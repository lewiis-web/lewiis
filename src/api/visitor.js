import request from "@/utils/request";

// 保存访客日志
export function saveVisitorInfo(data) {
	return request({
		url: "/visitorInfo/save",
		method: "post",
		data,
	});
}

// 新增访客日志
export function addVisitorLog(data) {
	return request({
		url: "/visitor/log/add",
		method: "put",
		data,
	});
}

/**
 * 添加登录日志
 * @method put
 * @param {string} user_name 用户名
 * @param {string} user_id 用户id
 * @param {string} ip 登录ip
 * @param {string} location 登录地址
 * @param {string} browser 浏览器
 * @param {string} os 操作系统
 * @param {string} login_type 0-门户 1-后台
 */
export const addLoginLog = (data) => {
	return request({
		url: "/login/log/add",
		method: "put",
		data,
	});
};
