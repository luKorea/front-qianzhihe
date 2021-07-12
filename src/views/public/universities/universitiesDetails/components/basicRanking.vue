<template>
  <div>
    <template>
      <span class="tip-info"></span>
      <span class="tip-title" id="uni-sort">院校排行</span>
    </template>
    <div class="table-wrap">
      <div class="table-title">
        <span>校友会</span>
        <span>软科</span>
        <span>武书连</span>
      </div>
      <div class="table-info">
        <span>{{ info.chineseUniversityTopCount || 0 }}</span>
        <span>{{ info.softSeccoCount || 0 }}</span>
        <span>{{ info.wuShuTopCount || 0}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "basicRanking",
  props: {
    info: {
      type: Object,
      default: () => {
      }
    }
  }
}
</script>

<style scoped>
</style>