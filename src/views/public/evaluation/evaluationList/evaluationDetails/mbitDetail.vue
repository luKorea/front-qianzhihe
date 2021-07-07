<template>
  <div class="m-top">
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">测评结果</span>
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
  name: "mbitDetail",
  props: {
    majorList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
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
      width: 30%;
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