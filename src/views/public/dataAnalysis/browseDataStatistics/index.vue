<template>
  <div>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">浏览数据统计筛选</span>
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
      <span class="tip-title">浏览数据统计</span>
      <el-divider/>
      <span class="tip-title">浏览次数Top20专业</span>
      <div id="major-charts" style="width: 100%; height: 700px" v-show="showMajorCharts"></div>
      <basic-nothing v-show="!showMajorCharts"></basic-nothing>
      <el-divider/>
      <span class="tip-title">浏览次数Top20职业</span>
      <div id="occupation-charts" style="width: 100%; height: 700px" v-show="showOccupationCharts"></div>
      <basic-nothing v-show="!showOccupationCharts"></basic-nothing>
    </basic-container>
  </div>
</template>

<script>
import {selectTypeList, selectClassList} from "../../../../api/common/search";
import {getList} from "../../../../api/common/dataAnalysis/browseDataStatistics";

export default {
  name: "browseDataStatistics",
  data() {
    return {
      loading: false,
      params: {
        type: '',
        grade: '',
        graduate: ''
      },
      classList: [],
      gradeList: [],
      majorCharts: null,
      showMajorCharts: true,
      majorList: [],
      occupationList: [],
      occupationCharts: null,
      showOccupationCharts: true
    }
  },
  watch: {
    majorList: {
      deep: true,
      handler(val) {
        // console.log(val, 'val');
        if (val === undefined) {
          this.showMajorCharts = false;
          return false;
        } else {
          this.showMajorCharts = true;
          this.setMajorOptions(val)
        }
      }
    },
    occupationList: {
      deep: true,
      handler(val) {
        if (val === undefined) {
          this.showOccupationCharts = false;
          return false;
        } else {
          this.showOccupationCharts = true;
          this.setOccupations(val)
        }
      }
    }
  },
  beforeDestroy() {
    if (!this.majorList && !this.occupationCharts) {
      return
    }
    this.majorCharts.dispose();
    this.occupationCharts.dispose();
    this.majorCharts = null;
    this.occupationCharts = null;
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
    searchData() {
      this.params.page = 0;
      this.switchData();
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
    getData(params) {
      this.loading = true;
      getList(params)
          .then(res => {
            if (res.errorCode === 200) {
              this.loading = false;
              if (params.type === 'Occupation') {
                this.occupationList = res.data;
              } else {
                this.majorList = res.data;
              }
            }
          })
    },
    switchData() {
      this.getData({...this.params, type: 'Profession'});
      this.getData({...this.params, type: 'Occupation'});
    },
    initCharts() {
      this.majorCharts = this.$echarts.init(document.getElementById('major-charts'));
      this.occupationCharts = this.$echarts.init(document.getElementById('occupation-charts'));
      this.setMajorOptions(this.majorList);
      this.setOccupations(this.occupationList);
    },
    setMajorOptions(data = []) {
      let nameList = [],
          valueList = [],
          newData = [];
      newData = [...data];
      newData.sort((a, b) => a.count - b.count);
      newData.forEach(item => {
        nameList.push(item.name);
        valueList.push(item.count);
      })
      this.majorCharts.setOption({
        color: ['#4D97FF'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: nameList
        },
        series: [{
          data: valueList,
          type: 'bar',
          barMaxWidth: 20,
          showBackground: true,
          itemStyle: {
            color: new this.$echarts.graphic.LinearGradient(
                1, 0, 0, 0,
                [
                  {offset: 0, color: '#83bff6'},
                  {offset: 0.5, color: '#188df0'},
                  {offset: 1, color: '#4D97FF'}
                ]
            )
          },
        }]
      })
    },
    setOccupations(data = []) {
      let nameList = [],
          valueList = [],
          newData = [];
      newData = [...data];
      newData.sort((a, b) => a.count - b.count);
      newData.forEach(item => {
        nameList.push(item.name);
        valueList.push(item.count)
      })
      this.occupationCharts.setOption({
            color: ['#FC9131'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            xAxis: {
              type: 'value'
            },
            yAxis: {
              type: 'category',
              data: nameList
            },
            series: [{
              data: valueList,
              type: 'bar',
              barMaxWidth: 20,
              showBackground: true,
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(
                    1, 0, 0, 0,
                    [
                      {offset: 0, color: '#f6bf8d'},
                      {offset: 0.5, color: '#f3ac6c'},
                      {offset: 1, color: '#FC9131'}
                    ]
                )
              },
            }]
          }
      )
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
