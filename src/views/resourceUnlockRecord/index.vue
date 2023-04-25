<template>
	<div class="reply">
		<div class="site-content" v-loading="isLoadingData">
			<section-title>
				<div class="reply-header">
					<div class="title">{{ $t("index.resourceUnlockRecord.title") }}</div>
				</div>
			</section-title>
			<el-timeline
				v-if="resource_unlock_record && resource_unlock_record.length > 0"
			>
				<el-timeline-item
					v-for="item in resource_unlock_record"
					:key="item.id"
					:timestamp="item.unlock_time"
					placement="top"
				>
					<el-card>
						<div slot="header" class="clearfix">
							<el-tag type="danger" effect="dark" size="small">
								{{
									item.unlocked_resource_info?.resource_type_zh
										? item.unlocked_resource_info.resource_type_zh
										: "-"
								}}
							</el-tag>
						</div>
						<div class="apply_list">
							<h3>{{ computedPlatformZh(item.platform) }}</h3>
							<p>
								{{
									item.unlocked_resource_info?.name
										? item.unlocked_resource_info.name
										: "-"
								}}
							</p>
						</div>
					</el-card>
				</el-timeline-item>
			</el-timeline>
			<el-empty
				v-else
				:image-size="128"
				:description="$t('index.resourceReply.empty_description')"
			></el-empty>
		</div>
		<!-- 分页 -->
		<el-pagination
			style="text-align: center; margin-bottom: 12px"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="searchCondition.pageNum"
			:page-sizes="[5, 10, 20, 50]"
			:page-size="searchCondition.pageSize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="total"
		>
		</el-pagination>
	</div>
</template>

<script>
import sectionTitle from "@/components/section-title";
import Quote from "@/components/quote";
import { fetchUnlockedResourceRecord } from "@/api/resource";
import { getCurrentOauthUserInfo } from "@/utils/oauth";
export default {
	name: "Friend",
	data() {
		return {
			resource_unlock_record: [],
			dialogFormVisible: false,
			dialogForm: {},
			checkList: [],
			dialogRules: {
				name: [{ required: true, message: "请输入资源名称", trigger: "blur" }],
				resource_type: [
					{ required: true, message: "请选择资源类型", trigger: "change" },
				],
			},
			authUserInfo: {},
			isLoadingData: false,
			resourceTypeList: [],
			searchCondition: {
				pageNum: 1,
				pageSize: 10,
			},
			total: 0,
		};
	},
	components: {
		Quote,
		sectionTitle,
	},
	computed: {
		computedPlatformZh() {
			return (platform) => {
				switch (platform) {
					case "aliyun":
						return "阿里云盘";
					case "lanzouyun":
						return "蓝奏云";
					case "tianyiyun":
						return "天翼云盘";
					case "kuake":
						return "夸克网盘";
					case "baidu":
						return "百度网盘";
					case "website":
						return "网址";
					default:
						break;
				}
			};
		},
	},
	created() {
		this.authUserInfo = getCurrentOauthUserInfo();
		this.getUnlockedResourceRecord();
	},
	methods: {
		// 获取个人资源解锁记录
		async getUnlockedResourceRecord() {
			try {
				this.isLoadingData = true;
				const sui = getCurrentOauthUserInfo();
				const res = await fetchUnlockedResourceRecord({
					...this.searchCondition,
					userId: sui.id,
				});
				if (res.code === 200) {
					this.resource_unlock_record = res.data.list || [];
					this.total = res.data.total || 0;
				} else {
					this.$message.error(res.errors);
				}
			} catch (error) {
				this.$message.error(error);
			} finally {
				this.isLoadingData = false;
			}
		},
		handleBeforeClose() {
			this.dialogForm = {};
			this.checkList = [];
		},
		handleSizeChange(val) {
			this.searchCondition.pageNum = 1;
			this.searchCondition.pageSize = val;
			this.getUnlockedResourceRecord();
		},
		handleCurrentChange(val) {
			this.searchCondition.pageNum = val;
			this.getUnlockedResourceRecord();
		},
		clearAllRecords() {
			this.$confirm("此操作将清空所有资源解锁记录, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(() => {
				this.$message({
					type: "success",
					message: "删除成功!",
				});
			});
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

.el-timeline {
	margin-top: 12px;
	.el-timeline-item {
		.el-card {
			.apply_list {
				h3 {
					margin-bottom: 12px;
					font-size: 18px;
					font-weight: bold;
				}
			}
		}
	}
}
</style>
