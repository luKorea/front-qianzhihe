<template>
  <div class="m-top">
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">测评结果</span>
      <div class="type-list">
        <div class="title">{{ mbitInfo.type }}({{mbitInfo.resultType}})</div>
        <div class="describe">{{ mbitInfo.traits }}</div>
      </div>


      <div class="item-flex-mbti">
        <div v-for="item in result" :key="item.id" class="item">
          <div class="title">{{ item.name }}</div>
          <div class="describe">{{ item.describe }}</div>
        </div>
      </div>

      <div class="advantages-wrap">
        <div class="item">
          <div class="title">优势</div>
          <div class="info">{{ mbitInfo.advantages }}</div>
        </div>
        <div class="item">
          <div class="title">劣势</div>
          <div class="info">{{ mbitInfo.disadvantages }}</div>
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
import {listType} from "../../../../../utils/list";

export default {
  name: "mbitDetail",
  props: {
    mbitInfo: {
      type: Object,
      default: () => {
      }
    },
    majorList: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      result: []
    }
  },
  mounted() {
    let res = this.mbitInfo.result ?  this.mbitInfo.result.split('') : [],
        list = [];
    list[0] =  res[0] === 'R' ? listType[1] : listType[0];
    list[1] =  res[1] === 'R' ? listType[3] : listType[2];
    list[2] =  res[2] === 'R' ? listType[5] : listType[4];
    list[3] =  res[3] === 'R' ? listType[7] : listType[6];
    this.result = list;
    console.log(this.result, 'result');
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
.type-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-wrap: wrap;
  padding: 10px;
  background-color: #FFA31A;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

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
  }
}

.advantages-wrap {
  display: flex;
  //justify-content: space-between;
  width: 100%;
  //margin-top: 20px;
  .item {
    display: flex;
    flex-direction: column;
    width: 49%;
    background: #FFFFFF;
    border-radius: 8px;
    border: 1px solid #D4D4D4;
    padding: 10px;
    margin-right: 20px;
    .title {
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #FFA31A;
      line-height: 22px;
    }
    .info {
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #8391A2;
      line-height: 22px;
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

.item-flex-mbti {
  margin-top: 20px;
  display: flex;
  //flex-wrap: wrap;
  .item {
    display: flex;
    flex-direction: column;
    width: 23.5%;
    background: #FFFFFF;
    border-radius: 8px;
    border: 1px solid #D4D4D4;
    padding: 10px;
    box-sizing: border-box;
    margin-right: 20px;
    margin-bottom: 20px;
    .title {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #FFA31A;
      line-height: 22px;
    }
    .describe {
      margin-top: 10px;
      font-size: 14px;
      color: #2E415B;
      line-height: 22px;
    }
  }
}
</style>
