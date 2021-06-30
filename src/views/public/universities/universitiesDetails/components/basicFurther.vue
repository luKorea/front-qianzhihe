<template>
  <div>
    <div class="further">
      <div class="further-left">
        <span class="tip-info"></span>
        <span class="tip-title">国内升学率</span>
        <div class="cricle">
          <el-progress type="circle" :percentage="info.inland_enrolment_rate"
                       color="#FC9131"
                       stroke-width="12"/>
        </div>
      </div>
      <div class="further- center">
        <span class="tip-info"></span>
        <span class="tip-title">国外升学率</span>
        <div class="cricle">
          <el-progress type="circle" color="#FF6A53"
                       stroke-width="12"
                       :percentage="info.foreign_enrolment_rate"/>
        </div>
      </div>
      <div class="further-right">
        <span class="tip-info"></span>
        <span class="tip-title">就业率</span>
        <div style="margin-top: 20px">
          <el-progress type="circle" color="#FF6A53"
                       stroke-width="12"
                       :percentage="info.foreign_enrolment_rate"/>
        </div>
      </div>
    </div>
    <div>
      <span class="tip-info"></span>
      <span class="tip-title">就业地区流向</span>
      <template v-if="info.obtainRegionEmploymenList && info.obtainRegionEmploymenList.length > 0">
        <div class="wrap">
          <div class="address" v-for="(item, index) in info.obtainRegionEmploymenList" :key="index">
            <span class="title">{{ item.industry_region }}</span>
            <el-progress :percentage="item.data" class="info" text-inside stroke-width="20"/>
          </div>
        </div>
      </template>
    </div>
    <div class="company">
      <span class="tip-info"></span>
      <span class="tip-title">就业单位性质</span>
      <div id="company-charts" style="height: 400px; width: 500px; margin-top: 20px"></div>
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
      handler() {
        this.draw();
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.draw();
    })
  },
  data() {
    return {
      charts: ''
    }
  },
  methods: {
    draw() {
      let data = [];
      this.info.obtainIndustryEmploymenList && this.info.obtainIndustryEmploymenList.length > 0 &&
          this.info.obtainIndustryEmploymenList.forEach(item => {
            data.push({
              value: item.data,
              name: item.industry_region
            })
          })
      console.log(data);
      this.charts = this.$echarts.init(document.getElementById('company-charts'));
      let option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          top: '25%'
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
      this.charts && this.charts.setOption(option);
    }
  }
}
</script>

<style scoped lang="scss">
.further {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 20px;

  .cricle {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
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
      width: 100px;
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