import request from "@/utils/request";

/**
 * gitee获取用户信息
 * @method get
 * @param {string} code 返回的code
 */
export function fetchOauthUserInfoByGitee(code) {
	return request({
		url: `/oauth/gitee/user/info?code=${code}`,
		method: "get",
	});
}

/**
 * gitee_test获取用户信息
 * @method get
 * @param {string} code 返回的code
 */
export function fetchOauthUserInfoByGiteeTest(code) {
	return request({
		url: `/oauth/gitee_test/user/info?code=${code}`,
		method: "get",
	});
}

/**
 * github获取用户信息
 * @method get
 * @param {string} code 返回的code
 */
export function fetchOauthUserInfoByGithub(code) {
	return request({
		url: `/oauth/github/user/info?code=${code}`,
		method: "get",
	});
}

/**
 * HUAWEI获取用户信息
 * @method post
 * @param {string} code 返回的code
 */
export function fetchOauthUserInfoByHuawei(data) {
	return request({
		url: `/oauth/huawei/user/info`,
		method: "post",
		data,
	});
}

/**
 * 百度获取用户信息
 * @method post
 * @param {string} code 返回的code
 */
export function fetchOauthUserInfoByBaidu(data) {
	return request({
		url: `/oauth/baidu/user/info`,
		method: "post",
		data,
	});
}

/**
 * 微博获取用户信息
 * @method get
 * @param {string} code 返回的code
 */
export function fetchOauthUserInfoByWeibo(code) {
	return request({
		url: `/oauth/weibo/user/info?code=${code}`,
		method: "get",
	});
}
