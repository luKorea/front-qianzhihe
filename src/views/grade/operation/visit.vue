<template>
  <div>
    <basic-container-back>
      <div class="flex" style="margin-top: 20px">
        <div class="left">
          <span class="tip-info"></span>
          <span class="tip-title">班级基本信息</span>
        </div>
        <div class="right">
          <el-button type="primary" @click="goEditGrade">编辑班级信息</el-button>
        </div>
      </div>
      <div style="margin-top: 20px">
        <el-row :gutter="4" class="m-bottom">
          <el-col :span="8">
            <span class="student-title">班级ID：</span>
            <span class="student-info">{{ info._id }}</span>
          </el-col>
          <el-col :span="8">
            <div>
              <span class="student-title">班级名称：</span>
              <span class="student-info">{{ info.name }}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <span class="student-title">提交选科人数：</span>
            <span class="student-info">{{ info.name }}</span>
          </el-col>
        </el-row>
        <el-row :gutter="4" class="m-bottom">
          <el-col :span="8">
            <span class="student-title">班级人数：</span>
            <span class="student-info">{{ info._id }}</span>
          </el-col>
          <el-col :span="8">
            <div>
              <span class="student-title">班级类型：</span>
              <span class="student-info">{{ info.gradeType }}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <span class="student-title">年级：</span>
            <span class="student-info">{{ info.grade }}</span>
          </el-col>
        </el-row>
        <el-row :gutter="4" class="m-bottom">
          <el-col :span="8">
            <span class="student-title">入学年份：</span>
            <span class="student-info">{{ info.enrollmentYear }}年</span>
          </el-col>
          <el-col :span="8">
            <div>
              <span class="student-title">班主任：</span>
              <span class="student-info">{{ info.teacherName }}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <span class="student-title">生涯导师1：</span>
            <span class="student-info">{{ info.teacher1Name }}</span>
          </el-col>
        </el-row>
        <el-row :gutter="`4`">
          <el-col :span="8">
            <span class="student-title">生涯导师2：</span>
            <span class="student-info">{{ info.teacher2Name }}</span>
          </el-col>
        </el-row>
      </div>
    </basic-container-back>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">学生名单</span>
    </basic-container>
  </div>
</template>

<script>
import {getGradeVisitInfo} from "../../../api/grade";

export default {
  name: "visit",
  data() {
    return {
      params: {
        gradeId: '',
        page: 0,
        size: 10,
        total: ''
      },
      id: '',
      info: {},
      list: []
    }
  },
  mounted() {
    let {id} = this.$route.query;
    this.params.gradeId = id;
    this.getInfo(this.params);
  },
  methods: {
    goEditGrade() {
      this.$router.push({
        path: '/grade/gradeOperation',
        query: {
          type: 'edit',
          id: this.id
        }
      })
    },
    goBack() {
      this.$router.go(-1);
    },
    getInfo(params) {
      getGradeVisitInfo(params)
          .then(res => {
            if (res.errorCode === 200) {
              this.info = res.data.object;
              this.list = res.data.result;
              this.params.total = res.data.pageResult.total || 0;
            }
          })
    },
    goOperationType(type, id) {
      console.log(type, id);
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.getInfo(this.params);
    },
    handleSizeChange(val) {
      this.params.size = val;
      this.getInfo(this.params);
    }
  }
}
</script>

<style scoped lang="scss">
.student-title {
  width: 300px;
  height: 22px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #2E415B;
  line-height: 22px;
  margin-right: 20px;
  margin-bottom: 20px;
}

.student-info {
  height: 22px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #506889;
  line-height: 22px;
}
</style>