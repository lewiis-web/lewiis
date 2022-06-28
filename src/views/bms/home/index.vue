<template>
  <div id="home">
    <el-container class="outbox">
      <el-aside :width="isCollapse ? '64px' : '240px'">
        <el-menu
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          background-color="#21252b"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse-transition="false"
          :router="true"
        >
          <el-menu-item index="/bms/home">
            <div class="logo">
              <img src="@/assets/icons/logo.png" alt="logo" width="36" />
              <h1 v-show="!isCollapse">博客后台管理系统</h1>
            </div>
          </el-menu-item>

          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
              <span slot="title">分组一</span>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <span slot="title">选项4</span>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu> -->

          <el-menu-item
            v-for="item in menu"
            :key="item.path"
            :index="item.path"
          >
            <i :class="item.meta.icon"></i>
            <span slot="title">{{ item.meta.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container class="inbox">
        <el-header class="header">
          <el-row :gutter="20">
            <el-col :span="4">
              <div class="grid-content">
                <i
                  class="fold"
                  @click="collapseControl"
                  :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
                ></i></div
            ></el-col>
            <el-col :span="6" :offset="14"
              ><div class="grid-content avatar">
                <el-dropdown @command="handleCommand" placement="bottom">
                  <span class="el-dropdown-link">
                    <el-avatar
                      shape="square"
                      size="medium"
                      :src="currentUser.avatar"
                    ></el-avatar>
                    {{ currentUser.username
                    }}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">个人中心</el-dropdown-item>
                    <el-dropdown-item command="b">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div></el-col
            >
          </el-row>
        </el-header>
        <el-main id="bms">
          <div class="main-content">
            <router-view name="bms" />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { _cookie } from "@/utils/token";
export default {
  data() {
    return {
      isCollapse: false,
      currentUser: {},
      menu: [],
    };
  },
  components: {},
  created() {
    this.currentUser = JSON.parse(_cookie.getCookie("user"));
    console.log(this.$router);
    let menu = this.$router.options.routes.find((item) => {
      return item.name === "bms";
    });
    this.menu = menu.children;
  },
  mounted() {},
  methods: {
    collapseControl() {
      this.isCollapse = !this.isCollapse;
    },
    handleCommand(command) {
      this.$message("click on item " + command);
    },
  },
};
</script>

<style lang="less" scoped>
#home {
  width: 100vw;
  height: calc(100vh - 80px);
  margin: 0;
  padding: 0;
  margin-top: 80px;
  .outbox {
    width: 100%;
    height: 100%;
    // background-color: aquamarine;
    .el-aside {
      .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 240px;
        min-height: calc(100vh - 80px);
        .el-menu-item {
          .logo {
            margin-left: -8px;
            h1 {
              color: #fefefe;
              font-size: 20px;
              // margin: 0 0 0 12px;
              display: inline-block;
              vertical-align: middle;
              font-weight: 600;
              font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue,
                Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji,
                Segoe UI Symbol;
            }
          }
        }
      }
      .el-menu-vertical-demo {
        min-height: calc(100vh - 80px);
      }
    }

    .inbox {
      .header {
        width: 100%;
        height: 60px;
        margin: 0;
        padding: 0;
        box-shadow: 0px 15px 10px -12px #ccc;
        border-left: none;
        .grid-content {
          .fold {
            margin-left: 24px;
            font-size: 24px;
            line-height: 60px;
            cursor: pointer;
          }
        }

        .avatar {
          display: flex;
          justify-content: flex-end;
          margin-right: 48px;
          .el-dropdown {
            height: 60px;
            .el-dropdown-link {
              line-height: 60px;
              .el-avatar--medium {
                vertical-align: middle;
              }
            }
          }
        }
      }
      #bms {
        background-color: rgb(241, 238, 238);
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        .main-content {
          width: 98%;
          height: 97%;
          padding: 8px;
          background-color: #fff;
          margin-left: 1%;
          margin-top: 1%;
          border-radius: 6px;
        }
      }
    }
  }
}
</style>