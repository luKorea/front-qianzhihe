<template>
  <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">测评列表</span>
      <el-table :data="list" border style="width: 100%;margin: 20px 0">
        <el-table-column prop="name" label="测评内容" align="center"/>
        <el-table-column prop="testTime" label="测评时间" align="center"/>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="goDetail(scope.row._id, scope.row.name)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <basic-pagination
          :total="params.total"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
      />
    </basic-container>
</template>

<script>
import {getStudentEvaluationList} from "../../../../api/student/evaluation";

export default {
  name: "index",
  data() {
    return {
      params: {
        page: 0,
        size: 10,
        total: 0,
      },
      list: []
    }
  },
  mounted() {
    this.getData(this.params);
  },
  methods: {
    goDetail(id, type) {
      this.$router.push({
        path: '/studentEvaluation/evaluationList/evaluationDetails',
        query: {
          hollandId: id,
          type: type === '兴趣测试' ? 'holland' : 'mbit'
        }
      })
    },
    getData(params) {
      getStudentEvaluationList(params)
          .then(res => {
            if (res.errorCode === 200) {
              this.list = res.data.result;
              this.params.total = res.data.pageResult.total || 0;
            }
          })
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.getData(this.params);
    },
    handleSizeChange(val) {
      this.params.size = val;
      this.getData(this.params);
    }
  }
}
</script>

<style scoped lang="scss">
.search {
  display: flex;

  .search-item {
    margin-right: 20px;

    .search-title {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #2E415B;
      margin-right: 20px;
    }
  }
}
</style>