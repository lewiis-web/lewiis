<template>
	<div class="comment">
		<div class="operate">
			<h2>评论</h2>
			<div class="comment-box">
				<div class="box-avatar">
					<el-avatar
						v-if="isLogin"
						:size="50"
						:src="
							Object.keys(sqlUserInfo).length > 0
								? sqlUserInfo.avatar
								: 'http://lewiis.top/img/rabbit.84962985.svg'
						"
					>
					</el-avatar>
					<el-avatar v-else :size="50" icon="el-icon-user-solid"> </el-avatar>
				</div>
				<div class="box-area">
					<el-input
						type="textarea"
						:placeholder="
							isLogin
								? '请输入评论（Enter换行，Ctrl+Enter发送）'
								: '看完了，登录一下留个评论行不行？'
						"
						v-model="textarea"
						maxlength="255"
						show-word-limit
						:rows="3"
						@keydown.enter.native="keydownSendComment"
						:disabled="!isLogin"
					></el-input>
					<div class="box-footer">
						<el-popover
							placement="bottom-start"
							width="400"
							trigger="click"
							popper-class="emoji-list-box"
						>
							<ul class="emojis">
								<li
									class="emoji-li"
									v-for="emojiItem in emojiList"
									:key="emojiItem.codes"
									@click="selectEmoji(emojiItem, 'comment')"
								>
									{{ emojiItem.char }}
								</li>
							</ul>
							<div
								v-if="isLogin"
								class="emoji"
								slot="reference"
								@mouseenter="handleEmoji('enter')"
								@mouseleave="handleEmoji('leave')"
							>
								<img
									class="emoji-svg"
									:src="
										emojiStatus === 'enter'
											? require('./icons/emoji-active.svg')
											: require('./icons/emoji.svg')
									"
									alt=""
								/>
								<span
									:style="
										emojiStatus === 'enter'
											? { color: '#d81e06' }
											: { color: '#757575' }
									"
									>表情</span
								>
							</div>
						</el-popover>

						<a
							v-if="isLogin"
							:class="textarea.trim() && isLogin ? 'send-btn' : 'disabled'"
							@click="sendComment"
							><i class="el-icon-edit" style="margin-right: 6px"></i>发表评论</a
						>
					</div>
				</div>
			</div>
		</div>
		<div
			class="comment-parent"
			v-for="parentItem in comments"
			:key="parentItem.comment_id"
		>
			<div class="avatar">
				<el-avatar :size="50" :src="parentItem.comment_user_info.avatar">
				</el-avatar>
			</div>
			<div class="content">
				<h3 class="comment-title">
					{{ parentItem.comment_user_info.username }}
				</h3>
				<p class="comment-content">
					{{ Base64.decode(parentItem.comment_content) }}
				</p>
				<div class="comment-info">
					<p class="comment-time">{{ parentItem.create_time }}</p>
					<div class="comment-btn">
						<div class="praise">
							<i
								class="el-icon-thumb"
								@click="hopComment(parentItem.comment_id, 1)"
							></i>
							<span>{{ parentItem.comment_like_count }}</span>
						</div>
						<div class="hate">
							<i
								class="el-icon-thumb"
								style="rotate: 180deg; transform: rotateY(180deg)"
								@click="hopComment(parentItem.comment_id, 0)"
							></i>
							<span>{{ parentItem.comment_hate_count }}</span>
						</div>
					</div>
					<a
						@click="openReplyModal(parentItem)"
						class="reply"
						v-if="computeIsReply(parentItem)"
						>回复</a
					>
					<a
						@click="deleteComment(parentItem)"
						class="reply"
						v-if="computeIsDelete(parentItem)"
						>删除</a
					>
				</div>
				<ul class="comment-son">
					<li
						v-for="sonItem in parentItem['children']"
						:key="sonItem.comment_id"
						class="comment-son-li"
					>
						<div class="avatar">
							<el-avatar :size="36" :src="sonItem.comment_user_info.avatar">
							</el-avatar>
						</div>
						<div class="content">
							<h3 class="comment-title">
								{{ sonItem.comment_user_info.username
								}}<span
									style="color: #545454; margin: 0 6px; font-size: 15px"
									v-show="sonItem.to_comment_son_id"
									>回复</span
								>
								<span v-if="sonItem.to_comment_son_id">{{
									sonItem.to_comment_son_info.username
								}}</span>
							</h3>
							<p class="comment-content">
								{{ Base64.decode(sonItem.comment_content) }}
							</p>
							<div class="comment-info">
								<p class="comment-time">{{ sonItem.create_time }}</p>
								<div class="comment-btn">
									<div class="praise">
										<i
											class="el-icon-thumb"
											@click="hopComment(sonItem.comment_id, 1)"
										></i>
										<span>{{ sonItem.comment_like_count }}</span>
									</div>
									<div class="hate">
										<i
											class="el-icon-thumb"
											style="rotate: 180deg; transform: rotateY(180deg)"
											@click="hopComment(sonItem.comment_id, 0)"
										></i>
										<span>{{ sonItem.comment_hate_count }}</span>
									</div>
								</div>
								<a
									@click="openReplyModal(sonItem, parentItem)"
									class="reply"
									v-if="computeIsReply(sonItem)"
									>回复</a
								>
								<a
									@click="deleteComment(sonItem)"
									class="reply"
									v-if="computeIsDelete(sonItem)"
									>删除</a
								>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<!-- 回复modal -->
		<el-dialog
			title="回复"
			:visible.sync="replyVisible"
			width="30%"
			@close="handleClose"
			:close-on-click-modal="false"
		>
			<div class="operate">
				<div class="comment-box">
					<div class="box-avatar">
						<el-avatar
							v-if="isLogin"
							:size="50"
							:src="
								Object.keys(sqlUserInfo).length > 0
									? sqlUserInfo.avatar
									: 'http://lewiis.top/img/rabbit.84962985.svg'
							"
						>
						</el-avatar>
						<el-avatar v-else :size="50" icon="el-icon-user-solid"> </el-avatar>
					</div>
					<div class="box-area">
						<el-input
							type="textarea"
							placeholder="请输入评论（Enter换行，Ctrl+Enter发送）"
							v-model="replyArea"
							maxlength="255"
							show-word-limit
							:rows="3"
							@keydown.enter.native="keydownReplyComment"
						></el-input>
						<div class="box-footer">
							<el-popover
								placement="bottom-start"
								width="400"
								trigger="click"
								popper-class="emoji-list-box"
							>
								<ul class="emojis">
									<li
										class="emoji-li"
										v-for="emojiItem in emojiList"
										:key="emojiItem.codes"
										@click="selectEmoji(emojiItem, 'reply')"
									>
										{{ emojiItem.char }}
									</li>
								</ul>
								<div
									class="emoji"
									slot="reference"
									@mouseenter="handleEmoji('enter')"
									@mouseleave="handleEmoji('leave')"
								>
									<img
										class="emoji-svg"
										:src="
											emojiStatus === 'enter'
												? require('./icons/emoji-active.svg')
												: require('./icons/emoji.svg')
										"
										alt=""
									/>
									<span
										:style="
											emojiStatus === 'enter'
												? { color: '#d81e06' }
												: { color: '#757575' }
										"
										>表情</span
									>
								</div>
							</el-popover>

							<a
								:class="
									replyArea.trim() ? 'reply-btn' : 'reply-btn reply-disabled'
								"
								@click="replyComment()"
								>回复</a
							>
						</div>
					</div>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import emojiList from "./emoji.json";
import {
	handleHopComment,
	publishComment,
	deleteOwnComment,
} from "@/api/comment";
import { Base64 } from "js-base64";
import { calculateIsLogin, getCurrentOauthUserInfo } from "@/utils/oauth";

export default {
	props: {
		dataSource: {
			type: Array,
			default: () => {
				return [];
			},
		},
	},
	data() {
		return {
			isShowCommentModal: false,
			textarea: "",
			nickname: "",
			email: "",
			emojiStatus: "",
			emojiList,
			comments: [],
			replyVisible: false,
			replyArea: "",
			currentArticleId: "",
			Base64,
			currentParentItem: null,
			currentItem: null,
			isLogin: false,
			currentAuthUserInfo: {},
			sqlUserInfo: {},
		};
	},
	watch: {
		dataSource: {
			immediate: true,
			deep: true,
			handler(newVal) {
				this.comments = newVal;
			},
		},
	},
	computed: {
		// 是否存在删除按钮
		computeIsDelete() {
			return (parentItem) => {
				const sui = sessionStorage.getItem("sqlUserInfo");
				const sqlUserInfo = JSON.parse(sui);
				return (
					this.isLogin && parentItem.comment_user_info.id === sqlUserInfo.id
				);
			};
		},
		// 是否存在回复按钮
		computeIsReply() {
			return (item) => {
				const sui = sessionStorage.getItem("sqlUserInfo");
				const sqlUserInfo = JSON.parse(sui);
				return this.isLogin && item.comment_user_info.id !== sqlUserInfo.id;
			};
		},
	},
	created() {
		this.comments = this.dataSource;
		this.currentArticleId = this.$route.params.id;
		this.isLogin = calculateIsLogin();
		this.currentAuthUserInfo = getCurrentOauthUserInfo();
	},
	mounted() {
		const sui = sessionStorage.getItem("sqlUserInfo");
		this.sqlUserInfo = sui ? JSON.parse(sui) : {};
	},
	methods: {
		// ctrl+enter发送
		keydownSendComment(e) {
			if (e.ctrlKey && e.keyCode == 13) {
				this.sendComment();
			}
		},
		// ctrl+enter回复
		keydownReplyComment(e) {
			if (e.ctrlKey && e.keyCode == 13) {
				this.replyComment();
			}
		},
		// 发表评论
		async sendComment() {
			try {
				const sui = sessionStorage.getItem("sqlUserInfo");
				const sqlUserInfo = JSON.parse(sui);
				if (this.textarea.trim()) {
					//用户点击了ctrl+enter触发
					const ret = await publishComment({
						hierarchy: 1,
						to_article_id: this.currentArticleId * 1,
						comment_content: this.textarea.trim(),
						comment_user_id: sqlUserInfo.id,
					});
					if (ret.status == 200) {
						this.$message.success("发表成功！");
						this.textarea = "";
						this.$emit("updateComment");
					} else {
						this.$message.error(ret.msg);
					}
				}
			} catch (error) {
				this.$message.error(error);
			}
		},
		handleEmoji(status) {
			this.emojiStatus = status;
		},
		// 选择表情
		selectEmoji(emoji, type) {
			if (type === "comment") {
				this.textarea += emoji.char;
			} else if (type === "reply") {
				this.replyArea += emoji.char;
			}
		},
		// 回复modal
		openReplyModal(row, parentRow) {
			this.replyVisible = true;
			this.currentItem = row;
			if (parentRow) {
				this.currentParentItem = parentRow;
			} else {
				this.currentParentItem = null;
			}
		},
		// 回复评论
		async replyComment() {
			try {
				const sui = sessionStorage.getItem("sqlUserInfo");
				const sqlUserInfo = JSON.parse(sui);
				const res = await publishComment({
					hierarchy: 2,
					to_article_id: this.currentArticleId * 1,
					comment_content: this.replyArea.trim(),
					comment_user_id: sqlUserInfo.id,
					to_comment_parent_id: this.currentParentItem
						? this.currentParentItem.comment_id
						: this.currentItem.comment_id,
					to_comment_son_id: this.currentParentItem
						? this.currentItem.comment_id
						: "",
				});
				if (res.status == 200) {
					this.$message.success("回复成功！");
					this.$emit("updateComment");
					this.replyArea = "";
					this.replyVisible = false;
				} else {
					this.$message.error(res.msg);
				}
			} catch (error) {
				this.$message.error(error);
			}
		},
		// 关闭modal之前的回调
		handleClose() {
			this.replyArea = "";
		},
		// 门户点赞/讨厌评论+1(0-讨厌 1-点赞)
		async hopComment(comment_id, comment_type) {
			try {
				const res = await handleHopComment({ comment_id, comment_type });
				if (res.status == 200) {
					this.$emit("updateComment");
				} else {
					this.$message.error(res.msg);
				}
			} catch (error) {
				this.$message.error(error);
			}
		},
		// 删除自己的评论
		deleteComment(item) {
			this.$confirm("此操作将永久删除该评论, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(async () => {
					const sui = sessionStorage.getItem("sqlUserInfo");
					const sqlUserInfo = JSON.parse(sui);
					const ret = await deleteOwnComment({
						comment_id: item.comment_id,
						comment_user_id: sqlUserInfo.id,
						isDeleted: 1,
					});
					if (ret.status == 200) {
						this.$message({
							type: "success",
							message: "评论删除成功!",
						});
						this.$emit("updateComment");
					} else {
						this.$message.error(ret.msg);
					}
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消删除操作",
					});
				});
		},
	},
};
</script>

<style lang="less" scoped>
@import "./style.less";
</style>

<style lang="less">
.emoji-list-box {
	ul.emojis {
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		overflow-x: hidden;
		overflow-y: auto;
		height: 220px;
		li.emoji-li {
			box-sizing: border-box;
			width: 28px;
			height: 28px;
			text-align: center;
			line-height: 28px;
			font-size: 16px;
			transition: font-size 0.2s;
		}
		li.emoji-li:hover {
			font-size: 20px;
		}
	}
}
</style>