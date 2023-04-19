<template>
	<div class="articles">
		<div class="site-content animate">
			<main class="site-main">
				<article class="hentry">
					<!-- 文章内容 -->
					<div class="mavon">
						<!-- 预览文件的地方（用于渲染） -->
						<div v-if="!article.article_type" ref="file"></div>
						<v-md-preview v-else :text="article.content"></v-md-preview>
					</div>
					<!-- 文章底部 -->
					<section-title>
						<footer class="post-footer">
							<!-- 下载按钮 -->
							<div class="post-like" v-if="isShowDownload">
								<i class="el-icon-download"></i>
								<a slot="reference" @click="downLoad(article)">下载</a>
							</div>
							<!-- 阅读次数 -->
							<div class="post-like">
								<i class="el-icon-view"></i>
								<span>{{ article.viewsCount }}</span>
							</div>
							<!-- 评论条数 -->
							<div class="post-like">
								<i class="el-icon-chat-dot-round"></i>
								<span>{{ article.commentsCount }}</span>
							</div>
							<!-- 赞助按钮 -->
							<div class="donate" @click="showDonate = !showDonate">
								<span>赏</span>
								<ul class="donate_inner" :class="{ show: showDonate }">
									<li class="wedonate">
										<img src="https://s4.ax1x.com/2022/01/28/7xvu80.png" />
										<p>微信</p>
									</li>
									<li class="alidonate">
										<img src="https://s4.ax1x.com/2022/01/28/7xvK2V.jpg" />
										<p>支付宝</p>
									</li>
								</ul>
							</div>
							<!-- 文章标签 -->
							<div class="post-tags">
								<i class="iconfont iconcategory"></i>
								<router-link to="/category/technology">技术</router-link>
							</div>
						</footer>
					</section-title>
					<!-- 评论区 -->
					<comment
						:dataSource="commentList"
						@updateComment="getComment"
					></comment>
				</article>
			</main>
		</div>
	</div>
</template>

<script>
import { publicIpv4 } from "public-ip";
const { UAParser } = require("ua-parser-js");
import Banner from "@/components/banner";
import sectionTitle from "@/components/section-title";
import menuTree from "@/components/menu-tree";
import Comment from "@/components/comment";
import {
	fetchArticle,
	addViewsCount,
	addDownloadsCount,
	addArticleLog,
} from "../api/post";
import { fetchComment } from "@/api/comment";
import { fetchUserInfoByUserId, updateIntegral } from "@/api/user";
import { env } from "process";
// 引入docx-preview插件
import { Loading } from "element-ui";
// 引入oauth
import { getCurrentOauthUserInfo } from "@/utils/oauth";

let loading;
let docx = require("docx-preview");
window.JSZip = require("jszip");

export default {
	name: "articles",
	data() {
		return {
			showDonate: false,
			menus: [],
			article: {},
			toolbars: {
				navigation: true,
				readmodel: true,
				htmlcode: true, // 展示html源码
			},
			commentList: [],
			currentArticleId: "",
			currentUserInfo: {},
			isShowDownload: false,
		};
	},
	components: {
		Banner,
		sectionTitle,
		menuTree,
		Comment,
	},
	methods: {
		// 从缓存获取当前用户信息
		async getCurrentUserInfo() {
			try {
				let cui = getCurrentOauthUserInfo();
				if (cui && cui.id) {
					this.isShowDownload = true;
					const res = await fetchUserInfoByUserId(cui.id);
					if (res.status === 200) {
						this.currentUserInfo = res.data;
						sessionStorage.setItem("sqlUserInfo", JSON.stringify(res.data));
					} else {
						this.$message.error(res.errors);
					}
				} else {
					this.isShowDownload = false;
					this.currentUserInfo = {};
				}
			} catch (error) {
				this.$message.error(error);
			}
		},
		// 文章访问量+1
		addViewsCount() {
			addViewsCount({ articleId: this.article.id })
				.then((res) => {
					if (res.message === "成功") {
						setTimeout(() => {
							this.$message({
								message: "这篇博客的热度嗖地一下加了一点儿！",
								type: "success",
							});
						}, 3000);
					}
				})
				.catch((err) => {
					this.$message.error(err);
				});
		},
		// docx预览
		goPreview(article) {
			this.$axios({
				method: "get",
				responseType: "blob", // 因为是流文件，所以要指定blob类型
				url: `${process.env.VUE_APP_BASE_API}/getDoc?articleName=${article.content}`, // 自己的服务器，提供的一个word下载文件接口
			})
				.then(({ data }) => {
					docx.renderAsync(data, this.$refs.file); // 渲染到页面
				})
				.finally(() => {
					loading.close(); //关闭loading
				});
		},
		// 下载
		downLoad(article) {
			this.$confirm("您确定要花费 20积分 下载该博客吗?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "info",
			}).then(async () => {
				Promise.all([this.getCurrentUserInfo()]).then(() => {
					// 获取当前用户信息，得到用户积分
					if (this.currentUserInfo.integral >= 10) {
						if (article.article_type) {
							require("downloadjs")(
								article.content,
								`${article.title}.md`,
								"text/plain"
							);
							// 消耗20积分
							this.updateIntegral({
								userId: this.currentUserInfo.id,
								operate_num: 20,
								operate_type: 0,
							});
						} else {
							// 下载文件
							this.$axios({
								method: "get",
								responseType: "blob", // 因为是流文件，所以要指定blob类型
								url: `${process.env.VUE_APP_BASE_API}/getDoc?articleName=${article.content}`, // 自己的服务器，提供的一个word下载文件接口
							}).then(({ data }) => {
								const blob = new Blob([data]); // 把得到的结果用流对象转一下
								var a = document.createElement("a"); //创建一个<a></a>标签
								a.href = URL.createObjectURL(blob); // 将流文件写入a标签的href属性值
								a.download = `${article.content}.docx`; //设置文件名
								a.style.display = "none"; // 障眼法藏起来a标签
								document.body.appendChild(a); // 将a标签追加到文档对象中
								a.click(); // 模拟点击了a标签，会触发a标签的href的读取，浏览器就会自动下载了
								a.remove(); // 一次性的，用完就删除a标签
								// 消耗20积分
								this.updateIntegral({
									userId: this.currentUserInfo.id,
									operate_num: 20,
									operate_type: 0,
								});
							});
						}
						// 调用接口增加文章下载数量
						this.increaseDownloadsCount(article.id);
						this.appendArticleLog(1);
					} else {
						this.$message.error("积分余额不足！");
					}
				});
			});
		},
		// 文章下载量+1
		async increaseDownloadsCount(articleId) {
			try {
				await addDownloadsCount(articleId);
			} catch (error) {
				this.$message.error(error);
			}
		},
		// 新增文章日志
		async appendArticleLog(operate_type) {
			try {
				const clientIp = await publicIpv4();
				let { browser, os } = new UAParser().getResult();
				await addArticleLog({
					article_id: this.$route.params.id,
					ip: clientIp,
					browser: `${browser.name} ${browser.version}`,
					os: `${os.name} ${os.version}`,
					operate_type,
				});
			} catch (error) {
				this.$message.error(error);
			}
		},
		// 获取文章详情
		async getArticle() {
			try {
				const res = await fetchArticle(this.$route.params.id);
				if (res.status == 200) {
					this.article = res.data;
					if (!this.article.article_type) {
						this.goPreview(this.article);
					} else {
						loading.close();
					}
					this.addViewsCount();
					this.appendArticleLog(0);
				} else {
					this.$message.error(res.errors);
				}
			} catch (error) {
				this.$message.error(error);
			}
		},
		// 门户展示评论列表
		async getComment() {
			try {
				const res = await fetchComment(this.currentArticleId);
				if (res.status === 200) {
					this.commentList = res.data;
				} else {
					this.$message.error(res.errors);
				}
			} catch (error) {
				this.$message.error(error);
			}
		},
		// 更新积分
		async updateIntegral(data) {
			try {
				const ret = await updateIntegral(data);
				if (ret.status === 200) {
					this.getCurrentUserInfo();
				}
			} catch (error) {
				this.$message.error(error);
			}
		},
	},
	mounted() {},
	created() {
		this.currentArticleId = this.$route.params.id;
		loading = Loading.service({
			//开始loading加载动画
			lock: true,
			text: "文章加载中...",
			background: "rgba(0, 0, 0, 0)",
		});
		this.getCurrentUserInfo();
		this.getArticle();
		this.getComment();
	},
	beforeDestroy() {
		loading.close();
	},
};
</script>
<style scoped lang="less">
.site-content {
	position: relative;

	.site-main {
		padding: 80px 0 0 0;
	}
}

article.hentry {
	.mavon {
		margin-top: 24px;

		:deep(.docx-wrapper) {
			background: #fff !important;

			& > section.docx {
				background: white;
				box-shadow: 0 0 10px rgb(0 0 0 / 50%);
				margin-bottom: 30px;
				padding: 24px;
			}
		}
	}

	.entry-header {
		.entry-title {
			font-size: 23px;
			font-weight: 600;
			color: #737373;
			margin: 0.67em 0;

			&:before {
				content: "#";
				margin-right: 6px;
				color: #d82e16;
				font-size: 20px;
				font-weight: 600;
			}
		}

		hr {
			height: 1px;
			border: 0;
			background: #efefef;
			margin: 15px 0;
		}

		.breadcrumbs {
			font-size: 14px;
			color: #d2d2d2;
			text-decoration: none;
			margin-bottom: 30px;
		}
	}

	.entry-content {
	}

	footer.post-footer {
		width: 100%;
		padding: 20px 10px;
		margin-top: 30px;
		height: 65px;
		position: relative;

		.download {
			span {
				// cursor: pointer;
			}
		}

		i {
			font-size: 18px;
			margin-right: 5px;
		}

		.post-like {
			float: right;
			margin: 7px 0 0 20px;

			& span:hover {
				cursor: pointer;
				color: red;
				font-weight: 500;
			}
			& a:hover {
				color: red;
				font-weight: 500;
			}
		}

		.post-share {
			float: right;
			list-style: none;
			margin-right: 20px;
		}

		.donate {
			float: left;
			line-height: 36px;
			border-radius: 100%;
			-webkit-border-radius: 100%;
			-moz-border-radius: 100%;
			border: 1px solid #2b2b2b;

			&:hover {
				border: 1px solid goldenrod;

				span {
					color: goldenrod;
				}
			}

			span {
				color: #2b2b2b;
				padding: 10px;
				position: relative;
				cursor: pointer;
			}

			.donate_inner {
				display: none;
				margin: 0;
				list-style: none;
				position: absolute;
				left: 80px;
				top: -40px;
				background: #fff;
				padding: 10px;
				border: 1px solid #ddd;
				box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
				border-radius: 3px;

				&.show {
					display: block;
				}

				li {
					float: left;
				}

				img {
					width: 100px;
				}

				p {
					text-align: center;
					font-size: 15px;
					color: #d2d2d2;
					line-height: 1rem;
				}
			}

			.donate_inner:after,
			.donate_inner:before {
				content: "";
				position: absolute;
				left: 0;
				bottom: 45%;
				margin-left: -8px;
				border-top: 8px solid transparent;
				border-bottom: 8px solid transparent;
				border-right: 8px solid #fff;
			}

			.donate_inner:before {
				left: -1px;
				border-right: 8px solid #ddd;
			}
		}

		.post-tags {
			margin: 7px 0 0 20px;
			float: left;
			text-transform: uppercase;

			a:hover {
				color: #ff6d6d;
			}
		}
	}

	.open-message {
		margin: 50px 0;
		position: relative;
		background: #2b2b2b;
		padding: 10px 30px;
		border-radius: 3px;
		font-size: 14px;
		color: #fff;

		&:after {
			content: "";
			border-left: 10px solid transparent;
			border-right: 10px solid transparent;
			border-bottom: 10px solid #2b2b2b;
			position: absolute;
			top: -8px;
			left: 48%;
		}

		p {
			margin: 10px 0;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		a {
			color: #a0dad0;
			padding: 0 5px;
		}
	}
}
</style>
