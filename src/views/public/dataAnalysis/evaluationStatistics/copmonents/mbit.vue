<template>
  <div style="display: flex">
    <div class="charts-wrap" style="width: 60%">
      <div class="percent-wrap">
        <div class="tip-title m-bottom">性格测试完成率</div>
        <el-progress :percentage="percentInfo.proportion"
                     :stroke-width="12"
                     :format="format"
                     color="rgba(252, 145, 49, 1)"
                     type="circle" class="m-bottom pre"></el-progress>
        <div class="info">
          <span class="blue-tip"></span>
          <span class="blue-title">总人数： {{ percentInfo.count || 0 }}</span>
          <span class="orange-tip"></span>
          <span class="orange-title">完成人数： {{ percentInfo.achieveCount || 0 }}</span>
        </div>
      </div>
      <template v-show="list.length > 0">
        <div id="character-charts" style="width: 100%; height: 350px"></div>
      </template>
    </div>
    <div class="tip">
      <div class="tip-number">
        <div class="title">推荐次数Top20专业</div>
        <template v-if="majorList && majorList.length > 0">
          <div class="number-wrap">
            <div v-for="(item, index) in majorList" :key="index" @click="goMajor(item._id)">
            <span v-if="index === 0">
              <img :src="one" class="img-number"/>
              <span class="title-line">{{ item.name }}</span>
            </span>
              <span v-else-if="index === 1">
              <img :src="two" alt="" class="img-number"/>
             <span class="title-line">{{ item.name }}</span>
            </span>
              <span v-else-if="index === 2">
              <img :src="three" alt="" class="img-number"/>
             <span class="title-line">{{ item.name }}</span>
            </span>
              <span v-else>
              <span>{{ index + 1 }}.</span>
              <span class="title-line">{{ item.name }}</span>
            </span>
            </div>
          </div>
        </template>
      </div>
      <div class="divider"></div>
      <div class="tip-number">
        <div class="title">推荐次数Top20职业</div>
        <template v-if="occupationList && occupationList.length > 0">
          <div class="number-wrap">
            <div v-for="(item, index) in occupationList" :key="index" @click="goOccupation(item._id)">
            <span v-if="index === 0">
              <img :src="one" class="img-number"/>
              <span class="title-line">{{ item.title }}</span>
            </span>
              <span v-else-if="index === 1">
              <img :src="two" alt="" class="img-number"/>
             <span class="title-line">{{ item.title }}</span>
            </span>
              <span v-else-if="index === 2">
              <img :src="three" alt="" class="img-number"/>
             <span class="title-line">{{ item.title }}</span>
            </span>
              <span v-else>
              <span>{{ index + 1 }}.</span>
              <span class="title-line">{{ item.title }}</span>
            </span>
            </div>
          </div>
        </template>

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
    percentInfo: {
      type: Object,
      default: () => {
      }
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
      charts: '',
      one: require('./../../../../../assets/icon-img/one.png'),
      two: require('./../../../../../assets/icon-img/two.png'),
      three: require('./../../../../../assets/icon-img/three.png'),
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
    console.log(this.percentInfo, 'info');
    this.initCharts()
  },
  methods: {
    format(percentage) {
      console.log(percentage);
      return `${percentage}%\n完成率`;
    },
    goMajor(id) {
      this.$router.push({
        path: '/major/majorDetails',
        query: {
          _id: id
        }
      })
    },
    goOccupation(occupationId) {
      this.$router.push({
        path: '/occupation/occupationDetails',
        query: {
          occupationId: occupationId
        }
      })
    },
    initCharts() {
      this.charts = this.echarts.init(document.getElementById('character-charts'));
      this.setOptions(this.list);
    },
    setOptions(data = []) {
      let nameList = [],
          valueList = [];
      data && data.length > 0 && data.forEach(item => {
        nameList.push(item.content);
        valueList.push({
          value: item.proportion,
          name: item.content
        })
      })
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
          bottom: '0',
          data: nameList
        },
        series: [
          {
            name: '性格测试结果',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '45%'],
            data: valueList,
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
.el-progress >>> path:first-child {
  //stroke: rgba(252, 145, 49, 1);
  stroke: #3995FF;
}
</style>


<style scoped lang="scss">
.percent-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
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

.tip {
  display: flex;
  justify-content: space-around;
  width: 40%;

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
    align-items: center;
    width: 100%;
    margin-top: 10px;

    .img-number {
      width: 17px;
      height: 20px;
    }

    div {
      width: 100%;
      margin-bottom: 15px;
      font-size: 14px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #6C7293;
      cursor: pointer;
    }

    span {
      display: flex;
      align-items: center;
    }

    .title-line {
      border-bottom: 1px solid #6C7293;
      margin-left: 15px;
    }
  }

  .divider {
    width: 1px;
    background-color: #E6E7EC;
    height: auto;
  }

  //justify-content: space-between;
}
</style>
