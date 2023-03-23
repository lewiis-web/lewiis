<template>
	<div class="weather-card">
		<p v-if="weatherInfo.location">{{ weatherInfo.location["name"] }}区</p>
		<div class="weather-icon" :title="iconTitle"></div>
		<p v-if="weatherInfo.now">
			{{ weatherInfo.now["temp"] }}℃/{{ weatherInfo.now["rh"] }}%/{{
				weatherInfo.now["wind_dir"]
			}}/{{ weatherInfo.now["wind_class"] }}
		</p>
	</div>
</template>

<script>
import { loadBMap } from "@/utils/location";
import { fetchAreaByLocation, fetchWeather } from "@/api/weather";
import { weatherIcon } from "@/utils/weather";
import {
	AnimatedWeatherIcon,
	AnimatedWeatherTypes,
	AnimatedWeatherTimes,
} from "animated-weather-icon";
import dayjs from "dayjs";
import districtJson from "@/assets/json/district.json";

export default {
	data() {
		return {
			areaInfo: {},
			weatherInfo: {},
			iconTitle: "",
		};
	},
	created() {
		// this.getPos();
		window.initBaiduMapScript = () => {
			this.getPosByBaidu();
		};
		loadBMap("initBaiduMapScript");
	},
	methods: {
		// web API获取经纬度位置信息(只能用于https或本地测试)
		getPos() {
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					const { longitude, latitude } = pos.coords;
					Promise.all([this.getAreaByLocation(longitude, latitude)])
						.then((result) => {
							this.getWeather(
								result[0] &&
									result[0].addressComponent &&
									result[0].addressComponent.adcode
									? result[0].addressComponent.adcode
									: "330212"
							);
						})
						.catch((err) => {
							this.$message.error(err);
						});
				},
				(err) => {
					this.$message.warning("ERROR(" + err.code + "): " + err.message);
				},
				{
					enableHighAccuracy: true,
					timeout: 1000 * 10,
					maximumAge: 0,
				}
			);
		},
		// 百度地图 API获取经纬度位置信息
		getPosByBaidu() {
			const that = this;
			this.$nextTick(function () {
				try {
					const geolocation = new BMap.Geolocation();
					geolocation.getCurrentPosition(function (r) {
						if (this.getStatus() == BMAP_STATUS_SUCCESS) {
							const { district = null } = r.address;
							const districtObj = districtJson.find((item) => {
								return district.indexOf(item.district) >= 0;
							});
							if (districtObj) {
								const districtCode = districtObj.districtcode
									? districtObj.districtcode
									: "330212";
								that.getWeather(districtCode);
							}
						}
					});
				} catch (err) {
					this.$message.error(err);
				}
			});
		},
		// 根据经纬度获取所在区县代码
		async getAreaByLocation(lng, lat) {
			try {
				const res = await fetchAreaByLocation({ lng, lat });
				if (res.status === 0) {
					this.areaInfo = res.result || {};
					return this.areaInfo;
				} else this.$message.error("区域信息异常！");
			} catch (error) {
				this.$message.error(error);
			}
		},
		// 根据区县代码获取天气情况
		async getWeather(district_id) {
			try {
				const ret = await fetchWeather({ district_id });
				if (ret.status === 0) {
					this.weatherInfo = ret.result;
					const renderTarget = document.querySelector(".weather-icon");
					const icon = new AnimatedWeatherIcon(renderTarget);
					this.iconTitle = this.weatherInfo?.now?.text
						? this.weatherInfo.now.text
						: null;
					const exactHour = dayjs().format("HH") * 1;
					const hourType = exactHour < 18 && exactHour >= 6 ? "Day" : "Night";
					icon.setType(
						AnimatedWeatherTypes[weatherIcon(this.iconTitle)],
						AnimatedWeatherTimes[hourType]
					);
				} else this.$message.error("天气信息异常！");
			} catch (error) {
				this.$message.error(error);
			}
		},
	},
};
</script>

<style lang="less" scoped>
.weather-card {
	min-width: 160px;
	height: 50px;
	padding: 0 12px;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	display: flex;
	align-items: center;
	border-radius: 12px;
	.weather-icon {
		width: 36px;
		height: 36px;
		margin: 0 12px;
	}
	:deep(.AnimatedWeatherIcon) {
		line-height: 0;
	}
}
</style>