<template>
  <div>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">生涯统计报告筛选</span>
      <div style="margin-top: 20px">
        <el-row :gutter="2">
          <el-col :span="6">
            <span class="tip">年级:</span>
            <el-select v-model="params.grade" placeholder="请选择" clearable filterable>
              <template v-if="gradeList && gradeList.length > 0">
                <el-option v-for="item in gradeList" :label="item.name" :value="item.name"></el-option>
              </template>
            </el-select>
          </el-col>
          <el-col :span="6">
            <span class="tip">班级:</span>
            <el-select v-model="params.checkGraduate" placeholder="请选择" clearable filterable>
              <template v-if="classList && classList.length > 0">
                <el-option v-for="item in classList" :label="item.name" :value="item.name"></el-option>
              </template>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="switchData(params)">筛选</el-button>
          </el-col>
        </el-row>
      </div>
    </basic-container>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">生涯统计报告</span>
      <el-divider/>
      <mbit-charts :list="list" :major-list="majorList" :occupation-list="occupationList"/>
      <el-divider/>
      <holland-charts :list="list" :major-list="majorList" :occupation-list="occupationList"/>
    </basic-container>
    <browser-charts :major-list="browserMajorList"  :occupation-list="browserOccupationList"/>
  </div>
</template>

<script>
import {selectTypeList, selectClassList} from "../../../../api/common/search";
import mbitCharts from "./copmonents/mbit";
import hollandCharts from "./copmonents/holland";
import browserCharts from "./copmonents/browser";

export default {
  name: "evaluationStatistics",
  components: {
    mbitCharts,
    hollandCharts,
    browserCharts
  },
  data() {
    return {
      params: {
        grade: '',
        checkGraduate: ''
      },
      classList: [],
      gradeList: [],
      list: [],
      majorList: [
        {_id: '1', name: '经济学'},
        {_id: '2', name: '经济学'},
        {_id: '3', name: '经济学'},
        {_id: '4', name: '经济学'},
        {_id: '5', name: '经济学'},
        {_id: '6', name: '经济学'},
        {_id: '7', name: '经济学'},
        {_id: '8', name: '经济学'},
        {_id: '9', name: '经济学'},
        {_id: '10', name: '经济学'},
      ],
      occupationList: [
        {_id: '1', name: '经济学'},
        {_id: '2', name: '经济学'},
        {_id: '3', name: '经济学'},
        {_id: '4', name: '经济学'},
        {_id: '5', name: '经济学'},
        {_id: '6', name: '经济学'},
        {_id: '7', name: '经济学'},
        {_id: '8', name: '经济学'},
        {_id: '9', name: '经济学'},
        {_id: '10', name: '经济学'},
      ],
      browserMajorList: [],
      browserOccupationList: [],
    }
  },
  mounted() {
    this.getGrade();
    this.getClassData();
    this.$nextTick(() => {
      this.initCharts()
    })
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