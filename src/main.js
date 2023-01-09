import Vue from "vue";
import ElementUI from "element-ui";
import i18n from "./i18n/i18n";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/style.less";
import "./assets/font/iconfont.css";
import { parseTime } from "./utils";
import axios from "axios";
// import * as Echarts from "echarts";

// 引入v-md-editor
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";
import createCopyCodePlugin from "@kangc/v-md-editor/lib/plugins/copy-code/index";
import "@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css";
VMdPreview.use(createCopyCodePlugin());
// highlightjs
import hljs from "highlight.js";
VMdPreview.use(githubTheme, {
	Hljs: hljs,
});
Vue.use(VMdPreview);
// 引入vue-clipboard2
import VueClipboard from "vue-clipboard2";
VueClipboard.config.autoSetContainer = true; // add this line
Vue.use(VueClipboard);

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
	i18n,
	render: (h) => h(App),
}).$mount("#app");
