<template>
  <div>
    <basic-skeleton :loading="loading" show-avatar :number="20"></basic-skeleton>
    <basic-container-back>
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
              <el-avatar size="30" :src="info.profilePicture" style="margin-top: -20px"/>
            </div>
          </el-col>
          <el-col :span="8">
            <span class="student-title">姓名：</span>
            <span class="student-info">{{ info.schoolUserName }}</span>
          </el-col>
        </el-row>
        <el-row :gutter="4" style="margin-bottom: 30px">
          <el-col :span="8">
            <span class="student-title">性别：</span>
            <span class="student-info" v-if="info.gender">{{ info.gender === 'M' ? '男' : '女' }}</span>
          </el-col>
          <el-col :span="8">
            <span class="student-title">手机号：</span>
            <span class="student-info">{{ info.username }}</span>
          </el-col>
          <el-col :span="8">
            <span class="student-title">激活日期：</span>
            <span class="student-info">{{ info.activationDate }}</span>
          </el-col>
        </el-row>
        <el-row :gutter="4">
<!--          <el-col :span="8">-->
<!--            <span class="student-title">年级：</span>-->
<!--            <span class="student-info">{{ info.educationLevel }}</span>-->
<!--          </el-col>-->
          <el-col :span="8">
            <span class="student-title">入学年份：</span>
            <span class="student-info">{{ info.enrollmentYear }}</span>
          </el-col>
        </el-row>

      </div>
    </basic-container-back>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">班级信息</span>
      <div style="margin-top: 20px" v-if="info.gradeDto">
        <el-row :gutter="4" class="m-bottom">
<!--          <el-col :span="8">-->
<!--            <span class="student-title">班级ID：</span>-->
<!--            <span class="student-info">{{ info.gradeDto._id }}</span>-->
<!--          </el-col>-->
          <el-col :span="8">
            <span class="student-title">班级名称：</span>
            <span class="student-info">
               <span class="inline-text"
                     @click="goGradeDetail(info.gradeDto._id)"
                     v-if="info.gradeDto.name !== '-'">{{ info.gradeDto.name }}</span>
                <span v-else>{{ info.gradeDto.name }}</span>
            </span>
          </el-col>
          <el-col :span="8">
            <span class="student-title">班级类型：</span>
            <span class="student-info">{{ info.gradeDto.gradeType }}</span>
          </el-col>
          <el-col :span="8">
            <span class="student-title">年级：</span>
            <span class="student-info">{{ info.gradeDto.grade }}</span>
          </el-col>
        </el-row>
        <el-row :gutter="4" class="m-bottom">
          <el-col :span="8">
            <span class="student-title">入学年份：</span>
            <span class="student-info">{{ info.gradeDto.enrollmentYear }}</span>
          </el-col>
          <el-col :span="8">
            <span class="student-title">班主任：</span>
            <span class="student-info">
              <span class="inline-text"
                    @click="goTeacherDetail(info.gradeDto.teacherId)"
                    v-if="info.gradeDto.teacherName !== '—'">{{ info.gradeDto.teacherName }}</span>
                <span v-else>{{ info.gradeDto.teacherName }}</span>
            </span>
          </el-col>
          <el-col :span="8">
            <span class="student-title">生涯导师：</span>
            <span class="student-info">
              <span class="inline-text"
                    @click="goTeacherDetail(info.gradeDto.teacher1Id)"
                    v-if="info.gradeDto.teacher1Name !== '—'">{{ info.gradeDto.teacher1Name }}</span>
                <span v-else>{{ info.gradeDto.teacher1Name }}</span>
            </span>
          </el-col>
        </el-row>
        <el-row :gutter="4" class="m-bottom">
          <el-col :span="8">
            <span class="student-title">生涯导师2：</span>
            <span class="student-info">
              <span class="inline-text"
                    @click="goTeacherDetail(info.gradeDto.teacher2Id)"
                    v-if="info.gradeDto.teacher2Name !== '—'">{{ info.gradeDto.teacher2Name }}</span>
                <span v-else>{{ info.gradeDto.teacher2Name }}</span>
            </span>
          </el-col>
        </el-row>
      </div>
      <basic-nothing v-else title="该学生未绑定任何班级"></basic-nothing>
    </basic-container>

    <basic-container style="margin-bottom: 100px">
      <span class="tip-info"></span>
      <span class="tip-title">选科信息</span>
      <div style="margin-top: 20px" v-if="info.firstChoice">
        <el-row :gutter="4">
          <el-col :span="8">
            <span class="student-title">首选科目: </span>
            <span class="student-info">{{ info.firstChoice }}</span>
          </el-col>
          <el-col :span="8">
            <span class="student-title">再选科目: </span>
            <span class="student-info">{{ info.recleaning1 }}、{{ info.recleaning2 }}</span>
          </el-col>
        </el-row>
      </div>
      <basic-nothing v-else title="该学生未填写选科信息"></basic-nothing>
    </basic-container>
    <div class="footer-btn">
      <el-button style="color: #475B75" @click="goBack">返回</el-button>
      <el-button type="primary" @click="goEdit(params.studentId, params.gradeId)">编辑</el-button>
    </div>
  </div>
</template>

<script>
import {getStudentInfo} from "../../../../api/admin/students";
import {selectClassList, selectTypeList} from "../../../../api/common/search";

export default {
  name: "visit",
  data() {
    return {
      loading: true,
      params: {
        studentId: '',
        gradeId: ''
      },
      info: {},
      firstList: [],
      recleaning1List: [],
      recleaning2List: []
    }
  },
  mounted() {
    let {studentId, gradeId} = this.$route.query;
    this.params.studentId = studentId;
    this.params.gradeId = gradeId;
    this.getInfo(this.params);
    this.getFirstSelectData();
    this.getRecleaningData();
  },
  methods: {
    goGradeDetail(id) {
      this.$router.push({
        path: '/grade/gradeDetails',
        query: {
          id: id
        }
      })
    },
    goTeacherDetail(teacherId) {
      this.$router.push({
        path: '/teachers/teacherDetails',
        query: {teacherId: teacherId}
      })
    },
    getFirstSelectData() {
      selectTypeList('firstChoice')
          .then(res => {
            if (res.errorCode === 200) this.firstList = res.data;
          })
    },
    getRecleaningData() {
      selectTypeList('recleaning')
          .then(res => {
            if (res.errorCode === 200) {
              this.recleaning1List = res.data;
              this.recleaning2List = res.data;
            }
          })
    },
    goBack() {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.go(-1);
    },
    goEdit(studentId, gradeId) {
      this.$router.push({
        path: '/students/studentOperation',
        query: {
          type: 'edit',
          studentId,
          gradeId: gradeId ? gradeId : ''
        }
      })
    },
    getInfo(params) {
      this.loading = true;
      getStudentInfo(params)
          .then(res => {
            if (res.errorCode === 200) {
              this.info = res.data;
              this.loading = false;
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


.m-right {
  margin-right: 20px;
}
</style>
