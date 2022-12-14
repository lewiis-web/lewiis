<template>
  <div class="achievementTransformation" style="width: 100%; margin: 0px auto">
    <article class="search">
      <p>友情链接</p>
    </article>
    <div class="firstLine">
      <el-button type="primary" @click="addFriend">添加友链</el-button>
      <el-dialog
        :title="dialogTitle"
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
          <el-button
            type="primary"
            @click="
              dialogTitle === '添加友链' ? addFriendUrl() : updateFriendUrl()
            "
            >确 定</el-button
          >
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

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-link
            type="primary"
            :underline="false"
            @click="updateFriend(scope.row)"
            >编辑</el-link
          >
          <el-link
            type="danger"
            :underline="false"
            @click="deleteFriendUrl(scope.row.id)"
            style="margin-left: 12px"
            >删除</el-link
          >
          <el-link
            type="info"
            :underline="false"
            style="margin-left: 12px"
            :href="scope.row.path"
            target="_blank"
            >查看详情</el-link
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
import {
  fetchFriendsList,
  addFriendUrl,
  deleteFriendUrl,
  updateFriendUrl,
} from "@/api/friend";
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
      dialogTitle: "添加友链",
      operateId: "",
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
        this.total = res.totalCount;
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
    addFriend() {
      this.dialogTitle = "添加友链";
      this.dialogFormVisible = true;
      this.form = {
        siteName: "",
        description: "",
        path: "",
      };
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
    async deleteFriendUrl(id) {
      let res = await deleteFriendUrl({ id });
      if (res.code === 201) {
        this.$message.success(res.msg);
        this.fetchFriendsList();
      } else {
        this.$message.error(res.msg);
      }
    },
    async updateFriendUrl() {
      this.dialogFormVisible = false;
      let res = await updateFriendUrl({ id: this.operateId, ...this.form });
      if (res.code === 201) {
        this.$message.success(res.msg);
        this.fetchFriendsList();
      } else {
        this.$message.error(res.msg);
      }
    },
    updateFriend(row) {
      this.operateId = row.id;
      this.dialogFormVisible = true;
      this.dialogTitle = "编辑友链";
      this.form = {
        siteName: row.siteName,
        description: row.description,
        path: row.path,
      };
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
    & :deep(.el-dialog) {
      width: 30% !important;
    }
  }
  .elPagination {
    position: absolute;
    right: 24px;
    margin-top: 24px;
  }
  & :deep(.cell),
  :deep(.el-tooltip) {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: break-spaces;
  }
}
</style>