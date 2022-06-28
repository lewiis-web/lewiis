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
  // 后台登录页
  {
    path: "/bms/login",
    name: "/bms/login",
    component: () => import("@/views/bms/login"),
    meta: { title: "后台管理系统登录" },
  },
  // 后台首页
  {
    path: "/bms",
    name: "bms",
    redirect: '/bms/home',
    component: () => import("@/views/bms/home"),
    meta: { title: "后台管理系统首页" },
    children: [
      {
        path: "home",
        name: "home",
        components: {
          bms: () => import("@/views/bms/home/home.vue"),
        },
        meta: { title: "首页",icon:"el-icon-menu" },
      },
      {
        path: "userControl",
        name: "userControl",
        components: {
          bms: () => import("@/views/bms/userControl"),
        },
        meta: { title: "用户管理",icon:"el-icon-s-custom" },
      },
      {
        path: "articleControl",
        name: "articleControl",
        components: {
          bms: () => import("@/views/bms/articleControl"),
        },
        meta: { title: "博客文章",icon:"el-icon-tickets" },
      },
      {
        path: "friendUrlControl",
        name: "friendUrlControl",
        components: {
          bms: () => import("@/views/bms/friendUrlControl"),
        },
        meta: { title: "友情链接",icon:"el-icon-s-home" },
      },
      {
        path: "resourceControl",
        name: "resourceControl",
        components: {
          bms: () => import("@/views/bms/resourceControl"),
        },
        meta: { title: "独家资源",icon:"el-icon-coin" },
      },
      {
        path: "gossipControl",
        name: "gossipControl",
        components: {
          bms: () => import("@/views/bms/gossipControl"),
        },
        meta: { title: "留言列表",icon:"el-icon-chat-dot-square" },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let title = "Lewiis的个人博客";
  if (to.meta.params) {
    title = `${to.meta.title}:${to.params[to.meta.params] || ""} - ${title}`;
  } else {
    title = `${to.meta.title} - ${title}`;
  }
  document.title = title;
  if (to.path !== from.path) {
    if (to.path.indexOf("bms" === -1) && from.path.indexOf("bms") === -1) {
      store.dispatch("setLoading", true);
    }
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
