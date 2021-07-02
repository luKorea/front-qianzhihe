<template>
  <basic-container-back>
    <div class="list-container">
      <div class="list-wrap">
        <div class="list-img">
          <img style="width: 78px; height: 78px" :src="info.image"/>
          <span class="img-tip">{{info.name.slice(0, 2)}}</span>
        </div>
        <div class="list-info">
          <div class="list-message" style="margin-top: 6px">
            <div class="list-left">
              <div class="list-tip">
                <span class="list-title">{{ info.name }}</span>
                <template v-if="info.keywords && info.keywords.length > 0">
                  <span class="list-tag" v-for="(tag, index) in info.keywords" :key="index">{{ tag }}</span>
                </template>
              </div>
              <div class="list-money">
                <span style="margin-right: 15px">专业代码：{{info.profession_code}}</span>
                <span style="margin-right: 15px">学位: {{info.education_level}}</span>
                <span style="margin-right: 15px">修业年限：{{info.study_duration}}</span>
                <span style="margin-right: 15px">学科门类：{{info.study_category}}</span>
                <span style="margin-right: 15px">专业门类：{{info.subject_category	}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-divider/>
    </div>
  </basic-container-back>
</template>

<script>
export default {
  name: "basicInfo",
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped lang="scss">
.list-img {
  position: relative;
  width: 78px;
  height: 78px;
  .img-tip {
    width: 78px;
    position: absolute;
    top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 17px;
    font-family: SourceHanSansSC-Bold, SourceHanSansSC;
    font-weight: bold;
    color: #FFFFFF;
  }
}
</style>