<template>
  <div>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">测评统计筛选</span>
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
      <span class="tip-title">测评数据统计</span>
      <el-divider/>
      <character-charts :list="list" :major-list="majorList" :occupation-list="occupationList"/>
      <el-divider/>
      <interest-charts :list="list" :major-list="majorList" :occupation-list="occupationList"/>
    </basic-container>
  </div>
</template>

<script>
import {selectTypeList, selectClassList} from "../../../../api/common/search";
import {getList} from "../../../../api/common/dataAnalysis/subjectSelectionStatistics";
import characterCharts from "./copmonents/character";
import interestCharts from "./copmonents/interest";

export default {
  name: "evaluationStatistics",
  components: {
    characterCharts,
    interestCharts
  },
  data() {
    return {
      params: {
        type: '',
        grade: '',
        checkGraduate: ''
      },
      classList: [],
      gradeList: [],
      list: [],
      majorList: [
        {_id: '12', name: '经济学'},
        {_id: '12', name: '经济学'},
        {_id: '12', name: '经济学'},
        {_id: '12', name: '经济学'},
        {_id: '12', name: '经济学'},
        {_id: '12', name: '经济学'},
        {_id: '12', name: '经济学'},
        {_id: '12', name: '经济学'},
        {_id: '12', name: '经济学'},
        {_id: '12', name: '经济学'},
      ],
      occupationList: [
        {_id: '12', name: '经济学'},
        {_id: '12', name: '经济学'},
        {_id: '12', name: '经济学'},
        {_id: '12', name: '经济学'},
        {_id: '12', name: '经济学'},
        {_id: '12', name: '经济学'},
        {_id: '12', name: '经济学'},
        {_id: '12', name: '经济学'},
        {_id: '12', name: '经济学'},
        {_id: '12', name: '经济学'},
      ],
    }
  },
  watch: {
    list: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  beforeDestroy() {
    if (!this.charts) {
      return
    }
    this.charts.dispose();
    this.charts = null;
  },
  mounted() {
    this.getData(this.params);
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
    getData(params) {
      getList(params)
          .then(res => {
            if (res.errorCode === 200) {
              console.log(res, 'data');
              this.list = res.data;
            }
          })
    },
    initCharts() {
      this.charts = this.$echarts.init(document.getElementById('charts'));
      this.setOptions(this.list);
    },
    setOptions(data = []) {
      console.log(this.charts);
      this.charts.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          right: 10,
          top: 30,
          bottom: 20,
          orient: 'vertical',
          data: ['物理+化学+生物', '物理+化学+历史', '物理+化学+生物', '物理+历史+生物', '物理+化学+地理']
        },
        series: [
          {
            name: 'WEEKLY WRITE ARTICLES',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: [
              {value: 320, name: '物理+化学+生物'},
              {value: 240, name: '物理+化学+历史'},
              {value: 149, name: '物理+化学+生物'},
              {value: 100, name: '物理+历史+生物'},
              {value: 59, name: '物理+化学+地理'}
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
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