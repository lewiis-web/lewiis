<template>
  <div class="articles">
    <article class="search">
      <p>博客文章</p>
    </article>
    <div class="filter">
      <!-- <el-button type="primary" @click="uploadArticle" icon="el-icon-upload">上传博客</el-button> -->
      <el-select
        v-model="queryData.category"
        placeholder="请选择文章种类"
        style="margin-left: 24px"
      >
        <el-option
          v-for="item in blogTypeOptions"
          :key="item.id"
          :label="item.title"
          :value="item.title_en"
        >
        </el-option>
      </el-select>
      <el-input
        placeholder="请输入搜索关键字"
        v-model="queryData.keyword"
        clearable
        style="margin-left: 24px"
      >
        <el-button
          type="primary"
          slot="append"
          icon="el-icon-search"
          @click="searchBlog"
          >搜索</el-button
        >
      </el-input>
    </div>
    <div v-for="item in articles" :key="item.id" class="post">
      <post :post="item" ></post>
    </div>
    <el-pagination
      v-if="pageshow"
      class="elPagination"
      background
      :current-page="queryData.pageNo"
      layout="total,prev, pager, next"
      :page-size="queryData.pageSize"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<script>
import Post from "@/components/post";
import { fetchArticleList } from "@/api/post";
import { fetchCategory } from "@/api/category";

export default {
  data() {
    return {
      articles: [],
      queryData: {
        pageNo: 1,
        pageSize: 10,
        keyword: "",
        category:""
      },
      total: 10,
      pageshow: true,
      blogTypeOptions: [],
      blogType: "",
    };
  },
  components: {
    Post,
  },
  created() {
    this.fetchArticleList();
    this.fetchCategory();
  },
  mounted() {},
  methods: {
    async fetchArticleList() {
      let res = await fetchArticleList(this.queryData);
      if (res.code === 200) {
        this.articles = res.data;
        this.total = res.totalCount;
      } else {
        this.$message.error(res.msg);
      }
    },
    async fetchCategory() {
      let res = await fetchCategory();
      if (res.status === 200) {
        this.blogTypeOptions = res.data;
      } else {
        this.$message.error(res.msg);
      }
    },
    handleSizeChange(val) {
      this.queryData.pageSize = val;
      this.fetchArticleList();
    },
    handleCurrentChange(val) {
      this.queryData.pageNo = val;
      this.fetchArticleList();
    },
    // uploadArticle() {
    //   console.log("上传文章");
    // },
    searchBlog(){
      this.fetchArticleList()
    }
  },
};
</script>

<style lang="less" scoped>
.articles {
  position: relative;
  .search {
    width: 100%;
    margin: 24px auto;
    p {
      width: 100%;
      text-align: center;
      margin-bottom: 24px;
      font-size: 24px;
      font-weight: 600;
    }
  }
  .filter {
    .el-input {
      width: 30%;
    }
  }
  .post {
    margin-top: 24px;
  }
  .elPagination {
    position: absolute;
    right: 24px;
    bottom: -48px;
  }
}
</style>