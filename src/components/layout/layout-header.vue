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
import {
	fetchOauthUserInfoByGitee,
	fetchOauthUserInfoByGithub,
	fetchOauthUserInfoByHuawei,
	fetchOauthUserInfoByBaidu,
} from "@/api/oauth";
import { register, fetchUserInfoByUnpt } from "@/api/user";
import {
	oauth,
	calculateIsLogin,
	getCurrentOauthUserInfo,
} from "@/utils/oauth";
const qs = require("qs");
import { v4 as uuidv4 } from "uuid";

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
				{ name: "华为", value: "huawei" },
				{ name: "百度", value: "baidu" },
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
				const cPlatform = localStorage.getItem("currentUserPlatform");
				if (cPlatform === "gitee") {
					this.getGiteeOauthUserInfo(this.queryObj.code);
				} else if (cPlatform === "github") {
					this.getGithubOauthUserInfo(this.queryObj.code);
				} else if (cPlatform === "huawei") {
					this.getHuaweiOauthUserInfo(this.queryObj.code);
				} else if (cPlatform === "baidu") {
					this.getBaiduOauthUserInfo(this.queryObj.code);
				} else {
					console.log("啥也不是");
				}
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
			} else if (item.value === "github") {
				window.open(
					`https://github.com/login/oauth/authorize?client_id=${oauth.github.GITHUB_CLIENT_ID}&redirect_uri=${oauth.github.REDIRECT_URI}&scope=${oauth.github.SCOPE}&state=${oauth.github.STATE}&allow_signup=${oauth.github.ALLOW_SIGNUP}`
				);
			} else if (item.value === "huawei") {
				window.open(
					`https://oauth-login.cloud.huawei.com/oauth2/v3/authorize?
            response_type=code&access_type=offline&state=${uuidv4()}&client_id=${
						oauth.huawei.CLIENT_ID
					}
            &redirect_uri=${oauth.huawei.REDIRECT_URI}&scope=openid+profile`
				);
			} else if (item.value === "baidu") {
				window.open(
					`https://openapi.baidu.com/oauth/2.0/authorize?response_type=code&client_id=${
						oauth.baidu.API_KEY
					}&redirect_uri=${oauth.baidu.REDIRECT_URI}&state=${uuidv4()}`
				);
			}
		},
		// 获取gitee授权用户信息
		async getGiteeOauthUserInfo(code) {
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
		// 获取gitee授权用户信息
		async getGithubOauthUserInfo(code) {
			const res = await fetchOauthUserInfoByGithub(code);
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
		// 获取华为授权用户信息
		async getHuaweiOauthUserInfo(code) {
			const res = await fetchOauthUserInfoByHuawei({
				code,
			});
			if (res.status == 200) {
				this.currentUserInfo = {
					name: res.data.displayName,
					avatar_url: res.data.headPictureURL,
					email: res.data.email ? res.data.email : "",
				};
				sessionStorage.setItem("currentUserInfo", JSON.stringify(res.data));
				this.isLogin = true;
				const { name, avatar_url, email } = this.currentUserInfo;
				const user_platform = localStorage.getItem("currentUserPlatform");
				setTimeout(async () => {
					await register({
						username: name,
						password: "123456",
						rePassword: "123456",
						avatar: avatar_url,
						user_type: 0,
						user_platform,
						user_page: "",
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
		// 获取华为授权用户信息
		async getBaiduOauthUserInfo(code) {
			const res = await fetchOauthUserInfoByBaidu({
				code,
			});
			if (res.status == 200) {
				this.currentUserInfo = {
					name: res.data.username,
					avatar_url: `https://himg.bdimg.com/sys/portrait/item/${res.data.portrait}`,
					email: res.data.email ? res.data.email : "",
				};
				sessionStorage.setItem("currentUserInfo", JSON.stringify(res.data));
				this.isLogin = true;
				const { name, avatar_url, email } = this.currentUserInfo;
				const user_platform = localStorage.getItem("currentUserPlatform");
				setTimeout(async () => {
					await register({
						username: name,
						password: "123456",
						rePassword: "123456",
						avatar: avatar_url,
						user_type: 0,
						user_platform,
						user_page: "",
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
@import "../../assets/css/header.less";
</style>
