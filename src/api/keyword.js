import request from "@/utils/request";

/**
 * 新增关键词搜索
 * @method put
 * @param {string} keyword 关键词
 */
export function addKeyword(data) {
	return request({
		url: `/home/keyword/add`,
		method: "put",
		data,
	});
}
