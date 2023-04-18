<template>
	<div id="layout-body">
		<router-view> </router-view>
		<back-top></back-top>
		<el-progress
			v-if="isShowProgress"
			:width="80"
			:stroke-width="8"
			type="circle"
			:percentage="progress"
			color="#d81e06"
			:format="formatInsideText"
			title="个人积分"
		></el-progress>
	</div>
</template>

<script>
import backTop from "@/components/back-top";
import { getCurrentOauthUserInfo } from "@/utils/oauth";
import { updateIntegral, fetchUserInfoByUserId } from "@/api/user";

window.timer = null;

export default {
	name: "layout-body",
	data() {
		return {
			minHeight: 600,
			isFocus: true,
			progress: 0,
			isShowProgress: true,
		};
	},
	components: { backTop },
	created() {
		let sui = getCurrentOauthUserInfo();
		if (sui.id) {
			this.isShowProgress = true;
			clearInterval(window.timer);
			window.onmousemove = () => {
				this.isFocus = true;
			};
			window.onblur = () => {
				this.isFocus = false;
			};
			window.onscroll = () => {
				this.isFocus = true;
			};
			window.timer = setInterval(() => {
				if (this.isFocus) {
					if (this.progress >= 100) {
						this.updateUserIntegral();
						this.isShowProgress = false;
						setTimeout(() => {
							this.isShowProgress = true;
							this.progress = 0;
						}, 0);
					} else {
						this.progress += 1 / 12;
					}
				} else {
					this.progress += 0;
				}
			}, 50);
		} else {
			this.isShowProgress = false;
		}
	},
	methods: {
		formatInsideText(progress) {
			let sui = getCurrentOauthUserInfo();
			return `💰 x ${sui.integral}`;
			// return (progress * 0.6).toFixed(0);
		},
		// 积分+1
		async updateUserIntegral() {
			try {
				let sui = getCurrentOauthUserInfo();
				const res = await updateIntegral({
					userId: sui.id,
					operate_type: 1,
					operate_num: 1,
				});
				if (res.status === 200) {
					this.$notify({
						title: "成功",
						message: "积分+1",
						type: "success",
					});
					this.getUserInfoByUserId();
				} else {
					this.$message.error(res.errors);
				}
			} catch (error) {
				this.$message.error(error);
			}
		},
		// 获取用户信息，更新缓存
		async getUserInfoByUserId() {
			try {
				let sui = getCurrentOauthUserInfo();
				const res = await fetchUserInfoByUserId(sui.id);
				if (res.status === 200) {
					const userInfoStr = JSON.stringify(res.data);
					sessionStorage.setItem("sqlUserInfo", userInfoStr);
				} else {
					this.$message.error(res.errors);
				}
			} catch (error) {
				this.$message.error(error);
			}
		},
	},
};
</script>

<style scoped lang="less">
#layout-body {
	/* header = 80px */
	min-height: -moz-calc(100vh - 80px);
	min-height: -webkit-calc(100vh - 80px);
	min-height: calc(100vh - 80px);
	.el-progress {
		position: fixed;
		right: calc(3rem - 10px);
		bottom: 2rem;
	}
}
</style>
