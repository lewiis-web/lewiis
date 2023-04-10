<template>
	<div
		id="layout-header"
		:class="{ fixed: fixed, hidden: hidden }"
		@click.stop="mobileShow = false"
	>
		<div class="site-logo">
			<router-link to="/">
				<img
					src="@/assets/rabbit.svg"
					alt="logo"
					style="width: 40px; height: 40px; margin: 16px 0"
				/>
				<p class="site-name">{{ $t("index.title") }}</p>
			</router-link>
		</div>
		<div class="menus-btn" @click.stop="mobileShow = !mobileShow">Menus</div>
		<div
			class="site-menus"
			:class="{ mobileShow: mobileShow }"
			@click.stop="mobileShow = !mobileShow"
		>
			<div class="weather menu-item">
				<weather-card></weather-card>
			</div>
			<div class="menu-item header-search">
				<header-search />
			</div>
			<div class="menu-item">
				<router-link to="/">{{ $t("index.menu.home") }}</router-link>
			</div>
			<div class="menu-item hasChild">
				<a href="#">{{ $t("index.menu.blog") }}</a>
				<div class="childMenu" v-if="categories.length > 0">
					<div class="sub-menu" v-for="item in categories" :key="item.id">
						<router-link :to="calculateUrl(item)">{{
							calculateTitle(item)
						}}</router-link>
					</div>
				</div>
			</div>
			<div class="menu-item">
				<router-link to="/friend">{{ $t("index.menu.friend") }}</router-link>
			</div>
			<div class="menu-item">
				<router-link to="/resource">{{
					$t("index.menu.resource")
				}}</router-link>
			</div>
			<div class="menu-item">
				<router-link to="/about">{{ $t("index.menu.about") }}</router-link>
			</div>
			<div class="menu-item hasChild">
				<a href="#"
					><img
						src="@/assets/icons/language.png"
						alt=""
						width="20"
						height="20"
						style="vertical-align: middle"
				/></a>
				<div class="childMenu">
					<div class="sub-menu" v-for="item in langTypes" :key="item.type">
						<a @click="toggleLang(item.type)">{{ item.title }}</a>
					</div>
				</div>
			</div>
			<div class="menu-item hasChild" v-if="!isLogin">
				<a href="#">登录</a>
				<div class="childMenu">
					<div
						class="sub-menu"
						v-for="item in loginPlatforms"
						:key="item.value"
					>
						<a @click="toggleLogin(item)">{{ item.name }}</a>
					</div>
				</div>
			</div>
			<div class="menu-item hasChild" v-else>
				<el-avatar :src="currentUserInfo.avatar_url"></el-avatar>
				<a href="#">{{ currentUserInfo.name }}</a>
				<div class="childMenu">
					<div class="sub-menu">
						<a @click="logout">注 销</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import HeaderSearch from "@/components/header-search";
import WeatherCard from "@/components/weather-card";
import { fetchCategories } from "@/api/category";
import { fetchOauthUserInfoByGitee } from "@/api/oauth";
import { register, fetchUserInfoByUnpt } from "@/api/user";
import {
	oauth,
	calculateIsLogin,
	getCurrentOauthUserInfo,
} from "@/utils/oauth";
const qs = require("qs");

export default {
	name: "layout-header",
	components: { HeaderSearch, WeatherCard },
	data() {
		return {
			lastScrollTop: 0,
			fixed: false,
			hidden: false,
			mobileShow: false,
			langTypes: [],
			categories: [],
			loginPlatforms: [
				{ name: "QQ", value: "qq" },
				{ name: "Gitee", value: "gitee" },
				{ name: "Github", value: "github" },
				{ name: "微博", value: "weibo" },
			],
			queryObj: {},
			currentUserInfo: {},
			isLogin: false,
		};
	},
	computed: {
		calculateUrl() {
			return (item) => {
				return `/category/${item.title_en}`;
			};
		},
		calculateTitle() {
			return (item) => {
				const lang = localStorage.getItem("lang");
				if (lang === "en_US") {
					return item.title_en;
				} else {
					return item.title;
				}
			};
		},
	},
	created() {
		this.getCategories();
		const queryStr = window.location.search;
		if (queryStr) {
			this.queryObj = qs.parse(queryStr, { ignoreQueryPrefix: true });
			if (this.queryObj?.code) {
				this.getOauthUserInfo(this.queryObj.code);
			}
		} else {
			if (calculateIsLogin()) {
				this.isLogin = true;
				this.currentUserInfo = getCurrentOauthUserInfo();
			} else {
				this.isLogin = false;
				this.currentUserInfo = {};
			}
		}
	},
	mounted() {
		window.addEventListener("scroll", this.watchScroll);
		// 获取语言类型
		for (const key in this.$t("index.menu.languages")) {
			this.langTypes.push({
				type: key,
				title: this.$t("index.menu.languages")[key],
			});
		}
	},
	beforeDestroy() {
		window.removeEventListener("scroll", this.watchScroll);
	},
	methods: {
		watchScroll() {
			let scrollTop =
				window.pageYOffset ||
				document.documentElement.scrollTop ||
				document.body.scrollTop;
			if (scrollTop === 0) {
				this.fixed = false;
			} else if (scrollTop >= this.lastScrollTop) {
				this.fixed = false;
				this.hidden = true;
			} else {
				this.fixed = true;
				this.hidden = false;
			}
			this.lastScrollTop = scrollTop;
		},
		toggleLang(type) {
			if (type === "en") {
				localStorage.setItem("lang", "en_US");
			} else if (type === "zh") {
				localStorage.setItem("lang", "zh_CN");
			} else {
				localStorage.setItem("lang", "zh_CN");
			}
			window.location.reload();
		},
		// 获取所有分类
		async getCategories() {
			try {
				const res = await fetchCategories();
				if (res.status == 200) {
					this.categories = res.data;
				}
			} catch (error) {
				this.$message.error(error);
			}
		},
		// 点击登录
		toggleLogin(item) {
			localStorage.setItem("currentUserPlatform", item.value);
			if (item.value === "gitee") {
				window.open(
					`https://gitee.com/oauth/authorize?client_id=${oauth.gitee.GITEE_CLIENT_ID}&redirect_uri=${oauth.gitee.REDIRECT_URI}&response_type=code`
				);
			}
		},
		// 获取授权用户信息
		async getOauthUserInfo(code) {
			const res = await fetchOauthUserInfoByGitee(code);
			if (res.status == 200) {
				this.currentUserInfo = res.data;
				sessionStorage.setItem("currentUserInfo", JSON.stringify(res.data));
				this.isLogin = true;
				const { name, avatar_url, html_url, email } = this.currentUserInfo;
				const user_platform = localStorage.getItem("currentUserPlatform");
				setTimeout(async () => {
					await register({
						username: name,
						password: "123456",
						rePassword: "123456",
						avatar: avatar_url,
						user_type: 0,
						user_platform,
						user_page: html_url,
						email,
					});
				}, 1500);
				setTimeout(async () => {
					history.replaceState(null, null, "/");
					const ret = await fetchUserInfoByUnpt({
						username: this.currentUserInfo.name,
						user_type: 0,
						user_platform,
					});
					if (ret.status == 200) {
						sessionStorage.setItem("sqlUserInfo", JSON.stringify(ret.data));
					}
				}, 3000);
			} else {
				this.isLogin = false;
			}
		},
		// 注销
		logout() {
			sessionStorage.removeItem("currentUserInfo");
			sessionStorage.removeItem("sqlUserInfo");
			localStorage.removeItem("currentUserPlatform");
			window.location.reload();
		},
	},
};
</script>

<style scoped lang="less">
#layout-header {
	position: fixed;
	top: 0;
	z-index: 9;
	width: 100%;
	height: 80px;
	padding: 0 80px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	transition: 0.3s all ease;
	-webkit-transition: 0.3s all ease;
	-moz-transition: 0.3s all linear;
	-o-transition: 0.3s all ease;
	-ms-transition: 0.3s all ease;

	&.hidden {
		top: -100px;
	}

	&.fixed {
		background-color: #ffffff;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	}
}

.site-logo {
	text-align: center;

	img {
		width: 60px;
		height: 60px;
	}

	p.site-name {
		font-size: 15px;
		font-weight: bold;
		position: relative;
		top: -10px;
	}
}

.menus-btn {
	display: none;
	visibility: hidden;
}

.site-menus {
	display: flex;
	align-items: center;

	.menu-item {
		min-width: 60px;
		height: 50px;
		line-height: 50px;
		text-align: center;
		position: relative;

		a {
			padding: 12px 10px;
			color: #545454;
			font-weight: 500;
			font-size: 16px;
			vertical-align: text-bottom;

			&:hover {
				color: #ff6d6d;
			}
		}

		&:not(:last-child) {
			margin-right: 15px;
		}

		&.hasChild:hover .childMenu {
			opacity: 1;
			visibility: visible;
			transform: translateY(-5px);
		}
	}

	.childMenu {
		min-width: 130px;
		background-color: #fdfdfd;
		border-radius: 3px;
		border: 1px solid #ddd;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		position: absolute;
		top: 55px;
		z-index: 10;
		opacity: 0;
		visibility: hidden;
		transition: 0.7s all ease;
		-webkit-transition: 0.6s all ease;
		-moz-transition: 0.6s all linear;
		-o-transition: 0.6s all ease;
		-ms-transition: 0.6s all ease;

		&:before,
		&:after {
			content: "";
			position: absolute;
			width: 0;
			height: 0;
			border-left: 6px solid transparent;
			border-right: 6px solid transparent;
			border-bottom: 8px solid white;
			top: -8px;
			left: 20px;
		}

		&:before {
			top: -9px;
			border-bottom: 8px solid #ddd;
		}

		.sub-menu {
			height: 40px;
			line-height: 40px;
			position: relative;

			&:not(:last-child):after {
				/*position: absolute;*/
				content: "";
				width: 50%;
				height: 1px;
				color: #ff6d6d;
				bottom: 0;
				left: 25%;
				z-index: 99;
			}
		}
	}
}

@media (max-width: 960px) {
	#layout-header {
		padding: 0 20px;
	}
}

@media (max-width: 600px) {
	#layout-header {
		padding: 0 10px;
	}

	.menus-btn {
		display: block;
		visibility: visible;
	}

	.site-menus {
		position: absolute;
		display: none;
		visibility: hidden;
		background-color: #f9f9f9;
		width: 100%;
		left: 0;
		top: 80px;
		z-index: -9;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

		.menu-item {
			position: relative;
			height: unset;

			&:not(:last-child) {
				margin-right: 0;
			}
		}

		.childMenu {
			position: relative;
			width: 100%;
			top: 0;
			background-color: #f3f3f3;
			opacity: 1;
			visibility: visible;
			border: none;
			box-shadow: none;

			&:before,
			&:after {
				content: "";
				position: relative;
				width: 0;
				height: 0;
				border-left: 0;
				border-right: 0;
				border-bottom: 0;
			}
		}
	}

	.site-menus.mobileShow {
		display: inline-block;
		visibility: visible;
		z-index: 99;
	}
}

@media (max-width: 1350px) {
	.site-menus {
		.weather {
			display: none;
		}
	}
}

@media (max-width: 600px) {
	.site-menus {
		.weather {
			display: block;
		}
	}
}
</style>
