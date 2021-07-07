<template>
  <div>
    <basic-container-back>
      <div class="list-wrap">
        <div class="img"><img :src="mbit.img" alt=""></div>
        <div class="info">
          <div class="title">{{ mbit.name }}</div>
          <div class="info-number">
            <span class="tip">题目数：{{ mbit.total }}</span>
            <span class="tip time">建议用时：{{ mbit.time }}min</span>
          </div>
        </div>
      </div>
    </basic-container-back>
    <div class="tabs">
      <el-tabs type="card" stretch>
        <el-tab-pane label="测试题目">
          <div style="margin: 20px">
            <el-table border :data="dataList" style="width: 100%; margin-top: 20px" :show-header='false'>
              <el-table-column>
                <template slot-scope="scope">
                  <span class="number-index">{{ scope.row.id }}</span>
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="selectA"/>
              <el-table-column prop="selectB"/>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="测试结果类型">

          <template v-if="typeList && typeList.length > 0">
            <div class="list-flex">
              <div class="list" v-for="item in typeList" :key="item._id">
                <div class="title">{{item.name}}</div>
                <el-tooltip placement="top" effect="dark" :content="item.describe">
                  <div class="desc">{{item.describe.slice(0, 80)}}</div>
                </el-tooltip>
              </div>
            </div>
          </template>

          <div class="person-wrap">
            <div class="person-content" v-for="item in list.result" :key="item._id">
              <div class="img-wrap">
                <div class="img">
                  <el-image :src="item.image"
                            style="width: 200px; height: 240px; border-radius: 8px"
                            fit="fit"
                  ></el-image>
                </div>
                <div class="info">
                  <div class="title">{{ item.type }}</div>
                  <div class="advantages">
                    • 优势：{{ item.advantages }}
                  </div>
                  <div class="disadvantages">
                    • 劣势：{{ item.disadvantages }}
                  </div>
                </div>
              </div>
              <div class="info-wrap">
                <div class="title">代表人物: {{ item.title }}</div>
                <div class="desc">{{ item.traits }}</div>
              </div>
            </div>
          </div>

        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {mbitList, listType} from "../list";
import {getEvaluationType} from "../../../../api/common/evaluation";

export default {
  name: "holland",
  data() {
    return {
      list: [],
      dataList: mbitList,
      typeList: listType,
      mbit: {
        type: 'mbti',
        name: '性格测试',
        time: '3~5',
        total: '20',
        img: require('./../../../../assets/mbit.png')
      },
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getEvaluationType('mbit')
          .then(res => {
            if (res.errorCode === 200) {
              this.list = res.data;
              console.log(res, 'mbit');
            }
          })
    }
  }
}
</script>


<style lang="scss">
.tabs {
  margin-top: 10px;

  .el-tabs__header {
    margin: 0;
  }

  .el-tabs__item {
    color: #93A0B0;
    background-color: #EAEEF4;
    border: none;
  }

  .el-tabs__item.is-active {
    color: #4D97FF;
    background-color: #FFFFFF;
  }

  .el-tabs__content {
    padding-top: 20px;
    background-color: #FFFFFF;
  }
}
</style>

<style scoped lang="scss">
.list-wrap {
  display: flex;
  width: 100%;
  height: 133px;

  .img {
    width: 240px;
    height: 133px;
    margin-right: 24px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .title {
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #2E415B;
    }

    .info-number {
      .tip {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #475B75;
      }

      .time {
        margin-left: 105px;
      }
    }

    .info-btn {
      width: 88px;
      height: 36px;
      line-height: 36px;
      cursor: pointer;
      border-radius: 4px;
      border: 1px solid #4D97FF;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #4D97FF;
      text-align: center;
    }
  }
}

.list-flex {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;

  .list {
    display: flex;
    align-items: center;
    width: 46%;
    height: 80px;
    background: #FFF3E6;
    border-radius: 2px;
    margin: 0 20px 20px 20px;

    .title {
      width: 108px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      background: #FFA31A;
      border-radius: 2px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      position: relative;

      &:after {
        content: "";
        display: block;
        position: absolute;
        left: 108px; //给小三角定位，更具实际需求调整
        top: 34px; //给小三角定位，更具实际需求调整
        border-width: 8px;
        border-style: dashed solid dashed dashed; //四个参数分别代表向下，左，上右的小三角(对应方向的小三角设置为solid，其他的为dashed。我这里演示向左的小三角，所以设置第二个）
        border-color: transparent transparent transparent #FFA31A;
      }
    }

    .desc {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 40px;
      width: 409px;
      height: 80px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #475B75;
    }
  }
}

.number-index {
  padding: 4px 10px;
  margin-right: 20px;
  height: 24px;
  line-height: 24px;
  background: #E0EDFF;
  border-radius: 4px;
  color: #4D97FF;
  font-size: 14px;
}
</style>

<style scoped lang="scss">
.person-wrap {
  margin: 20px;

  .person-content {
    display: flex;
    flex-direction: column;
    border-top: 1px solid #E6E7EC;
    padding: 20px 0;

    .img-wrap {
      display: flex;
      background-color: #FAFAFA;
      width: 100%;
      margin-bottom: 20px;

      .img {
        width: 200px;
        margin-right: 20px;
      }

      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .title {
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #4D97FF;
        }

        .advantages {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #475B75;
          line-height: 24px;
          padding: 0 8px 0 4px;
        }

        .disadvantages {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #475B75;
          line-height: 24px;
          padding: 0 8px 0 4px;
        }
      }
    }

    .info-wrap {
      .title {
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #2E415B;
        line-height: 22px;
      }

      .desc {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #475B75;
        line-height: 24px;
      }
    }
  }
}
</style>