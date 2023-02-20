import request from "@/utils/request";

/**
 * 获取天气信息
 * @param {string} district_id 区县代码
 * @method get
 */
export function fetchWeather(params) {
	return request({
		url: "/weather",
		method: "get",
		params,
	});
}

/**
 * 根据经纬度获取所在区域
 * @param {string} location 经纬度 'lng,lat'
 * @method get
 */
export function fetchAreaByLocation(params) {
	return request({
		url: "/area",
		method: "get",
		params,
	});
}
