<template>
  <div id="data-card">
    <div class="icon">
      <img :src="src" alt="">
    </div>
    <div class="info">
      <div class="title"></div>
      <div class="number"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "banner",
  data() {
    return {
      
    };
  },
  props: {
    src: {
      type: String,
      default: "require('@/assets/icons/logo.png')",
    },
    imgWidth:{
      type:[Number,String],
      default:48
    },
    imgHeight:{
      type:[Number,String],
      default:48
    },
    isHome: {
      type: [Boolean, String],
      default: false,
    },
  },
  created() {
    
  },
  methods: {
    
  },
};
</script>

<style scoped lang="less">
#data-card {
  width: 100%;
  height: 120px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: flex;
  justify-content: space-around;
}
</style>
