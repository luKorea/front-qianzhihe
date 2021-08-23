<template>
  <basic-container v-if="loading">
    <el-skeleton animated :count="number" :rows="6" style="width: 100%; height: 100%"></el-skeleton>
  </basic-container>
</template>

<script>
export default {
  name: "index",
  props: {
    rows: {
      type: Number,
      default: 4
    },
    loading: {
      type: Boolean,
      default: true
    },
    showAvatar: {
      type: Boolean,
      default: true
    },
    number: {
      type: Number,
      default: 100
    }
  }
}
</script>

<style scoped>

</style>
