<template>
  <div class="m-top">
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">测评结果</span>
      <div class="flex m-top" style="width: 100%">
        <div id="random-charts" style="height: 300px; width: 50%"></div>
        <div class="type-list">
          <div v-for="item in typeList" :key="item.id"
               :style="listStyle"
               class="item">
            <div class="title">{{ item.name }}</div>
            <div class="describe">{{ item.describe }}</div>
          </div>
        </div>
      </div>
      <div class="item-flex">
        <div v-for="item in list" :key="item.id" class="item">
          <div class="title">{{ item.name }}</div>
          <div class="describe">{{ item.describe }}</div>
        </div>
      </div>
    </basic-container>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">推荐职业</span>
      <template v-if="majorList.occupationEvaluationVoList && majorList.occupationEvaluationVoList.length > 0">
        <div class="wrap">
          <div class="major-wrap">
            <div class="major-list" v-for="item in majorList.occupationEvaluationVoList" :key="item._id"
                 @click="goOccupation(item._id)">
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

import {hollandType} from "../../../../../utils/list";

export default {
  name: "hollandDetail",
  props: {
    randomInfo: {
      type: Object,
      default: () => {
      }
    },
    majorList: {
      type: Object,
      default: () => {}
    },
    typeList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      charts: null,
      list: hollandType,
      listStyle: {
        width: '100%'
      }
    }
  },
  watch: {
    typeList: {
      deep: true,
      handler(val) {
        if (this.typeList.length > 2) {
          this.listStyle.width = '41%'
        } else {
          this.listStyle.width = '100%'
        }
      }
    },
    randomInfo: {
      deep: true,
      handler(val) {
        console.log(val);
        this.setOptions(val)
      }
    }
  },
  mounted() {
    console.log(this.randomInfo);
    this.$nextTick(() => {
      setTimeout(() => {
        this.initCharts();
      }, 1000)
    })
  },
  methods: {
    initCharts() {
      this.charts = this.echarts.init(document.getElementById('random-charts'));
      this.setOptions(this.randomInfo);
    },
    setOptions(data) {
      let max = 35;
      let option = {
        "tooltip": {
          "show": true,
          "trigger": "item",
        },
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
          name: '测评结果(最高分35分)',
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
.type-list {
  display: flex;
  width: 50%;
  flex-wrap: wrap;
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    margin-bottom: 20px;
    //width: 300px;
    background-color: #1E81FF;
    border-radius: 4px;
    padding: 10px;
    .title {
      height: 24px;
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 24px;
    }
    .describe {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 24px;
    }
  }
}
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
      width: 350px;
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
