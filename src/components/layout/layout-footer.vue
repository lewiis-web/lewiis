<template>
  <div id="layout-footer">
    <div class="footer-main">
      <div class="footer-item" v-if="socials.length">
        <div v-for="item in socials" :key="item.id">
          <a target="_blank" class="out-link" :href="item.href"><i class="iconfont" :class="item.icon"></i>{{ item.title
          }}</a>
        </div>
      </div>
      <div class="footer-item">
        <div style="font-size: 17px; font-weight: bold">
          {{ $t("index.footer.title") }}
        </div>
        <div>
          <a target="_blank" class="out-link" href="https://www.soinside.com/">{{ $t("index.footer.resource[0]") }}</a>
        </div>
        <div>
          <a target="_blank" class="out-link" href="https://es6.ruanyifeng.com/">{{ $t("index.footer.resource[1]")
          }}</a>
        </div>
        <div>
          <a target="_blank" class="out-link" href="https://space.bilibili.com/478692215">{{
              $t("index.footer.resource[2]")
          }}</a>
        </div>
      </div>
      <div class="footer-item">
        <div>{{ $t("index.footer.runTime") }}：{{ runTimeInterval }}</div>
        <div>
          <a target="_blank" href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=YFFYUVlWU1FXVVkgERFOAw8N"
            style="text-decoration: none"><img
              src="http://rescdn.qqmail.com/zh_CN/htmledition/images/function/qm_open/ico_mailme_01.png" /></a>
        </div>
        <div>
          <a target="_self" class="out-link" @click="goBms">☞{{ $t("index.footer.admin") }}</a>
        </div>
      </div>
    </div>
    <div class="copyright">
      Copyright © 2021 by
      <a target="_blank" class="out-link" href="http://lewiis.top/">Lewiis</a> .
      All rights reserved.
      <br><br>
      <a href="https://beian.miit.gov.cn/" target="_blank">晋ICP备2022002774号-1</a>
    </div>
  </div>
</template>

<script>
import sectionTitle from "@/components/section-title";
export default {
  name: "layout-footer",
  data() {
    return {
      socials: [],
    };
  },
  components: {
    sectionTitle,
  },
  computed: {
    runTimeInterval() {
      return this.$store.state.runTimeInterval;
    },
  },
  methods: {
    getSocial() {
      this.$store.dispatch("getSocials").then((data) => {
        this.socials = data;
      });
    },
    goBms() {
      this.$router.push("/bms/login");
    },
  },
  created() {
    this.getSocial();
    this.$store.dispatch("initComputeTime");
  },
};
</script>

<style scoped lang="less">
#layout-footer {
  height: 180px;
  padding: 2%;
  border-top: 1px solid #f7f7f7;
  font-size: 13px;
  color: #9c9c9c;

  a.out-link:hover {
    color: #ff6d6d;
  }

  .footer-main {
    max-width: 800px;
    margin: 0 auto 20px auto;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;

    .footer-item {
      flex: 1;

      &>div:not(:last-child) {
        margin-bottom: 10px;
      }

      i {
        margin-right: 10px;
      }
    }
  }

  .copyright {
    text-align: center;
  }
}

/*****/
@media (max-width: 800px) {
  #layout-footer {
    .footer-main .footer-item:nth-child(3) {
      flex: 2;
    }
  }
}

@media (max-width: 600px) {
  #layout-footer {
    .footer-main {
      display: block;

      .footer-item {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;

        &>div {
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
