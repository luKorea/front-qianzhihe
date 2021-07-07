<template>
  <div class="m-top">
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">测评结果</span>
      <div class="flex m-top">
        <div id="random-charts" style="height: 300px; width: 500px"></div>
      </div>
    </basic-container>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">推荐职业</span>
      <template v-if="majorList.occupationEvaluationVoList && majorList.occupationEvaluationVoList.length > 0">
        <div class="wrap">
          <div class="major-wrap">
            <div class="major-list" v-for="item in majorList.occupationEvaluationVoList" :key="item._id" @click="goOccupation(item._id)">
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
    </basic-container>
  </div>
</template>

<script>
export default {
  name: "hollandDetail",
  props: {
    randomInfo: {
      type: Object,
      default: () => {
      }
    },
    majorList: {
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
    randomInfo: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    console.log(this.randomInfo);
    this.$nextTick(() => {
      this.initCharts();
    })
  },
  methods: {
    initCharts() {
      this.charts = this.$echarts.init(document.getElementById('random-charts'));
      this.setOptions(this.randomInfo);
    },
    setOptions(data) {
      let max = 25;
      let option = {
        radar: {
          indicator: [
            {name: '社会型', max},// s
            {name: '企业型', max}, // e
            {name: '常规型', max}, // c
            {name: '实际型', max}, // r
            {name: '调研型', max}, // i
            {name: '艺术型', max} // a
          ]
        },
        series: [{
          type: 'radar',
          itemStyle: {     //此属性的颜色和下面areaStyle属性的颜色都设置成相同色即可实现
            color: '#1E81FF',
            borderColor: '#C7DFFF',
          },
          areaStyle: {
            color: '#C7DFFF',
          },
          data: [
            {
              value: [
                data.s,
                data.e,
                data.c,
                data.r,
                data.i,
                data.a
              ]
            }
          ]
        }]
      };
      this.charts.setOption(option);
    },
    goOccupation(occupationId) {
      this.$router.push({
        path: '/occupation/occupationDetails',
        query: {
          occupationId: occupationId
        }
      })
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
    //justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;

    .major-list {
      cursor: pointer;
      display: flex;
      width: 400px;
      margin-right: 30px;
      margin-bottom: 30px;
      flex-wrap: wrap;
      background: #FFFFFF;
      box-shadow: 0 4px 16px 0 rgba(127, 137, 156, 0.3);
      border-radius: 6px;
      padding: 10px;

      .img-wrap {
        width: 170px;
        height: 96px;
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
          font-family: SourceHanSansSC-Medium, SourceHanSansSC,serif;
          font-weight: 500;
          color: #333333;
          //margin-bottom: 5px;
        }

        .major-business, .major-money {
          height: 19px;
          font-size: 13px;
          font-family: SourceHanSansSC-Regular, SourceHanSansSC,serif;
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