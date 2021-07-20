<template>
  <div>
    <template v-if="info.courseSelectionVos && info.courseSelectionVos.length > 0">
      <span class="tip-info"></span>
      <span class="tip-title" id="tuijian">3+1+2选科推荐（广东地区）</span>
      <template>
        <div class="flex-container">
          <div class="subject-wrap" v-for="(item, index) in info.courseSelectionVos" :key="index">
            <div class="title">
              <span>首选：{{ item.first_choice }}</span>
              <span>再选：{{ item.re_choice }}</span>
            </div>
            <div class="info">覆盖{{ item.proportion | percentNumber }}院校
            </div>
          </div>
        </div>
      </template>
    </template>

    <el-divider/>
    <span class="tip-info"></span>
    <span class="tip-title" id="school">推荐院校</span>
    <template v-if="info.subjectA || info.subjectB || info.subjectC">
      <div class="flex-container">
        <div class="school-wrap">
          <span class="tip orange">A级</span>
          <template v-if="info.subjectA && info.subjectA.length > 0">
            <div class="img-content" v-for="item in info.subjectA" :key="item._id"
                 @click="goUniversities(item.school_name)">
              <div class="info">
                <div class="img-wrap"><img :src="item.image" alt=""></div>
                <div class="title">{{ item.school_name }}</div>
              </div>
            </div>
          </template>
        </div>
        <div class="school-wrap">
          <span class="tip gray-orange">B级</span>
          <template v-if="info.subjectB && info.subjectB.length > 0">
            <div class="img-content" v-for="item in info.subjectB" :key="item._id"
                 @click="goUniversities(item.school_name)">
              <div class="info">
                <div class="img-wrap"><img :src="item.image" alt=""></div>
                <div class="title">{{ item.school_name }}</div>
              </div>
            </div>
          </template>
        </div>
        <div class="school-wrap">
          <span class="tip blue">C级</span>
          <template v-if="info.subjectC && info.subjectC.length > 0">
            <div class="img-content" v-for="item in info.subjectC" :key="item._id"
                 @click="goUniversities(item.school_name)">
              <div class="info">
                <div class="img-wrap"><img :src="item.image" alt=""></div>
                <div class="title">{{ item.school_name }}</div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </template>
    <basic-nothing v-else></basic-nothing>
    <el-divider/>
    <template v-if="info.recommendProVos && info.recommendProVos.length > 0">
      <span class="tip-info"></span>
      <span class="tip-title" id="major">相近专业</span>
      <template>
        <div class="flex-container">
          <div class="flex-wrap"  v-for="item in info.recommendProVos" :key="item._id" @click="goMajor(item._id)">
            <div class="top">
              <div class="img-wrap">
                <img :src="item.image" alt="">
                <span class="img-tip">{{item.name && item.name.slice(0, 2)}}</span>
              </div>
              <div class="info">
                <div class="title">
                  <span class="title-info">{{ item.name }}</span>
                  <span class="title-orange">{{ item.profession_type }}</span>
                </div>
                <div class="type">专业门类：{{ item.subject_category }}</div>
              </div>
            </div>
            <div class="bottom">
              <span style="margin-right: 20px">首选：{{ item.first_choice ? item.first_choice : '无' }}</span>
              <span>再选：{{ item.re_choice ? item.re_choice : '无' }}</span>
            </div>
          </div>
        </div>
      </template>
    </template>
    <el-divider/>
  </div>
</template>

<script>
export default {
  name: "basicProposal",
  props: {
    info: {
      type: Object,
      default: () => {
      }
    }
  },
  mounted() {
  },
  methods: {
    goUniversities(academyName) {
      this.$router.push({
        path: '/universities/universitiesDetails',
        query: {
          academyName: academyName
        }
      })
    },
    goMajor(id) {
      this.$emit('changeMajor', id)
    }
  }
}
</script>

<style scoped lang="scss">
.flex-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 20px;


  .subject-wrap {
    display: flex;
    justify-content: space-between;
    border-left: 4px solid #4D97FF;
    padding: 0 10px;
    align-items: center;
    width: 351px;
    height: 70px;
    background: #FFFFFF;
    box-shadow: 0px 4px 16px 0px rgba(170, 177, 192, 0.3);
    border-radius: 6px;
    margin-right: 20px;
    margin-bottom: 20px;

    .title {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      font-family: SourceHanSansSC-Medium, SourceHanSansSC;
      font-weight: 500;
      color: #333333;

      span:first-child {
        margin-bottom: 10px;
      }
    }

    .info {
      font-size: 14px;
      font-family: SourceHanSansSC-Medium, SourceHanSansSC;
      font-weight: 500;
      color: #4D97FF;
    }
  }

  .school-wrap {
    position: relative;
    display: flex;
    justify-content: center;
    width: 350px;
    background: #FFFFFF;
    box-shadow: 0px 4px 16px 0px rgba(170, 177, 192, 0.3);
    border-radius: 8px;
    flex-wrap: wrap;
    margin-right: 20px;
    margin-bottom: 20px;

    .tip {
      position: absolute;
      left: 0;
      top: -10px;
      height: 20px;
      line-height: 20px;
      width: 38px;
      text-align: center;
      border-radius: 4px 4px 4px 0px;
      font-size: 12px;
      font-family: SourceHanSansSC-Medium, SourceHanSansSC;
      font-weight: 500;
      color: #FFFFFF;
    }

    .orange {
      background: #FF7E59;
    }

    .gray-orange {
      background-color: #FDBD83;
    }

    .blue {
      background-color: #83CFFD;
    }

    .img-content {
      display: flex;
      width: 170px;
      flex-wrap: wrap;
      justify-content: space-between;
      cursor: pointer;

      .info {
        display: flex;
        align-items: center;

        .img-wrap {
          width: 40px;
          height: 40px;
          margin: 15px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .title {
          height: 12px;
          font-size: 12px;
          font-family: SourceHanSansCN-Medium, SourceHanSansCN;
          font-weight: 500;
          color: #666666;
          line-height: 18px;
        }
      }
    }
  }

  .flex-wrap {
    display: flex;
    flex-direction: column;
    width: 350px;
    background: #FFFFFF;
    box-shadow: 0 4px 16px 0 rgba(127, 137, 156, 0.3);
    border-radius: 6px;
    margin-right: 20px;
    margin-bottom: 20px;
    cursor: pointer;

    .top {
      display: flex;
      align-items: center;
      padding: 10px;

      .img-wrap {
        width: 48px;
        height: 48px;
        margin-right: 10px;
        position: relative;
          .img-tip {
            width: 48px;
            position: absolute;
            top: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            font-size: 11px;
            font-family: SourceHanSansSC-Bold, SourceHanSansSC;
            font-weight: bold;
            color: #FFFFFF;
          }

        img {
          width: 100%;
          height: 100%;
        }
      }

      .info {
        .title-info {
          height: 24px;
          font-size: 16px;
          font-family: SourceHanSansSC-Medium, SourceHanSansSC;
          font-weight: 500;
          color: #333333;
          line-height: 24px;
          margin-right: 10px;
        }

        .title-orange {
          font-size: 11px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #FC9131;
          background-color: #FFF0E7;
        }
      }

      .type {
        height: 19px;
        font-size: 13px;
        font-family: SourceHanSansSC-Regular, SourceHanSansSC;
        font-weight: 400;
        color: #666666;
        line-height: 19px;
      }
    }

    .bottom {
      position: relative;
      width: 350px;
      height: 34px;
      line-height: 34px;
      padding-left: 20px;
      background: #ECEFF0;
      font-size: 12px;
      font-family: SourceHanSansSC-Regular, SourceHanSansSC;
      font-weight: 400;
      color: #666666;

      &:after {
        content: "";
        display: block;
        position: absolute;
        left: 37px; //给小三角定位，更具实际需求调整
        top: -12px; //给小三角定位，更具实际需求调整
        border-width: 6px;
        border-style: dashed solid dashed dashed; //四个参数分别代表向下，左，上右的小三角(对应方向的小三角设置为solid，其他的为dashed。我这里演示向左的小三角，所以设置第二个）
        border-color: transparent transparent #ECEFF0 transparent;
      }
    }
  }
}
</style>