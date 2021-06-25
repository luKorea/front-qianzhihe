<template>
  <div>
    <div class="person-wrap">
      <div class="person-left">
        <span class="tip-info"></span>
        <span class="tip-title">代表人物</span>
        <template  v-if="info.personalityVoList && info.personalityVoList.length > 0">
          <div class="person">
            <div class="person-img" v-for="person in info.personalityVoList" :key="person._id">
              <el-image
                  style="width: 200px; height: 393px; margin-bottom: 20px;border-radius: 4px"
                  :src="person.image"
                  :preview-src-list="[person.image]"
                  fit="cover"/>
              <div class="person-title">{{person.title}}</div>

            </div>
          </div>
        </template>
      </div>
      <div class="person-right">
        <div class="top">
          <span class="tip-info"></span>
          <span class="tip-title">兴趣测试</span>
          <div class="hobby">
            <span class="hobby-orange-title">{{info.hollands1.name}}</span>
            <span class="hobby-orange-desc">{{info.hollands1.describe}}</span>
          </div>
          <div class="hobby-blue">
            <span class="hobby-blue-title">{{info.hollands2.name}}</span>
            <span class="hobby-blue-desc">{{info.hollands2.describe}}</span>
          </div>
        </div>
        <div class="bottom">
          <span class="tip-info"></span>
          <span class="tip-title">特质</span>
          <template v-if="info.characteristics && info.characteristics.length > 0">
            <div class="desc-tip" v-for="(tip, index) in info.characteristics" :key="index">{{tip}}</div>
          </template>
        </div>
      </div>
    </div>
    <el-divider/>
  </div>
</template>

<script>
export default {
  name: "basicPerson",
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped lang="scss">

.person-wrap {
  display: flex;
  width: 100%;
  .person-left {
    width: 50%;
    margin-right: 20px;
    .person {
      display: flex;
      text-align: center;
      .person-img {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        margin: 10px;
        .person-title {
          height: 20px;
          font-size: 14px;
          font-family: SourceHanSansSC-Regular, SourceHanSansSC;
          font-weight: 400;
          color: #333333;
          line-height: 20px;
        }
      }
    }
  }
  .person-right {
    width: 50%;
    display: flex;
    flex-direction: column;
    .top {
      height: 50%;
      .hobby {
        display: flex;
        margin: 20px 0 2px 0;
        .hobby-orange-title {
          width: 30%;
          height: 65px;
          line-height: 65px;
          text-align: center;
          background: #FC9131;
          border-radius: 4px 0 0 0;
          margin-right: 2px;
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
        }
        .hobby-orange-desc {
          width: 70%;
          //height: 65px;
          padding: 15px;
          background: #FEE9D6;
          border-radius: 0px 4px 0px 0px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #FC9131;
        }
      }
      .hobby-blue {
        display: flex;
        margin: 2px;
        .hobby-blue-title {
          width: 30%;
          height: 65px;
          line-height: 65px;
          text-align: center;
          background: #4D97FF;
          border-radius: 4px 0 0 0;
          margin-right: 2px;
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
        }
        .hobby-blue-desc {
          width: 70%;
          //height: 65px;
          padding: 15px;
          background: #DBEAFF;
          border-radius: 0px 4px 0px 0px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #4D97FF;
        }
      }

    }
    .bottom {
       height: 50%;
    }
  }
}
</style>