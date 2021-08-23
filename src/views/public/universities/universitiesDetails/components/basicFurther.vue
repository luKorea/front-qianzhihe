<template>
  <div>
    <div class="further">
      <div class="further-left" v-if="info.inland_enrolment_rate">
        <span class="tip-info"></span>
        <span class="tip-title" id="uni-zhong">国内升学率</span>
        <div class="cricle">
          <el-progress type="circle"
                       :percentage="info.inland_enrolment_rate"
                       color="#FC9131"
                       :stroke-width="12"/>
        </div>
      </div>
      <div class="further-center" v-if="info.foreign_enrolment_rate">
        <span class="tip-info"></span>
        <span class="tip-title" id="uni-wai">国外升学率</span>
        <div class="cricle">
          <el-progress type="circle" color="#FF6A53"
                       :stroke-width="12"
                       :percentage="info.foreign_enrolment_rate"/>
        </div>
      </div>
      <div class="further-right" v-if="info.employment_rate">
        <span class="tip-info"></span>
        <span class="tip-title" id="uni-jiu">就业率</span>
        <div style="margin-top: 20px">
          <el-progress type="circle" color="#FF6A53"
                       :stroke-width="12"
                       :percentage="info.employment_rate"/>
        </div>
      </div>
    </div>
    <div v-if="info.obtainRegionEmploymenList && info.obtainRegionEmploymenList.length > 0">
      <el-divider />
      <span class="tip-info"></span>
      <span class="tip-title" id="uni-address">就业地区流向</span>
      <template>
        <div class="wrap">
          <div class="address" v-for="(item, index) in info.obtainRegionEmploymenList" :key="index">
            <span class="title">{{ item.industry_region }}</span>
            <el-progress :percentage="item.data" class="info" text-inside :stroke-width="20"/>
          </div>
        </div>
      </template>
      <el-divider />
    </div>
    <div class="company" v-if="info.obtainIndustryEmploymenList">
      <span class="tip-info"></span>
      <span class="tip-title" id="uni-company">就业单位性质</span>
      <div id="company-charts" style="height: 400px; width: 50%; margin-top: 20px"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "basicFurther",
  props: {
    info: {
      type: Object,
      default: () => {
      }
    }
  },
  watch: {
    info: {
      deep: true,
      handler(val) {
        if (val === undefined) {
          this.showChart = false;
        } else {
          this.showChart = true;
          this.draw(val);
        }
        }
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.initDraw();
      }, 3000)
    })
  },
  data() {
    return {
      chart: '',
      showChart: true
    }
  },
  methods: {
    initDraw() {
      this.chart = this.echarts.init(document.getElementById('company-charts'));
      this.draw(this.info);
    },
    draw(info) {
      let data = [];
      info.obtainIndustryEmploymenList && info.obtainIndustryEmploymenList.length > 0 &&
      info.obtainIndustryEmploymenList.forEach(item => {
        data.push({
          value: item.data,
          name: item.industry_region
        })
      })
      let option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 0,
          top: 100,
          bottom: 20,
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            // center: ['50%', '60%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '12',
              }
            },
            labelLine: {
              show: false
            },
            data: data
          }
        ]
      };
      this.chart && this.chart.setOption(option);
    }
  }
}
</script>

<style scoped lang="scss">
.further {
  display: flex;
  margin-bottom: 20px;

  .cricle {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    margin-right: 200px;
  }
}

.wrap {
  margin-top: 20px;
  width: 100%;

  .address {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;

    .title {
      width: 130px;
      font-size: 14px;
      font-family: SourceHanSansSC-Regular, SourceHanSansSC;
      font-weight: 400;
      color: #333333;
    }

    .info {
      width: 80%;
    }
  }
}

.company {
  margin-top: 20px;
}
</style>
