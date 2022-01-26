<template>
  <div class="friend">
    <div class="site-content">
      <section-title>
        <div class="friend-header">
          <div class="title">独家资源</div>
          <div class="apply">
            <router-link to="/about#Guestbook">+ 联系我</router-link>
          </div>
        </div>
      </section-title>

      <div class="statement">
        <quote>
          <p>资源名称：{{ websiteInfo.name }}</p>
        </quote>
        <el-tabs type="border-card" class="tabname">
          <el-tab-pane label="百度网盘">百度网盘</el-tab-pane>
          <el-tab-pane label="夸克网盘">夸克网盘</el-tab-pane>
          <el-tab-pane label="阿里云盘">阿里云盘</el-tab-pane>
          <el-tab-pane label="蓝奏云">蓝奏云</el-tab-pane>
          <el-tab-pane label="天翼云盘">天翼云盘</el-tab-pane>
        </el-tabs>
      </div>
      <hr />

    </div>
  </div>
</template>

<script>
import sectionTitle from "@/components/section-title";
import Quote from "@/components/quote";
import { fetchFriend } from "../api";
import lists from "@/Mock/friend";
export default {
  name: "Friend",
  data() {
    return {
      websiteInfo: {},
      list: lists[1],
    };
  },
  components: {
    Quote,
    sectionTitle,
  },
  methods: {
    // fetchFriend() {
    //     fetchFriend().then(res => {
    //         this.list = res.data || []
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // },
    getWebSiteInfo() {
      this.$store.dispatch("getSiteInfo").then((data) => {
        this.websiteInfo = data;
      });
    },
  },
  mounted() {
    this.getWebSiteInfo();
    // this.fetchFriend();
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
  margin: 30px 0 10px 0;
  a {
    color: #ff6d6d;
  }
  p {
    line-height: 2rem;
  }
}

.tabname{
  margin-top: 10px;
}

.state {
  margin: 20px 0 20px 0;
  a {
    color: #ff6d6d;
  }
  p {
    line-height: 2rem;
  }
}
hr {
  margin: 30px 0 0 0;
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
