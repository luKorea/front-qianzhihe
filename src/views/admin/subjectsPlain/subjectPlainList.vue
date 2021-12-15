<template>
  <div>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">选科征集计划筛选</span>
      <div class="search-wrap m-top">
        <div>
          <span class="tip">入学年份:</span>
          <el-select v-model="params.enrollmentYear"
                     placeholder="请选择" :clearable="true" :filterable="true">
            <template v-if="yearList && yearList.length > 0">
              <el-option v-for="item in yearList" :label="item.name" :value="item.name"></el-option>
            </template>
          </el-select>
        </div>
        <div>
          <el-button type="primary" :loading="loading" @click="searchData">筛选</el-button>
        </div>
      </div>
    </basic-container>
    <basic-container>
      <div class="flex">
        <div>
          <span class="tip-info"></span>
          <span class="tip-title">计划列表</span>
        </div>
        <div>
          <el-button type="primary" @click="goOperationType('add')">新增选科征集计划</el-button>
        </div>
      </div>
      <el-table stripe :data="list" border style="width: 100%;margin: 20px 0" v-loading="loading">
        <el-table-column type="index" width="60px" label="编号" align="center"/>
        <el-table-column prop="name" label="计划名称" align="center"></el-table-column>
        <el-table-column prop="enrollmentYear" label="入学年份" align="center"/>
        <el-table-column prop="studentCount" label="涉及学生数" align="center"/>
        <el-table-column prop="startTime" label="开始时间" align="center"/>
        <el-table-column prop="endTime" label="结束时间" align="center"/>
        <el-table-column prop="state" label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.state === 1" style="color: #FF5502">未开始</span>
            <span v-else-if="scope.row.state === 2" style="color: #51CF1C">进行中</span>
            <span v-else style="color:#999999">已截止</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="goOperationType('edit', scope.row._id)">编辑</el-button>
            <el-button type="text" size="small" @click="goOperationType('visit', scope.row._id)">查看征集详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <basic-pagination
          :page="params.page + 1"
          :total="params.total"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
      />
    </basic-container>
  </div>
</template>

<script>
import { getSubjectPlainList } from "../../../api/admin/subjectPlain";
import { selectTypeList } from "../../../api/common/search";
import { errorTip } from "../../../utils/tip";

export default {
  name: "gradeList",
  data () {
    return {
      loading: true,
      params: {
        page: 0,
        size: 10,
        enrollmentYear: '',
        total: 0,
      },
      yearList: [],
      list: [],
    }
  },
  mounted () {
    this.getData(this.params);
    this.getYear();
  },
  methods: {
    searchData () {
      this.params.page = 0;
      this.getData(this.params);
    },
    getYear () {
      selectTypeList('vintage').then(res => {
        if (res.errorCode === 200) {
          this.yearList = res.data;
        }
      })
    },
    goOperationType (type, id) {
      if (type === 'visit') {
        this.$router.push({
          path: '/dataAnalysis/subjectSelectionTypeStatistics',
          query: {
            id: id,
          },
        })
      } else {
        // this.$openWindow({
        //   path: '/subjectPlain/subjectPlainOperation',
        //   query: {
        //     type,
        //     id,
        //   },
        // })
        this.$router.push({
          path: '/subjectPlain/subjectPlainOperation',
          query: {
            type,
            id,
          },
        })
      }
    },
    getData (params) {
      this.loading = true;
      getSubjectPlainList(params).then(res => {
        if (res.errorCode === 200) {
          let data = res.data;
          this.list = data.result;
          this.loading = false;
          this.params.total = data.pageResult.total || 0;
        } else {
          errorTip(res.msg);
          this.loading = false;
        }
      })
    },
    handleCurrentChange (val) {
      this.params.page = val;
      this.getData(this.params);
    },
    handleSizeChange (val) {
      this.params.size = val;
      this.getData(this.params);
    },
  },
}
</script>

<style scoped lang="scss">
.tip {
  margin-right: 10px;
  height: 22px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #2E415B;
  line-height: 22px;
}
</style>
