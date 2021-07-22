<template>
  <div>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">测评统计筛选</span>
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
          <el-button type="primary" @click="switchData({
          ...params,
          page: 0
          })">筛选</el-button>
        </div>
      </div>
    </basic-container>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">测评数据统计</span>
      <el-divider/>
      <mbit-charts :list="mbitResultList"
                   :percent-info="mbitInfo"
                   :major-list="majorMbtiList" :occupation-list="occupationMbtiList"/>
      <el-divider/>
      <holland-charts :list="hollandResultList"
                      :percent-info="hollandInfo"
                      :major-list="majorList" :occupation-list="occupationList"/>
    </basic-container>
  </div>
</template>

<script>
import {selectTypeList, selectClassList} from "../../../../api/common/search";
import {
  getList,
  getPercentageType,
  getUserEvaluationOccupationOrProfession
} from "../../../../api/common/dataAnalysis/evaluationStatistics";
import mbitCharts from "./copmonents/mbit";
import hollandCharts from "./copmonents/holland";

export default {
  name: "evaluationStatistics",
  components: {
    mbitCharts,
    hollandCharts
  },
  data() {
    return {
      params: {
        type: '',
        grade: '',
        graduate: ''
      },
      classList: [],
      gradeList: [],
      mbitResultList: [],
      hollandResultList: [],
      majorList: [],
      mbitInfo: {},
      hollandInfo: {},
      occupationList: [],
      occupationMbtiList: [],
      majorMbtiList: [],
    }
  },
  mounted() {
    this.switchData();
    this.getGrade();
    this.getClassData();
    this.$nextTick(() => {
      this.initCharts()
    })
  },
  methods: {
    switchData() {
      this.getData({
        ...this.params,
        type: 'holland'
      });
      this.getData({
        ...this.params,
        type: 'mbti'
      });
      this.getPercentData({
        ...this.params,
        type: 'mbti'
      });
      this.getPercentData({
        ...this.params,
        type: 'holland'
      });
      this.getMajorOccupation({
        ...this.params,
        type: 'holland'
      });
      this.getMajorOccupation({
        ...this.params,
        type: 'mbti'
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
    },
    getPercentData(params) {
      getPercentageType(params)
          .then(res => {
            if (res.errorCode === 200) {
              params.type === 'mbti' ? this.mbitInfo = res.data : this.hollandInfo = res.data;
            }
          })
    },
    getData(params) {
      getList(params)
          .then(res => {
            if (res.errorCode === 200) {
              if (params.type === 'holland') {
                this.hollandResultList = res.data;
              } else {
                this.mbitResultList = res.data;
              }
            }
          })
    },
    getMajorOccupation(params) {
      getUserEvaluationOccupationOrProfession(params)
          .then(res => {
            if (res.errorCode === 200) {
              console.log(res);
              if (params.type === 'holland') {
                this.occupationList = res.data.occupationEvaluationVoList;
                this.majorList= res.data.professionEvaluationVoList;
              } else if (params.type === 'mbti'){
                this.occupationMbtiList = res.data.occupationEvaluationVoList;
                this.majorMbtiList = res.data.professionEvaluationVoList;
              }
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
</style>