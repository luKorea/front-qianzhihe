<template>
  <div class="charts-flex">
    <div class="charts-wrap">
      <div>12</div>
      <div id="interest-charts" style="width: 100%; height: 500px"></div>
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
    this.$nextTick(() => {
      this.initCharts()
    })
  },
  methods: {
    initCharts() {
      this.charts = this.$echarts.init(document.getElementById('interest-charts'));
      this.setOptions(this.list);
    },
    setOptions(data = []) {
      console.log(this.charts);
      this.charts.setOption({
        title: {
          text: '兴趣测试结果分布',
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

<style scoped>

</style>