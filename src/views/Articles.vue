<template>
  <div class="articles">
    <div class="site-content animate">
      <main class="site-main">
        <article class="hentry">
          <!-- 文章内容 -->
          <div class="mavon">
            <mavon-editor
              v-model="articalContent"
              :toolbars="toolbars"
              :toolbarsFlag="true"
              :subfield="false"
              defaultOpen="preview"
              :navigation="false"
              :ishljs="true"
              codeStyle="tomorrow-night-bright"
              style="height:750px;z-index: 2;"
            />
          </div>
          <!-- 文章底部 -->
          <section-title>
            <footer class="post-footer">
              <!-- 阅读次数 -->
              <div class="post-like">
                <i class="iconfont iconeyes"></i>
                <span class="count">{{article.viewsCount}}</span>
              </div>
              <!-- 赞助按钮 -->
              <div class="donate" @click="showDonate = !showDonate">
                <span>赏</span>
                <ul class="donate_inner" :class="{ show: showDonate }">
                  <li class="wedonate">
                    <img src="https://s4.ax1x.com/2022/01/28/7xvu80.png" />
                    <p>微信</p>
                  </li>
                  <li class="alidonate">
                    <img src="https://s4.ax1x.com/2022/01/28/7xvK2V.jpg" />
                    <p>支付宝</p>
                  </li>
                </ul>
              </div>
              <!-- 文章标签 -->
              <div class="post-tags">
                <i class="iconfont iconcategory"></i>
                <router-link to="/category/fontend">前端</router-link>
              </div>
            </footer>
          </section-title>
        </article>
      </main>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/banner";
import sectionTitle from "@/components/section-title";
import menuTree from "@/components/menu-tree";
import { fetchArticle,addViewsCount } from "../api/post";

export default {
  name: "articles",
  data() {
    return {
      showDonate: false,
      comments: [],
      menus: [],
      article: {},
      articalContent: "",
      toolbars: {
        navigation: true,
        readmodel: true,
        htmlcode: true, // 展示html源码
        help: true, // 帮助
      },
    };
  },
  components: {
    Banner,
    sectionTitle,
    menuTree,
  },
  methods: {
    addViewsCount(){
      addViewsCount({articleId:this.article.id})
      .then((res)=>{
        if (res.message === "成功") {
          this.$message({
          message: '这篇博客的热度嗖地一下加了一点儿！',
          type: 'success'
        });
        }
      }).catch((err)=>{
        this.$message.error(err);
      })
    }
  },
  mounted() {
    
  },
  created() {
    fetchArticle({ articleId: this.$route.params.id })
      .then((res) => {
        
        this.article = res.data[0];
      })
      .catch((err) => {
        
      });
    this.$axios
      .get(`${process.env.VUE_APP_BASE_API.substring(0,process.env.VUE_APP_BASE_API.length - 4)}/md/${this.$route.query.content}.md`)
      .then((res) => {
        this.articalContent = res.data;
        setTimeout(() => {
          this.addViewsCount()
        }, 2000);
      });
  },
};
</script>
<style scoped lang="less">
.site-content {
  position: relative;
  .site-main {
    padding: 80px 0 0 0;
  }
}
article.hentry {
  // margin-left: -50%;
  // width: 200%;
  .mavon{
    margin-top: 10px;
  }
  .entry-header {
    .entry-title {
      font-size: 23px;
      font-weight: 600;
      color: #737373;
      margin: 0.67em 0;

      &:before {
        content: "#";
        margin-right: 6px;
        color: #d82e16;
        font-size: 20px;
        font-weight: 600;
      }
    }

    hr {
      height: 1px;
      border: 0;
      background: #efefef;
      margin: 15px 0;
    }

    .breadcrumbs {
      font-size: 14px;
      color: #d2d2d2;
      text-decoration: none;
      margin-bottom: 30px;
    }
  }

  .entry-content {
    
  }

  footer.post-footer {
    width: 100%;
    padding: 20px 10px;
    margin-top: 30px;
    height: 65px;
    position: relative;
    i {
      font-size: 18px;
      margin-right: 5px;
    }
    .post-like {
      float: right;
      margin: 7px 0 0 20px;
    }

    .post-share {
      float: right;
      list-style: none;
      margin-right: 20px;
    }

    .donate {
      float: left;
      line-height: 36px;
      border-radius: 100%;
      -webkit-border-radius: 100%;
      -moz-border-radius: 100%;
      border: 1px solid #2b2b2b;
      &:hover {
        border: 1px solid goldenrod;
        span {
          color: goldenrod;
        }
      }
      span {
        color: #2b2b2b;
        padding: 10px;
        position: relative;
        cursor: pointer;
      }

      .donate_inner {
        display: none;
        margin: 0;
        list-style: none;
        position: absolute;
        left: 80px;
        top: -40px;
        background: #fff;
        padding: 10px;
        border: 1px solid #ddd;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        border-radius: 3px;
        &.show {
          display: block;
        }
        li {
          float: left;
        }

        img {
          width: 100px;
        }
        p {
          text-align: center;
          font-size: 15px;
          color: #d2d2d2;
          line-height: 1rem;
        }
      }

      .donate_inner:after,
      .donate_inner:before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 45%;
        margin-left: -8px;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 8px solid #fff;
      }

      .donate_inner:before {
        left: -1px;
        border-right: 8px solid #ddd;
      }
    }

    .post-tags {
      margin: 7px 0 0 20px;
      float: left;
      text-transform: uppercase;
      a:hover {
        color: #ff6d6d;
      }
    }
  }
  .open-message {
    margin: 50px 0;
    position: relative;
    background: #2b2b2b;
    padding: 10px 30px;
    border-radius: 3px;
    font-size: 14px;
    color: #fff;
    &:after {
      content: "";
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid #2b2b2b;
      position: absolute;
      top: -8px;
      left: 48%;
    }
    p {
      margin: 10px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    a {
      color: #a0dad0;
      padding: 0 5px;
    }
  }
}
</style>
