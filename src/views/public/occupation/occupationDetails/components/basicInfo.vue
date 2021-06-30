<template>
  <basic-container>
    <div class="list-container">
      <div class="list-wrap">
        <div class="list-img">
          <el-image
              style="width: 180px; height: 102px"
              :src="info.image"
              :preview-src-list="[info.image]"
              fit="fit"/>
        </div>
        <div class="list-info">
          <div class="list-message">
            <div class="list-left">
              <div class="list-tip">
                <span class="list-title">{{ info.title }}</span>
                <template v-if="info.tag && info.tag.length > 0">
                  <span class="list-tag" v-for="(tag, index) in info.tag" :key="index">{{ tag }}</span>
                </template>
              </div>
              <div class="list-money">
                <span style="margin-right: 80px">行业：{{ info.business }}</span>
                <span>平均薪资: {{ info.compensation }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </basic-container>
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

<style scoped>

</style>