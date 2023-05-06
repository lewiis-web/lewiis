import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "home",
		component: () => import("@/views/Home.vue"),
		meta: { title: "首页" },
	},
	{
		path: "/category/:cate",
		name: "category",
		component: () => import("@/views/Home.vue"),
		meta: { title: "分类", params: "cate" },
	},
	{
		path: "/search/:words",
		name: "search",
		component: () => import("@/views/Home.vue"),
		meta: { title: "搜索", params: "words" },
	},
	{
		path: "/about",
		name: "about",
		component: () => import("@/views/About.vue"),
		meta: { title: "关于" },
	},
	{
		path: "/friend",
		name: "friend",
		component: () => import("@/views/Friend.vue"),
		meta: { title: "友情链接" },
	},
	{
		path: "/article/:id",
		name: "article",
		component: () => import("@/views/Articles.vue"),
		meta: { title: "文章" },
	},
	{
		path: "/resource",
		name: "resource",
		component: () => import("@/views/Resource.vue"),
		meta: { title: "资源" },
	},
	{
		path: "/attendanceCenter",
		name: "attendanceCenter",
		component: () => import("@/views/AttendanceCenter"),
		meta: { title: "签到中心" },
	},
	{
		path: "/resourceReply",
		name: "resourceReply",
		component: () => import("@/views/ResourceReply"),
		meta: { title: "资源共享申请" },
	},
	{
		path: "/resourceUnlockRecord",
		name: "resourceUnlockRecord",
		component: () => import("@/views/resourceUnlockRecord"),
		meta: { title: "资源解锁记录" },
	},
	{
		path: "/cdkExchangeCenter",
		name: "cdkExchangeCenter",
		component: () => import("@/views/CdkExchangeCenter"),
		meta: { title: "CDK兑换中心" },
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.path !== from.path) {
		store.dispatch("setLoading", true);
	}
	next();
});
router.afterEach((to, from) => {
	// 最多延迟 关闭 loading
	setTimeout(() => {
		store.dispatch("setLoading", false);
	}, 1000);
});
export default router;
