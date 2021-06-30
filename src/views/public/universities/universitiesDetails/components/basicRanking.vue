<template>
  <div>
    <template>
      <span class="tip-info"></span>
      <span class="tip-title">院校排行</span>
    </template>
    <div class="table-wrap">
      <div class="table-title">
        <span>校友会</span>
        <span>软科</span>
        <span>武书连</span>
      </div>
      <div class="table-info">
        <span>{{ info.chineseUniversityTopCount }}</span>
        <span>{{ info.softSeccoCount }}</span>
        <span>{{ info.wuShuTopCount }}</span>
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