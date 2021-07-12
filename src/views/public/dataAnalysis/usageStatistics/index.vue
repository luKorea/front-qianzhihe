<template>
  <div>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">平均使用时长</span>
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
            <el-select v-model="timeParams.grade" placeholder="请选择" clearable filterable>
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
            <el-button type="primary" style="margin-left: 20px" @click="getTimeInfo(timeParams)">筛选</el-button>
          </div>
        </div>
      </div>
    </basic-container>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">APP使用记录筛选</span>
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
                    @keyup.enter.native="getHistoryData(params)"
                    style="margin-right: 20px; width: 300px"
                    placeholder="请输入学号、名称、手机号"/>
          <el-button type="primary" @click="getHistoryData(params)">筛选</el-button>
        </div>
      </div>
    </basic-container>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">APP使用记录</span>
      <el-table :data="list" border style="width: 100%;margin: 20px 0">
        <el-table-column prop="user.studentId" label="学号" align="center" />
        <el-table-column label="头像" align="center" width="80">
          <template slot-scope="scope">
            <el-avatar size="32" :src="scope.row.user.profilePicture"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="user.schoolUserName" label="姓名" align="center" />
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.user.gender   == 'f' ? '女' : '男'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="user.username" label="手机号" align="center" />
        <el-table-column label="班级" align="center">
          <template slot-scope="scope">
<!--            TODO 跳转待定-->
            <span>{{scope.row.user.gradeName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="activityName" label="操作日志" align="center" width="300" />
        <el-table-column prop="_created_at" label="操作时间" align="center" />
      </el-table>
      <basic-pagination
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

export default {
  name: "usageStatistics",
  data() {
    return {
      info: '',
      list: [],
      classList: [],
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
    this.getTimeInfo(this.timeParams);
    this.getHistoryData(this.params);
  },
  methods: {
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
    getTimeInfo(params) {
      getTime(params)
          .then(res => {
            if (res.errorCode === 200) {
              this.info = res.data;
              console.log(res.data, 'usageStatistics');
            }
          })
    },
    getHistoryData(params) {
      getHistory(params)
          .then(res => {
            if (res.errorCode === 200) {
              let data = res.data;
              this.list = data.result;
              console.log(res);
              this.params.total = data.pageResult.total || 0;
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


</style>