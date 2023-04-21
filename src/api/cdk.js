import request from "@/utils/request";

/**
 * 兑换cdk
 * @method put
 * @param {string} claimUserId 兑换者id
 * @param {string} cdkCode 每页数量
 * @param {string} cdkId cdk ID
 */
export function exchangeCdk(data) {
	return request({
		url: "/cdk/exchange",
		method: "put",
		data,
	});
}

/**
 * 获取cdk兑换记录
 * @method post
 * @param {number} pageNum 页码
 * @param {number} pageSize 每页数量
 * @param {number} claimUserId 兑换者
 */
export function fetchCdkRecord(data) {
	return request({
		url: "/cdk/record",
		method: "post",
		data,
	});
}
