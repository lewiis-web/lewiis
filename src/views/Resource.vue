<template>
	<div class="friend">
		<div class="site-content">
			<section-title>
				<div class="friend-header">
					<div class="title">{{ $t("index.menu.resource") }}</div>
					<div class="apply">
						<el-input
							v-model="queryForm.keyword"
							:placeholder="$t('index.resource.placeholder')"
							class="search_input"
						></el-input>
						<el-button
							type="primary"
							icon="el-icon-search"
							circle
							class="search_btn"
							@click="handleQuery"
						></el-button>
						<el-button
							v-if="isLogin"
							type="success"
							icon="el-icon-share"
							circle
							@click="openReplyModal"
						></el-button>
					</div>
				</div>
			</section-title>
			<!-- 引入类型选择组件 -->
			<type-selection
				:dataSource="resourceTypeList"
				@select="handleSelect"
			></type-selection>

			<div class="statement" v-for="item in list" :key="item.id">
				<quote>
					<p>{{ $t("index.resource.name") }}：{{ item.name }}</p>
					<div style="display: flex; align-items: center">
						<p>
							{{ $t("index.resource.publisher") }}：{{
								item.publisher_info.username
							}}
						</p>
						<el-avatar
							:size="48"
							:src="item.publisher_info.avatar"
							@error="errorHandler"
							style="margin-left: 12px"
						>
							<img
								src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
							/>
						</el-avatar>
					</div>
				</quote>
				<el-tabs type="border-card" class="tabname">
					<el-tab-pane v-if="item.baidu" label="百度网盘">
						<div v-if="computeIsLocked(item.id, 'baidu')">
							{{ item.baidu }}
							<el-button
								type="text"
								icon="el-icon-copy-document"
								@click="handleCopy(item.baidu)"
							></el-button>
						</div>
						<el-link
							v-else
							type="success"
							icon="el-icon-unlock"
							@click="handleUnlock(item.id, 'baidu')"
							:underline="false"
							:disabled="!isLogin"
							>解锁</el-link
						>
					</el-tab-pane>
					<el-tab-pane v-if="item.kuake" label="夸克网盘">
						<div v-if="computeIsLocked(item.id, 'kuake')">
							{{ item.kuake }}
							<el-button
								type="text"
								icon="el-icon-copy-document"
								@click="handleCopy(item.kuake)"
							></el-button>
						</div>
						<el-link
							v-else
							type="success"
							icon="el-icon-unlock"
							@click="handleUnlock(item.id, 'kuake')"
							:underline="false"
							:disabled="!isLogin"
							>解锁</el-link
						>
					</el-tab-pane>
					<el-tab-pane v-if="item.aliyun" label="阿里云盘">
						<div v-if="computeIsLocked(item.id, 'aliyun')">
							{{ item.aliyun }}
							<el-button
								type="text"
								icon="el-icon-copy-document"
								@click="handleCopy(item.aliyun)"
							></el-button>
						</div>
						<el-link
							v-else
							type="success"
							icon="el-icon-unlock"
							@click="handleUnlock(item.id, 'aliyun')"
							:underline="false"
							:disabled="!isLogin"
							>解锁</el-link
						>
					</el-tab-pane>
					<el-tab-pane v-if="item.lanzouyun" label="蓝奏云">
						<div v-if="computeIsLocked(item.id, 'lanzouyun')">
							{{ item.lanzouyun }}
							<el-button
								type="text"
								icon="el-icon-copy-document"
								@click="handleCopy(item.lanzouyun)"
							></el-button>
						</div>
						<el-link
							v-else
							type="success"
							icon="el-icon-unlock"
							@click="handleUnlock(item.id, 'lanzouyun')"
							:underline="false"
							:disabled="!isLogin"
							>解锁</el-link
						>
					</el-tab-pane>
					<el-tab-pane v-if="item.tianyiyun" label="天翼云盘">
						<div v-if="computeIsLocked(item.id, 'tianyiyun')">
							{{ item.tianyiyun }}
							<el-button
								type="text"
								icon="el-icon-copy-document"
								@click="handleCopy(item.tianyiyun)"
							></el-button>
						</div>
						<el-link
							v-else
							type="success"
							icon="el-icon-unlock"
							@click="handleUnlock(item.id, 'tianyiyun')"
							:underline="false"
							:disabled="!isLogin"
							>解锁</el-link
						>
					</el-tab-pane>
					<el-tab-pane v-if="item.website" label="网址">
						<div v-if="computeIsLocked(item.id, 'website')">
							{{ item.website }}
							<el-button
								type="text"
								icon="el-icon-copy-document"
								@click="handleCopy(item.website)"
							></el-button>
						</div>
						<el-link
							v-else
							type="success"
							icon="el-icon-unlock"
							@click="handleUnlock(item.id, 'website')"
							:underline="false"
							:disabled="!isLogin"
							>解锁</el-link
						>
					</el-tab-pane>
				</el-tabs>
				<hr />
			</div>

			<el-pagination
				:current-page="queryForm.pageNum"
				:layout="layout"
				:page-size="queryForm.pageSize"
				:total="total"
				@current-change="handleCurrentChange"
				@size-change="handleSizeChange"
			></el-pagination>
		</div>
		<!-- 资源共享申请 -->
		<el-dialog
			title="资源共享"
			:visible.sync="dialogFormVisible"
			@close="handleBeforeClose"
			:close-on-click-modal="false"
			:destroy-on-close="true"
		>
			<el-form
				:model="dialogForm"
				label-width="100px"
				:rules="dialogRules"
				ref="dialogForm"
			>
				<el-form-item label="资源名称" prop="name">
					<el-input
						v-model="dialogForm.name"
						autocomplete="off"
						maxlength="255"
						show-word-limit
						placeholder="请输入资源名称"
					></el-input>
				</el-form-item>
				<el-form-item label="资源类型" prop="resource_type">
					<el-select
						v-model="dialogForm.resource_type"
						placeholder="请选择资源类型"
					>
						<el-option
							v-for="item in resourceTypeList"
							:key="item.id"
							:label="item.name"
							:value="item.id"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="资源链接">
					<el-checkbox-group v-model="checkList">
						<el-checkbox label="百度网盘"></el-checkbox>
						<el-checkbox label="阿里云盘"></el-checkbox>
						<el-checkbox label="夸克网盘"></el-checkbox>
						<el-checkbox label="蓝奏云盘"></el-checkbox>
						<el-checkbox label="天翼云盘"></el-checkbox>
						<el-checkbox label="网址"></el-checkbox>
					</el-checkbox-group>
					<el-form-item
						label="百度网盘"
						v-if="checkList.indexOf('百度网盘') >= 0"
					>
						<el-input v-model="dialogForm.baidu" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item
						label="阿里云盘"
						v-if="checkList.indexOf('阿里云盘') >= 0"
					>
						<el-input v-model="dialogForm.aliyun" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item
						label="夸克网盘"
						v-if="checkList.indexOf('夸克网盘') >= 0"
					>
						<el-input v-model="dialogForm.kuake" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item
						label="蓝奏云盘"
						v-if="checkList.indexOf('蓝奏云盘') >= 0"
					>
						<el-input
							v-model="dialogForm.lanzouyun"
							autocomplete="off"
						></el-input>
					</el-form-item>
					<el-form-item
						label="天翼云盘"
						v-if="checkList.indexOf('天翼云盘') >= 0"
					>
						<el-input
							v-model="dialogForm.tianyiyun"
							autocomplete="off"
						></el-input>
					</el-form-item>
					<el-form-item label="网址" v-if="checkList.indexOf('网址') >= 0">
						<el-input
							v-model="dialogForm.website"
							autocomplete="off"
						></el-input>
					</el-form-item>
				</el-form-item>
				<el-form-item>
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="submitForm('dialogForm')"
						>确 定</el-button
					>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import sectionTitle from "@/components/section-title";
import Quote from "@/components/quote";
import {
	fetchResource,
	fetchResourceType,
	replyResource,
	fetchPersonalUnlockedResource,
	unlockResource,
} from "@/api/resource";
import { fetchUserInfoByUserId } from "@/api/user";
import TypeSelection from "../components/type-selection.vue";
import { calculateIsLogin, getCurrentOauthUserInfo } from "@/utils/oauth";

export default {
	name: "Friend",
	data() {
		return {
			websiteInfo: {},
			list: [],
			queryForm: {
				pageNum: 1,
				pageSize: 10,
				keyword: "",
				resource_type: "",
			},
			layout: "total, sizes, prev, pager, next, jumper",
			total: 0,
			resourceTypeList: [],
			dialogFormVisible: false,
			dialogForm: {},
			checkList: [],
			dialogRules: {
				name: [{ required: true, message: "请输入资源名称", trigger: "blur" }],
				resource_type: [
					{ required: true, message: "请选择资源类型", trigger: "change" },
				],
			},
			isLogin: false,
			authUserInfo: {},
			personalUnlockedResource: [],
		};
	},
	components: {
		Quote,
		sectionTitle,
		TypeSelection,
	},
	computed: {
		computeIsLocked() {
			return (resourceId, platform) => {
				const index = this.personalUnlockedResource.findIndex((element) => {
					return (
						element.resource_id === resourceId && element.platform === platform
					);
				});
				return index >= 0;
			};
		},
	},
	methods: {
		getWebSiteInfo() {
			this.$store.dispatch("getSiteInfo").then((data) => {
				this.websiteInfo = data;
			});
		},
		// 获取资源列表
		fetchResource() {
			fetchResource(this.queryForm).then((res) => {
				this.list = res.data.list;
				this.total = res.data.total;
			});
		},
		// 获取资源类别列表
		async getResourceType() {
			try {
				const res = await fetchResourceType();
				if (res.code === 200) {
					this.resourceTypeList = res.data.sort((a, b) => {
						return a.id * 1 - b.id * 1;
					});
				} else {
					this.$message.error(res.errors);
				}
			} catch (error) {
				this.$message.error(error);
			}
		},
		handleSizeChange(val) {
			this.queryForm.pageSize = val;
			this.fetchResource();
		},
		handleCurrentChange(val) {
			this.queryForm.pageNum = val;
			this.fetchResource();
		},
		handleQuery() {
			this.queryForm.pageNum = 1;
			this.fetchResource();
		},
		// 复制链接
		handleCopy(content) {
			this.$copyText(content).then(
				(e) => {
					this.$message.success("复制成功！");
				},
				(e) => {
					this.$message.warning("无法复制！");
				}
			);
		},
		// 类型选择器选择事件
		handleSelect(type) {
			if (type >= 0) {
				this.queryForm.resource_type = type;
			} else {
				this.queryForm.resource_type = "";
			}
			this.queryForm.pageNum = 1;
			this.fetchResource();
		},
		errorHandler() {
			return true;
		},
		// 提交资源上传申请
		openReplyModal() {
			this.dialogFormVisible = true;
		},
		handleBeforeClose() {
			this.dialogForm = {};
			this.checkList = [];
		},
		// 提交资源申请表单
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					try {
						this.authUserInfo = getCurrentOauthUserInfo();
						const res = await replyResource({
							...this.dialogForm,
							reply_user_id: this.authUserInfo.id,
						});
						if (res.code === 200) {
							this.$message.success(
								"资源共享申请提交成功！我们将在1-3个工作日内进行审核，感谢您的大力支持！"
							);
							this.dialogFormVisible = false;
						} else {
							this.$message.error(res.errors);
						}
					} catch (error) {
						this.$message.error(error);
					}
				} else {
					return false;
				}
			});
		},
		// 获取个人解锁资源
		async getPersonalUnlockedResource() {
			try {
				this.authUserInfo = getCurrentOauthUserInfo();
				if (this.authUserInfo.id) {
					const res = await fetchPersonalUnlockedResource(this.authUserInfo.id);
					if (res.code === 200) {
						this.personalUnlockedResource = res.data || [];
					} else {
						this.$message.error(res.errors);
					}
				} else {
					this.$message({
						type: "error",
						message: "请登录后查看资源",
					});
				}
			} catch (error) {
				this.$message.error(error);
			}
		},
		// 解锁资源
		handleUnlock(resourceId, platform) {
			try {
				this.$confirm("此操作将永久解锁该资源, 是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "success",
				}).then(async () => {
					this.authUserInfo = getCurrentOauthUserInfo();
					const res = await unlockResource({
						resourceId,
						platform,
						userId: this.authUserInfo.id,
					});
					if (res.code === 200) {
						this.$message.success("资源解锁成功");
						Promise.all([
							this.getPersonalUnlockedResource(),
							this.getUserInfoByUserId(),
						]).then(() => {
							this.fetchResource();
						});
					} else {
						this.$message.error(res.errors);
					}
				});
			} catch (error) {
				this.$message.error(error);
			}
		},
		// 获取用户信息，更新缓存
		async getUserInfoByUserId() {
			try {
				this.authUserInfo = getCurrentOauthUserInfo();
				const res = await fetchUserInfoByUserId(this.authUserInfo.id);
				if (res.code === 200) {
					const userInfoStr = JSON.stringify(res.data);
					sessionStorage.setItem("sqlUserInfo", userInfoStr);
					this.$notify({
						title: `积分 - 20`,
						dangerouslyUseHTMLString: true,
						message: `当前总积分：<span style="color:#d81e06;font-size:16px;font-weight:600">${res.data.integral}</span>`,
						type: "info",
					});
				} else {
					this.$message.error(res.errors);
				}
			} catch (error) {
				this.$message.error(error);
			}
		},
	},
	created() {
		Promise.all([this.getPersonalUnlockedResource()]).then(() => {
			this.fetchResource();
		});
		this.getResourceType();
		this.isLogin = calculateIsLogin();
	},
	mounted() {
		this.getWebSiteInfo();
	},
};
</script>

<style scoped lang="less">
.friend {
	padding-top: 40px;
}

.friend-header {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 80px;
	font-weight: 400;

	.title {
		font-size: 20px;
	}

	.apply {
		.search_input {
			float: left;
			width: 250px;
			:deep(.el-input__inner) {
				border-radius: 20px;
			}
		}

		.search_btn {
			clear: both;
			margin-left: 10px;
		}
	}

	.apply:hover {
		color: #ff6d6d;
	}
}

.el-pagination {
	display: flex;
	justify-content: center;
	margin-bottom: 24px;
}

.statement {
	margin: 30px 0 10px 0;

	a {
		color: #ff6d6d;
	}

	p {
		line-height: 2rem;
	}
}

.tabname {
	margin-top: 10px;

	.el-tab-pane {
		line-height: 1.5em;
	}
}

.state {
	margin: 20px 0 20px 0;

	a {
		color: #ff6d6d;
	}

	p {
		line-height: 2rem;
	}
}

hr {
	margin: 30px 0 0 0;
	border: 0;
	height: 1px;
	background-image: linear-gradient(
		to right,
		rgba(0, 0, 0, 0),
		rgba(255, 109, 109, 0.75),
		rgba(0, 0, 0, 0)
	);
}

.friend-list {
	width: 100%;

	.friend-item {
		display: inline-block;
		width: 30%;
		/*height: 100px;*/
		margin: 0 5% 20px 0;
		padding: 10px 30px;
		border: 1px solid #ececec;
		border-radius: 3px;

		&:hover {
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		}

		&:nth-of-type(3n) {
			margin-right: 0;
		}

		.site-name,
		.site-detail {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			padding-bottom: 10px;
			line-height: 1.5rem;
		}

		.site-name {
			color: #8fd0cc;
			border-bottom: 1px dotted #ececec;
		}

		.site-detail {
			font-size: 13px;
			padding-top: 10px;
		}
	}
}

/*******/
@media (max-width: 800px) {
	.friend-header {
		margin-top: 0;
	}

	.friend-list {
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
	.friend-list {
		.friend-item {
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
</style>
