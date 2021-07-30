<template>
  <div>
    <el-form label-width="80px" :model="form" :rules="rules" ref="form">
      <basic-container>
        <span class="tip-info"></span>
        <span class="tip-title">基本信息</span>
        <div style="margin-top: 20px">
          <el-row :gutter="4">
            <el-col :span="10">
              <el-form-item label="班级名称" required prop="name">
                <el-input v-model="form.name"/>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="班级类型" required prop="gradeType">
                <el-select v-model="form.gradeType" placeholder="请选择" filterable clearable style="width: 100%">
                  <el-option v-for="(item, index) in gradeTypeList" :key="index" :label="item.name" :value="item.name"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="4">
            <el-col :span="10">
              <el-form-item label="入学年份" required prop="enrollmentYear">
                <el-select v-model="form.enrollmentYear" filterable placeholder="请选择" clearable style="width: 100%">
                  <el-option
                      v-for="(item, index) in yearList"
                      :key="index"
                      :label="item.name"
                      :value="item.name"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="年级" required prop="grade">
                <el-select v-model="form.grade" placeholder="请选择" clearable style="width: 100%" filterable>
                  <el-option
                      v-for="(item, index) in gradeList"
                      :key="index"
                      :label="item.name"
                      :value="item.name"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </basic-container>
      <basic-container>
        <span class="tip-info"></span>
        <span class="tip-title">教师信息</span>
        <div style="margin-top: 20px">
          <el-row :gutter="4">
            <el-col :span="10">
              <el-form-item label="班主任">
                <el-select filterable v-model="form.teacherId" placeholder="请选择" clearable style="width: 100%">
                  <el-option v-for="item in teacherList" :key="item._id" :label="item.name" :value="item._id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="生涯导师1">
                <el-select v-model="form.teacher1Id" placeholder="请选择" clearable
                           filterable
                           style="width: 100%">
                  <el-option v-for="item in teacher1List" :key="item._id" :label="item.name" :value="item._id" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="4">
            <el-col :span="10">
              <el-form-item label="生涯导师2">
                <el-select v-model="form.teacher2Id" placeholder="请选择" clearable
                           filterable
                           style="width: 100%">
                  <el-option v-for="item in teacher2List" :key="item._id" :label="item.name" :value="item._id" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </basic-container>
      <basic-container style="margin-bottom: 60px">
        <span class="tip-info"></span>
        <span class="tip-title">其他</span>
        <div class="m-top">
          <el-switch v-model="form.openCourseSelectionFor" inactive-text="选科征集开关"/>
        </div>
      </basic-container>
    </el-form>
    <div class="footer-btn">
      <el-button style="color: #475B75" @click="goBack">取消</el-button>
      <el-button type="primary" :loading="loading" @click="operationData">{{ text }}</el-button>
    </div>
  </div>
</template>

<script>
import {
  validateClassType,
  validateGradeType,
  validateYear,
  validateGrade
} from "../../../../utils/validate";
import {getEditInfo, addGrade, updateGrade} from "../../../../api/admin/grade";
import {selectTypeList, selectTeacherOrTutorList} from "../../../../api/common/search";
import {successTip} from "../../../../utils/tip";

export default {
  name: "index",
  data() {
    return {
      loading: false,
      text: '立即添加',
      type: '',
      id: '',
      form: {},
      rules: {
        name: [{required: true, trigger: 'blur', validator: validateClassType}],
        gradeType: [{required: true, trigger: 'blur', validator: validateGradeType}],
        enrollmentYear: [{required: true, trigger: 'blur', validator: validateYear}],
        grade: [{required: true, trigger: 'blur', validator: validateGrade}],
      },
      gradeTypeList: [],
      gradeList: [],
      yearList: [],
      teacherList: [],
      teacher1List: [],
      teacher2List: []
    }
  },
  mounted() {
    let {type, id} = this.$route.query;
    console.log(type);
    this.$route.meta.title = type === 'add' ? '新增班级' : '编辑班级';
    this.type = type;
    this.id = id;
    this.text = type === 'add' ? '立即添加' : '保存';
    this.getGrade();
    this.getYear();
    this.getGradeType();
    this.getTeacherOrTutor();
    this.switchData();
  },
  methods: {
    getGradeType() {
      selectTypeList('gradeType')
          .then(res => {
            if (res.errorCode === 200) {
              this.gradeTypeList = res.data;
            }
          })
    },
    getGrade() {
      selectTypeList('grade')
          .then(res => {
            if (res.errorCode === 200) {
              this.gradeList = res.data;
            }
          })
    },
    getYear() {
      selectTypeList('vintage')
          .then(res => {
            if (res.errorCode === 200) {
              this.yearList = res.data;
            }
          })
    },
    getTeacherOrTutor() {
      let that = this;
      selectTeacherOrTutorList().then(res => {
        if (res.errorCode === 200) {
          let data = res.data && res.data.length > 0 ? res.data : [];
          data.forEach(item => {
            if (item.teacherType === '班主任') {
              console.log(item);
              that.teacherList.push(item);
            } else if (item.teacherType === '生涯导师') {
              that.teacher1List.push(item);
              that.teacher2List.push(item);
            }
          })
        }
      })
    },
    switchData() {
      switch (this.type) {
        case "add":
          break;
        case "edit":
          this.getEditData(this.id);
          break;
      }
    },
    getEditData(params) {
      getEditInfo(params)
          .then(res => {
            if (res.errorCode === 200) {
              this.form = res.data;
            }
          })
    },
    goBack() {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.go(-1);
    },
    operationData() {
      let that = this;
      that.$refs['form'].validate(valid => {
        if (valid) {
          if (that.type === 'add') {
            that.addData(that.form)
          } else {
            that.updateData(that.form)
          }
        } else {
          return false;
        }
      })
    },
    addData(data) {
      this.loading = true;
      addGrade(data)
          .then(res => {
            if (res.errorCode === 200) {
              successTip('新增成功');
              this.loading = false;
              this.goBack();
            }
          })
    },
    updateData(data) {
      this.loading = true;
      updateGrade(data)
          .then(res => {
            if (res.errorCode === 200) {
              successTip('修改成功')
              // this.goBack();
              this.loading = false;
              this.switchData();
            }
          })
    }
  }
}
</script>

<style scoped>
</style>
