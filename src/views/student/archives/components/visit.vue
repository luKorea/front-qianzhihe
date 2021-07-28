<template>
  <div>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">基本信息</span>
      <div style="margin-top: 20px">
        <el-row :gutter="4" class="m-bottom">
          <el-col :span="8">
            <span class="student-title">学号：</span>
            <span class="student-info">{{ info.studentId }}</span>
          </el-col>
          <el-col :span="8">
            <div style="display: flex;align-items: center">
              <span class="student-title">头像：</span>
              <el-avatar size="30" :src="info.profilePicture" style="margin-top: -20px" />
            </div>
          </el-col>
          <el-col :span="8">
            <span class="student-title">姓名：</span>
            <span class="student-info">{{ info.schoolUserName }}</span>
          </el-col>
        </el-row>
        <el-row :gutter="4">
          <el-col :span="8">
            <span class="student-title">性别：</span>
            <span class="student-info" v-if="info.gender">{{  info.gender === 'M' ? '男' : '女' }}</span>
          </el-col>
          <el-col :span="8">
            <span class="student-title">手机号：</span>
            <span class="student-info">{{info.username}}</span>
          </el-col>
          <el-col :span="8">
            <span class="student-title">激活日期：</span>
            <span class="student-info">{{ info.activationDate }}</span>
          </el-col>
        </el-row>
      </div>
    </basic-container>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">班级信息</span>
      <div style="margin-top: 20px" v-if="info.gradeDto">
        <el-row :gutter="4" class="m-bottom">
          <el-col :span="8">
            <span class="student-title">班级ID：</span>
            <span class="student-info">{{ info.gradeDto._id }}</span>
          </el-col>
          <el-col :span="8">
            <span class="student-title">班级名称：</span>
            <span class="student-info">{{info.gradeDto.name}}</span>
          </el-col>
          <el-col :span="8">
            <span class="student-title">班级类型：</span>
            <span class="student-info">{{ info.gradeDto.gradeType }}</span>
          </el-col>
        </el-row>
        <el-row :gutter="4" class="m-bottom">
          <el-col :span="8">
            <span class="student-title">年级：</span>
            <span class="student-info">{{ info.gradeDto.grade }}</span>
          </el-col>
          <el-col :span="8">
            <span class="student-title">入学年份：</span>
            <span class="student-info">{{info.gradeDto.enrollmentYear}}</span>
          </el-col>
          <el-col :span="8">
            <span class="student-title">班主任：</span>
            <span class="student-info">{{ info.gradeDto.teacherName }}</span>
          </el-col>
        </el-row>
        <el-row :gutter="4" class="m-bottom">
          <el-col :span="8">
            <span class="student-title">生涯导师：</span>
            <span class="student-info">{{ info.gradeDto.teacher1Name }}</span>
          </el-col>
          <el-col :span="8">
            <span class="student-title">生涯导师2：</span>
            <span class="student-info">{{info.gradeDto.teacher2Name}}</span>
          </el-col>
        </el-row>
      </div>
      <basic-nothing v-else title="该学生未绑定任何班级"></basic-nothing>
    </basic-container>
    <basic-container style="margin-bottom: 100px">
      <span class="tip-info"></span>
      <span class="tip-title">选科征集信息</span>
      <div style="margin-top: 20px" v-if="info.firstChoice">
        <el-row :gutter="4">
          <el-col :span="8">
            <span class="student-title">首选科目: </span>
            <span class="student-info">{{info.firstChoice}}</span>
          </el-col>
          <el-col :span="8">
            <span class="student-title">再选科目: </span>
            <span class="student-info">{{info.recleaning1}}、{{info.recleaning2}}</span>
          </el-col>
        </el-row>
      </div>
      <basic-nothing v-else title="该学生未填写选科信息"></basic-nothing>
    </basic-container>
  </div>
</template>

<script>
export default {
  name: "visit",
  props: {
    info: {
      type: Object,
      default: () => {}
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


.m-right {
  margin-right: 20px;
}
</style>