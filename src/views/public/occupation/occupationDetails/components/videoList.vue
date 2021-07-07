<template>
  <div class="video-wrap">
    <div class="video-left">
      <video :src="defaultSrc" controls="controls" class="my-video">
        您的浏览器不支持 video 标签。
      </video>
    </div>
    <div class="video-right">
      <div class="video-title">相关视频</div>
      <template v-if="videoList && videoList.length > 0">
        <div class="video-item">
          <div v-for="(item, index) in videoList"
               :class="index === selectIndex ? 'select' : ''"
               :key="item._id" class="item" @click="changeVideo(item.videos, index)">
            <div class="item-img"><img :src="item.image" alt=""></div>
            <div class="item-title">{{item.describe}}</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "videoList",
  props: {
    videoList: {
      type: Array,
      default: () => []
    }
  },
  watch: {
     videoList: {
       deep: true,
       handler() {
         this.defaultSrc = this.videoList[0].videos
       }
     }
  },
  data() {
    return {
      defaultSrc: '',
      selectIndex: 0
    }
  },
  methods: {
    changeVideo(video, index) {
      this.defaultSrc = video;
      this.selectIndex = index;
    }
  }
}
</script>

<style scoped lang="scss">
.video-wrap {
  display: flex;
  height: 479px;
  overflow: hidden;
  margin-top: 10px;
  .video-left {
    width: 73%;
    .my-video {
      width: 100%;
      height: 100%;
    }
  }
  .video-right{
    width: 27%;
    background: #2E415B;
    border-radius: 0 4px 4px 0;
    .video-title {
      margin: 20px 20px 10px 20px;
      height: 25px;
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 25px;
    }
    .video-item {
      display: flex;
      flex-direction: column;
      height: 479px;
      overflow-y: scroll;
      padding-bottom: 90px;
      .item {
        display: flex;
        //justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        cursor: pointer;
        height: 90px;
        .item-img {
          width: 124px;
          height: 70px;
          margin: 10px 10px 10px 20px;
          img {
            //width: 100%;
            height: 100%;
          }
        }
        .item-title {
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
          margin-right: 10px;
          line-height: 30px;
        }
      }
      .select {
        width: 100%;
        height: 90px;
        background: rgba(58, 99, 156, 1)
      }
    }
  }
}
</style>