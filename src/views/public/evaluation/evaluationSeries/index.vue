<template>
  <div>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">测评列表</span>
      <el-divider />
      <div class="list-wrap m-top">
        <div class="img"><img :src="mbit.img" alt=""></div>
        <div class="info">
          <div class="title">{{ mbit.name }}</div>
          <div class="info-number">
            <span class="tip">题目数：{{ mbit.total }}</span>
            <span class="tip time">建议用时：{{ mbit.time }}min</span>
          </div>
          <div class="info-btn" @click="goDetail('mbti')">查看详情</div>
        </div>
      </div>
      <el-divider/>
      <div class="list-wrap">
        <div class="img"><img :src="holland.img" alt=""></div>
        <div class="info">
          <div class="title">{{ holland.name }}</div>
          <div class="info-number">
            <span class="tip">题目数：{{ holland.total }}</span>
            <span class="tip time">建议用时：{{ holland.time }}min</span>
          </div>
          <div class="info-btn" @click="goDetail('holland')">查看详情</div>
        </div>
      </div>
    </basic-container>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      mbit: {
        type: 'mbti',
        name: '性格测试',
        time: '3~5',
        total: '20',
        img: require('../../../../assets/mbit.png')
      },
      holland: {
        type: 'holland',
        name: '兴趣测试',
        time: '5~10',
        total: '42',
        img: require('../../../../assets/hobby.png')
      },
    }
  },
  methods: {
    goDetail(type) {
      if (type === 'mbti') {
        this.$router.push({
          path: '/evaluation/evaluationSeries/mbit'
        })
      } else {
        this.$router.push({
          path: '/evaluation/evaluationSeries/holland'
        })
      }
    }
  }
}
</script>

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
</style>
