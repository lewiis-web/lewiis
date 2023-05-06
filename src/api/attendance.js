import request from "@/utils/request";

/**
 * 获取指定用户签到记录
 * @method put
 * @param {string} uid 用户id
 */
export function fetchAttendanceRecord(uid) {
	return request({
		url: `/attendance/${uid}`,
		method: "get",
	});
}

/**
 * 签到
 * @method put
 * @param {string} uid 用户id
 */
export function addAttendanceRecord(data) {
	return request({
		url: "/attendance/add",
		method: "put",
		data,
	});
}
