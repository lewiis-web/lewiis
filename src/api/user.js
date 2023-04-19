import request from "@/utils/request";

/**
 * 门户登录
 * @method POST
 * @param {string} username 用户名
 * @param {string} password 密码
 */
export function portalLogin(data) {
	return request({
		url: "/portal/login",
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

/**
 * 更新用户积分
 * @method put
 * @param {string} userId 用户id
 * @param {number} operate_type 操作类型(0-减少 1-增加)
 * @param {number} operate_num 操作数量
 */
export function updateIntegral(data) {
	return request({
		url: "/user/integral/update",
		method: "put",
		headers: {
			authorization: `Bearer ${
				sessionStorage.getItem("token") ? sessionStorage.getItem("token") : ""
			}`,
		},
		data,
	});
}

/**
 * 根据id获取用户信息
 * @method get
 * @param {string} userId 用户id
 */
export function fetchUserInfoByUserId(userId) {
	return request({
		url: `/user/info/${userId}`,
		method: "get",
	});
}
