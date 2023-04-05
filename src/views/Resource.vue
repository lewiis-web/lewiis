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
							icon="el-icon-search"
							circle
							class="search_btn"
							@click="handleQuery"
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
				</quote>
				<el-tabs type="border-card" class="tabname">
					<el-tab-pane v-if="item.baidu" label="百度网盘">
						{{ item.baidu }}
						<el-button
							type="text"
							icon="el-icon-copy-document"
							@click="handleCopy(item.baidu)"
						></el-button>
					</el-tab-pane>
					<el-tab-pane v-if="item.kuake" label="夸克网盘"
						>{{ item.kuake }}
						<el-button
							type="text"
							icon="el-icon-copy-document"
							@click="handleCopy(item.kuake)"
						></el-button>
					</el-tab-pane>
					<el-tab-pane v-if="item.aliyun" label="阿里云盘"
						>{{ item.aliyun }}
						<el-button
							type="text"
							icon="el-icon-copy-document"
							@click="handleCopy(item.aliyun)"
						></el-button
					></el-tab-pane>
					<el-tab-pane v-if="item.lanzouyun" label="蓝奏云"
						>{{ item.lanzouyun }}
						<el-button
							type="text"
							icon="el-icon-copy-document"
							@click="handleCopy(item.lanzouyun)"
						></el-button
					></el-tab-pane>
					<el-tab-pane v-if="item.tianyiyun" label="天翼云盘"
						>{{ item.tianyiyun }}
						<el-button
							type="text"
							icon="el-icon-copy-document"
							@click="handleCopy(item.tianyiyun)"
						></el-button
					></el-tab-pane>
					<el-tab-pane v-if="item.website" label="网址"
						>{{ item.website }}
						<el-button
							type="text"
							icon="el-icon-copy-document"
							@click="handleCopy(item.website)"
						></el-button
					></el-tab-pane>
				</el-tabs>
				<hr />
			</div>

			<el-pagination
				background
				:current-page="queryForm.pageNum"
				:layout="layout"
				:page-size="queryForm.pageSize"
				:total="total"
				@current-change="handleCurrentChange"
				@size-change="handleSizeChange"
			></el-pagination>
		</div>
	</div>
</template>

<script>
import sectionTitle from "@/components/section-title";
import Quote from "@/components/quote";
import { fetchResource, fetchResourceType } from "@/api/resource";
import TypeSelection from "../components/type-selection.vue";
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
		};
	},
	components: {
		Quote,
		sectionTitle,
		TypeSelection,
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
				if (res.status == 200) {
					this.resourceTypeList = res.data.sort((a, b) => {
						return b.id * 1 > a.id * 1;
					});
					console.log("类别列表", this.resourceTypeList);
				} else {
					this.$message.success(res.msg);
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
	},
	created() {
		this.fetchResource();
		this.getResourceType();
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
