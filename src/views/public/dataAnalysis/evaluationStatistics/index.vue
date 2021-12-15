<template>
  <div>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">测评统计筛选</span>
      <div class="search-wrap m-top">
        <div>
          <span class="tip">年级:</span>
          <el-select v-model="params.grade"
                     @change="(e) => {
                       params.graduate = ''
                       getClassData(e)
                     }"
                     placeholder="请选择" clearable filterable>
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
          <el-button type="primary" :loading="loading" @click="searchData">筛选</el-button>
        </div>
      </div>
    </basic-container>
    <basic-skeleton :loading="loading"></basic-skeleton>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">测评数据统计</span>
      <el-divider/>
      <holland-charts :list="hollandResultList"
                      :percent-info="hollandInfo"
                      :major-list="majorList" :occupation-list="occupationList"/>
      <el-divider/>
      <mbit-charts :list="mbitResultList"
                   :percent-info="mbitInfo"
                   :major-list="majorMbtiList" :occupation-list="occupationMbtiList"/>
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
      loading: false,
      params: {
        type: '',
        grade: '高一',
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
  },
  methods: {
    searchData() {
      this.params.page = 0;
      this.switchData();
    },
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
    getClassData(grade) {
      selectClassList(grade)
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
      this.loading = true;
      getList(params)
          .then(res => {
            if (res.errorCode === 200) {
              this.loading = false;
              if (params.type === 'holland') {
                this.hollandResultList = res.data;
              } else {
                this.mbitResultList = res.data;
              }
            }
          })
    },
    getMajorOccupation(params) {
      this.loading = true;
      getUserEvaluationOccupationOrProfession(params)
          .then(res => {
            if (res.errorCode === 200) {
              console.log(res);
              this.loading = false;
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
