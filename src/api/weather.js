import request from "@/utils/request";

/**
 * 获取天气信息
 * @method get
 */
export function fetchWeather() {
	return request({
		url: "/weather",
		method: "get",
	});
}
