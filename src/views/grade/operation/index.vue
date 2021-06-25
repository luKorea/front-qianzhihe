<template>
  <div>
    <el-form label-width="80px" :model="form" :rules="rules" ref="form">
      <basic-container>
        <span class="tip-info"></span>
        <span class="tip-title">基本信息</span>
        <div style="margin-top: 20px">
          <el-row :gutter="4">
            <el-col :span="10">
              <el-form-item label="学生ID">
                <el-input v-model="form._id" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="头像">
                <el-avatar size="30" :src="form.profilePicture"></el-avatar>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="4">
            <el-col :span="10">
              <el-form-item label="姓名" required prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="性别">
                <el-input v-model="form.gender" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="4">
            <el-col :span="10">
              <el-form-item label="手机号" required prop="username">
                <el-input v-model="form.username"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="激活日期">
                <el-input v-model="form.time" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </basic-container>
      <basic-container>
        <span class="tip-info"></span>
        <span class="tip-title">班级信息</span>
      </basic-container>
      <basic-container>
        <span class="tip-info"></span>
        <span class="tip-title">选科信息</span>
      </basic-container>
    </el-form>
    <div class="footer-btn">
      <el-button style="color: #475B75" @click="goBack">取消</el-button>
      <el-button type="primary" @click="operationData">保存</el-button>
    </div>
  </div>
</template>

<script>
import {
  validatePassword,
  validatePhone,
  validateTeacherName,
  validateTeacherType,
  validateUsername
} from "../../../utils/validate";
import {getStudentInfo} from "../../../api/students";

export default {
  name: "index",
  data() {
    return {
      params: {
        studentId: '',
        gradeId: ''
      },
      form: {},
      rules: {
        username: [{required: true, trigger: 'blur', validator: validatePhone}],
        name: [{required: true, trigger: 'blur', validator: validateUsername}],
      },
      teacherList: []
    }
  },
  mounted() {
    let {studentId, gradeId} = this.$route.query;
    this.params.studentId = studentId;
    this.params.gradeId = gradeId;
    this.getEditData(this.params);
  },
  methods: {
    getEditData(params) {
      getStudentInfo(params)
      .then(res => {
        if (res.errorCode === 200) {
          this.form = res.data;
          this.form['gender'] = this.form.gender == 'f' ? '男' : '女';

        }
      })
    },
    goBack() {
      this.$router.go(-1);
    },
    operationData() {
      let that = this;
      that.$refs['form'].validate(valid => {
        if (valid) {
        } else {
          return false;
        }
      })
    }
  }
}
</script>

<style scoped>
</style>