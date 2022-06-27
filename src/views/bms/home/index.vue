<template>
  <div id="home">
    <el-container class="box">
      <el-header class="header">
        <el-row :gutter="20" style="width: 100%">
          <el-col :span="6"><div class="grid-content bg-purple">1</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">2</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">3</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">4</div></el-col>
        </el-row>
      </el-header>
      <el-container class="box1">
        <el-aside width="250px">Aside</el-aside>
        <el-container class="box2">
          <el-main>Main</el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
#home {
  width: 100vw;
  height: calc(100vh - 80px);
  margin: 0;
  padding: 0;
  margin-top: 80px;
  .box {
    width: 100%;
    height: 100%;
    background-color: aquamarine;
    .header {
      width: 100%;
      height: 60px;
      border: 4px solid burlywood;
      display: flex;
      margin: 0;
      padding: 0;
    }
    .box1 {
      .el-aside {
        border: 4px solid skyblue;
      }
      .box2 {
        .el-main {
          border: 4px solid salmon;
        }
      }
    }
  }
}
</style>