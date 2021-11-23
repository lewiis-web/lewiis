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
  created() {
    setTimeout(() => {
      L2Dwidget.init({
        pluginRootPath: "public/live2dw/",
        pluginJsPath: "lib/",
        pluginModelPath: "live2d-widget-model-z16/assets/",
        tagMode: false,
        debug: false,
        model: {
          jsonPath: "/public/live2dw/live2d-widget-model-z16/assets/z16.model.json",
        },
        display: { position: "left", width: 100, height: 200 },
        mobile: { show: true },
        log: false,
      });
    }, 1000);
  },
};
</script>
<style lang="less">
#app {
  font-size: 17px;
  color: #6f6f6f;
}
</style>
