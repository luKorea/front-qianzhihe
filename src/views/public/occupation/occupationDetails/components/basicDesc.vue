<template>
  <div>
    <template>
      <span class="tip-info"></span>
      <span class="tip-title">职业介绍</span>
      <div class="desc">{{info.description}}</div>
    </template>
    <el-divider/>
    <template>
      <span class="tip-info"></span>
      <span class="tip-title">推荐专业</span>
      <div class="flex-img">
        <template v-if="info.professionalArrayList && info.professionalArrayList.length > 0">
          <template v-for="item in info.professionalArrayList">
            <div class="flex-wrap">
              <div class="img" :key="item._id"><img :src="item.image" alt=""></div>
              <div class="title">{{item.name}}</div>
            </div>
          </template>
        </template>
      </div>
    </template>
    <el-divider/>
  </div>
</template>

<script>
export default {
  name: "basicDesc",
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped lang="scss">
.flex-img {
  display: flex;
  margin: 20px 0 10px 0;
  width: 100%;
  .flex-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    //justify-content: space-between;
    text-align: center;
    margin-right: 40px;
    .img {
      width: 64px;
      height: 64px;
      margin-bottom: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      height: 40px;
      font-size: 14px;
      font-family: SourceHanSansSC-Regular, SourceHanSansSC;
      font-weight: 400;
      color: #333333;
      line-height: 20px;
    }
  }
}
</style>