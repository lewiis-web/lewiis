import request from "@/utils/request";

/**
 * 门户展示评论列表
 * @method get
 */
export function fetchComment(articleId) {
	return request({
		url: `/comment/${articleId}`,
		method: "get",
	});
}

/**
 * 门户点赞/讨厌评论+1(0-讨厌 1-点赞)
 * @method put
 */
export function handleHopComment(data) {
	return request({
		url: `/comment/hop`,
		method: "put",
		data,
	});
}
