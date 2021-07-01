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
                <el-input v-model="form.activationDate" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </basic-container>
      <basic-container>
        <span class="tip-info"></span>
        <span class="tip-title">班级信息</span>
        <template v-if="form.gradeDto">
          <div class="table-wrap">
            <div class="table-title" style="background-color: #FFFFFF">
              <span>班级ID</span>
              <span>班级名称</span>
              <span>班级类型</span>
              <span>年级</span>
              <span>入学年份</span>
              <span>班主任</span>
              <span>生涯导师1</span>
              <span>生涯导师2</span>
              <span>操作</span>
            </div>
            <div class="student-table-title">
              <span>{{ form.gradeDto._id.slice(0, 12) }}</span>
              <span>{{ form.gradeDto.name }}</span>
              <span>{{ form.gradeDto.gradeType }}</span>
              <span>{{ form.gradeDto.grade }}</span>
              <span>{{ form.gradeDto.enrollmentYear }}</span>
              <span>{{ form.gradeDto.teacherName }}</span>
              <span>{{ form.gradeDto.teacher1Name }}</span>
              <span>{{ form.gradeDto.teacher2Name }}</span>
              <span style="color: #FF0000; cursor:pointer;" @click="removeClassInfo(form._id)">解除班级绑定</span>
            </div>
          </div>
        </template>
        <template v-else>
          <div style="margin-top: 20px">
            <span class="tip-title" style="margin-right: 20px">选择班级</span>
            <el-select v-model="form.gradeId" placeholder="请选择" clearable>
              <el-option v-for="item in classList" :key="item._id" :label="item.name" :value="item._id"/>
            </el-select>
          </div>
        </template>
      </basic-container>
      <basic-container style="margin-bottom: 60px">
        <span class="tip-info"></span>
        <span class="tip-title">选科信息</span>
        <div class="m-top">
          <div class="m-bottom">
            <span class="tip-title">首选科目（2选1）</span>
            <el-radio-group v-model="form.firstChoice">
              <el-radio v-for="(item, index) in firstList" :label="item.name" />
            </el-radio-group>
          </div>
          <div style="display: flex; align-items: center">
            <span class="tip-title">再选科目（4选2）</span>
            <el-checkbox-group v-model="checkList" :max="2">
              <el-checkbox v-for="(item, index) in recleaningList" :label="item.name" :key="index">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
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
  validatePhone,
  validateUsername
} from "../../../../utils/validate";
import {getStudentInfo, removeStudentToClass, updateStudentInfo} from "../../../../api/admin/students";
import {selectClassList, selectTypeList} from "../../../../api/common/search";

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
      teacherList: [],
      classList: [],
      firstList: [],
      recleaningList: [],
      checkList: []
    }
  },
  mounted() {
    let {studentId, gradeId} = this.$route.query;
    this.params.studentId = studentId;
    this.params.gradeId = gradeId;
    this.getEditData(this.params);
    this.getClassData();
    this.getFirstSelectData();
    this.getRecleaningData();
  },
  methods: {
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
              this.recleaningList = res.data;
            }
          })
    },
    getClassData() {
      selectClassList()
          .then(res => {
            if (res.errorCode === 200) {
              this.classList = res.data;
            }
          })
    },
    getEditData(params) {
      getStudentInfo(params)
          .then(res => {
            if (res.errorCode === 200) {
              this.form = res.data;
              this.checkList = [this.form.recleaning1, this.form.recleaning2];
              this.form['gender'] = this.form.gender == 'f' ? '男' : '女';

            }
          })
    },
    goBack() {
      this.$router.go(-1);
    },
    removeClassInfo(studentId) {
      let that = this;
      that.$confirm('此操作将会将该名学生移出当前班级, 是否继续?', '移除学生', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeStudentToClass(studentId)
            .then(res => {
              if (res.errorCode === 200) {
                that.$message({
                  type: 'success',
                  message: '移除成功!'
                });
                that.goBack();
                // that.getEditData(that.params);
              }
            })
      }).catch(() => {
      });
      console.log(studentId);
    },
    operationData() {
      let that = this;
      that.form['gender'] = this.form.gender === '男' ? 'f' : 'm';
      that.form['gradeId'] = this.params.gradeId !== '' ? this.params.gradeId : this.form.gradeId;
      that.form['recleaning1'] = that.checkList[0];
      that.form['recleaning2'] = that.checkList[1];
      that.$refs['form'].validate(valid => {
        if (valid) {
          updateStudentInfo(that.form)
              .then(res => {
                if (res.errorCode === 200) {
                  this.$message.success('修改成功');
                  this.goBack();
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
</style>