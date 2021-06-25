<template>
  <div>
    <basic-container-back>
      <span class="tip-info"></span>
      <span class="tip-title">基本信息</span>
      <div style="margin-top: 20px">
        <el-row :gutter="4" class="m-bottom">
          <el-col :span="6">
            <span class="student-title">学生ID：</span>
            <span class="student-info">{{ info._id }}</span>
          </el-col>
          <el-col :span="6">
            <div style="display: flex;align-items: center">
              <span class="student-title">头像：</span>
              <el-avatar size="30" :src="info.profilePicture" style="margin-top: -20px" />
            </div>
          </el-col>
          <el-col :span="6">
            <span class="student-title">姓名：</span>
            <span class="student-info">{{ info.username }}</span>
          </el-col>
        </el-row>
        <el-row :gutter="4">
          <el-col :span="6">
            <span class="student-title">性别：</span>
            <span class="student-info">{{ info.gender == 'f' ? '男' : '女' }}</span>
          </el-col>
          <el-col :span="6">
            <span class="student-title">手机号：</span>
            <span class="student-info">{{info.username}}</span>
          </el-col>
          <el-col :span="6">
            <span class="student-title">激活日期：</span>
            <span class="student-info">{{ info.time }}</span>
          </el-col>
        </el-row>
      </div>
    </basic-container-back>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">班级信息</span>
      <div style="margin-top: 20px" v-if="info.gradeDto">
        <el-row :gutter="4" class="m-bottom">
          <el-col :span="6">
            <span class="student-title">班级ID：</span>
            <span class="student-info">{{ info.gradeDto._id }}</span>
          </el-col>
          <el-col :span="6">
            <span class="student-title">班级名称：</span>
            <span class="student-info">{{info.gradeDto.name}}</span>
          </el-col>
          <el-col :span="6">
            <span class="student-title">班级类型：</span>
            <span class="student-info">{{ info.gradeDto.gradeType }}</span>
          </el-col>
        </el-row>
        <el-row :gutter="4" class="m-bottom">
          <el-col :span="6">
            <span class="student-title">年级：</span>
            <span class="student-info">{{ info.gradeDto.grade }}</span>
          </el-col>
          <el-col :span="6">
            <span class="student-title">入学年份：</span>
            <span class="student-info">{{info.gradeDto.enrollmentYear}}</span>
          </el-col>
          <el-col :span="6">
            <span class="student-title">班主任：</span>
            <span class="student-info">{{ info.gradeDto.teacherName }}</span>
          </el-col>
        </el-row>
        <el-row :gutter="4" class="m-bottom">
          <el-col :span="6">
            <span class="student-title">生涯导师：</span>
            <span class="student-info">{{ info.gradeDto.teacher1Name }}</span>
          </el-col>
          <el-col :span="6">
            <span class="student-title">生涯导师2：</span>
            <span class="student-info">{{info.gradeDto.teacher2Name}}</span>
          </el-col>
        </el-row>
      </div>
      <basic-nothing v-else title="该学生未绑定任何班级"></basic-nothing>
    </basic-container>

    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">选科信息</span>
      <div style="margin-top: 20px" v-if="info.gradeDto">
      </div>
      <basic-nothing v-else title="该学生未填写选科信息"></basic-nothing>
    </basic-container>
    <div class="footer-btn">
      <el-button style="color: #475B75" @click="goBack">返回</el-button>
    </div>
  </div>
</template>

<script>
import {getStudentInfo} from "../../../api/students";

export default {
  name: "visit",
  data() {
    return {
      params: {
        studentId: '',
        gradeId: ''
      },
      info: {}
    }
  },
  mounted() {
    let {studentId, gradeId} = this.$route.query;
    this.params.studentId = studentId;
    this.params.gradeId = gradeId;
    this.getInfo(this.params);
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getInfo(params) {
      getStudentInfo(params)
          .then(res => {
            if (res.errorCode === 200) {
              this.info = res.data;
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