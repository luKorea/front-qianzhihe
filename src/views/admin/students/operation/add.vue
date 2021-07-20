<template>
  <div>
    <el-form status-icon label-width="80px" :model="form" :rules="rules" ref="form">
      <basic-container>
        <span class="tip-info"></span>
        <span class="tip-title">基本信息</span>
        <div style="margin-top: 20px">
          <el-row :gutter="4">
            <el-col :span="10">
              <el-form-item label="学号" required prop="studentId">
                <el-input v-model="form.studentId"/>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="姓名" required prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="4">
            <el-col :span="10">
              <el-form-item label="性别" required prop="gender">
                <el-select v-model="form.gender" placeholder="请输入性别" style="width: 100%">
                  <el-option label="男" value="M"></el-option>
                  <el-option label="女" value="F"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="入学年份" required prop="enrollmentYear">
                <el-select v-model="form.enrollmentYear" clearable filterable placeholder="请输入入学年份" style="width: 100%">
                  <el-option v-for="(item, index) in yearList" :key="index" :label="item.name" :value="item.name"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="4">
            <el-col :span="10">
              <el-form-item label="年级" required prop="educationLevel">
                <el-select v-model="form.educationLevel"
                           @change="getClassData(form.educationLevel)"
                           clearable filterable placeholder="请输入年级" style="width: 100%">
                  <el-option v-for="(item, index) in gradeList" :key="index" :label="item.name" :value="item.name"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </basic-container>
      <basic-container>
        <span class="tip-info"></span>
        <span class="tip-title">班级信息</span>
        <div style="margin-top: 20px">
          <span class="tip-title" style="margin-right: 20px">选择班级</span>
          <el-select v-model="form.gradeId" placeholder="请选择" clearable filterable>
            <el-option v-for="item in classList" :key="item._id" :label="item.name" :value="item._id"/>
          </el-select>
        </div>
      </basic-container>
    </el-form>
    <span class="tip-text">
                  注意：学生登录账号为 <span style="color: red">姓名的拼音+学号</span> ，
      例如张三的学号是202201，那么张三的登录账号为 zhangsan202201；<span style="color: red">登录初始密码为123456</span>
        </span>
    <div class="footer-btn">
      <el-button style="color: #475B75" @click="goBack">取消</el-button>
      <el-button type="primary" @click="operationData">保存</el-button>
    </div>
  </div>
</template>

<script>
import {
  validateUsername
} from "../../../../utils/validate";
import {createStudentInfo} from "../../../../api/admin/students";
import {selectClassList, selectTypeList} from "../../../../api/common/search";
import {errorTip, successTip} from "../../../../utils/tip";

export default {
  name: "add",
  data() {
    return {
      form: {
        educationLevel: "",  //年级
        enrollmentYear: "", //入学年份
        gender: "", //性别
        gradeId: "", //班级Id
        name: "", //姓名
        studentId: "", //学号
      },
      rules: {
        studentId: [
          {
            required: true, trigger: 'blur', validator: (rule, value, callback) => {
              !value ? callback(new Error('学号不能为空')) : callback()
            }
          }
        ],
        name: [{
          required: true, trigger: 'blur', validator: (rule, value, callback) => {
            if (!value) {
              callback(new Error('姓名不能为空'))
            }
            if (!/[^\u4E00-\u9FA5]/g.test(value)) {
              callback()
            } else {
              callback(new Error('输入的姓名只能是中文'))
            }
          }
        }],
        gender: [{
          required: true, trigger: 'blur', validator: (rule, value, callback) => {
            !value ? callback(new Error('性别不能为空')) : callback()
          }
        }],
        enrollmentYear: [{
          required: true, trigger: 'blur', validator: (rule, value, callback) => {
            !value ? callback(new Error('入学年份不能为空')) : callback()
          }
        }],
        educationLevel: [{
          required: true, trigger: 'blur', validator: (rule, value, callback) => {
            !value ? callback(new Error('年级不能为空')) : callback()
          }
        }],
      },
      classList: [],
      gradeList: [],
      yearList: []
    }
  },
  mounted() {
    this.getYearList();
    this.getGradeList();
  },
  methods: {
    getGradeList() {
      selectTypeList('grade')
          .then(res => {
            if (res.errorCode === 200) {
              this.gradeList = res.data;
            }
          })
    },
    getYearList() {
      selectTypeList('vintage')
          .then(res => {
            if (res.errorCode === 200) {
              this.yearList = res.data;
            }
          })
    },
    getClassData(grade) {
      selectClassList(grade)
          .then(res => {
            if (res.errorCode === 200) {
              this.classList = res.data;
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
          createStudentInfo(that.form)
              .then(res => {
                if (res.errorCode === 200) {
                  successTip()
                  this.goBack();
                } else if (!res.success) {
                  errorTip(res.msg);
                  return false;
                }
              })
        } else {
          return false;
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.student-table-title {
  display: flex;
  justify-content: space-around;
  text-align: center;
  align-items: center;
  height: 54px;
  background-color: #FFFFFF;

  span {
    width: 33.33%;
    height: 54px;
    line-height: 54px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #475B75;
    border-top: 1px solid #dddee2;
    border-right: 1px solid #dddee2;
  }
}

.m-right {
  margin-right: 20px;
}

.tip-text {
  margin: 10px;
  height: 17px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #B8C3D6;
  line-height: 17px;
}
</style>