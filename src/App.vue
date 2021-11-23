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
      window.L2Dwidget.init({
        pluginRootPath: "live2dw/",
        pluginJsPath: "lib/",
        pluginModelPath: "live2d-widget-model-shizuku/assets/",
        tagMode: false,
        debug: false,
        model: {
          jsonPath:
            "../live2dw/live2d-widget-model-shizuku/assets/shizuku.model.json",
        },
        display: { position: "right", width: 200, height: 300 },
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
