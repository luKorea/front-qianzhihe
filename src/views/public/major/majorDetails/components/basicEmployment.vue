<template>
  <div>
    <span class="tip-info"></span>
    <span class="tip-title" id="majorDo">专业做什么</span>
    <div class="desc">{{ info.exam_direction }}</div>
    <el-divider/>
    <span class="tip-info"></span>
    <span class="tip-title" id="zhiye">推荐职业</span>
    <template v-if="info.occupationVos && info.occupationVos.length > 0">
      <div class="wrap">
        <div class="major-wrap">
          <div class="major-list" v-for="item in info.occupationVos" :key="item._id" @click="goOccupation(item._id)">
            <div class="img-wrap"><img :src="item.image" alt=""></div>
            <div class="major-info">
              <div class="major-title">{{ item.title }}</div>
              <div class="major-business">行业：{{ item.business }}</div>
              <div class="major-money">平均薪资：{{ item.compensation }}</div>
              <div class="major-tip">
                <template v-if="item.tags && item.tags.length > 0">
                  <span class="tip" v-for="(tip, index) in item.tags" :key="index">{{ tip }}</span>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <basic-nothing v-else></basic-nothing>
    <el-divider/>
    <span class="tip-info"></span>
    <span class="tip-title" id="hangye">就业行业分布</span>
    <div id="charts-one" style="width: 100%; height: 400px" v-show="showChartsOne"></div>
    <basic-nothing v-show="!showChartsOne"></basic-nothing>
    <el-divider/>
    <span class="tip-info"></span>
    <span class="tip-title" id="address">就业地区分布</span>
    <div id="charts-two" style="width: 100%; height: 400px" v-show="showChartsTwo"></div>
    <basic-nothing v-show="!showChartsTwo"></basic-nothing>
  </div>
</template>

<script>
import resize from "../../../../../mixins/resize";

export default {
  mixins: [resize],
  name: "basicEmployment",
  props: {
    info: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      chartsOne: '',
      showChartsOne: true,
      chartsTwo: '',
      showChartsTwo: true
    }
  },
  watch: {
    info: {
      deep: true,
      handler(val) {
        val.industry === undefined ? this.showChartsOne = false : (
            this.showChartsOne = true,
            this.drawPageOne()
        );
        val.region === undefined ? this.showChartsTwo = false : (
            this.showChartsTwo = true,
            this.drawPageTwo()
        );
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.drawPageOne();
      this.drawPageTwo();
    })
  },
  methods: {
    goOccupation(occupationId) {
      this.$router.push({
        path: '/occupation/occupationDetails',
        query: {
          occupationId: occupationId
        }
      })
    },
    drawPageOne() {
      this.chartsOne = this.$echarts.init(document.getElementById('charts-one'));
      let name = [],
          data = [];
      this.info.industry && this.info.industry.forEach(item => {
        name.push(item.industry_region);
        data.push(item.data)
      });
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: name,
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
          data: data,
          type: 'bar',
          barMaxWidth: '20%',
          itemStyle: {
            normal: {
              color(params) {
                const colorlist = [
                  '#FC9131', '#40A7DF', '#36E095', '#7C6AF2', '#FF6A53', '#EEA287',
                  '#FC9131', '#40A7DF', '#36E095', '#7C6AF2', '#FF6A53', '#EEA287',
                  '#FC9131', '#40A7DF', '#36E095', '#7C6AF2', '#FF6A53', '#EEA287',
                ];
                return colorlist[params.dataIndex];
              }
            }
          }
        }]
      };
      this.chartsOne && this.chartsOne.setOption(option);
    },
    drawPageTwo() {
      this.chartsTwo = this.$echarts.init(document.getElementById('charts-two'));
      let name = [],
          data = [];
      this.info.region && this.info.region.forEach(item => {
        name.push(item.industry_region);
        data.push(item.data)
      });
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: name,
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
          data: data,
          type: 'bar',
          barMaxWidth: '20%',
          itemStyle: {
            normal: {
              color(params) {
                const colorlist = [
                  '#FC9131', '#40A7DF', '#36E095', '#7C6AF2', '#FF6A53', '#EEA287',
                  '#FC9131', '#40A7DF', '#36E095', '#7C6AF2', '#FF6A53', '#EEA287',
                  '#FC9131', '#40A7DF', '#36E095', '#7C6AF2', '#FF6A53', '#EEA287',
                ];
                return colorlist[params.dataIndex];
              }
            }
          }
        }]
      };
      this.chartsTwo && this.chartsTwo.setOption(option);
    }
  }
}
</script>

<style scoped lang="scss">
.wrap {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  width: 100%;

  .major-wrap {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    .major-list {
      cursor: pointer;
      display: flex;
      width: 340px;
      margin-right: 20px;
      margin-bottom: 20px;
      flex-wrap: wrap;
      background: #FFFFFF;
      box-shadow: 0 4px 16px 0 rgba(127, 137, 156, 0.3);
      border-radius: 6px;
      padding: 10px;

      .img-wrap {
        width: 120px;
        height: 80px;
        margin-right: 16px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .major-info {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .major-title {
          height: 24px;
          line-height: 24px;
          font-size: 16px;
          font-family: SourceHanSansSC-Medium, SourceHanSansSC, serif;
          font-weight: 500;
          color: #333333;
          //margin-bottom: 5px;
        }

        .major-business, .major-money {
          height: 19px;
          font-size: 13px;
          font-family: SourceHanSansSC-Regular, SourceHanSansSC, serif;
          font-weight: 400;
          color: #666666;
          line-height: 19px;
        }

        .major-tip {
          margin-top: 4px;
          height: 16px;
          font-size: 11px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #FC9131;
          line-height: 16px;

          span {
            margin-right: 10px;
            background-color: #FFF0E7;
          }
        }
      }
    }
  }
}
</style>