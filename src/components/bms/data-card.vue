<template>
  <div id="data-card">
    <div class="icon">
      <img :src="src" alt="" :width="imgWidth" :height="imgHeight" />
    </div>
    <div class="info">
      <div class="title">{{ title }}</div>
      <div class="number">{{ num }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "banner",
  data() {
    return {};
  },
  props: {
    src: {
      type: String,
      default: require("@/assets/icons/logo.png"),
    },
    imgWidth: {
      type: [Number, String],
      default: "48px",
    },
    imgHeight: {
      type: [Number, String],
      default: "48px",
    },
    title: {
      type: String,
      default: "标题：",
    },
    num: {
      type: Number,
      default: 1696,
    },
  },
  created() {},
  methods: {},
};
</script>

<style scoped lang="less">
#data-card {
  width: 100%;
  height: 120px;
  padding: 24px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  .info {
    .title {
      font-family: MiSans, serif;
      font-weight: 600;
      font-size: 12px;
    }
    .number {
      margin-top: 10px;
      font-weight: 600;
      font-size: 32px;
    }
  }
}
</style>
