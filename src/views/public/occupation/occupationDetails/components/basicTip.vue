<template>
  <div>
    <template v-if="info.tips && info.tips.length > 0">
      <span class="tip-info"></span>
      <span class="tip-title" id="occ-tip">小提示</span>
      <div class="desc-tip" v-for="(tip, index) in info.tips" :key="index">{{ tip }}</div>
    </template>
  </div>
</template>

<script>
export default {
  name: "basicTip",
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