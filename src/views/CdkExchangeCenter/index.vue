<template>
	<div class="reply">
		<div class="site-content">
			<section-title>
				<div class="cdk-header">
					<div class="title">{{ $t("index.menu.cdk") }}</div>
					<div class="apply" v-if="authUserInfo.username">
						<a @click="openRecordModal"
							><i class="el-icon-s-order"></i>
							{{ $t("index.menu.exchange_records") }}</a
						>
					</div>
				</div>
			</section-title>
			<el-form
				:model="ruleForm"
				:rules="rules"
				ref="ruleForm"
				label-width="100px"
			>
				<el-form-item label="CDK-ID：" prop="cdkId">
					<el-input
						v-model="ruleForm.cdkId"
						autocomplete="new-password"
						clearable
						maxlength="255"
						show-word-limit
						placeholder="请输入CDK-ID"
					></el-input>
				</el-form-item>
				<el-form-item label="CD-KEY：" prop="cdkCode">
					<el-input
						v-model="ruleForm.cdkCode"
						autocomplete="new-password"
						clearable
						maxlength="255"
						show-word-limit
						placeholder="请输入CD-KEY"
					></el-input>
				</el-form-item>
				<el-form-item label="验证码：" prop="authCode">
					<el-input
						v-model="ruleForm.authCode"
						autocomplete="new-password"
						placeholder="请输入验证码"
					>
						<canvas
							@click="draw(show_num)"
							slot="append"
							id="canvas"
							width="100"
							height="34"
						></canvas>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						@click="submitForm('ruleForm')"
						icon="el-icon-key"
						:loading="isLoadingExchangeBtn"
						>立即兑奖</el-button
					>
					<el-button @click="resetForm('ruleForm')" icon="el-icon-refresh"
						>重置</el-button
					>
				</el-form-item>
			</el-form>
		</div>
		<!-- 个人兑换记录列表 -->
		<el-dialog
			title="兑换记录"
			:visible.sync="dialogTableVisible"
			:close-on-click-modal="false"
		>
			<el-table :data="gridData" v-loading="isLoadingData">
				<el-table-column label="兑换者" min-width="120">
					<div>{{ authUserInfo.username }}</div>
				</el-table-column>
				<el-table-column
					property="claim_time"
					label="兑换时间"
					min-width="160"
				></el-table-column>
				<el-table-column label="兑换额度">
					<template slot-scope="scope">
						<div>{{ scope.row.cdk_quota }} 分</div>
					</template>
				</el-table-column>
				<el-table-column label="当前总积分" min-width="120">
					<div>{{ authUserInfo.integral }} 分</div>
				</el-table-column>
			</el-table>
		</el-dialog>
	</div>
</template>

<script>
import sectionTitle from "@/components/section-title";
import Quote from "@/components/quote";
import { getCurrentOauthUserInfo } from "@/utils/oauth";
import { fetchCdkRecord, exchangeCdk } from "@/api/cdk";

export default {
	name: "Friend",
	data() {
		return {
			ruleForm: {
				cdkCode: "",
				authCode: "",
				cdkId: "",
			},
			rules: {
				cdkId: [
					{ required: true, message: "请输入CDK-ID", trigger: "blur" },
					{
						min: 8,
						max: 255,
						message: "长度在 8 到 255 个字符",
						trigger: "blur",
					},
				],
				cdkCode: [
					{ required: true, message: "请输入CD-KEY", trigger: "blur" },
					{
						min: 8,
						max: 255,
						message: "长度在 8 到 255 个字符",
						trigger: "blur",
					},
				],
				authCode: [
					{ required: true, message: "请输入验证码", trigger: "blur" },
				],
			},
			show_num: [],
			authUserInfo: {},
			dialogTableVisible: false,
			gridData: [],
			isLoadingData: false,
			isLoadingExchangeBtn: false,
			pageNum: 1,
			pageSize: 10,
		};
	},
	components: {
		Quote,
		sectionTitle,
	},
	computed: {},
	created() {
		this.authUserInfo = getCurrentOauthUserInfo();
	},
	mounted() {
		this.draw(this.show_num);
	},
	methods: {
		// 提交资源申请表单
		submitForm(formName) {
			this.$refs[formName].validate(async (valid) => {
				if (valid) {
					try {
						this.isLoadingExchangeBtn = true;
						const val = this.ruleForm.authCode.toLowerCase(); //toLowerCase()函数将字符串中的所有字符转为小写。所以输入框不区分大小写。
						const num = this.show_num.join("");
						if (val == num) {
							const res = await exchangeCdk({
								cdkCode: this.ruleForm.cdkCode,
								cdkId: this.ruleForm.cdkId,
								claimUserId: this.authUserInfo.id,
							});
							if (res.status === 200) {
								this.$message.success(`CD-KEY兑换成功！`);
								this.resetForm("ruleForm");
							} else {
								this.$message.error(res.errors);
							}
						} else {
							this.$message.error("验证码错误，请重新输入！");
						}
					} catch (error) {
						this.$message.error(error);
					} finally {
						this.isLoadingExchangeBtn = false;
					}
				} else {
					return false;
				}
			});
		},
		// 重置表单
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 生成验证码
		draw(show_num) {
			//生成并渲染出验证码图形
			var canvas_width = 100;
			var canvas_height = 34;
			var canvas = document.getElementById("canvas"); //获取canvas
			var context = canvas.getContext("2d"); //获取到canvas画图的环境
			canvas.width = canvas_width;
			canvas.height = canvas_height;
			var sCode =
				"A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,1,2,3,4,5,6,7,8,9,0";
			var aCode = sCode.split(",");
			var aLength = aCode.length; //获取到数组的长度
			for (var i = 0; i < 4; i++) {
				//这里的for循环可以控制验证码位数
				var j = Math.floor(Math.random() * aLength); //获取到随机的索引值
				var deg = Math.random() - 0.5; //产生一个随机弧度
				var txt = aCode[j]; //得到随机的一个内容
				show_num[i] = txt.toLowerCase();
				var x = 10 + i * 20; //文字在canvas上的x坐标
				var y = 20 + Math.random() * 8; //文字在canvas上的y坐标
				context.font = "bold 24px 微软雅黑";
				context.translate(x, y);
				context.rotate(deg);
				context.fillStyle = this.randomColor();
				context.fillText(txt, 0, 0);
				context.rotate(-deg);
				context.translate(-x, -y);
			}
			// 随即线条
			for (var i = 0; i <= 5; i++) {
				//验证码上显示线条
				context.strokeStyle = this.randomColor();
				context.beginPath();
				context.moveTo(
					Math.random() * canvas_width,
					Math.random() * canvas_height
				);
				context.lineTo(
					Math.random() * canvas_width,
					Math.random() * canvas_height
				);
				context.stroke();
			}
			// 随机圆点
			for (var i = 0; i <= 20; i++) {
				//验证码上的小点
				context.strokeStyle = this.randomColor(); //随机生成
				context.beginPath();
				var x = Math.random() * canvas_width;
				var y = Math.random() * canvas_height;
				context.moveTo(x, y);
				context.lineTo(x + 1, y + 1);
				context.stroke();
			}
		},
		//得到随机的颜色值
		randomColor() {
			var r = Math.floor(Math.random() * 256);
			var g = Math.floor(Math.random() * 256);
			var b = Math.floor(Math.random() * 256);
			return `rgb(${r}, ${g}, ${b})`;
		},
		// 打开兑换记录modal
		openRecordModal() {
			this.authUserInfo = getCurrentOauthUserInfo();
			this.dialogTableVisible = true;
			this.getCdkRecord();
		},
		// 获取个人兑换列表
		async getCdkRecord() {
			try {
				this.isLoadingData = true;
				const res = await fetchCdkRecord({
					claimUserId: this.authUserInfo.id,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
				});
				if (res.code === 200) {
					this.gridData = res.data.list;
				} else {
					this.$message.error(res.errors);
				}
			} catch (error) {
				this.$message.error(error);
			} finally {
				this.isLoadingData = false;
			}
		},
	},
};
</script>

<style scoped lang="less">
.reply {
	padding-top: 40px;
}

.cdk-header {
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

/*******/
@media (max-width: 800px) {
	.cdk-header {
		margin-top: 0;
	}
}

.el-form {
	margin-top: 12px;
	#canvas {
		vertical-align: middle;
	}
}
</style>
