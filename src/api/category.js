import request from "@/utils/request";

/**
 * 获取分类（不分页）
 * @method get
 */
export function fetchCategories(data) {
	return request({
		url: "/category",
		method: "get",
		data,
	});
}
