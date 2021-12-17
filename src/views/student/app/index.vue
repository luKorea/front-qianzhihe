<template>
  <div>
    <div class="app-wrap">
      <div class="img-wrap">
        <div class="img-content">
          <img :src="imgUrl" alt=""/>
        </div>
        <div class="img-info">
          <div class="img-title">{{ info.title }}</div>
          <div class="img-desc">{{ info.desc }}</div>
          <div class="img">
            <img :src="info.qrCodeUrl" alt="">
          </div>
          <div class="img-tip">{{ info.tip }}</div>
          <div class="img-app-desc">{{ info.appDesc }}</div>
        </div>
      </div>
      <div class="app-content">
        <el-alert :title="title" type="info" show-icon :closable="false"></el-alert>

        <div class="list-content">
          <template v-if="list && list.length > 0">
            <div class="item" v-for="(item, index) in list" :key="index">
              <div class="item-title">{{ item.title }}</div>
              <div class="item-wrap" v-if="index % 2 === 0">
                <div class="left" style="margin-right: 50px">
                  <img :src="item.imgUrl" alt="">
                </div>
                <div class="right">
                  <div class="question">{{ item.question }}</div>
                  <div class="answer">{{ item.answer }}</div>
                </div>
              </div>
              <div class="item-wrap" v-else>
                <div class="right" style="margin-right: 50px">
                  <div class="question">{{ item.question }}</div>
                  <div class="answer">{{ item.answer }}</div>
                </div>
                <div class="left">
                  <img :src="item.imgUrl" alt="">
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="app-qrcode-wrap">
      <div class="qrcode-content">
        <div class="title">更多内容，尽在千职鹤APP</div>
        <div class="img">
          <img :src="info.qrCodeUrl" alt="">
        </div>
        <div class="tip">{{ info.tip }}</div>
        <div class="desc">{{ info.appDesc }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data () {
    return {
      info: {
        title: '千职鹤—生涯规划APP',
        desc: '千职鹤是一个面向高中生的生涯规划平台，致力于解决高中生新高考选科、志愿填报以及更多生涯规划相关的需求',
        tip: '扫描二维码下载千职鹤APP',
        appDesc: '也可在手机各大应用商店搜索【千职鹤】进行下载',
        qrCodeUrl: 'https://www.careershe.com/images/mobile_download_url.png',
      },
      imgUrl: 'https://www.careershe.com/images/web-img/service/app-banner.png',
      title: '下载APP后，可直接使用绑定手机号登录，也可以通过账号密码方式登录',
      list: [
        {
          title: '志愿填报',
          question: '高考志愿填报太难?',
          answer: '输入选科、分数，一键查询可填报大学及专业志愿填报，从此so easy',
          imgUrl: 'https://www.careershe.com/images/app-one.png',
        },
        {
          title: '职业百科',
          question: '职业内容不够看?',
          answer: '职业六大视频课程、工作职责、发展地区、职业发展道路、薪资数据......你想了解的，这里都有',
          imgUrl: 'https://www.careershe.com/images/app-two.png',
        },
        {
          title: '社区问答',
          question: '我该怎么选科、如何选择专业和大学？.......',
          answer: '有什么疑问尽管提出来，资深导师在线答疑',
          imgUrl: 'https://www.careershe.com/images/app-three.png',
        },
      ],
    }
  },
}
</script>

<style scoped lang="scss">
.app-wrap {
  padding: 10px;

  .img-wrap {
    position: relative;

    .img-content {
      width: 100%;
      height: 540px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .img-info {
      position: absolute;
      left: 70px;
      top: 50px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .img-title {
        font-size: 48px;
        font-family: MicrosoftYaHeiSemibold;
        color: #2E415B;
        line-height: 80px;
        margin-bottom: 30px;
      }

      .img-desc {
        width: 459px;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        color: #323A50;
        line-height: 32px;
        margin-bottom: 20px;
      }

      .img {
        width: 150px;
        height: 148px;
        margin-bottom: 30px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .img-tip {
        color: #2E415B;
        font-size: 16px;
        line-height: 24px;
      }

      .img-app-desc {
        font-size: 16px;
        font-family: MicrosoftYaHei;
        color: #999999;
        line-height: 24px;
      }
    }
  }

  .app-content {
    width: 100%;
    padding: 10px;
    background-color: #FFFFFF;

    .el-alert--info.is-light {
      background-color: #E6F7FF;
      color: #A6B3B9;
      border: 1px solid #BAE7FF;
    }

    .list-content {
      padding: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 30px;
        &:last-child {
          margin-bottom: 0;
        }
        .item-title {
          font-size: 24px;
          font-family: MicrosoftYaHeiSemibold;
          color: #2E415B;
          line-height: 32px;
          margin-bottom: 40px;
        }
        .item-wrap {
          display: flex;
          justify-content: space-between;
          .left {
            width: 420px;
            height: 240px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .right {
            display: flex;
            flex-direction: column;
            margin-top: 20px;
            .question {
              width: 360px;
              font-size: 18px;
              font-family: MicrosoftYaHei;
              color: #0B173A;
              line-height: 40px;
            }
            .answer {
              width: 360px;
              font-size: 18px;
              font-family: MicrosoftYaHei;
              color: #0B173A;
              line-height: 40px;
            }
          }
        }
      }
    }
  }
}

.app-qrcode-wrap {
  padding: 10px;

  .qrcode-content {
    width: 100%;
    padding: 80px 10px;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      font-size: 24px;
      font-family: MicrosoftYaHeiSemibold;
      color: #2E415B;
      line-height: 32px;
      margin-bottom: 20px;
    }

    .img {
      width: 150px;
      height: 148px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .tip {
      color: #2E415B;
      font-size: 16px;
      line-height: 24px;
    }

    .desc {
      font-size: 16px;
      font-family: MicrosoftYaHei;
      color: #999999;
      line-height: 24px;
    }
  }
}
</style>
