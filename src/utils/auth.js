import Cookies from 'js-cookie'
import defaultSettings from '@/settings.js'
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
 * @param roles//用户权限
 * @param route//网页路由权限
 */
export function hasPermission(userRoles, route) {
 
  let userRolesTemp = [];
  var recursiveFunction = function () {
    const getStr = function (list) {
      list.forEach(function (row) {
        if (row.controlList && row.controlList.length > 0) {
          getStr(row.controlList || [])
          userRolesTemp.push(row.url)
        } else {
          userRolesTemp.push(row.url)
        }
      })
    }
    getStr(userRoles.menuList || userRoles || [])
  }
  recursiveFunction()
  // console.log(userRolesTemp)

  if (route && route.meta && route.meta.roles) {
    return userRolesTemp.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}
