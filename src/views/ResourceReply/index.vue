<template>
	<div class="reply">
		<div class="site-content" v-loading="isLoadingData">
			<section-title>
				<div class="reply-header">
					<div class="title">{{ $t("index.resourceReply.title") }}</div>
					<div class="apply" v-if="authUserInfo.username">
						<a @click="openApply"
							><i class="el-icon-share"></i>
							{{ $t("index.resourceReply.apply") }}</a
						>
					</div>
				</div>
			</section-title>
			<el-timeline v-if="resource_reply_list && resource_reply_list.length > 0">
				<el-timeline-item
					v-for="item in resource_reply_list"
					:key="item.id"
					:timestamp="item.reply_time"
					placement="top"
				>
					<el-card>
						<div slot="header" class="clearfix">
							<el-tag
								:type="
									item.reply_status == 0
										? 'info'
										: item.reply_status == 1
										? 'success'
										: 'danger'
								"
								effect="dark"
								size="small"
							>
								{{
									item.reply_status == 0
										? "未审核"
										: item.reply_status == 1
										? "已通过"
										: "已驳回"
								}}
							</el-tag>
							<span
								style="margin-left: 12px"
								v-show="item.reply_status == 2 && item.reject_remark"
								>{{ item.reject_remark }}</span
							>
							<el-link
								style="float: right; padding: 3px 0px"
								type="danger"
								:underline="false"
								@click="handleDelete(item.id)"
								>删除</el-link
							>
						</div>
						<ul class="apply_list">
							<li v-show="item.baidu">
								<img
									src="@/assets/icons/baidu.png"
									style="width: 100px; height: 22px"
									alt="百度网盘"
									title="百度网盘"
								/>
								<p>{{ item.baidu }}</p>
							</li>
							<li v-show="item.kuake">
								<img
									src="@/assets/icons/kuake.png"
									style="width: 100px; height: 18px"
									alt="夸克网盘"
									title="夸克网盘"
								/>
								<p>{{ item.kuake }}</p>
							</li>
							<li v-show="item.aliyun">
								<img
									src="@/assets/icons/aliyun.png"
									style="width: 100px; height: 24px"
									alt="阿里云盘"
									title="阿里云盘"
								/>
								<p>{{ item.aliyun }}</p>
							</li>
							<li v-show="item.lanzouyun">
								<img
									src="@/assets/icons/lanzouyun.png"
									style="width: 100px; height: 22px"
									alt="蓝奏云盘"
									title="蓝奏云盘"
								/>
								<p>{{ item.lanzouyun }}</p>
							</li>
							<li v-show="item.tianyiyun">
								<img
									src="@/assets/icons/tianyiyun.png"
									style="width: 100px; height: 20px"
									alt="天翼云盘"
									title="天翼云盘"
								/>
								<p>{{ item.tianyiyun }}</p>
							</li>
							<li v-show="item.website">
								<h4>网址：</h4>
								<p>{{ item.website }}</p>
							</li>
						</ul>
					</el-card>
				</el-timeline-item>
			</el-timeline>
			<el-empty
				v-else
				:image-size="128"
				:description="$t('index.resourceReply.empty_description')"
			></el-empty>
		</div>
		<!-- 资源共享申请 -->
		<el-dialog
			:title="$t('index.resourceReply.dialogForm.title')"
			:visible.sync="dialogFormVisible"
			@close="handleBeforeClose"
			:close-on-click-modal="false"
			:destroy-on-close="true"
		>
			<el-form
				:model="dialogForm"
				:label-width="$t('index.resourceReply.dialogForm.label_width')"
				:rules="dialogRules"
				ref="dialogForm"
			>
				<el-form-item
					:label="$t('index.resourceReply.dialogForm.name_label')"
					prop="name"
				>
					<el-input
						v-model="dialogForm.name"
						autocomplete="off"
						maxlength="255"
						show-word-limit
						:placeholder="$t('index.resourceReply.dialogForm.name_placeholder')"
					></el-input>
				</el-form-item>
				<el-form-item
					:label="$t('index.resourceReply.dialogForm.type_label')"
					prop="resource_type"
				>
					<el-select
						v-model="dialogForm.resource_type"
						:placeholder="$t('index.resourceReply.dialogForm.type_placeholder')"
						style="width: 100%"
					>
						<el-option
							v-for="item in resourceTypeList"
							:key="item.id"
							:label="item.name"
							:value="item.id"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item :label="$t('index.resourceReply.dialogForm.link_label')">
					<el-checkbox-group v-model="checkList">
						<el-checkbox
							:label="$t('index.resourceReply.dialogForm.baidu')"
						></el-checkbox>
						<el-checkbox
							:label="$t('index.resourceReply.dialogForm.aliyun')"
						></el-checkbox>
						<el-checkbox
							:label="$t('index.resourceReply.dialogForm.kuake')"
						></el-checkbox>
						<el-checkbox
							:label="$t('index.resourceReply.dialogForm.lanzouyun')"
						></el-checkbox>
						<el-checkbox
							:label="$t('index.resourceReply.dialogForm.tianyiyun')"
						></el-checkbox>
						<el-checkbox
							:label="$t('index.resourceReply.dialogForm.website')"
						></el-checkbox>
					</el-checkbox-group>
					<el-form-item
						:label="$t('index.resourceReply.dialogForm.baidu')"
						v-if="
							checkList.indexOf('百度网盘') >= 0 ||
							checkList.indexOf('Baidu Netdisk') >= 0
						"
					>
						<el-input v-model="dialogForm.baidu" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item
						:label="$t('index.resourceReply.dialogForm.aliyun')"
						v-if="
							checkList.indexOf('阿里云盘') >= 0 ||
							checkList.indexOf('aDrive') >= 0
						"
					>
						<el-input v-model="dialogForm.aliyun" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item
						:label="$t('index.resourceReply.dialogForm.kuake')"
						v-if="
							checkList.indexOf('夸克网盘') >= 0 ||
							checkList.indexOf('Quark Cloud Disk') >= 0
						"
					>
						<el-input v-model="dialogForm.kuake" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item
						:label="$t('index.resourceReply.dialogForm.lanzouyun')"
						v-if="
							checkList.indexOf('蓝奏云') >= 0 ||
							checkList.indexOf('Lanzou Cloud') >= 0
						"
					>
						<el-input
							v-model="dialogForm.lanzouyun"
							autocomplete="off"
						></el-input>
					</el-form-item>
					<el-form-item
						:label="$t('index.resourceReply.dialogForm.tianyiyun')"
						v-if="
							checkList.indexOf('天翼云盘') >= 0 ||
							checkList.indexOf('Tianyi Cloud Disk') >= 0
						"
					>
						<el-input
							v-model="dialogForm.tianyiyun"
							autocomplete="off"
						></el-input>
					</el-form-item>
					<el-form-item
						:label="$t('index.resourceReply.dialogForm.website')"
						v-if="
							checkList.indexOf('网址') >= 0 ||
							checkList.indexOf('Website') >= 0
						"
					>
						<el-input
							v-model="dialogForm.website"
							autocomplete="off"
						></el-input>
					</el-form-item>
				</el-form-item>
				<el-form-item>
					<el-button @click="dialogFormVisible = false">{{
						$t("index.resourceReply.dialogForm.cancel")
					}}</el-button>
					<el-button type="primary" @click="submitForm('dialogForm')">{{
						$t("index.resourceReply.dialogForm.confirm")
					}}</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import sectionTitle from "@/components/section-title";
import Quote from "@/components/quote";
import {
	fetchPersonalResourceReply,
	deletePersonalResourceReply,
	fetchResourceType,
	replyResource,
} from "@/api/resource";
import { getCurrentOauthUserInfo } from "@/utils/oauth";
export default {
	name: "Friend",
	data() {
		return {
			resource_reply_list: [],
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
		};
	},
	components: {
		Quote,
		sectionTitle,
	},
	created() {
		this.authUserInfo = getCurrentOauthUserInfo();
		this.getResourceType();
		this.getPersonalResourceReply();
	},
	methods: {
		// 获取个人资源共享申请
		async getPersonalResourceReply() {
			try {
				this.isLoadingData = true;
				const sui = getCurrentOauthUserInfo();
				const res = await fetchPersonalResourceReply(sui.id);
				if (res.code === 200) {
					this.resource_reply_list = res.data || [];
				} else {
					this.$message.error(res.errors);
				}
			} catch (error) {
				this.$message.error(error);
			} finally {
				this.isLoadingData = false;
			}
		},
		// 删除个人资源共享申请
		handleDelete(id) {
			try {
				this.$confirm("此操作将永久删除该资源共享申请, 是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				})
					.then(async () => {
						const res = await deletePersonalResourceReply(id);
						if (res.code === 200) {
							this.$message.success("删除成功！");
							this.getPersonalResourceReply();
						} else {
							this.$message.error(res.errors);
						}
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除操作！",
						});
					});
			} catch (error) {
				this.$message.error(error);
			}
		},
		handleBeforeClose() {
			this.dialogForm = {};
			this.checkList = [];
		},
		openApply() {
			this.dialogFormVisible = true;
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
		// 提交资源申请表单
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					try {
						const res = await replyResource({
							...this.dialogForm,
							reply_user_id: this.authUserInfo.id,
						});
						if (res.code === 200) {
							this.$message.success(
								"资源共享申请提交成功！我们将在1-3个工作日内进行审核，感谢您的大力支持！"
							);
							this.dialogFormVisible = false;
							this.getPersonalResourceReply();
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
			ul.apply_list {
				li {
					margin-top: 12px;
					h4 {
						font-size: 16px;
						font-weight: bold;
					}
					p {
						margin-top: 6px;
					}
				}
			}
		}
	}
}
</style>
