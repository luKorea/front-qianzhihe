<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-avatar :size="50" :src="imgUrl + '/' + avatar"></el-avatar>
      {{ name }}
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
/**
 * TODO:首页
 */
export default {
  name: 'Dashboard',
  data() {
    return {
      imgUrl: process.env.VUE_APP_PROXY_URL
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar'
    ])
  },
  created() {
  }
}
</script>
<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
