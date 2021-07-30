<template>
  <basic-container v-if="loading">
    <avue-skeleton :avatar="showAvatar" block :number="number" :rows="rows" />
  </basic-container>
</template>

<script>
export default {
  name: "index",
  props: {
    rows: {
      type: Number,
      default: 3
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
      default: 10
    }
  }
}
</script>

<style scoped>

</style>
