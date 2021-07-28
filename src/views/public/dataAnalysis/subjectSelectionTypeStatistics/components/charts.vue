<template>
  <div class="chart-container">
    <div class="item">
      <span class="tip-info"></span>
      <span class="tip-title">选科完成率</span>
      <div class="percent-wrap">
        <el-progress :percentage="percentInfo.proportion"
                     :stroke-width="12"
                     :format="format"
                     color="rgba(252, 145, 49, 1)"
                     type="circle" class="m-bottom pre"></el-progress>
        <div class="info">
          <span class="blue-tip"></span>
          <span class="blue-title">未提交人数： {{ percentInfo.uncommittedCount || 0 }}</span>
          <span class="orange-tip"></span>
          <span class="orange-title">已提交人数： {{ percentInfo.committedCount || 0 }}</span>
        </div>
      </div>
    </div>
    <div class="item">
      <span class="tip-info"></span>
      <span class="tip-title">首选科目分布</span>
      <div id="first-charts" style="width: 100%; height: 250px"></div>
    </div>
    <div class="item">
      <span class="tip-info"></span>
      <span class="tip-title">再选科目分布</span>
      <div id="recleaning-charts" style="width: 100%; height: 250px"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "charts",
  props: {
    percentInfo: {
      type: Object,
      default: () => {
      }
    },
    firstData: {
      type: Array,
      default: () => []
    },
    recleaningData: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    firstData: {
      deep: true,
      handler(val) {
        this.setFirstOptions(val);
      }
    },
    recleaningData: {
      deep: true,
      handler(val) {
        this.setRecleaning(val);
      }
    }
  },
  data() {
    return {
      firstCharts: null,
      recleaningCharts: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initFirst();
      this.initRecleaning();
    })
  },
  methods: {
    format(percentage) {
      console.log(percentage);
      return `${percentage}%\n完成率`;
    },
    initFirst() {
      this.firstCharts = this.$echarts.init(document.getElementById('first-charts'));
      this.setFirstOptions(this.firstData);
    },
    initRecleaning() {
      this.recleaningCharts = this.$echarts.init(document.getElementById('recleaning-charts'));
      this.setRecleaning(this.recleaningData);
    },
    setFirstOptions(data) {
      let nameList = [],
          valueList = [];
      data.forEach(item => {
        nameList.push(item.course);
        valueList.push(item.courseCount)
      })
      this.firstCharts.setOption({
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
              fontSize: 14   //更改坐标轴文字大小
            }
          },
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: valueList,
          type: 'bar',
          barMaxWidth: '20%',
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
    setRecleaning(data) {
      let nameList = [],
          valueList = [];
      data.forEach(item => {
        nameList.push(item.course);
        valueList.push(item.courseCount)
      })
      this.recleaningCharts.setOption({
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
              fontSize: 12   //更改坐标轴文字大小
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
                  fontSize: 12
                },
              }
            }
          }
        }]
      })
    }
  }
}
</script>

<style scoped lang="scss">
.chart-container {
  display: flex;
  justify-content: space-between;
  margin: 10px 6px;
  align-items: center;

  .item {
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    border-radius: 4px;
    padding: 20px;
    width: 32%;
    background-color: #FFFFFF;
    height: 250px;
  }
}

.percent-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;

  .info {
    display: flex;
    align-items: center;

    .blue-tip {
      display: inline-block;
      width: 12px;
      height: 12px;
      background-color: #3995FF;
      border-radius: 2px;
      margin-right: 10px;
    }

    .orange-tip {
      display: inline-block;
      width: 12px;
      height: 12px;
      background: #FC9131;
      border-radius: 2px;
      margin-right: 10px;
    }

    .blue-title {
      height: 20px;
      font-size: 14px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #6C7293;
      line-height: 20px;
      margin-right: 20px;
    }

    .orange-title {
      height: 20px;
      font-size: 14px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #6C7293;
      line-height: 20px;
    }
  }
}
</style>
<style scoped>
.el-progress >>> path:first-child {
//stroke: rgba(252, 145, 49, 1); stroke: #3995FF;
}
</style>
