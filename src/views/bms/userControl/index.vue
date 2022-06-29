<template>
  <div class="achievementTransformation" style="width: 100%; margin: 0px auto">
    <article class="search">
      <p>用户管理</p>
    </article>
    <div class="firstLine">
      <el-input
        placeholder="请输入搜索关键字"
        v-model="policyListData.keyword"
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
      <el-table-column type="index" label="序号" width="99" align="center">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column
        prop="avatar"
        label="头像"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 60px; height: 60px"
            :src="scope.row.avatar"
            :preview-src-list="[scope.row.avatar]"
          >
          </el-image>
        </template>
      </el-table-column>

      <el-table-column
        prop="create_time"
        label="创建时间"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column
        prop="update_time"
        label="更新时间"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column
        prop="isDeleted"
        label="用户状态"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span style="margin-right: 12px">{{
            !scope.row.isDeleted ? "开启" : "关闭"
          }}</span>
          <el-switch
            v-model="scope.row.isDeleted"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="switchFlag($event, scope.row)"
            :active-value="0"
            :inactive-value="1"
          >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="pageshow"
      class="elPagination"
      background
      :total="pagesInfo.total"
      :page-size="pagesInfo.pageSize"
      :current-page="pagesInfo.pagesCount"
      layout="total,prev, pager, next"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>
<script>
import { _cookie } from "@/utils/token";
import { fetchUserList, deleteUser } from "@/api/user";

export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      dialogFormVisibleCharacter: false,
      pagesInfo: {
        total: 100,
        pageSize: 20,
        pageNo: 1,
      },
      pageshow: true,
      allClassify: [],
      patentInforList: [],
      number: [],
      currentYear: new Date().getFullYear(),
      policyListData: {
        pageNo: 1,
        pageSize: 10,
        keyword: "",
      },
      characterName: "",
      form: {
        roleName: "",
        roleDesc: "",
      },
    };
  },
  computed: {},
  created() {
    this.fetchUserList();
  },
  mounted() {},
  methods: {
    async fetchUserList() {
      let res = await fetchUserList(this.policyListData);
      if (res.code === 200) {
        this.tableData = res.data;
        this.pagesInfo.total = res.total;
      } else {
        this.$message.error(res.msg);
      }
    },
    currentChange(val) {
      this.pagesInfo.pagesCount = 1;
      this.policyListData.pageNo = val;
      this.fetchUserList();
    },
    getRowClass({ rowIndex }) {
      if (rowIndex == 0) {
        return "background-color:#f3f3f3;color:black;font-size:16px;text-algin:center;font-weight: 600;border-bottom: 1px solid #e0e0e0;border-top: 1px solid #e0e0e0;height:55px";
      } else {
        return "";
      }
    },
    async switchFlag(event, row) {
      let res = await deleteUser({ isDeleted: event, id: row.id });
      console.log(res);
      if (res.code === 201) {
        this.$message({
          type: "success",
          message: res.msg,
        });
        this.fetchUserList();
      } else {
        this.$message.error(res.msg);
      }
    },
    async addCharacter() {
      let res = await this.$http.put("/enterprise/manger/role/add", this.form, {
        headers: {
          "Content-Type": `Application/json`,
        },
      });
      if (res.data.result_code === 0) {
        this.dialogFormVisibleCharacter = false;
        this.$message({
          type: "success",
          message: "用户添加成功!",
        });
        this.fetchUserList();
      } else {
        this.$message.error(res.data.result_msg);
      }
    },
    searchRole() {
      this.fetchUserList();
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