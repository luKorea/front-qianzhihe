<template>
  <div class="video-wrap">
    <div class="video-left">
      <video :src="defaultSrc" controls="controls" class="my-video">
        您的浏览器不支持 video 标签。
      </video>
    </div>
    <div class="video-right">
      <div class="video-title">相关视频</div>
      <div v-for="item in videoList" :key="item._id">
      </div>
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
      defaultSrc: ''
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
    width: 80%;
    .my-video {
      width: 100%;
      height: 100%;
    }
  }
  .video-right{
    width: 20%;
    background: #2E415B;
    border-radius: 0 4px 4px 0;
  }
}
</style>