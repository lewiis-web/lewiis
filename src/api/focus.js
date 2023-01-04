import request from "@/utils/request";

/**
 * 获取聚焦列表
 * @method get
 */
export function fetchFocus() {
	return request({
		url: "/focus/list",
		method: "get",
	});
}
