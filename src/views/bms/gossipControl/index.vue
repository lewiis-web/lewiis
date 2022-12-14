<template>
  <div class="achievementTransformation" style="width: 100%; margin: 0px auto">
    <article class="search">
      <p>独家资源</p>
    </article>
    <div class="firstLine">
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogFormVisible"
        :append-to-body="true"
        width="40%"
      >
        <el-form :model="form" label-position="left" label-width="100px">
          <el-form-item label="资源名称：" :required="true">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="百度网盘：">
            <el-input v-model="form.baidu" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="夸克网盘：">
            <el-input v-model="form.kuake" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="阿里云盘：">
            <el-input v-model="form.aliyun" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="蓝奏云盘：">
            <el-input v-model="form.lanzouyun" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="天翼云盘：">
            <el-input v-model="form.tianyiyun" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="网址：">
            <el-input v-model="form.website" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addMessage">确 定</el-button>
        </div>
      </el-dialog>
      <el-input
        placeholder="请输入搜索关键字"
        v-model="queryData.keyword"
        clearable
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
      <el-table-column
        prop="email"
        label="邮箱"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column
        prop="msg"
        label="留言"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column
        prop="blogName"
        label="博客名称"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column
        prop="personalIntroduction"
        label="个人简介"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column
        prop="blogHomePage"
        label="博客主页"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-link
            :disabled="scope.row.isPassed === 1"
            type="primary"
            :underline="false"
            @click="passMessage(scope.row.id)"
            >审核通过</el-link
          >
          <el-link
            type="danger"
            :underline="false"
            @click="deleteMessage(scope.row.id)"
            style="margin-left: 12px"
            >删除</el-link
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
  fetchMessageList,
  addMessage,
  deleteMessage,
  passMessage,
} from "@/api/message";
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
        name: "",
        baidu: "",
        kuake: "",
        aliyun: "",
        tianyiyun: "",
        lanzouyun: "",
        website: "",
      },
      total: 10,
      dialogTitle: "添加资源",
      operateId: "",
    };
  },
  computed: {},
  created() {
    this.fetchMessageList();
  },
  mounted() {},
  methods: {
    async fetchMessageList() {
      let res = await fetchMessageList(this.queryData);
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
      this.dialogTitle = "添加资源";
      this.dialogFormVisible = true;
      this.form = {
        siteName: "",
        description: "",
        path: "",
      };
    },
    async addMessage() {
      this.dialogFormVisible = false;
      let res = await addMessage(this.form);
      if (res.code === 201) {
        this.$message({
          type: "success",
          message: "独家资源添加成功!",
        });
        this.fetchMessageList();
      } else {
        this.$message({
          type: "error",
          message: "独家资源添加失败!",
        });
      }
    },
    searchRole() {
      this.fetchMessageList();
    },
    handleSizeChange(val) {
      this.queryData.pageSize = val;
      this.fetchMessageList();
    },
    handleCurrentChange(val) {
      this.queryData.pageNo = val;
      this.fetchMessageList();
    },
    async deleteMessage(id) {
      let res = await deleteMessage({ id });
      if (res.code === 201) {
        this.$message.success(res.msg);
        this.fetchMessageList();
      } else {
        this.$message.error(res.msg);
      }
    },
    async passMessage(id) {
      let res = await passMessage({ id });
      if (res.code === 201) {
        this.$message.success(res.msg);
        this.fetchMessageList();
      } else {
        this.$message.error(res.msg);
      }
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