import { asyncRouterMap, constantRoutesStart } from '@/router'
import { hasPermission } from '@/utils/auth'
import { DeepClone } from '@/utils/parameterCopy'//解决登陆后 异步路由原数据被改变
import store from '../index'

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */

function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}
function filterAsyncRouter (asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  });
  return accessedRouters
}

/**/
const permission = {
  state: {
    routers: constantRoutesStart,
    addRouters: [],
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      let constantRoutes = constantRoutesStart.concat(routers)
      state.routers = constantRoutes;
    },
  },
  actions: {
    GenerateRoutes ({ commit, state }, data) {
      return new Promise(resolve => {
        const { roles } = data;
        let accessedRouters;
        accessedRouters = filterAsyncRoutes(asyncRouterMap, roles);
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },
  },
}

export default permission
