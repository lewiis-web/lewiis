<template>
	<div class="weather-card">
		<div class="title">
			<p class="area">宁波市 鄞州区</p>
			<p class="brand">百度天气</p>
		</div>
		<div class="now">
			<div class="main">
				<div class="itt">
					<div class="icon">
						<skycon style="" condition="clear-day" size="48" />
					</div>
					<div class="tt">
						<p class="temp">16°</p>
						<p class="text">晴</p>
					</div>
				</div>
				<div class="rhw"></div>
			</div>
			<p class="time">2023-02-17 16:59:30</p>
		</div>
		<div class="forecasts">
			<div class="left">
				<p>今天</p>
				<skycon style="margin-top: 13px" condition="clear-day" size="24" />
				<p>5℃/16℃</p>
			</div>
			<div class="center">
				<p>明天</p>
				<skycon style="margin-top: 13px" condition="clear-day" size="24" />
				<p>5℃/16℃</p>
			</div>
			<div class="right">
				<p>后天</p>
				<skycon style="margin-top: 13px" condition="clear-day" size="24" />
				<p>5℃/16℃</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.weather-card {
	width: 230px;
	height: 270px;
	padding: 12px;
	.title {
		display: flex;
		justify-content: space-between;
		.area {
			font-size: 16px;
			font-weight: 600;
		}
		.brand {
			font-size: 14px;
		}
	}
	.now {
		width: 100%;
		height: 100px;
		.main {
			width: 100%;
			height: 60px;
			display: flex;
			justify-content: space-between;
			.itt {
				width: 50%;
				display: flex;
				justify-content: space-between;
				.icon {
					width: 50%;
					display: flex;
					justify-self: center;
					align-items: center;
				}
				.tt {
					.temp {
						font-size: 24px;
						font-weight: 600;
					}
					.text {
						font-size: 14px;
					}
				}
			}
			.rhw {
			}
		}
	}
}
</style>