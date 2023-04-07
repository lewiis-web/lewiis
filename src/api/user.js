import request from "@/utils/request";

/**
 * 登录
 * @method POST
 * @param {string} username 用户名
 * @param {string} password 密码
 */
export function login(data) {
	return request({
		url: "/login",
		method: "post",
		data,
	});
}

// 获取用户列表
export function fetchUserList(data) {
	return request({
		url: "/user/list",
		method: "post",
		data,
	});
}

// 删除用户
export function deleteUser(params) {
	return request({
		url: "/user/delete",
		method: "delete",
		params,
	});
}

/**
 * 添加用户
 * @method POST
 * @param {string} username 用户名 √
 * @param {string} password 密码 √
 * @param {string} rePassword 重新输入密码 √
 * @param {string} avatar 用户头像地址
 * @param {number} user_type 用户类型 0-门户 1-后台 √
 * @param {string} user_platform 用户授权平台 √
 * @param {string} user_page 用户主页地址
 * @param {string} phone 手机号码
 * @param {string} email 邮箱
 */
export function register(data) {
	return request({
		url: "/register",
		method: "post",
		data,
	});
}

/**
 * 根据用户名，授权平台，用户类型确定用户信息
 * @method POST
 * @param {string} username 用户名
 * @param {number} user_type 类型
 * @param {string} user_platform 平台
 */
export function fetchUserInfoByUnpt(data) {
	return request({
		url: "/user/info/check",
		method: "post",
		data,
	});
}
