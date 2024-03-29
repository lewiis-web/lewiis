import Vue from "vue";
import Vuex from "vuex";
import { getTimeInterval } from "../utils/index";
import { fetchSocial, fetchSiteInfo } from "@/api/site";

Vue.use(Vuex);
// 略:后台获取系统运行时间
const runAt = "1637661168437";
let timer = null;
const state = {
	loading: false,
	runTimeInterval: "",
	socials: "",
	websiteInfo: "",
	bms: false,
	isShowProgress: false,
};
const mutations = {
	SET_LOADING: (state, v) => {
		state.loading = v;
	},
	SET_BMS: (state, v) => {
		state.bms = v;
	},
	SET_SOCIALS: (state, v) => {
		state.socials = v;
	},
	SET_SITE_INFO: (state, v) => {
		state.websiteInfo = v;
	},
	GET_RUNTIME_INTERVAL: (state) => {
		if (!timer || !state.runTimeInterval) {
			clearInterval(timer);
			timer = setInterval(() => {
				state.runTimeInterval = getTimeInterval(runAt);
			}, 1000);
		}
	},
	SET_PROGRESS: (state, v) => {
		state.isShowProgress = v;
	},
};
const actions = {
	setLoading: ({ commit }, v) => {
		commit("SET_LOADING", v);
	},
	setBms: ({ commit }, v) => {
		commit("SET_BMS", v);
	},
	setProgress: ({ commit }, v) => {
		commit("SET_PROGRESS", v);
	},
	initComputeTime: ({ commit }) => {
		commit("GET_RUNTIME_INTERVAL");
	},
	getSiteInfo: ({ commit, state }) => {
		return new Promise((resolve) => {
			if (state.websiteInfo) {
				resolve(state.websiteInfo);
			} else {
				fetchSiteInfo()
					.then((res) => {
						let data = res.data || {};
						commit("SET_SITE_INFO", data);
						resolve(data);
					})
					.catch((err) => {
						resolve({});
					});
			}
		});
	},
	getSocials: ({ commit, state }) => {
		return new Promise((resolve) => {
			if (state.socials) {
				resolve(state.socials);
			} else {
				fetchSocial()
					.then((res) => {
						let data = res.data || [];
						commit("SET_SOCIALS", data);
						resolve(data);
					})
					.catch((err) => {
						resolve([]);
					});
			}
		});
	},
};
const getters = {
	loading: (state) => state.loading,
	bms: (state) => state.bms,
	runTimeInterval: (state) => state.runTimeInterval,
	notice: (state) => (state.websiteInfo ? state.websiteInfo.notice : ""),
};
export default new Vuex.Store({
	state,
	mutations,
	actions,
	modules: {},
	getters,
});
