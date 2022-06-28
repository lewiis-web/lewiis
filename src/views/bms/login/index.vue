

<template>
  <div id="login">
    <div class="from">
      <h2>Lewiis的个人博客后台登录</h2>
      <!-- 个人登录 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            type="phone"
            placeholder="请输入用户名"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="code">
            <drag-verify
              ref="dragVerify"
              :isPassing.sync="isPassing"
              :width="352"
              text="请按住滑块拖动"
              successText="验证通过"
              handlerIcon="el-icon-d-arrow-right"
              successIcon="el-icon-circle-check"
            >
            </drag-verify>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            class="loginButton"
            type="primary"
            @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { _cookie } from "@/utils/token";
// 图片滑块组件
import dragVerify from "./dragVerify";
import { login } from "@/api/user";
export default {
  data() {
    return {
      isPassing: false,
      msg: "",
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "必填", trigger: "blur" }],
        password: [{ required: true, message: "必填", trigger: "blur" }],
      },
      showCompany: false,
    };
  },
  components: {
    dragVerify,
  },
  mounted() {},
  methods: {
    submitForm() {
      if (this.isPassing) {
        if (this.ruleForm.username && this.ruleForm.password) {
          this.login();
        } else {
          this.$message.error("登录失败");
        }
      } else {
        this.$message.error("验证码错误");
      }
    },
    async login() {
      let res = await login({
        password: this.ruleForm.password,
        username: this.ruleForm.username,
      });
      if (res.code === 200) {
        _cookie.setCookie("user", JSON.stringify(res.currentUser));
        this.$router.push({ path: "/bms/home" });
      } else {
        this.$message.error(res.msg);
      }
    },
    async getNews(k) {
      let res = await this.$http.get(
        "/home/clientCompany/getCompanyName",
        { params: { k: k } },
        {
          headers: {
            "Content-Type": `Application/json`,
          },
        }
      );
      if (res.data.result_code === 0) {
        this.showCompany = true;
        this.companyList = res.data.data;
      }
    },
  },
};
</script>

<style lang="less" scoped>
#login {
  width: 100vw;
  height: calc(100vh - 80px);
  background: no-repeat url("../../../assets/images/bg.jpg");
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  padding: 0;
  margin: 0;
  margin-top: 80px;
  .from {
    border-radius: 10px;
    width: 400px;
    // height: 400px;
    background-color: #fff;
    position: absolute;
    left: calc(50% - 200px);
    top: calc(50% - 178px);
    box-sizing: border-box;
    padding: 24px;
    .el-form-item {
      margin-bottom: 24px;
    }
    h2 {
      font-weight: 600;
      font-size: 24px;
      margin-bottom: 24px;
    }
    .from-p {
      font-size: 18px;
      font-weight: bold;
      width: 72px;
      margin: 35px auto;
    }
    .err {
      color: red;
      margin-left: 30px;
    }
    .loginButton {
      width: 100%;
    }
    .no-sign {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      p {
        color: #c4c4c4;
      }
      a p {
        color: #6495ed;
        cursor: pointer;
      }
    }
  }
  .demo-ruleForm {
    .el-form-item {
      position: relative;
      width: 100%;
      .code {
        user-select: none;
        .drag_verify {
          border: 1px solid #d3d3d3;
        }
      }
      .modal {
        position: absolute;
        width: calc(100% - 32px);
        max-height: 200px;
        background-color: white;
        border: 1px solid #dcdfe6;
        z-index: 999;
        padding: 0 15px;
        overflow: auto;
      }
    }
  }
}
</style>