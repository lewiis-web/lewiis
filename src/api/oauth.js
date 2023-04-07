import request from "@/utils/request";

/**
 * @method get
 * @param {*} data
 */
export function fetchOauthUserInfoByGitee(code) {
	return request({
		url: `/oauth/gitee/user/info?code=${code}`,
		method: "get",
	});
}
