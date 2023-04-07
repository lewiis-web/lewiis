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

/**
 * 发表评论
 * @method put
 */
export function publishComment(data) {
	return request({
		url: `/comment/publish`,
		method: "put",
		data,
	});
}

/**
 * 删除自己的评论(更新isDeleted状态)
 * @method put
 */
export function deleteOwnComment(data) {
	return request({
		url: `/comment/own/status/update`,
		method: "put",
		data,
	});
}
