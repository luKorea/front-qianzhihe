<template>
  <div class="video-wrap">
    <div class="video-left">
      <!--      <div id="player" class="my-video"></div>-->
      <video :src="defaultSrc" controls="controls"
             oncontextmenu="return false;"
             controlslist="nodownload" class="my-video" :poster="defaultPoster">
        您的浏览器不支持 video 标签。
      </video>
    </div>
    <div class="video-right">
      <div class="video-title">相关视频</div>
      <template v-if="videoList && videoList.length > 0">
        <div class="video-item">
          <div v-for="(item, index) in videoList"
               :class="index === selectIndex ? 'select' : ''"
               :key="item._id" class="item" @click="changeVideo(item.videos, index, item.image)">
            <div class="item-img">
              <el-image :src="item.image" alt="">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
            <div class="item-title">{{ item.describe }}</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import DPlayer from 'dplayer';
export default {
  name: "videoList",
  props: {
    videoList: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    this.defaultSrc = this.videoList[0].videos;
    this.defaultPoster = this.videoList[0].image;
    // this.loadPlayerScript(this.loadPlayer);
  },
  watch: {
    videoList: {
      deep: true,
      handler(val) {
        this.defaultSrc = this.videoList[0].videos
        this.defaultPoster = this.videoList[0].image
      }
    }
  },
  data() {
    return {
      defaultSrc: '',
      defaultPoster: '',
      selectIndex: 0,
      vodPlayerJs: 'https://player.polyv.net/script/player.js',
    }
  },
  methods: {
    loadPlayerScript(callback) {
      if (!window.polyvPlayer) {
        const myScript = document.createElement('script');
        myScript.setAttribute('src', this.vodPlayerJs);
        myScript.onload = callback;
        document.body.appendChild(myScript);
      } else {
        callback();
      }
    },
    loadPlayer() {
      const polyvPlayer = window.polyvPlayer;
      this.player = polyvPlayer({
        wrap: '#player',
        height: 479,
        vid: '88083abbf5bcf1356e05d39666be527a_8',
        hideSwitchPlayer: true,
        screenshot: true, // 启动视频截图
      });
    },
    changeVideo(video, index, image) {
      this.defaultSrc = video;
      this.defaultPoster = image;
      this.selectIndex = index;
    }
  },
  destroyed() {
    if (this.player) {
      this.player.destroy();
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
    height: 479px;

    .my-video {
      width: 100%;
      height: 479px;
    }
  }

  .video-right {
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
