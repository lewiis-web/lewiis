<template>
	<div class="about">
		<div class="site-content">
			<div class="content-warp">
				<div class="about-site about-info">
					<section-title
						><span>❤</span>{{ $t("index.about.title") }}</section-title
					>
					<div class="info-card">
						<p>Lewiis</p>
						<p>web前端攻城狮</p>
						<p>
							您高抬贵手，<a
								target="_blank"
								class="out-link"
								href="https://gitee.com/lewiis/lewiis"
								style="color: #ff6d6d"
								>Gitee仓库</a
							>star★一下哟!
						</p>
						<p>
							有问题发邮件(<a
								href="mailto:1819631759@qq.com?subject=深入探讨一些事情&body你此时所想的内容"
								style="color: #ff6d6d"
								>1819631759@qq.com</a
							>)，我们一块儿"深入探讨"
						</p>
					</div>
				</div>
				<div class="about-me about-info">
					<section-title id="Guestbook"
						><span>❤</span>{{ $t("index.about.message") }}</section-title
					>
					<div class="info-card">
						<div class="contactForm">
							<div class="form-item">
								<label for="mail">{{ $t("index.about.email") }}：</label>
								<input
									class="v"
									type="email"
									name="mail"
									id="mail"
									:placeholder="$t('index.about.pi-email')"
									v-model="email"
								/>
							</div>

							<div class="form-item">
								<label for="mail">{{ $t("index.about.name") }}：</label>
								<input
									class="v"
									type="text"
									name="blogName"
									id="blogName"
									:placeholder="$t('index.about.pi-blogName')"
									v-model="blogName"
								/>
							</div>

							<div class="form-item">
								<label for="mail">{{ $t("index.about.homepage") }}：</label>
								<input
									class="v"
									type="text"
									name="blogHomePage"
									id="blogHomePage"
									:placeholder="$t('index.about.pi-homepage')"
									v-model="blogHomePage"
								/>
							</div>

							<div class="form-item">
								<label for="mail"
									>{{ $t("index.about.personalProfile") }}：</label
								>
								<input
									class="v"
									type="text"
									name="personalIntroduction"
									id="personalIntroduction"
									:placeholder="$t('index.about.pi-profile')"
									v-model="personalIntroduction"
								/>
							</div>

							<div class="form-item">
								<label for="content">{{ $t("index.about.content") }}：</label>
								<textarea
									rows="5"
									class="v"
									id="content"
									name="content"
									placeholder="更多问题请留言"
									v-model="question"
								></textarea>
							</div>

							<div class="form-item">
								<label></label>
								<button @click="onSubmit">
									{{ $t("index.about.submit") }}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import sectionTitle from "@/components/section-title";
import { addMessage } from "@/api/message";

export default {
	name: "About",
	data() {
		return {
			list: [],
			email: "",
			question: this.$t("index.about.contents"),
			blogName: "",
			blogHomePage: "",
			personalIntroduction: "",
		};
	},
	components: {
		sectionTitle,
	},
	methods: {
		onSubmit() {
			// 保存到数据库中
			this.addMessage();
		},
		addMessage() {
			addMessage({
				email: this.email,
				msg: this.question,
				blogName: this.blogName,
				blogHomePage: this.blogHomePage,
				personalIntroduction: this.personalIntroduction,
			}).then((res) => {
				this.$message({
					message: res.msg,
					type: "success",
				});
				// 清空输入框的内容
				(this.email = ""),
					(this.question = ""),
					(this.blogName = ""),
					(this.blogHomePage = "");
				this.personalIntroduction = "";
			});
		},
		fetchAvatarUrl() {
			this.$axios({
				method: "get",
				url: `https://api.muxiaoguo.cn/api/sjtx?method=pc`,
			}).then((res) => {
				this.avatarUrl = res.data.data.imgurl;
			});
		},
	},
	created() {
		this.fetchAvatarUrl();
	},
	mounted() {},
};
</script>
<style scoped lang="less">
.about {
	padding-top: 40px;
}

.content-warp {
	margin-top: 80px;

	.about-info {
		margin: 30px 0;

		span {
			color: red;
			margin-right: 10px;
		}

		.info-card {
			min-height: 100px;
			padding: 20px;
			border-radius: 3px;
			margin: 30px 0 50px 0;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
			p {
				line-height: 1.7rem;
			}
		}
	}
	.contactForm {
		width: 100%;
		padding: 20px;
		.form-item {
			align-items: center;
			display: flex;
			&:not(:last-child) {
				margin-bottom: 20px;
			}
			label {
				width: 120px;
			}
			.v {
				min-height: 40px;
				line-height: 20px;
				border-radius: 3px;
				padding: 2px 10px;
				outline: none;
				border: 1px solid #8fd0cc;
				width: 100%;
				resize: vertical;
			}
			button {
				width: 100px;
				height: 40px;
				border-radius: 3px;
				outline: 0;
				border-style: none;
				cursor: pointer;
				background-color: #409eff;
				color: white;
				&:hover {
					opacity: 0.8;
				}
			}
		}
	}
}

/*******/
@media (max-width: 800px) {
	.content-warp {
		margin-top: 0;
	}
}
</style>
