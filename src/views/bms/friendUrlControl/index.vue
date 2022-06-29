<template>
  <div class="achievementTransformation" style="width: 100%; margin: 0px auto">
    <article class="search">
      <p>友情链接</p>
    </article>
    <div class="firstLine">
      <el-button type="primary" @click="dialogFormVisible = true"
        >添加角色</el-button
      >
      <el-dialog
        title="添加链接"
        :visible.sync="dialogFormVisible"
        :append-to-body="true"
        width="30%"
      >
        <el-form :model="form">
          <el-form-item label="链接名称" :required="true">
            <el-input v-model="form.siteName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="链接描述" :required="true">
            <el-input
              type="textarea"
              v-model="form.description"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="链接地址" :required="true">
            <el-input v-model="form.path" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addFriendUrl">确 定</el-button>
        </div>
      </el-dialog>
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
          @click="searchRole"
          >搜索</el-button
        >
      </el-input>
    </div>
    <el-table
      class="tableClass"
      :highlight-current-row="false"
      :data="tableData"
      :header-cell-style="getRowClass"
    >
      <el-table-column type="index" label="序号" width="99" align="center">
      </el-table-column>
      <el-table-column
        prop="siteName"
        label="站点名称"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column
        prop="description"
        label="站点描述"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column width="100" label="">
        <template slot-scope="scope">
          <a :href="scope.row.path" target="_blank" style="color: #ff6d6d"
            >查看详情</a
          >
        </template>
      </el-table-column>
    </el-table>
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
import { _cookie } from "@/utils/token";
import { fetchFriendsList,addFriendUrl } from "@/api/friend";
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      dialogFormVisible: false,
      pageshow: true,
      allClassify: [],
      patentInforList: [],
      number: [],
      currentYear: new Date().getFullYear(),
      queryData: {
        pageNo: 1,
        pageSize: 10,
        keyword: "",
      },
      characterName: "",
      form: {
        siteName: "",
        description: "",
        path: "",
      },
      total: 10,
    };
  },
  computed: {},
  created() {
    this.fetchFriendsList();
  },
  mounted() {},
  methods: {
    async fetchFriendsList() {
      let res = await fetchFriendsList(this.queryData);
      if (res.code === 200) {
        this.tableData = res.data;
        this.total = res.total;
      } else {
        this.$message.error(res.msg);
      }
    },
    getRowClass({ rowIndex }) {
      if (rowIndex == 0) {
        return "background-color:#f3f3f3;color:black;font-size:16px;text-algin:center;font-weight: 600;border-bottom: 1px solid #e0e0e0;border-top: 1px solid #e0e0e0;height:55px";
      } else {
        return "";
      }
    },
    async addFriendUrl() {
      this.dialogFormVisible = false;
      let res = await addFriendUrl(this.form);
      if (res.code === 201) {
        this.$message({
          type: "success",
          message: "友情链接添加成功!",
        });
        this.fetchFriendsList();
      } else {
        this.$message({
          type: "error",
          message: "友情链接添加失败!",
        });
      }
    },
    searchRole() {
      this.fetchFriendsList();
    },
    handleSizeChange(val) {
      this.queryData.pageSize = val;
      this.fetchFriendsList();
    },
    handleCurrentChange(val) {
      this.queryData.pageNo = val;
      this.fetchFriendsList();
    },
  },
};
</script>
<style lang="less" scoped>
.achievementTransformation {
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
  .firstLine {
    display: flex;
    margin-bottom: 24px;
    .el-input-group {
      width: 350px;
    }
    .el-input-group__append button.el-button {
      background-color: #409eff;
      color: #fff;
      border-color: #409eff;
    }
    & /deep/ .el-dialog {
      width: 30% !important;
    }
  }
  .elPagination {
    position: absolute;
    right: 24px;
    margin-top: 24px;
  }
  & ::v-deep .cell,
  .el-tooltip {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: break-spaces;
  }
}
</style>