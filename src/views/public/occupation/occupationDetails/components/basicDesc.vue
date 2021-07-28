<template>
  <div>
    <template v-if="info.description">
      <span class="tip-info"></span>
      <span class="tip-title" id="occ-desc">职业介绍</span>
      <div class="desc">{{ info.description }}</div>
      <el-divider/>
    </template>
    <template v-if="info.professionalArrayList && info.professionalArrayList.length > 0">
      <span class="tip-info"></span>
      <span class="tip-title" id="occ-major">推荐专业</span>
      <div class="flex-img">
        <template v-for="item in info.professionalArrayList">
          <div class="flex-wrap" @click="goMajor(item._id, item.name)">
            <div class="img" :key="item._id">
              <img :src="item.image" alt="">
              <span class="img-tip" v-if="item.name">{{ item.name && item.name.slice(0, 2) }}</span>
            </div>
            <div class="title">{{ item.name }}</div>
          </div>
        </template>
      </div>
      <el-divider />
    </template>
  </div>
</template>

<script>
export default {
  name: "basicDesc",
  props: {
    info: {
      type: Object,
      default: () => {
      }
    }
  },
  methods: {
    goMajor(id, name) {
      if (name === '专业不限') return false;
      this.$router.push({
        path: '/major/majorDetails',
        query: {
          _id: id,
          name: name
        }
      })
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
      position: relative;
      cursor: pointer;
      margin-bottom: 10px;

      img {
        width: 100%;
        height: 100%;
      }

      .img-tip {
        width: 64px;
        position: absolute;
        top: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 11px;
        font-family: SourceHanSansSC-Bold, SourceHanSansSC;
        font-weight: bold;
        color: #FFFFFF;
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