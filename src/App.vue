<template>
	<div id="app" v-cloak>
		<loading></loading>
		<layout-header></layout-header>
		<layout-body></layout-body>
		<layout-footer></layout-footer>
	</div>
</template>
<script>
import layoutHeader from "@/components/layout/layout-header";
import layoutBody from "@/components/layout/layout-body";
import layoutFooter from "@/components/layout/layout-footer";
import Loading from "@/components/loading";
import { addVisitorLog } from "@/api/visitor";
import { publicIpv4 } from "public-ip";
const { UAParser } = require("ua-parser-js");

export default {
	name: "app",
	components: {
		layoutHeader,
		layoutBody,
		layoutFooter,
		Loading,
	},
	watch: {
		"$route.path": {
			immediate: true,
			deep: true,
			handler(newVal) {
				this.appendVisitorLog(newVal);
			},
		},
	},
	mounted() {
		let lang = window.localStorage.getItem("lang");
		if (lang === "en_US") {
			this.$i18n.locale = "en";
		} else if (lang === "zh_CN") {
			this.$i18n.locale = "zh";
			this.locale = null;
		}
	},
	methods: {
		async appendVisitorLog(path) {
			try {
				const clientIp = await publicIpv4();
				let { browser, os } = new UAParser().getResult();
				await addVisitorLog({
					ip: clientIp,
					browser: `${browser.name} ${browser.version}`,
					os: `${os.name} ${os.version}`,
					path,
				});
			} catch (error) {
				this.$message.error(error);
			}
		},
	},
};
</script>
<style lang="less">
#app {
	font-size: 17px;
	color: #6f6f6f;
}
</style>