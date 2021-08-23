<template>
  <div>
    <basic-container>
      <div style="display: flex">
        <span class="tip-info"></span>
        <div>
          <span class="one">平均使用时长</span>
          <span class="two">（每天0点更新数据）</span>
        </div>
      </div>
      <div class="time-flex">
        <div class="left">
          <i class="el-icon-time close-time"></i>
          <div class="wrap">
            <div class="title">平均使用时长</div>
            <div class="time">{{ info }}</div>
          </div>
        </div>
        <div class="right">
          <div class="right-search">
            <span class="tip">年级:</span>
            <el-select v-model="timeParams.grade"
                       @change="(e) => {
                       timeParams.graduate = ''
                       getClassUserData(e)
                     }"
                       placeholder="请选择" clearable filterable>
              <template v-if="gradeList && gradeList.length > 0">
                <el-option v-for="item in gradeList" :label="item.name" :value="item.name"></el-option>
              </template>
            </el-select>
          </div>
          <div class="right-search">
            <span class="tip">班级:</span>
            <el-select v-model="timeParams.graduate" placeholder="请选择" clearable filterable>
              <template v-if="classList && classList.length > 0">
                <el-option v-for="item in classList" :label="item.name" :value="item.name"></el-option>
              </template>
            </el-select>
            <el-button type="primary"
                       :loading="timeLoading"
                       style="margin-left: 20px" @click="getTimeInfo(timeParams)">筛选
            </el-button>
          </div>
        </div>
      </div>
    </basic-container>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">平台使用记录筛选</span>
      <div style="margin-top: 20px; display: flex">
        <div class="right-search">
          <span class="tip">班级:</span>
          <el-select v-model="params.graduate" placeholder="请选择" clearable filterable>
            <template v-if="classList && classList.length > 0">
              <el-option v-for="item in classList" :label="item.name" :value="item.name"></el-option>
            </template>
          </el-select>
        </div>
        <div style="display: flex; margin-left: 20px">
          <el-input v-model="params.searchText"
                    clearable
                    @keyup.enter.native="getHistoryData({
                    ...params,
                    page: 0
                    })"
                    style="margin-right: 20px; width: 300px"
                    placeholder="请输入学号、名称、手机号"/>
          <el-button type="primary" :loading="loading" @click="searchData">筛选</el-button>
        </div>
      </div>
    </basic-container>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">平台使用记录</span>
      <el-table stripe v-loading="loading" :data="list" border style="width: 100%;margin: 20px 0">
        <el-table-column prop="user.studentId" label="学号" align="center"/>
        <el-table-column prop="user.schoolUserName" label="姓名" align="center">
          <template slot-scope="scope">
            <span class="inline-text"
                  @click="goStudentDetail(scope.row.user._id, scope.row.user.gradeId)"
                  v-if="scope.row.user.schoolUserName !== '-'">{{ scope.row.user.schoolUserName }}</span>
            <span v-else>{{ scope.row.user.schoolUserName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.user.gender === 'F' ? '女' : '男' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="user.username" label="手机号" align="center"/>
        <el-table-column label="班级" align="center">
          <template slot-scope="scope">
            <span class="inline-text"
                  @click="goGradeDetail(scope.row.user.gradeId)"
                  v-if="scope.row.user.gradeName !== '-'">{{ scope.row.user.gradeName }}</span>
            <span v-else>{{ scope.row.user.gradeName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="activityName" label="操作日志" align="center" width="300"/>
        <el-table-column prop="_created_at" label="操作时间" align="center"/>
      </el-table>
      <basic-pagination
          :page="params.page + 1"
          :total="params.total"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
      />
    </basic-container>
  </div>
</template>

<script>
import {getTime, getHistory} from "../../../../api/common/dataAnalysis/usageStatistics";
import {selectTypeList, selectClassList} from "../../../../api/common/search";
import {errorTip} from "../../../../utils/tip";

export default {
  name: "usageStatistics",
  data() {
    return {
      timeLoading: true,
      loading: true,
      info: '',
      list: [],
      classList: [],
      classUserList: [],
      gradeList: [],
      timeParams: {
        graduate: '',
        grade: '',
      },
      params: {
        graduate: '',
        grade: '',
        page: 0,
        size: 10,
        searchText: '',
        total: 0,
      }
    }
  },
  mounted() {
    this.getGrade();
    this.getClassData();
    this.getClassUserData();
    this.getTimeInfo(this.timeParams);
    this.getHistoryData(this.params);
  },
  methods: {
    searchData() {
      this.params.page = 0;
      this.getHistoryData(this.params);
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
    getGrade() {
      selectTypeList('grade')
          .then(res => {
            if (res.errorCode === 200) {
              this.gradeList = res.data;
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
    getClassUserData(grade) {
      selectClassList(grade)
          .then(res => {
            if (res.errorCode === 200) {
              this.classUserList = res.data;
            }
          })
    },
    getTimeInfo(params) {
      this.timeLoading = true;
      getTime(params)
          .then(res => {
            if (res.errorCode === 200) {
              this.info = res.data;
              this.timeLoading = false;
              console.log(res.data, 'usageStatistics');
            }
          })
    },
    getHistoryData(params) {
      this.loading = true;
      getHistory(params)
          .then(res => {
            this.loading = false;
            if (res.errorCode === 200) {
              let data = res.data;
              this.list = data.result;
              this.params.total = data.pageResult.total || 0;
            } else{
              errorTip('平台使用记录: ' + res.msg)
            }
          })
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.getHistoryData(this.params);
    },
    handleSizeChange(val) {
      this.params.size = val;
      this.getHistoryData(this.params);
    }
  }
}
</script>

<style scoped lang="scss">
.time-flex {
  display: flex;
  margin-top: 20px;

  .left {
    display: flex;
    width: 300px;
    height: 144px;
    background: linear-gradient(270deg, #4D97FF 0%, #00AAFF 100%);
    border-radius: 8px;
    margin-right: 20px;

    .close-time {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 54px;
      height: 144px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%);
      font-size: 26px;
      color: #FFFFFF;
      margin-right: 20px;
    }

    .wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .title {
        height: 25px;
        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 25px;
      }

      .time {
        height: 36px;
        font-size: 32px;
        font-family: Arial-BoldMT, Arial;
        font-weight: normal;
        color: #FFFFFF;
        line-height: 37px;
      }
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 144px;
  }
}

.right-search {
  display: flex;
  align-items: center;

  .tip {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #2E415B;
    margin-right: 20px;
  }
}

.one {
  height: 22px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #2E415B;
  line-height: 22px;
}

.two {
  height: 22px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #8489A4;
  line-height: 22px;
}
</style>
