import request from "@/utils/request";
import axios from "axios";

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
