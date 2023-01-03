<template>
	<div class="home">
		<banner isHome="true"></banner>
		<div class="site-content animate">
			<!--通知栏-->
			<div class="notify">
				<div class="search-result" v-if="hideSlogan">
					<span v-if="searchCondition.keyword"
						>搜索结果："{{ searchCondition.keyword }}" 相关文章</span
					>
					<span v-else-if="searchCondition.category"
						>分类 "{{ searchCondition.category | filterCategory }}"
						相关文章</span
					>
				</div>
				<quote v-else>{{ notice }}</quote>
			</div>

			<!-- 各个主题 -->
			<div class="themes">
				<mochi-box
					shiba="ume"
					mood="happy"
					blush
					left-eye="laugh"
					right-eye="laugh"
					left-ear="down"
					right-ear="down"
				>
					<h2>Vue</h2>
					<h3>
						<a target="_blank" href="http://lewiis.top/search/vue">Vue2/Vue3</a>
					</h3>
					<p class="shop kotobuki" title="kotobuki">ことぶき米店</p>
				</mochi-box>
				<mochi-box shiba="sesame" mood="drool" left-ear="up" right-ear="up">
					<h2>React</h2>
					<h3>
						<a target="_blank" href="http://lewiis.top/search/react">React</a>
					</h3>
					<p class="shop kotobuki" title="kotobuki">ことぶき米店</p>
				</mochi-box>
				<mochi-box shiba="tuna" mood="" left-ear="up" right-ear="middle">
					<h2>MySQL</h2>
					<h3>
						<a target="_blank" href="http://lewiis.top/search/mysql">MySQL</a>
					</h3>
					<p class="shop kotobuki" title="kotobuki">ことぶき米店</p>
				</mochi-box>
				<mochi-box shiba="random">
					<h2>ECharts</h2>
					<h3>
						<a target="_blank" href="http://lewiis.top/search/echarts"
							>ECharts</a
						>
					</h3>
					<p class="shop kotobuki" title="kotobuki">ことぶき米店</p>
				</mochi-box>
				<mochi-box
					shiba="anko"
					mood="cheeky"
					left-eye="open"
					right-eye="laugh"
					left-ear="flat"
					right-ear="middle"
				>
					<h2>MAP</h2>
					<h3>
						<a target="_blank" href="http://lewiis.top/search/map">Baidu Map</a>
					</h3>
					<p class="shop uemachi" title="uemachi">うえまち団子</p>
				</mochi-box>
				<mochi-box
					shiba="kinako"
					mood="gleam"
					blush
					left-eye="open"
					right-eye="open"
					left-ear="middle"
					right-ear="middle"
				>
					<h2>Util</h2>
					<h3>
						<a target="_blank" href="http://lewiis.top/search/javascript"
							>JavaScript</a
						>
					</h3>
					<p class="shop uemachi" title="uemachi">うえまち団子</p>
				</mochi-box>
				<mochi-box
					shiba="sakura"
					mood="cute"
					blush
					left-eye="shy"
					right-eye="open"
					left-ear="down"
					right-ear="middle"
				>
					<h2>CSS</h2>
					<h3>
						<a target="_blank" href="http://lewiis.top/search/css">CSS</a>
					</h3>
					<p class="shop uemachi" title="uemachi">うえまち団子</p>
				</mochi-box>
				<mochi-box
					shiba="monaka"
					mood="content"
					left-eye="open"
					right-eye="wink"
					left-ear="middle"
					right-ear="flat"
				>
					<h2>Electron</h2>
					<h3>
						<a target="_blank" href="http://lewiis.top/search/electron"
							>Electron</a
						>
					</h3>
					<p class="shop uemachi" title="uemachi">うえまち団子</p>
				</mochi-box>
			</div>

			<!--焦点图-->
			<div class="top-feature" v-if="!hideSlogan">
				<section-title>
					<div style="display: flex; align-items: flex-end">
						{{ $t("index.focus") }}
						<small-ico></small-ico>
					</div>
				</section-title>
				<div class="feature-content">
					<div class="feature-item" v-for="item in features" :key="item.id">
						<Feature :data="item"></Feature>
					</div>
				</div>
			</div>
			<!--文章列表-->
			<main class="site-main" :class="{ search: hideSlogan }">
				<section-title v-if="!hideSlogan">{{
					$t("index.recommend")
				}}</section-title>
				<div v-for="item in postList" :key="item.id">
					<post :post="item"></post>
				</div>
			</main>

			<!-- 分页 -->
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="searchCondition.pageNum"
				:page-sizes="[5, 10, 20, 50]"
				:page-size="searchCondition.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			>
			</el-pagination>
		</div>
	</div>
</template>

<script>
import Banner from "@/components/banner";
import Feature from "@/components/feature";
import sectionTitle from "@/components/section-title";
import Post from "@/components/post";
import SmallIco from "@/components/small-ico";
import Quote from "@/components/quote";
import MochiBox from "@/components/MochiBox";
import { fetchFocus } from "@/api/focus";
import { fetchList } from "@/api/post";
import MochiBoxVue from "../components/MochiBox.vue";

export default {
	name: "Home",
	props: ["cate", "words"],
	data() {
		return {
			features: [],
			postList: [],
			searchCondition: {
				pageNum: 1,
				pageSize: 10,
				category: "",
				keyword: "",
			},
			total: 0,
		};
	},
	components: {
		Banner,
		Feature,
		sectionTitle,
		Post,
		SmallIco,
		Quote,
		MochiBox,
		MochiBoxVue,
	},
	watch: {
		$route: {
			deep: true,
			immediate: true,
			handler() {
				this.searchCondition.category = this.$route.params.cate;
				this.searchCondition.keyword = this.$route.params.words;
				this.fetchList();
			},
		},
	},
	filters: {
		filterCategory(val) {
			if (val === "technology") {
				return "技术";
			} else if (val === "reading") {
				return "读书小记";
			} else if (val === "essays") {
				return "随便唠唠";
			}
		},
	},
	computed: {
		hideSlogan() {
			return this.searchCondition.category || this.searchCondition.keyword;
		},
		notice() {
			return this.$store.getters.notice;
		},
	},
	methods: {
		fetchFocus() {
			fetchFocus()
				.then((res) => {
					this.features = res.data || [];
				})
				.catch((err) => {});
		},
		fetchList() {
			fetchList(this.searchCondition)
				.then((res) => {
					this.postList = res.data.list || [];
					this.total = res.data.total;
				})
				.catch((err) => {});
		},
		saveVisitorInfo() {
			let visitorInfo = JSON.parse(localStorage.getItem("visitorInfo"));
			visitorInfo = Object.assign({}, visitorInfo, {
				type: "Lewiis的个人博客",
			});
			let wel = new Date().getHours();
			wel =
				wel < 6
					? "凌晨好"
					: wel < 9
					? "早上好"
					: wel < 12
					? "上午好"
					: wel < 14
					? "中午好"
					: wel < 17
					? "下午好"
					: wel < 19
					? "傍晚好"
					: wel < 22
					? "晚上好"
					: "夜里好";
			this.$message({
				message: `${wel},感谢大佬的来访，身体健康，恭喜发财！`,
				duration: 1000,
			});
		},
		handleSizeChange(val) {
			this.searchCondition.pageNum = 1;
			this.searchCondition.pageSize = val;
			this.fetchList();
		},
		handleCurrentChange(val) {
			this.searchCondition.pageNum = val;
			this.fetchList();
		},
	},
	mounted() {
		this.fetchFocus();
		this.fetchList();
		this.saveVisitorInfo();
	},
};
</script>
<style scoped lang="less">
.site-content {
	.notify {
		margin: 60px 0;
		border-radius: 3px;

		.themes {
			width: 100%;
			display: flex;
			justify-content: space-between;
		}

		& > div {
			padding: 20px;
		}
	}

	.search-result {
		padding: 15px 20px;
		text-align: center;
		font-size: 20px;
		font-weight: 400;
		border: 1px dashed #ddd;
		color: #828282;
	}
}

.top-feature {
	width: 100%;
	height: auto;
	margin-top: 30px;

	.feature-content {
		margin-top: 10px;
		display: flex;
		justify-content: space-between;
		position: relative;
	}
}

.site-main {
	padding-top: 80px;

	&.search {
		padding-top: 0;
	}
}

.more {
	margin: 50px 0;

	.more-btn {
		width: 100px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		color: #adadad;
		border: 1px solid #adadad;
		border-radius: 20px;
		margin: 0 auto;
		cursor: pointer;

		&:hover {
			color: #8fd0cc;
			border: 1px dashed #8fd0cc;
		}
	}
}

.el-pagination {
	display: flex;
	justify-content: center;
	margin-bottom: 24px;
}

/******/
@media (max-width: 800px) {
	.top-feature {
		display: none;
	}

	.site-main {
		padding-top: 40px;
	}

	.site-content {
		.notify {
			margin: 30px 0 0 0;
		}

		.search-result {
			margin-bottom: 20px;
			font-size: 16px;
		}
	}
}

/******/
</style>
