<template>
  <div>
    <span class="tip-info"></span>
    <span class="tip-title">学生列表</span>
    <div class="search-wrap m-top">
      <div>
        <span class="tip">班级类型:</span>
        <el-select v-model="params.gradeType"
                   @change="confirmData"
                   placeholder="请选择" clearable filterable>
          <template v-if="gradeTypeList && gradeTypeList.length > 0">
            <el-option v-for="item in gradeTypeList" :label="item.name" :value="item.name"></el-option>
          </template>
        </el-select>
      </div>
      <div>
        <span class="tip">年级:</span>
        <el-select v-model="params.grade"
                   @change="changeGrade"
                   placeholder="请选择" clearable filterable>
          <template v-if="gradeList && gradeList.length > 0">
            <el-option v-for="item in gradeList" :label="item.name" :value="item.name"></el-option>
          </template>
        </el-select>
      </div>
      <div>
        <span class="tip">班级:</span>
        <el-select v-model="params.graduate"
                   @change="confirmData"
                   placeholder="请选择" clearable filterable>
          <template v-if="classList && classList.length > 0">
            <el-option v-for="item in classList" :label="item.name" :value="item.name"></el-option>
          </template>
        </el-select>
      </div>
      <div>
        <el-button plain icon="el-icon-download" @click="downStudent">导出EXCEL</el-button>
      </div>
    </div>
    <el-table
        border
        :data="list"
        v-loading="loading"
        style="width: 100%; margin-bottom: 20px">
      <el-table-column prop="studentId" label="学号" align="center"/>
      <el-table-column prop="schoolUserName" label="姓名" align="center">
        <template slot-scope="scope">
            <span class="inline-text"
                  @click="goStudentDetail(scope.row._id, scope.row.gradeId)"
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
      <el-table-column prop="firstChoice" label='首选科目' align="center"/>
      <el-table-column prop="recleaning1" label='再选科目1' align="center"/>
      <el-table-column prop="recleaning2" label='再选科目2' align="center"/>
      <el-table-column prop="educationLevel" label='年级' align="center"/>
      <el-table-column prop="gradeName" label="所属班级" align="center">
        <template slot-scope="scope">
            <span class="inline-text"
                  @click="goGradeDetail(scope.row.gradeId)"
                  v-if="scope.row.gradeName !== '-'">{{ scope.row.gradeName }}</span>
          <span v-else>{{ scope.row.gradeName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="gradeType" label='班级类型' align="center"/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="goStudentDetail(scope.row._id, scope.row.gradeId)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <basic-pagination
        :page="params.page + 1"
        :total="params.total"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
    />
  </div>
</template>

<script>
import {selectClassList, selectTypeList} from "../../../../../api/common/search";
import {downStudentList, getList} from "../../../../../api/common/dataAnalysis/subjectSelectionTypeStatistics";

export default {
  name: "student",
  data() {
    return {
      loading: true,
      params: {
        page: 0,
        size: 10,
        gradeType: '',
        graduate: '',
        grade: '',
        queryOrIdOrNameOrPhone: '',
        total: 0
      },
      classList: [],
      gradeList: [],
      gradeTypeList: [],
      list: [],
    }
  },
  mounted() {
    this.getData(this.params);
    this.getClassData();
    this.getGrade();
    this.getGradeType();
  },
  methods: {
    confirmData(){
      this.params.page = 0;
      this.getData(this.params);
    },
    downStudent() {
      downStudentList(this.params, `学生选科征集名单.xls`)
          .then(res => {
          })
    },
    goStudentDetail(studentId, gradeId) {
      const {user_type} = this.$store.state.user;
      console.log(user_type);
      if (user_type === '学校管理员') {
        this.$router.push({
          path: '/students/studentDetails',
          query: {
            studentId: studentId,
            gradeId: gradeId ? gradeId : ''
          }
        })
      } else {
        this.$router.push({
          path: '/teacherGrade/studentDetails',
          query: {
            studentId: studentId,
            gradeId: gradeId ? gradeId : ''
          }
        })
      }
    },
    goGradeDetail(gradeId) {
      const {user_type} = this.$store.state.user;
      console.log(user_type);
      if (user_type === '学校管理员') {
        this.$router.push({
          path: '/grade/gradeDetails',
          query: {
            id: gradeId
          }
        })
      } else {
        this.$router.push({
          path: '/teacherGrade/gradeDetails',
          query: {
            id: gradeId
          }
        })
      }
    },
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
    getClassData(grade) {
      selectClassList(grade)
          .then(res => {
            if (res.errorCode === 200) {
              this.classList = res.data;
            }
          })
    },
    changeGrade(value) {
      this.getData({
        ...this.params,
        page: 0
      });
      this.getClassData(value);
    },
    getData(params) {
      this.loading = true;
      getList(params)
          .then(res => {
            if (res.errorCode === 200) {
              console.log(res, 'data');
              this.list = res.data.result;
              this.loading = false;
              this.params.total = res.data.pageResult.total || 0;
            }
          })
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.getData(this.params);
    },
    handleSizeChange(val) {
      this.params.size = val;
      this.getData(this.params);
    },
  }
}
</script>


<style scoped lang="scss">
.tip {
  margin-right: 10px;
  height: 22px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #2E415B;
  line-height: 22px;
}

.charts-flex {
  display: flex;
  width: 100%;
  height: 400px;

  .charts {
    width: 70%;
    height: 100%;
  }

  .tip {
    display: flex;
    width: 20%;

    .tip-number {
      margin-right: 40px;

      .title {
        font-size: 14px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: #B8C3D6;
      }
    }

    .number-wrap {
      display: flex;
      flex-direction: column;
      margin-top: 10px;

      span {
        margin-bottom: 2px;
        font-size: 14px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: #6C7293;
      }
    }

    //justify-content: space-between;
  }
}
</style>
