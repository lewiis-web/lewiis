<template>
  <div class="homepage">
    <el-row :gutter="30">
      <el-col :span="6"
        ><div class="grid-content">
          <data-card></data-card></div
      ></el-col>
      <el-col :span="6"
        ><div class="grid-content">
          <data-card></data-card></div
      ></el-col>
      <el-col :span="6"
        ><div class="grid-content">
          <data-card></data-card></div
      ></el-col>
      <el-col :span="6"
        ><div class="grid-content">
          <data-card></data-card></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import DataCard from "@/components/bms/data-card.vue";
export default {
  data() {
    return {};
  },
  components: {
    DataCard,
  },
};
</script>

<style>
</style>