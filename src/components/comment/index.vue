<template>
	<div class="comment">
		<div class="operate">
			<a @click="openCommentModal">评论</a>
		</div>
		<div
			class="comment-parent"
			v-for="parentItem in dataSource"
			:key="parentItem.comment_id"
		>
			<div class="avatar"></div>
			<div class="content">
				<ul class="comment-son">
					<li
						v-for="sonItem in parentItem['children']"
						:key="sonItem.comment_id"
					></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import "./style.less";
export default {
	props: {
		dataSource: {
			type: Array,
			default: [],
		},
	},
	data() {
		return {
			isShowCommentModal: false,
		};
	},
	methods: {
		openCommentModal() {
			this.isShowCommentModal = true;
		},
	},
};
</script>