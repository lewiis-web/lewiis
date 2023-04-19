<template>
	<div id="layout-body">
		<router-view> </router-view>
		<back-top></back-top>
		<el-progress
			v-if="isShowProgress1"
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
			isShowProgress1: false,
		};
	},
	computed: {
		isShowProgress() {
			return this.$store.state.isShowProgress;
		},
	},
	watch: {
		// 是否显示进度条
		isShowProgress: {
			immediate: true,
			deep: true,
			handler(newVal) {
				clearInterval(window.intervalTimer);
				this.isShowProgress1 = newVal;
				let sui = getCurrentOauthUserInfo();
				if (sui.id) {
					this.$store.dispatch("setProgress", true);
					window.intervalTimer = setInterval(() => {
						if (!window.noAction) {
							if (this.progress >= 100) {
								this.progress = 0;
								this.updateUserIntegral();
							} else {
								this.progress += 100 / 60;
							}
						}
					}, 1000);
				} else {
					this.$store.dispatch("setProgress", false);
				}
			},
		},
	},
	components: { backTop },
	created() {
		clearInterval(window.intervalTimer);
		let sui = getCurrentOauthUserInfo();
		if (sui.id) {
			this.$store.dispatch("setProgress", true);
			window.intervalTimer = setInterval(() => {
				if (!window.noAction) {
					if (this.progress >= 100) {
						this.updateUserIntegral();
						this.progress = 0;
					} else {
						this.progress += 100 / 60;
					}
				}
			}, 1000);
		} else {
			this.$store.dispatch("setProgress", false);
		}
	},
	methods: {
		formatInsideText(progress) {
			let sui = getCurrentOauthUserInfo();
			return `💰 x ${sui.integral}`;
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
					this.$notify({
						title: `积分 + 1`,
						dangerouslyUseHTMLString: true,
						message: `当前总积分：<span style="color:#d81e06;font-size:16px;font-weight:600">${res.data.integral}</span>`,
						type: "success",
					});
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
