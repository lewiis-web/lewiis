<template>
  <div id="app" v-cloak>
    <loading></loading>
    <layout-header></layout-header>
    <layout-body></layout-body>
    <layout-footer></layout-footer>
  </div>
</template>
<script>
import layoutHeader from "@/components/layout/layout-header";
import layoutBody from "@/components/layout/layout-body";
import layoutFooter from "@/components/layout/layout-footer";
import Loading from "@/components/loading";
export default {
  name: "app",
  components: {
    layoutHeader,
    layoutBody,
    layoutFooter,
    Loading,
  },
  mounted() {
    let lang = window.localStorage.getItem("lang")
    if (lang === "en_US") {
      this.$i18n.locale = "en"
    }else if (lang === "zh_CN"){
      this.$i18n.locale = "zh"
      this.locale = null
    }
  }
};
</script>
<style lang="less">
#app {
  font-size: 17px;
  color: #6f6f6f;
  cursor: url("./assets/cursor/pointer.png"), pointer;
}
a {
  cursor: url("./assets/cursor/person.png"), pointer;
}
</style>
