<template>
  <div id="app" v-cloak>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" :key="key"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" :key="key"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    key() {
      return this.$route.path;
    }
  },
}
</script>

<style>
[v-cloak] {
  display: none;
}

</style>
