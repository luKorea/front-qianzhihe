<template>
  <div>
    <basic-skeleton :loading="loading"></basic-skeleton>
    <template v-if="!loading">
      <basic-container-back>
        <div class="flex" style="margin-top: 20px">
          <div class="left">
            <span class="tip-info"></span>
            <span class="tip-title">班级基本信息</span>
          </div>
          <div class="right">
            <el-button @click="goEditGrade">编辑班级信息</el-button>
            <el-button @click="openOrClose(info._id, false)" type="danger" plain v-if="info.openCourseSelectionFor">
              关闭选科征集
            </el-button>
            <el-button @click="openOrClose(info._id, true)" v-else>开启选科征集</el-button>
          </div>
        </div>
        <div style="margin-top: 20px">
          <el-row :gutter="4" class="m-bottom">
            <el-col :span="8">
              <div>
                <span class="student-title">班级名称：</span>
                <span class="student-info">{{ info.name }}</span>
              </div>
            </el-col>
            <el-col :span="8">
              <span class="student-title">提交选科人数：</span>
              <span class="student-info">{{ info.chooseCount || 0}}</span>
            </el-col>
            <el-col :span="8">
              <span class="student-title">班级人数：</span>
              <span class="student-info">{{ info.gradeCount }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="4" class="m-bottom">
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
            <el-col :span="8">
              <span class="student-title">入学年份：</span>
              <span class="student-info">{{ info.enrollmentYear }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="4" class="m-bottom">
            <el-col :span="8">
              <div>
                <span class="student-title">班主任：</span>
                <span class="student-info">
                <span class="inline-text"
                      @click="goTeacherDetail(info.teacherId)"
                      v-if="info.teacherName !== '-'">{{ info.teacherName }}</span>
                <span v-else>{{ info.teacherName }}</span>
              </span>
              </div>
            </el-col>
            <el-col :span="8">
              <span class="student-title">生涯导师1：</span>
              <span class="student-info">
              <span class="inline-text"
                    @click="goTeacherDetail(info.teacher1Id)"
                    v-if="info.teacher1Name !== '-'">{{ info.teacher1Name }}</span>
                <span v-else>{{ info.teacher1Name }}</span>
            </span>
            </el-col>
            <el-col :span="8">
              <span class="student-title">生涯导师2：</span>
              <span class="student-info">
              <span class="inline-text"
                    @click="goTeacherDetail(info.teacher2Id)"
                    v-if="info.teacher2Name !== '-'">{{ info.teacher2Name }}</span>
                <span v-else>{{ info.teacher2Name }}</span>
            </span>
            </el-col>
          </el-row>
        </div>
      </basic-container-back>
      <basic-container>
        <div class="flex">
          <div class="left">
            <span class="tip-info"></span>
            <span class="tip-title">学生名单</span>
          </div>
          <div class="right" v-if="list && list.length > 0">
            <el-button icon="el-icon-printer" @click="exportData">导出EXCEL</el-button>
          </div>
        </div>
        <template v-if="list && list.length > 0">
          <el-table stripe :data="list" border style="width: 100%;margin: 20px 0" v-loading="loading">
            <el-table-column prop="studentId" label="学号" align="center"/>
            <el-table-column label="头像" align="center">
              <template slot-scope="scope">
                <el-avatar size="32" :src="scope.row.profilePicture"></el-avatar>
              </template>
            </el-table-column>
            <el-table-column prop="schoolUserName" label="姓名" align="center">
              <template slot-scope="scope">
            <span class="inline-text"
                  @click="goOperationType('visit', scope.row._id, params.gradeId)"
                  v-if="scope.row.schoolUserName !== '-'">{{ scope.row.schoolUserName }}</span>
                <span v-else>{{ scope.row.schoolUserName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="性别" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.gender === 'F' ? '女' : '男' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="username" label="手机号" align="center"/>
            <el-table-column prop="enrollmentYear" label="入学年份" align="center"/>
            <el-table-column prop="firstChoice" label="首选科目" align="center"/>
            <el-table-column prop="recleaning1" label="再选科目1" align="center"/>
            <el-table-column prop="recleaning2" label="再选科目2" align="center"/>
            <el-table-column label="操作" align="center" width="250">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="goOperationType('visit', scope.row._id, params.gradeId)">查看
                </el-button>
                <el-button type="text" size="small" @click="goOperationType('edit', scope.row._id, params.gradeId)">编辑
                </el-button>
                <el-button type="text" style="color: #B8C3D6" size="small" @click="removeClassInfo(scope.row._id)">解除班级绑定
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <basic-pagination
              :page="params.page + 1"
              :total="params.total"
              @handleCurrentChange="handleCurrentChange"
              @handleSizeChange="handleSizeChange"
          />
        </template>
        <basic-nothing v-else title="该班级暂无学生"></basic-nothing>
      </basic-container>
    </template>
  </div>
</template>

<script>
import {getGradeVisitInfo, exportStudent, updateCourseSelectionFor} from "../../../../api/admin/grade";
import {removeStudentToClass} from "../../../../api/admin/students";
import {operationTip, successTip} from "../../../../utils/tip";

export default {
  name: "visit",
  data() {
    return {
      loading: true,
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
            that.getInfo(this.params);
          }
        })
      })
    },
    goTeacherDetail(teacherId) {
      this.$router.push({
        path: '/teachers/teacherDetails',
        query: {teacherId: teacherId}
      })
    },
    goEditGrade() {
      this.$router.push({
        path: '/grade/gradeOperation',
        query: {
          type: 'edit',
          id: this.params.gradeId
        }
      })
    },
    goBack() {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.go(-1);
    },
    getInfo(params) {
      this.loading = true;
      getGradeVisitInfo(params)
          .then(res => {
            if (res.errorCode === 200) {
              this.loading = false;
              this.info = res.data.object;
              this.list = res.data.result;
              this.params.total = res.data.pageResult.total || 0;
            }
          })
    },
    goOperationType(type, studentId, gradeId) {
      if (type === 'visit') {
        this.$router.push({
          path: '/students/studentDetails',
          query: {
            studentId: studentId,
            gradeId: gradeId ? gradeId : ''
          }
        })
      } else {
        this.$router.push({
          path: '/students/studentOperation',
          query: {
            type,
            studentId,
            gradeId: gradeId ? gradeId : ''
          }
        })
      }
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
              }
            })
      })
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.getInfo(this.params);
    },
    handleSizeChange(val) {
      this.params.size = val;
      this.getInfo(this.params);
    },
    exportData() {
      exportStudent(this.params.gradeId, `【${this.info.name}】-学生名册.xls`);
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
