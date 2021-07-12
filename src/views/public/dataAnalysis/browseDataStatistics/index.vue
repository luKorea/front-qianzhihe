<template>
  <div>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">浏览数据统计筛选</span>
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
            <el-select v-model="params.graduate" placeholder="请选择" clearable filterable>
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
      <span class="tip-title">浏览数据统计</span>
      <el-divider/>
      <span class="tip-title">浏览次数Top20专业</span>
      <div id="major-charts" style="width: 100%; height: 500px" v-show="showMajorCharts"></div>
      <basic-nothing v-show="!showMajorCharts"></basic-nothing>
      <el-divider/>
      <span class="tip-title">浏览次数Top20职业</span>
      <div id="occupation-charts" style="width: 100%; height: 500px" v-show="showOccupationCharts"></div>
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
          valueList = [];
      data.forEach(item => {
        nameList.push(item.name);
        valueList.push(item.count)
      })
      this.majorCharts.setOption({
        color: ['#4D97FF'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: nameList,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#999999',  //更改坐标轴文字颜色
              fontSize: 13      //更改坐标轴文字大小
            }
          },
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: valueList,
          type: 'bar',
          barMaxWidth: '40%',
          itemStyle: {
            normal: {
              label: {
                show: true,		//开启显示
                position: 'top',	//在上方显示
                textStyle: {	    //数值样式
                  color: '#2E415B',
                  fontSize: 12
                },
              }
            }
          }
        }]
      })
    },
    setOccupations(data = []) {
      let nameList = [],
          valueList = [];
      data.forEach(item => {
        nameList.push(item.name);
        valueList.push(item.count)
      })
      this.occupationCharts.setOption({
            color: ['#FC9131'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            xAxis: {
              type: 'category',
              data: nameList,
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#999999',  //更改坐标轴文字颜色
                  fontSize: 10      //更改坐标轴文字大小
                }
              },
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: valueList,
              type: 'bar',
              barMaxWidth: '30%',
              itemStyle: {
                normal: {
                  label: {
                    show: true,		//开启显示
                    position: 'top',	//在上方显示
                    textStyle: {	    //数值样式
                      color: '#2E415B',
                      fontSize: 14
                    },
                  }
                }
              }
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