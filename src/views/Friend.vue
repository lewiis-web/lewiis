<template>
	<div class="friend">
		<div class="site-content">
			<section-title>
				<div class="friend-header">
					<div class="title">{{ $t("index.friendUrl.title") }}</div>
					<div class="apply">
						<router-link to="/about#Guestbook"
							>+ {{ $t("index.friendUrl.join") }}</router-link
						>
					</div>
				</div>
			</section-title>
			<div class="statement">
				<quote>
					<p>{{ $t("index.friendUrl.siteName") }}：{{ websiteInfo.name }}</p>
					<p>{{ $t("index.friendUrl.siteUrl") }}：{{ websiteInfo.domain }}</p>
					<p>{{ $t("index.friendUrl.desc") }}：{{ websiteInfo.profile }}</p>
				</quote>
			</div>
			<hr />
			<div class="friend-list animate">
				<div class="friend-item" v-for="item in list" :key="item.id">
					<a target="_blank" :href="item.path">
						<div class="site-name">{{ item.siteName }}</div>
						<div class="site-detail">{{ item.description }}</div>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import sectionTitle from "@/components/section-title";
import Quote from "@/components/quote";
import { fetchFriend } from "../api/friend";
export default {
	name: "Friend",
	data() {
		return {
			websiteInfo: {},
			list: [],
		};
	},
	components: {
		Quote,
		sectionTitle,
	},
	methods: {
		fetchFriend() {
			fetchFriend().then((res) => {
				this.list = res.data || [];
			});
		},
		getWebSiteInfo() {
			this.$store.dispatch("getSiteInfo").then((data) => {
				this.websiteInfo = data;
			});
		},
	},
	mounted() {
		this.getWebSiteInfo();
		this.fetchFriend();
	},
};
</script>

<style scoped lang="less">
.friend {
	padding-top: 40px;
}

.friend-header {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 80px;
	font-weight: 400;

	.title {
		font-size: 20px;
	}

	.apply:hover {
		color: #ff6d6d;
	}
}

.statement {
	margin: 60px 0 20px 0;

	a {
		color: #ff6d6d;
	}

	p {
		line-height: 2rem;
	}
}

hr {
	margin: 40px 0;
	border: 0;
	height: 1px;
	background-image: linear-gradient(
		to right,
		rgba(0, 0, 0, 0),
		rgba(255, 109, 109, 0.75),
		rgba(0, 0, 0, 0)
	);
}

.friend-list {
	width: 100%;

	.friend-item {
		display: inline-block;
		width: 30%;
		/*height: 100px;*/
		margin: 0 5% 20px 0;
		padding: 10px 30px;
		border: 1px solid #ececec;
		border-radius: 3px;

		&:hover {
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		}

		&:nth-of-type(3n) {
			margin-right: 0;
		}

		.site-name,
		.site-detail {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			padding-bottom: 10px;
			line-height: 1.5rem;
		}

		.site-name {
			color: #8fd0cc;
			border-bottom: 1px dotted #ececec;
		}

		.site-detail {
			font-size: 13px;
			padding-top: 10px;
		}
	}
}

/*******/
@media (max-width: 800px) {
	.friend-header {
		margin-top: 0;
	}

	.friend-list {
		.friend-item {
			width: 45%;

			&:nth-of-type(2n) {
				margin-right: 0;
			}

			&:nth-of-type(3n) {
				margin-right: 5%;
			}
		}
	}
}

@media (max-width: 600px) {
	.friend-list {
		.friend-item {
			display: block;
			width: 90%;
			margin: 0 auto 20px auto;

			&:nth-of-type(2n) {
				margin-right: auto;
			}

			&:nth-of-type(3n) {
				margin-right: auto;
			}
		}
	}
}
</style>
