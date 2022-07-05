<template>
  <div class="homepage">
    <el-row :gutter="30">
      <el-col :span="6"
        ><div class="grid-content">
          <data-card
            :src="require('@/assets/images/articles.png')"
            title="文章总数："
            :num="info.articleNum"
          ></data-card></div
      ></el-col>
      <el-col :span="6"
        ><div class="grid-content">
          <data-card
            :src="require('@/assets/images/totalViews.png')"
            title="总浏览量："
            :num="info.blogTotalViews"
          ></data-card></div
      ></el-col>
      <el-col :span="6"
        ><div class="grid-content">
          <data-card
            :src="require('@/assets/images/visitors.png')"
            title="访客总数："
            :num="info.visitorsNum"
          ></data-card></div
      ></el-col>
      <el-col :span="6"
        ><div class="grid-content">
          <data-card
            :src="require('@/assets/images/gossip.png')"
            title="留言总数："
            :num="info.gossipNum"
          ></data-card></div
      ></el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><div class="grid-content "> 

        </div></el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchBmsHomeInfo } from "@/api/site";
import DataCard from "@/components/bms/data-card.vue";
export default {
  data() {
    return {
      info: {},
    };
  },
  components: {
    DataCard,
  },
  computed: {},
  created() {
    this.fetchBmsHomeInfo();
  },
  methods: {
    async fetchBmsHomeInfo() {
      let res = await fetchBmsHomeInfo();
      this.info = res.data;
    },
  },
};
</script>

<style>
</style>