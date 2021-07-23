<template>
  <div>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">选科征集统计筛选</span>
      <div class="search-wrap m-top">
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
          <el-button type="primary" @click="getAllData(params)">筛选</el-button>
        </div>
      </div>
    </basic-container>
    <charts-components
        :percent-info="percentInfo"
        :first-data="firstData"
        :recleaning-data="recleaningData"
    />
    <basic-container>
      <student-components
          :class-list="classList"
          :grade-list="gradeList"
      />
    </basic-container>
  </div>
</template>

<script>
import {selectClassList, selectTypeList} from "../../../../api/common/search";
import {getPercent, getPercentList} from "../../../../api/common/dataAnalysis/subjectSelectionTypeStatistics";
import studentComponents from "./components/student";
import chartsComponents from "./components/charts";
import {errorTip} from "../../../../utils/tip";


export default {
  name: "index",
  components: {
    studentComponents,
    chartsComponents
  },
  data() {
    return {
      params: {
        grade: '',
        graduate: '',
        type: ''
      },
      classList: [],
      gradeList: [],
      list: [],
      percentInfo: {},
      firstData: [],
      recleaningData: []
    }
  },
  mounted() {
    this.getAllData(this.params);
    this.getGrade();
    this.getClassData();
  },
  methods: {
    getAllData(params) {
      this.getPercentData(params);
      this.getFirst(params);
      this.getRecleaning(params);
    },
    getPercentData(params) {
      getPercent(params)
          .then(res => {
            if (res.errorCode === 200) {
              this.percentInfo = res.data;
            } else {
              errorTip(res.msg);
            }
          })
    },
    getFirst(params) {
      getPercentList({
        ...params,
        type: 'firstChoice'
      }).then(res => {
        if (res.errorCode === 200) {
          this.firstData = res.data;
        } else {
          errorTip(res.msg);
        }
      })
    },
    getRecleaning(params) {
      getPercentList({
        ...params,
        type: 'recleaning'
      }).then(res => {
        if (res.errorCode === 200) {
          this.recleaningData = res.data;
        } else {
          errorTip(res.msg);
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
    getClassData() {
      selectClassList()
          .then(res => {
            if (res.errorCode === 200) {
              this.classList = res.data;
            }
          })
    }
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