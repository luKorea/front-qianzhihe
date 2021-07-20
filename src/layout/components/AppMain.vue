<template>
  <section class="app-main">
<!--    <el-breadcrumb class="app-breadcrumb" separator="/">-->
<!--      <transition-group name="breadcrumb">-->
<!--        <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">-->
<!--          <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{-->
<!--              item.meta.title-->
<!--            }}</span>-->
<!--          <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>-->
<!--        </el-breadcrumb-item>-->
<!--      </transition-group>-->
<!--    </el-breadcrumb>-->
    <transition name="fade-transform" mode="out-in">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view :key="key"/>
      </keep-alive>
      <keep-alive v-else>
        <router-view :key="key"/>
      </keep-alive>
    </transition>
    <!--      <back-to-top transition-name="fade"/>-->
  </section>
</template>

<script>
import BackToTop from './../../components/BackToTop/index';
import pathToRegexp from 'path-to-regexp'

export default {
  name: 'AppMain',
  components: {
    BackToTop
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]
      if (!this.isDashboard(first)) {
        matched = [].concat(matched)
      }
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === '首页'.toLocaleLowerCase()
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const {params} = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const {redirect, path} = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #29415D;
    cursor: text;
  }
}

.app-main {
  /*50 = navbar  */
  min-height: 100vh;
  padding: 10px;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #F4F7FB;
}

.fixed-header + .app-main {
  padding-top: 120px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: 100vh;
  }

  .fixed-header + .app-main {
    padding-top: 120px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
