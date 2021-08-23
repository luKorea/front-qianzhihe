<template>
  <div class="nothing-box">
    <div class="img"><img :src="img" /></div>
    <div class="title">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    title: {
      type: String,
      default: '暂无数据'
    }
  },
  data() {
    return {
      img: require('./../../assets/nothing.png')
    }
  },
}
</script>

<style scoped lang="scss">
.nothing-box {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #FFFFFF;
  .img {
    width: 160px;
    height: 160px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .title {
    margin-top: 24px;
    height: 22px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #B8C3D6;
    line-height: 22px;
    margin-bottom: 20px;
  }
}
</style>
