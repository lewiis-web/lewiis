import request from "@/utils/request";

// 保存访客日志
export function saveVisitorInfo(data) {
	return request({
		url: "/visitorInfo/save",
		method: "post",
		data,
	});
}

// 新增访客日志
export function addVisitorLog(data) {
	return request({
		url: "/visitor/log/add",
		method: "put",
		data,
	});
}
