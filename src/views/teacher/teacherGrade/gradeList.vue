<!--suppress ALL -->
<template>
  <div>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">班级列表</span>
      <el-table  stripe :data="list" border style="width: 100%;margin: 20px 0"  v-loading="loading">
        <el-table-column type="index" width="60px" label="编号" align="center"/>
<!--        <el-table-column prop="_id" label="班级ID" align="center" />-->
        <el-table-column prop="name" label="班级名称" align="center">
          <template slot-scope="scope">
            <span class="inline-text"
                  @click="goOperationType('visit', scope.row._id)"
                  v-if="scope.row.name !== '-'">{{scope.row.name}}</span>
            <span v-else>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="gradeCount" label="班级人数" align="center" />
        <el-table-column prop="gradeType" label="班级类型" align="center" />
        <el-table-column prop="grade" label="年级" align="center" />
        <el-table-column prop="enrollmentYear" label="入学年份" align="center" />
        <el-table-column prop="teacherName" label="班主任" align="center" />
        <el-table-column prop="teacher1Name" label="生涯导师1" align="center" />
        <el-table-column prop="teacher2Name" label="生涯导师2" align="center" />
        <el-table-column label="操作" align="center" width="250">
          <template slot-scope="scope">
            <el-button type="text" size="small" style="color: red" @click="openOrClose(scope.row._id, false)" v-if="scope.row.openCourseSelectionFor">
              关闭选科征集
            </el-button>
            <el-button type="text" size="small" @click="openOrClose(scope.row._id, true)" v-else>
              开启选科征集
            </el-button>
            <el-button type="text" size="small" @click="goOperationType('visit', scope.row._id)">查看班级详情</el-button>
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
import {getGradeList, updateCourseSelectionFor} from "../../../api/teacher/teacherGrade";
import {operationTip, successTip} from "../../../utils/tip";
export default {
  name: "teacherList",
  data() {
    return {
      loading: true,
      params: {
        page: 0,
        size: 10,
        total: 0
      },
      list: []
    }
  },
  mounted() {
    this.getData(this.params);
  },
  methods: {
    openOrClose(id, flag) {
      let that = this;
      operationTip({
        message: flag ? '是否开启选科征集' : '是否关闭选科征集',
        title: '选科征集'
      }, () => {
        updateCourseSelectionFor({
          _id: id,
          openCourseSelectionFor: flag
        }).then(res => {
          if (res.errorCode === 200) {
            successTip();
            that.getData(this.params);
          }
        })
      })
    },
    goOperationType(type, id) {
      if (type === 'visit') {
        this.$router.push({
          path: '/teacherGrade/gradeDetails',
          query: {
            id: id
          }
        })
      } else {
        this.$router.push({
          path: '/teacherGrade/gradeOperation',
          query: {
            type,
            id
          }
        })
      }
    },
    getData(params) {
      this.loading = true;
      getGradeList(params)
      .then(res => {
        if (res.errorCode === 200) {
          let data = res.data;
          this.list = data.result;
          this.loading = false;
          this.params.total = data.pageResult.total || 0;
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
