import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/style.less";
import "./assets/font/iconfont.css";
import { parseTime } from "./utils";
import axios from "axios";
// import * as Echarts from "echarts";

// 引入mavonEditor编辑器
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
Vue.use(mavonEditor);

Vue.prototype.$axios = axios;
// Vue.prototype.$echarts = Echarts;
Vue.config.productionTip = false;
Vue.filter("parseTime", (v) => parseTime(v, "{y}-{m}-{d}"));
// 加入百度统计
router.beforeEach((to, from, next) => {
  if (to.path) {
    if (window._hmt) {
      window._hmt.push(["_trackPageview", "/#" + to.fullPath]);
    }
  }
  next();
});

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
