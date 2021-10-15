<template>
  <div id="app" v-cloak style="min-width: 1400px">
<!--    <keep-alive>-->
<!--      <router-view v-if="$route.meta.keepAlive"></router-view>-->
<!--    </keep-alive>-->
    <router-view></router-view>
  </div>
</template>

<script>
import NProgress from "nprogress";
export default {
  name: 'App',
  computed: {
    key() {
      return this.$route.path;
    }
  },
  mounted() {
    // window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      // 屏幕剩余的高度
      let surplus = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      // 当前滑动高度
      let scrollY = document.documentElement.scrollTop;
      console.log(surplus, scrollY);
      // 当前位置百分比小数
      let coorY = scrollY / surplus;
      console.log(coorY);
      // 设置导航栏，这里使用NProgress.set() 动态更改进度条
      NProgress.set(coorY);
      NProgress.configure({ easing: 'ease', speed: 100 });
      NProgress.configure({minimum:0.0});
    }
  },
  deactivated (a, next) {

  }
}
</script>

<style>
[v-cloak] {
  display: none;
}
/*
#nprogress .bar {
  background: #A2DBFA !important;
  height: 4px !important;
}
#nprogress .peg {
  background: #A2DBFA !important;
  box-shadow: none !important;
}
*/

</style>
