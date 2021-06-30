import Cookies from 'js-cookie'

const TokenKey = 'Token'//跟前台共用一套登录token 改为token


export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param userRoles //用户权限
 * @param route //网页路由权限
 */
export function hasPermission(userRoles, route) {
  if (route && route.meta && route.meta.roles) {
    return userRoles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}
