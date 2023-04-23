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
				<a href="#">{{ $t("index.menu.login") }}</a>
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
				<el-avatar
					class="header_avatar"
					:src="
						Object.keys(sqlUserInfo).length > 0
							? sqlUserInfo.avatar ||
							  sqlUserInfo.avatar_url ||
							  sqlUserInfo.headPictureURL
							: 'http://lewiis.top/img/rabbit.84962985.svg'
					"
				></el-avatar>
				<a href="#">{{
					sqlUserInfo.username || sqlUserInfo.name || sqlUserInfo.displayName
				}}</a>
				<div class="childMenu">
					<div class="sub-menu">
						<a @click="goResourceReply">{{
							$t("index.menu.resource_sharing_apply")
						}}</a>
					</div>
					<div class="sub-menu">
						<a @click="goCdkCenter">{{ $t("index.menu.cdk") }}</a>
					</div>
					<div class="sub-menu">
						<a @click="logout">{{ $t("index.menu.logout") }}</a>
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
	fetchOauthUserInfoByGiteeTest,
	fetchOauthUserInfoByWeibo,
} from "@/api/oauth";
import { register, portalLogin, fetchUserInfoByUnpt } from "@/api/user";
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
				// { name: "Gitee测试", value: "gitee_test" },
			],
			queryObj: {},
			currentUserInfo: {},
			isLogin: false,
			sqlUserInfo: {},
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
				} else if (cPlatform === "gitee_test") {
					this.getGiteeTestOauthUserInfo(this.queryObj.code);
				} else if (cPlatform === "weibo") {
					this.getWeiboOauthUserInfo(this.queryObj.code);
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
		const cui = sessionStorage.getItem("sqlUserInfo");
		this.sqlUserInfo = cui ? JSON.parse(cui) : {};
	},
	watch: {},
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
				if (res.code === 200) {
					this.categories = res.data;
				} else {
					this.$message.error(res.errors);
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
			} else if (item.value === "gitee_test") {
				window.open(
					`https://gitee.com/oauth/authorize?client_id=${oauth.gitee_test.GITEE_CLIENT_ID}&redirect_uri=${oauth.gitee_test.REDIRECT_URI}&response_type=code`
				);
			} else if (item.value === "weibo") {
				window.open(
					`https://api.weibo.com/oauth2/authorize?client_id=${oauth.weibo.CLIENT_ID}&response_type=code&redirect_uri=${oauth.weibo.REDIRECT_URI}`
				);
			}
		},
		// 获取gitee授权用户信息
		async getGiteeOauthUserInfo(code) {
			const sui = sessionStorage.getItem("sqlUserInfo");
			const sqlUserInfo = sui ? JSON.parse(sui) : {};
			if (Object.keys(sqlUserInfo).length > 0) {
				this.sqlUserInfo = sqlUserInfo;
			} else {
				const res = await fetchOauthUserInfoByGitee(code);
				if (res.code === 200) {
					this.currentUserInfo = res.data;
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
					}, 500);
					setTimeout(async () => {
						history.replaceState(null, null, "/");
						const res = await fetchUserInfoByUnpt({
							username: this.currentUserInfo.name,
							user_type: 0,
							user_platform,
						});
						if (res.code === 200) {
							sessionStorage.setItem("sqlUserInfo", JSON.stringify(res.data));
							this.sqlUserInfo = res.data;
							this.$store.dispatch("setProgress", true);
						}
					}, 1000);
					setTimeout(async () => {
						const res1 = await portalLogin({
							username: name,
							password: "123456",
						});
						if (ret1.code === 200) {
							sessionStorage.setItem("token", ret1.data.token);
						}
					}, 1500);
				} else {
					this.isLogin = false;
				}
			}
		},
		// 获取gitee_test授权用户信息
		async getGiteeTestOauthUserInfo(code) {
			const sui = sessionStorage.getItem("sqlUserInfo");
			const sqlUserInfo = sui ? JSON.parse(sui) : {};
			if (Object.keys(sqlUserInfo).length > 0) {
				this.sqlUserInfo = sqlUserInfo;
			} else {
				const res = await fetchOauthUserInfoByGiteeTest(code);
				if (res.code === 200) {
					this.currentUserInfo = res.data;
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
					}, 500);
					setTimeout(async () => {
						history.replaceState(null, null, "/");
						const res = await fetchUserInfoByUnpt({
							username: this.currentUserInfo.name,
							user_type: 0,
							user_platform,
						});
						if (res.code === 200) {
							sessionStorage.setItem("sqlUserInfo", JSON.stringify(res.data));
							this.sqlUserInfo = res.data;
							this.$store.dispatch("setProgress", true);
						}
					}, 1000);
					setTimeout(async () => {
						const res1 = await portalLogin({
							username: name,
							password: "123456",
						});
						if (ret1.code === 200) {
							sessionStorage.setItem("token", ret1.data.token);
						}
					}, 1500);
				} else {
					this.isLogin = false;
				}
			}
		},
		// 获取gitee授权用户信息
		async getGithubOauthUserInfo(code) {
			const sui = sessionStorage.getItem("sqlUserInfo");
			const sqlUserInfo = sui ? JSON.parse(sui) : {};
			if (Object.keys(sqlUserInfo).length > 0) {
				this.sqlUserInfo = sqlUserInfo;
			} else {
				const res = await fetchOauthUserInfoByGithub(code);
				if (res.code === 200) {
					this.currentUserInfo = res.data;
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
					}, 500);
					setTimeout(async () => {
						history.replaceState(null, null, "/");
						const res = await fetchUserInfoByUnpt({
							username: this.currentUserInfo.name,
							user_type: 0,
							user_platform,
						});
						if (res.code === 200) {
							sessionStorage.setItem("sqlUserInfo", JSON.stringify(res.data));
							this.sqlUserInfo = res.data;
							this.$store.dispatch("setProgress", true);
						}
					}, 1000);
					setTimeout(async () => {
						const res1 = await portalLogin({
							username: name,
							password: "123456",
						});
						if (ret1.code === 200) {
							sessionStorage.setItem("token", ret1.data.token);
						}
					}, 1500);
				} else {
					this.isLogin = false;
				}
			}
		},
		// 获取华为授权用户信息
		async getHuaweiOauthUserInfo(code) {
			const sui = sessionStorage.getItem("sqlUserInfo");
			const sqlUserInfo = sui ? JSON.parse(sui) : {};
			if (Object.keys(sqlUserInfo).length > 0) {
				this.sqlUserInfo = sqlUserInfo;
			} else {
				const res = await fetchOauthUserInfoByHuawei({
					code,
				});
				if (res.code === 200) {
					this.currentUserInfo = {
						name: res.data.displayName,
						avatar_url: res.data.headPictureURL,
						email: res.data.email ? res.data.email : "",
					};
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
					}, 500);
					setTimeout(async () => {
						history.replaceState(null, null, "/");
						const res = await fetchUserInfoByUnpt({
							username: this.currentUserInfo.name,
							user_type: 0,
							user_platform,
						});
						if (res.code === 200) {
							sessionStorage.setItem("sqlUserInfo", JSON.stringify(res.data));
							this.sqlUserInfo = res.data;
							this.$store.dispatch("setProgress", true);
						}
					}, 1000);
					setTimeout(async () => {
						const res1 = await portalLogin({
							username: name,
							password: "123456",
						});
						if (ret1.code === 200) {
							sessionStorage.setItem("token", ret1.data.token);
						}
					}, 1500);
				} else {
					this.isLogin = false;
				}
			}
		},
		// 获取百度授权用户信息
		async getBaiduOauthUserInfo(code) {
			const sui = sessionStorage.getItem("sqlUserInfo");
			const sqlUserInfo = sui ? JSON.parse(sui) : {};
			if (Object.keys(sqlUserInfo).length > 0) {
				this.sqlUserInfo = sqlUserInfo;
			} else {
				const res = await fetchOauthUserInfoByBaidu({
					code,
				});
				if (res.code === 200) {
					this.currentUserInfo = {
						name: res.data.username,
						avatar_url: `https://himg.bdimg.com/sys/portrait/item/${res.data.portrait}`,
						email: res.data.email ? res.data.email : "",
					};
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
					}, 500);
					setTimeout(async () => {
						history.replaceState(null, null, "/");
						const res = await fetchUserInfoByUnpt({
							username: this.currentUserInfo.name,
							user_type: 0,
							user_platform,
						});
						if (res.code === 200) {
							sessionStorage.setItem("sqlUserInfo", JSON.stringify(res.data));
							this.sqlUserInfo = res.data;
							this.$store.dispatch("setProgress", true);
						}
					}, 1000);
					setTimeout(async () => {
						const res1 = await portalLogin({
							username: name,
							password: "123456",
						});
						if (ret1.code === 200) {
							sessionStorage.setItem("token", ret1.data.token);
						}
					}, 1500);
				} else {
					this.isLogin = false;
				}
			}
		},
		// 获取微博授权用户信息
		async getWeiboOauthUserInfo(code) {
			const sui = sessionStorage.getItem("sqlUserInfo");
			const sqlUserInfo = sui ? JSON.parse(sui) : {};
			if (Object.keys(sqlUserInfo).length > 0) {
				this.sqlUserInfo = sqlUserInfo;
			} else {
				const res = await fetchOauthUserInfoByWeibo(code);
				if (res.code === 200) {
					this.currentUserInfo = res.data;
					this.isLogin = true;
					const { name, avatar_hd, domain, email = "" } = this.currentUserInfo;
					const user_platform = localStorage.getItem("currentUserPlatform");
					setTimeout(async () => {
						await register({
							username: name,
							password: "123456",
							rePassword: "123456",
							avatar: avatar_hd,
							user_type: 0,
							user_platform,
							user_page: domain,
							email,
						});
					}, 500);
					setTimeout(async () => {
						history.replaceState(null, null, "/");
						const res = await fetchUserInfoByUnpt({
							username: this.currentUserInfo.name,
							user_type: 0,
							user_platform,
						});
						if (res.code === 200) {
							sessionStorage.setItem("sqlUserInfo", JSON.stringify(res.data));
							this.sqlUserInfo = res.data;
							this.$store.dispatch("setProgress", true);
						}
					}, 1000);
					setTimeout(async () => {
						const res1 = await portalLogin({
							username: name,
							password: "123456",
						});
						if (ret1.code === 200) {
							sessionStorage.setItem("token", ret1.data.token);
						}
					}, 1500);
				} else {
					this.isLogin = false;
				}
			}
		},
		// 注销
		logout() {
			sessionStorage.removeItem("sqlUserInfo");
			sessionStorage.removeItem("token");
			localStorage.removeItem("currentUserPlatform");
			window.location.reload();
		},
		// 跳转到资源共享申请页
		goResourceReply() {
			this.$router.push("/resourceReply");
		},
		// 跳转到cdk兑换中心
		goCdkCenter() {
			this.$router.push("/cdkExchangeCenter");
		},
	},
};
</script>

<style scoped lang="less">
@import "../../assets/css/header.less";
</style>
