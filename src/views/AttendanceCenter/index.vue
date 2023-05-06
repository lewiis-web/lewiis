<template>
	<div class="reply">
		<div class="site-content">
			<section-title>
				<div class="reply-header">
					<div class="title">{{ $t("index.attendance.title") }}</div>
					<!-- <div class="apply" v-if="authUserInfo.username">
						<a @click="openApply"
							><i class="el-icon-share"></i>
							{{ $t("index.resourceReply.apply") }}</a
						>
					</div> -->
				</div>
			</section-title>
			<el-calendar v-model="value" v-if="isLoadingData">
				<template #dateCell="{ data }">
					<div
						style="width: 100%; height: 100%; display: flex"
						@click="calendarOnClick(data)"
					>
						<div>
							<h1>{{ data.day.split("-").slice(2).join() }}</h1>
						</div>
						<div
							v-show="computeIsAttend(data.day)"
							style="
								display: flex;
								flex-direction: column;
								align-items: center;
								justify-content: center;
							"
						>
							<img src="@/assets/icons/attendance.png" width="24" height="24" />
							<el-tag type="danger" style="margin-top: 8px" size="mini"
								>已签到</el-tag
							>
						</div>
					</div>
				</template>
			</el-calendar>
		</div>
	</div>
</template>

<script>
import sectionTitle from "@/components/section-title";
import Quote from "@/components/quote";
import {
	fetchAttendanceRecord,
	addAttendanceRecord,
} from "@/api/attendance.js";
import { fetchUserInfoByUserId } from "@/api/user";
import { getCurrentOauthUserInfo } from "@/utils/oauth";
import dayjs from "dayjs";
export default {
	name: "Friend",
	data() {
		return {
			attendanceRecord: [],
			checkList: [],
			authUserInfo: {},
			isLoadingData: false,
			resourceTypeList: [],
			value: new Date(),
		};
	},
	components: {
		Quote,
		sectionTitle,
	},
	created() {
		this.authUserInfo = getCurrentOauthUserInfo();
		this.getAttendanceRecord();
	},
	computed: {
		computeIsAttend() {
			return (day) => {
				const obj = this.attendanceRecord.find((item) => {
					return item.create_time.includes(day);
				});
				return obj ? true : false;
			};
		},
	},
	methods: {
		// 获取当前用户签到记录
		async getAttendanceRecord() {
			try {
				const sui = getCurrentOauthUserInfo();
				const res = await fetchAttendanceRecord(sui.id);
				if (res.code === 200) {
					this.isLoadingData = true;
					this.attendanceRecord = res.data || [];
				} else {
					this.$message.error(res.errors);
				}
			} catch (error) {
				this.$message.error(error);
			}
		},
		// 点击日期
		calendarOnClick(data) {
			const today = dayjs().format("YYYY-MM-DD");
			if (today === data.day) {
				this.handleAddAttendanceRecord();
			}
		},
		// 签到
		async handleAddAttendanceRecord() {
			try {
				const sui = getCurrentOauthUserInfo();
				const res = await addAttendanceRecord({
					uid: sui.id,
				});
				if (res.code === 200) {
					this.$message.success("签到成功！");
					this.getAttendanceRecord();
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
				if (res.code === 200) {
					const userInfoStr = JSON.stringify(res.data);
					sessionStorage.setItem("sqlUserInfo", userInfoStr);
					this.$notify({
						title: `积分 + 10`,
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
.reply {
	padding-top: 40px;
}

.reply-header {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 80px;
	font-weight: 400;

	.title {
		font-size: 20px;
	}

	.apply:hover {
		color: #ff6d6d;
	}
}

/*******/
@media (max-width: 800px) {
	.apply {
		display: none;
	}
	.reply-header {
		margin-top: 0;
	}

	.reply-list {
		.friend-item {
			width: 45%;

			&:nth-of-type(2n) {
				margin-right: 0;
			}

			&:nth-of-type(3n) {
				margin-right: 5%;
			}
		}
	}
}

@media (max-width: 600px) {
	.reply-list {
		.reply-item {
			display: block;
			width: 90%;
			margin: 0 auto 20px auto;

			&:nth-of-type(2n) {
				margin-right: auto;
			}

			&:nth-of-type(3n) {
				margin-right: auto;
			}
		}
	}
}

:deep(.el-calendar) {
	.is-today {
		background-color: lavender;
	}
}
</style>
