import request from "@/utils/request";

// 资源列表
export function fetchResource(data) {
	return request({
		url: "/resource",
		method: "post",
		data,
	});
}

// 资源列表（分页）
export function fetchResourceList(data) {
	return request({
		url: "/bms/fetchResourcesList",
		method: "post",
		data,
	});
}

// 添加资源
export function addResource(data) {
	return request({
		url: "/bms/resource/add",
		method: "post",
		data,
	});
}

// 删除资源
export function deleteResource(params) {
	return request({
		url: "/bms/resource/delete",
		method: "delete",
		params: params,
	});
}

// 更新资源
export function updateResource(data) {
	return request({
		url: "/bms/resource/update",
		method: "post",
		data,
	});
}

// 获取资源类别列表
export function fetchResourceType() {
	return request({
		url: "/resource/type",
		method: "get",
	});
}

/**
 * 提交资源申请
 * @method put
 * @param {string} name 资源名称 √
 * @param {string} reply_user_id 资源申请者id √
 * @param {number} resource_type 资源类型 √
 * @param {string} baidu 百度链接
 * @param {string} aliyun 阿里链接
 * @param {string} kuake 夸克链接
 * @param {string} lanzouyun 蓝奏云链接
 * @param {string} tianyiyun 天翼云链接
 * @param {string} website 网址
 */
export function replyResource(data) {
	return request({
		url: "/resource/reply/add",
		method: "put",
		data,
	});
}

/**
 * 获取个人资源共享申请列表
 * @method get
 * @param {string} userId 用户id √
 */
export function fetchPersonalResourceReply(userId) {
	return request({
		url: `/resource/reply/mine/${userId}`,
		method: "get",
	});
}

// 删除个人资源共享申请
export function deletePersonalResourceReply(id) {
	return request({
		url: `/resource/reply/${id}`,
		method: "delete",
	});
}
