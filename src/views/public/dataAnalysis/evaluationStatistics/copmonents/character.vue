<template>
  <div class="charts-flex">
    <div class="charts-wrap" style="width: 70%">
      <div id="character-percent-charts" style="width: 200px; height: 200px"></div>
      <div id="character-charts" style="width: 100%; height: 400px"></div>
    </div>
    <div class="tip">
      <div class="tip-number">
        <div class="title">推荐次数Top20专业</div>
        <div class="number-wrap">
          <span v-for="(item, index) in majorList" :key="index">
            {{ item.name }}
          </span>
        </div>
      </div>
      <div class="divider"></div>
      <div class="tip-number">
        <div class="title">推荐次数Top20职业</div>
        <div class="number-wrap">
          <span v-for="(item, index) in occupationList" :key="index">
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: "character",
  props: {
    list: {
      type: Array,
      default: () => []
    },
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
      charts: null,
      percentCharts: null
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
    if (!this.charts && !this.percentCharts) {
      return
    }
    this.charts.dispose();
    this.percentCharts.dispose();
    this.charts = null;
    this.percentCharts = null;
  },
  mounted() {
    this.$nextTick(() => {
      this.initCharts()
    })
  },
  methods: {
    initCharts() {
      this.percentCharts = this.$echarts.init(document.getElementById('character-percent-charts'));
      this.charts = this.$echarts.init(document.getElementById('character-charts'));
      this.setOptions(this.list);
      this.setPercentOptions(this.list);
    },
    setPercentOptions(data = []) {
      let options = {
        title: {
          text: '性格测试结果分布',
          left: 'center',
          textStyle: {
            color: '#2E415B',
            fontSize: 16
          }
        },
        legend: {
          top: 'center',
          right: 'center'
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            labelLine: {show: false},
            label: {show: false},
            data: [
              {
                value: 11,
                name: `11%`,
                itemStyle: {color: '#4D97FF'}
              },
              {
                value: 22,
                name: `22%`,
                itemStyle: {color: '#FC9131'}
              }
            ]
          }
        ]
      };
      this.percentCharts.setOption(options);
    },
    setOptions(data = []) {
      this.charts.setOption({
        title: {
          text: '性格测试结果分布',
          left: 'center',
          textStyle: {
            color: '#2E415B',
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['物理+化学+生物', '物理+化学+历史', '物理+化学+生物', '物理+历史+生物', '物理+化学+地理']
        },
        series: [
          {
            name: 'WEEKLY WRITE ARTICLES',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '50%'],
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
  display: flex;
  justify-content: space-around;
  width: 30%;

  .tip-number {
    .title {
      font-size: 14px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #2E415B;
      margin-bottom: 20px;
    }
  }

  .number-wrap {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    span {
      margin-bottom: 15px;
      font-size: 14px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #6C7293;
      cursor: pointer;
    }
  }
.driver {
  width: 1px;
  background-color: #E6E7EC;
  height: auto;
}
  //justify-content: space-between;
}
</style>