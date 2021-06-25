
import { getToken, setToken, removeToken } from '@/utils/auth'
import defaultSettings from '@/settings.js'
import { req } from '@/utils/req.js'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    uuid: '',
    init: false,
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_UUID: (state, uuid) => {
    state.uuid = uuid
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_INIT: (state, init) => {
    state.init = init
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      req('/auth/login', userInfo, "post").then(function (res) {
        console.log(res);
        const { user } = res
        commit('SET_NAME', user.nickName)
        commit('SET_AVATAR', user.avatarPath);
        commit('SET_UUID', user.id)
        commit('SET_TOKEN', res.token)
        window.localStorage.setItem("USERINFO_" + defaultSettings.KEY,
          JSON.stringify(user)
        );
        setToken(res.token)
        resolve()
      }).catch(function (error) {
        reject(error)
      });
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      let USERINFO = {};
      try {
        USERINFO = JSON.parse(window.localStorage.getItem('USERINFO_' + defaultSettings.KEY));
      } catch (error) {

      }
      if (state.token && USERINFO) {
        commit('SET_NAME', USERINFO.nickName)
        commit('SET_AVATAR', '')
        commit('SET_UUID', USERINFO.id)
        commit('SET_ROLES', USERINFO.roles)
        resolve(state)
      } else {
        reject('登录失效，重新登录')
      }
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      window.localStorage.removeItem("USERINFO_" + defaultSettings.KEY);
      removeToken()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
  // set init
  setInit({ commit }) {
    return new Promise(resolve => {
      commit('SET_INIT', true)
      resolve()
    })
  },
  // getControl
  getControl({ commit, state }) {
    return new Promise((resolve, reject) => {
      let USERINFO = {};
      try {
        USERINFO = JSON.parse(window.localStorage.getItem('USERINFO_' + defaultSettings.KEY));
      } catch (error) {

      }
      try {
        req('/control/getControl', {}, "GET", false, true).then(function (res) {
          const { data } = res
          commit('SET_ROLES', data)
          USERINFO.ROLES = data
          window.localStorage.setItem("USERINFO_" + defaultSettings.KEY,
            JSON.stringify(USERINFO)
          );
          resolve()
        }).catch(function (error) {
          reject(error)
        });
      } catch (error) {
        resolve()
      }

    })
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

