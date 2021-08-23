import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken ,hasPermission} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  // NProgress.start()
  document.title = getPageTitle(to.meta.title)
  if(to.meta.title){
    document.title = to.meta.title
  }
  async function rolesfun() {
    let roles = getroles();
    if (store.getters.init) {
      if (roles && roles.length > 0) {//有权限
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({ path: '/404', replace: true, query: { noGoBack: true } })
        }
      }
      else {
        next()
      }
    } else {
      store.dispatch('GenerateRoutes', { roles }).then(async () => { // 根据roles权限生成可访问的路由表
        router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
        store.dispatch('user/setInit').then(() => {
          next({ ...to, replace: true })// hack方法 确保addRoutes已完成 ,、
          // set the replace: true so the navigation will not leave a history record
        }).catch((err) => {
        })
      }).catch((err) => {
      })
    }
  }

  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      // NProgress.done()
    } else {
      if (store.getters.name) {//还没获取
        //登录页面进来
        rolesfun()
      } else {
        //刷新页面进来
        store.dispatch('user/getInfo').then(res => { // 拉取user_info
          rolesfun()
        }).catch(async (err) => {
          //浏览器换内核模式会有异常
          await store.dispatch('user/logout')
          next(`/login`)
          location.reload();
        })
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login`)
      // NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  // NProgress.done()
})


function getroles() {
  try {
    return store.state.user.roles.filter(d => d)
  } catch (error) {
    return []
  }
}
