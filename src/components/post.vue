<template>
	<article class="post post-list">
		<div class="post-entry">
			<div class="feature">
				<router-link
					:to="{
						path: `/article/${post.id}`,
					}"
				>
					<img :src="post.banner" />
				</router-link>
			</div>
			<h1 class="entry-title">
				<router-link
					:to="{
						path: `/article/${post.id}`,
					}"
				>
					{{ post.title }}
				</router-link>
			</h1>
			<div class="p-time">
				<i class="iconfont iconmeditor-time"> </i>
				{{ conversePubTime(post.pubTime)
				}}<i
					v-if="post.viewsCount >= 100"
					class="iconfont iconfire"
					style="margin-left: 5px; color: #ff6d6d"
				></i>
			</div>
			<p class="summary">{{ post.summary }}</p>
			<footer class="entry-footer">
				<div class="post-more">
					<router-link
						:to="{
							path: `/article/${post.id}`,
						}"
						><i class="iconfont iconfish-li" style="font-size: 25px"></i
					></router-link>
				</div>
				<div class="info-meta">
					<div class="views">
						<span
							><i class="iconfont iconeyes"></i>{{ post.viewsCount }} 热度</span
						>
					</div>
				</div>
			</footer>
		</div>
		<hr />
	</article>
</template>

<script>
import dayjs from "dayjs";
export default {
	name: "post",
	props: {
		post: {
			type: Object,
		},
	},
	computed: {
		conversePubTime() {
			return (pubTime) => {
				return dayjs(pubTime).format("YYYY-MM-DD HH:mm:ss");
			};
		},
	},
};
</script>

<style scoped lang="less">
.post {
	margin: 0 0 4% 0;
	position: relative;
}

.post-entry {
	.feature {
		position: absolute;
		margin-top: 10px;

		img {
			width: 100px;
			height: 100px;
			object-fit: cover;
			border-radius: 50%;
			padding: 2px;
			border: 1px solid #dadada;
			position: relative;
			transition: all 0.2s linear;
			overflow: hidden;

			&:hover {
				transform: scale(1.2, 1.2);
				filter: contrast(150%);
			}
		}
	}

	.entry-title {
		font-size: 21px;
		font-weight: 600;
		line-height: 50px;
		margin: 0 0 0 17%;
		position: relative;
		z-index: 1;

		color: #737373;

		& a:hover {
			color: #8fd0cc;
		}

		a {
			display: inline-block;
			width: 65%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	.p-time {
		position: absolute;
		right: 0;
		top: 16px;
		font-size: 12px;
		color: #989898;
		letter-spacing: 1px;
		font-family: din, "Hiragino Sans GB", "Microsoft Yahei", Arial, sans-serif;
		display: flex;
		align-items: center;
	}

	p.summary {
		min-height: 60px;
		margin: 0 0 0 18%;
		font-size: 16px;
		color: #6f6f6f;
		letter-spacing: 1px;
		line-height: 2rem;
		display: -webkit-box;
		overflow: hidden;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}

	footer.entry-footer {
		margin: 0 0 0 17%;
		list-style: none;

		.post-more {
			margin-top: 10px;
			text-align: right;
			color: #a0dad0;

			a:hover {
				color: #737373;
			}
		}

		.info-meta {
			margin-top: 10px;
			font-family: din, "Hiragino Sans GB", "Microsoft Yahei", Arial, sans-serif;
			position: absolute;
			top: 20px;
			opacity: 0;
			padding-top: 8px;
			border-top: 1px solid #ddd;
			-webkit-transform: translate3d(-150px, 0, 0);
			transform: translate3d(-150px, 0, 0);
			visibility: hidden;
			transition: 0.7s all ease;
			-webkit-transition: 0.6s all ease;
			-moz-transition: 0.6s all linear;
			-o-transition: 0.6s all ease;
			-ms-transition: 0.6s all ease;

			span,
			a {
				color: #b3b3b3;
				font-size: 12px;
			}

			i {
				margin-top: 3px;
				margin-right: 10px;
				float: left;
			}
		}

		.comnum {
			float: left;
		}
	}
}

.post-entry:hover footer.entry-footer .info-meta {
	-webkit-transform: translate3d(-230px, 0, 0);
	transform: translate3d(-230px, 0, 0);
	opacity: 1;
	visibility: visible;
}

.post hr {
	width: 30%;
	height: 1px;
	margin: 0 auto;
	border: 0;
	background: #efefef;
}

/*******/
@media (max-width: 1060px) {
	.info-meta {
		display: none;
	}
}

@media (max-width: 800px) {
	.post-entry {
		.feature img {
			width: 50px;
			height: 50px;
		}

		.entry-title {
			font-size: 16px;
			line-height: 30px;
			margin: 0 0 0 65px;
		}

		.p-time {
			position: relative;
			margin: -15px 0 0 65px;
		}

		p.summary {
			margin: 20px 0 0 65px;
			font-size: 14px;
			height: 30px;
			overflow: hidden;
		}

		.post-more {
			display: none;
		}
	}

	.post-list hr {
		margin-top: 20px;
	}
}

/******/
</style>
