<template>
  <div>
    <basic-skeleton :loading="loading"></basic-skeleton>
    <div v-if="!loading">
      <el-form status-icon label-width="80px" :model="form" :rules="rules" ref="form">
        <basic-container>
          <span class="tip-info"></span>
          <span class="tip-title">基本信息</span>
          <div style="margin-top: 20px">
            <el-row :gutter="4">
              <el-col :span="10">
                <el-form-item label="学号">
                  <el-input v-model="form.studentId" disabled/>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="头像">
                  <el-avatar :size="30" :src="form.profilePicture"></el-avatar>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="4">
              <el-col :span="10">
                <el-form-item label="姓名" required prop="schoolUserName">
                  <el-input v-model="form.schoolUserName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="性别">
                  <el-select v-model="form.gender" style="width: 100%" disabled>
                    <el-option value="F" label="女"></el-option>
                    <el-option value="M" label="男"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="4">
              <el-col :span="10">
                <el-form-item label="手机号">
                  <el-input v-model="form.username" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="激活日期">
                  <el-input v-model="form.activationDate" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="4">
              <!--            <el-col :span="10">-->
              <!--              <el-form-item label="年级" required-->
              <!--                            prop="educationLevel">-->
              <!--                <el-select v-model="form.educationLevel"-->
              <!--                           @change="getClassData(form.educationLevel)"-->
              <!--                           clearable filterable placeholder="请输入年级" style="width: 100%">-->
              <!--                  <el-option v-for="(item, index) in gradeList" :key="index" :label="item.name" :value="item.name"/>-->
              <!--                </el-select>-->
              <!--              </el-form-item>-->
              <!--            </el-col>-->
              <el-col :span="10">
                <el-form-item label="入学年份" required prop="enrollmentYear">
                  <el-select v-model="form.enrollmentYear" clearable filterable placeholder="请输入入学年份" style="width: 100%">
                    <el-option v-for="(item, index) in yearList" :key="index" :label="item.name" :value="item.name"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </basic-container>
        <basic-container>
          <span class="tip-info"></span>
          <span class="tip-title">班级信息</span>
          <template v-if="form.gradeDto && form.gradeDto.name">
            <div class="table-wrap">
              <div class="table-title" style="background-color: #FFFFFF">
                <!--              <span>班级ID</span>-->
                <span>班级名称</span>
                <!--              <span>班级类型</span>-->
                <span>年级</span>
                <span>入学年份</span>
                <span>班主任</span>
                <span>生涯导师1</span>
                <span>生涯导师2</span>
                <span>操作</span>
              </div>
              <div class="student-table-title">
                <!--              <span v-if="form.gradeDto._id">{{ form.gradeDto._id.slice(0, 12) }}</span>-->
                <span>{{ form.gradeDto.name }}</span>
                <!--              <span>{{ form.gradeDto.gradeType }}</span>-->
                <span>{{ form.gradeDto.grade }}</span>
                <span>{{ form.gradeDto.enrollmentYear }}</span>
                <span>{{ form.gradeDto.teacherName }}</span>
                <span>{{ form.gradeDto.teacher1Name }}</span>
                <span>{{ form.gradeDto.teacher2Name }}</span>
                <span style="color: #B8C3D6; cursor:pointer;" @click="removeClassInfo(form._id)">解除班级绑定</span>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="m-top">
              <span class="tip-title" style="margin-right: 20px">选择年级</span>
              <el-select v-model="form.grade"
                         @change="getClassData(form.grade)"
                         clearable filterable placeholder="请输入年级">
                <el-option v-for="(item, index) in gradeList" :key="index" :label="item.name" :value="item.name"/>
              </el-select>
            </div>
            <div style="margin-top: 20px">
              <span class="tip-title" style="margin-right: 20px">选择班级</span>
              <el-select v-model="form.gradeId" placeholder="请选择" clearable filterable>
                <el-option v-for="item in classList" :key="item._id" :label="item.name" :value="item._id"/>
              </el-select>
            </div>
          </template>
        </basic-container>
<!--        <basic-container style="margin-bottom: 60px">-->
<!--          <span class="tip-info"></span>-->
<!--          <span class="tip-title">选科信息</span>-->
<!--          <div class="m-top">-->
<!--            <div class="m-bottom">-->
<!--              <span class="tip-title">首选科目（2选1）</span>-->
<!--              <el-radio-group v-model="form.firstChoice">-->
<!--                <el-radio v-for="(item, index) in firstList" :label="item.name"/>-->
<!--              </el-radio-group>-->
<!--            </div>-->
<!--            <div style="display: flex; align-items: center">-->
<!--              <span class="tip-title">再选科目（4选2）</span>-->
<!--              <el-checkbox-group v-model="checkList" :max="2">-->
<!--                <el-checkbox v-for="(item, index) in recleaningList" :label="item.name" :key="edit">{{ item.name }}-->
<!--                </el-checkbox>-->
<!--              </el-checkbox-group>-->
<!--            </div>-->
<!--          </div>-->
<!--        </basic-container>-->
        <basic-container style="margin-bottom: 60px">
          <template
              v-if="this.form.studentCourseSelectionPlanVoList && this.form.studentCourseSelectionPlanVoList.length > 0">
            <div class="modal" v-for="(subjectItem, index) in this.form.studentCourseSelectionPlanVoList"
                 :key="subjectItem._id">
              <div class="left" style="margin-bottom: 20px">
                <div class="state">
                  <span v-if="subjectItem.state === 1" class="no-start">未开始</span>
                  <span v-if="subjectItem.state === 2" class="starting">进行中</span>
                  <span v-if="subjectItem.state === 3" class="close">已截止</span>
                  <div class="state-name">{{ subjectItem.name }}</div>
                  <div class="state-time">(提交选科时间：{{ subjectItem.startTime }}—{{ subjectItem.endTime }})</div>
                </div>
                <div class="m-top">
                  <div class="m-bottom">
                    <span class="tip-title">首选科目（2选1）</span>
                    <el-radio-group v-model="subjectItem.firstChoice">
                      <el-radio
                          :key="index" v-for="(item, index) in firstList"
                          :label="item.name"
                      />
                    </el-radio-group>
                  </div>
                  <div style="display: flex; align-items: center">
                    <span class="tip-title">再选科目（4选2）</span>
                    <el-checkbox-group v-model="subjectItem.checkList" :max="2">
                      <el-checkbox v-for="item in recleaningList"
                                   v-model="subjectItem.checkList"
                                   :label="item.name" :key="item.id">{{ item.name }}
                      </el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <basic-nothing title="您的年级暂未创建模拟选科计划"></basic-nothing>
          </template>
        </basic-container>
      </el-form>
      <div class="footer-btn">
        <el-button style="color: #475B75" @click="goBack">返回</el-button>
        <el-button type="primary" :loading="loading" @click="operationData">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  validateUsername
} from "../../../../utils/validate";
import {
  getStudentInfo,
  removeStudentToClass,
  updateStudentInfo,
  selectClassList
} from "../../../../api/teacher/teacherStudents";
import {selectTypeList} from "../../../../api/common/search";
import {operationTip, successTip, errorTip} from "../../../../utils/tip";

export default {
  name: "index",
  data() {
    return {
      loading: false,
      params: {
        studentId: '',
        gradeId: ''
      },
      form: {},
      rules: {
        name: [{required: true, trigger: 'blur', validator: validateUsername}],
      },
      teacherList: [],
      classList: [],
      firstList: [],
      recleaningList: [],
      checkList: [],
      gradeList: [],
      yearList: [],
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
    getClassData(grade) {
      selectClassList(grade)
          .then(res => {
            if (res.errorCode === 200) {
              this.classList = res.data;
            }
          })
    },
    initReleaning (data) {
      data.forEach((item, index) => {
        this.$set(item, 'checkList', item.recleaning1 && item.recleaning2 ? [item.recleaning1, item.recleaning2] : [])
      })
    },
    getEditData(params) {
      this.loading = true;
      getStudentInfo(params)
          .then(res => {
            if (res.errorCode === 200) {
              this.form = res.data;
              this.loading = false;
              this.initReleaning(
                  this.form.studentCourseSelectionPlanVoList ? this.form.studentCourseSelectionPlanVoList : []);
              // this.form.recleaning1 && this.form.recleaning2
              // this.form.recleaning1 && this.form.recleaning2
              //     ? this.checkList = [this.form.recleaning1, this.form.recleaning2]
              //     : this.checkList = [];
              this.form['gender'] = this.form.gender === 'M' ? '男' : '女';
              this.getClassData(this.form.grade);
            } else {
              this.loading = false;
              errorTip(res.msg)
            }
          })
    },
    goBack() {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.go(-1);
    },
    removeClassInfo(studentId) {
      let that = this;
      operationTip({
        message: '此操作将会将该名学生移出当前班级, 是否继续?',
        title: '移除学生'
      }, () => {
        removeStudentToClass(studentId)
            .then(res => {
              if (res.errorCode === 200) {
                successTip();
                // that.goBack();
                that.params.gradeId = '';
                that.getEditData(that.params)
              } else {
                errorTip(res.msg)
              }
            })
      })
    },
    operationData() {
      let that = this;
      that.form['gender'] = this.form.gender === '男' ? 'M' : 'F';
      if (!that.form.gradeDto) {
        that.form.gradeDto = {
          _id: this.form.gradeId
        };
      }
      that.form.studentCourseSelectionPlanVoList.forEach(item => {
        item['recleaning1'] = item.checkList[0] !== undefined ? item.checkList[0] : '';
        item['recleaning2'] = item.checkList[1] !== undefined ? item.checkList[1] : ''
      })
      that.$refs['form'].validate(valid => {
        if (valid) {
          that.loading = true;
          updateStudentInfo(that.form)
              .then(res => {
                if (res.errorCode === 200) {
                  successTip();
                  that.loading = false;
                  this.getEditData(this.params);
                  // this.goBack();
                } else {
                  errorTip(res.msg)
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
