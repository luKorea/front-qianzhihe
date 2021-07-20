<template>
  <div>
    <span class="tip-info"></span>
    <span class="tip-title">学生列表</span>
    <div class="search-wrap m-top">
      <div>
        <span class="tip">班级类型:</span>
        <el-select v-model="params.gradeType" placeholder="请选择" clearable filterable>
          <template v-if="gradeTypeList && gradeTypeList.length > 0">
            <el-option v-for="item in gradeTypeList" :label="item.name" :value="item.name"></el-option>
          </template>
        </el-select>
      </div>
      <div>
        <span class="tip">年级:</span>
        <el-select v-model="params.grade" placeholder="请选择" clearable filterable>
          <template v-if="gradeList && gradeList.length > 0">
            <el-option v-for="item in gradeList" :label="item.name" :value="item.name"></el-option>
          </template>
        </el-select>
      </div>
      <div>
        <span class="tip">班级:</span>
        <el-select v-model="params.graduate" placeholder="请选择" clearable filterable>
          <template v-if="classList && classList.length > 0">
            <el-option v-for="item in classList" :label="item.name" :value="item.name"></el-option>
          </template>
        </el-select>
      </div>
      <div>
        <el-button plain icon="el-icon-download">导出EXCEL</el-button>
      </div>
    </div>
    <el-table
        border
        :data="[{ date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' }, { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' }]"
        style="width: 100%; margin-bottom: 20px">
      <el-table-column prop="date" label='学号' align="center"/>
      <el-table-column prop="date" label='姓名' align="center"/>
      <el-table-column prop="date" label='性别' align="center"/>
      <el-table-column prop="date" label='手机号' align="center"/>
      <el-table-column prop="date" label='首选科目' align="center"/>
      <el-table-column prop="date" label='再选科目1' align="center"/>
      <el-table-column prop="date" label='再选科目2' align="center"/>
      <el-table-column prop="date" label='年级' align="center"/>
      <el-table-column prop="date" label='所属班级' align="center"/>
      <el-table-column prop="date" label='班级类型' align="center"/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <basic-pagination
        :total="params.total"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
    />
  </div>
</template>

<script>
import {selectClassList, selectTypeList} from "../../../../../api/common/search";
import {getList} from "../../../../../api/common/dataAnalysis/subjectSelectionTypeStatistics";

export default {
  name: "student",
  data() {
    return {
      params: {
        page: 0,
        size: 10,
        gradeType: '', //	年级
        graduate: '', // 班级
        grade: '', //班级类型
        queryOrIdOrNameOrPhone: '',
        total: 0
      },
      classList: [],
      gradeTypeList: [],
      gradeList: [],
      list: [],
    }
  },
  mounted() {
    this.getData(this.params);
    this.getGrade();
    this.getGradeType();
    this.getClassData();
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
    getGradeType() {
      selectTypeList('gradeType')
          .then(res => {
            if (res.errorCode === 200) {
              this.gradeTypeList = res.data;
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
    getData(params) {
      getList(params)
          .then(res => {
            if (res.errorCode === 200) {
              console.log(res, 'data');
              this.list = res.data;
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