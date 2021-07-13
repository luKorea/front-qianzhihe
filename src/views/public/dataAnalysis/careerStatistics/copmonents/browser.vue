<template>
  <basic-container>
    <span class="tip-info"></span>
    <span class="tip-title">浏览数据统计</span>
    <el-divider/>
    <span class="tip-title">浏览次数Top20专业</span>
    <div id="career-major-charts" style="width: 100%; height: 500px" v-show="showMajorCharts"></div>
    <basic-nothing v-show="!showMajorCharts"></basic-nothing>
    <el-divider/>
    <span class="tip-title">浏览次数Top20职业</span>
    <div id="career-occupation-charts" style="width: 100%; height: 500px" v-show="showOccupationCharts"></div>
    <basic-nothing v-show="!showOccupationCharts"></basic-nothing>
  </basic-container>
</template>

<script>
export default {
  name: "browser",
  props: {
    majorList: {
      type: Array,
      default: () => []
    },
    occupationList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      majorCharts: null,
      showMajorCharts: true,
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
    this.$nextTick(() => {
      this.initCharts()
    })
  },
  methods: {
    initCharts() {
      this.majorCharts = this.$echarts.init(document.getElementById('career-major-charts'));
      this.occupationCharts = this.$echarts.init(document.getElementById('career-occupation-charts'));
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