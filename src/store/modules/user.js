import { getToken, setToken, removeToken } from "@/utils/auth";
import defaultSettings from "../../settings.js";
import { req } from "../../utils/req.js";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
    user_type: "",
    roles: [],
    uuid: "",
    init: false,
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_USER_TYPE: (state, user_type) => {
    state.user_type = user_type;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_UUID: (state, uuid) => {
    state.uuid = uuid;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_INIT: (state, init) => {
    state.init = init;
  },
};

const actions = {
  // user login
  login ({ commit }, userInfo) {
    let { type } = userInfo,
      url = "/auth/login";
    if (type === "student") {
      url = "/auth/studentLogin";
    }
    return new Promise((resolve, reject) => {
      req(url, userInfo, "POST").then(function (res) {
        const { user } = res;
        commit("SET_NAME", user.nickName);
        commit("SET_AVATAR", user.avatarPath);
        commit("SET_UUID", user.teacher_id);
        commit("SET_TOKEN", res.token);
        commit("SET_USER_TYPE", user.role);
        setToken(res.token);
        if (!res.isBindingPhone) {
          window.localStorage.setItem(
            "USERINFO_" + defaultSettings.KEY,
            JSON.stringify(user),
          );
        }
        resolve(res);
      }).catch(function (error) {
        reject(error);
      });
    });
  },

  // get user info
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      let USERINFO = {};
      try {
        USERINFO = JSON.parse(
          window.localStorage.getItem("USERINFO_" + defaultSettings.KEY),
        );
      } catch (error) {}
      if (state.token && USERINFO) {
        commit("SET_NAME", USERINFO.nickName);
        commit("SET_AVATAR", USERINFO.avatarPath);
        commit("SET_UUID", USERINFO.teacher_id);
        console.log("USERINFO.ROLES");
        commit("SET_ROLES", USERINFO.ROLES);
        commit("SET_USER_TYPE", USERINFO.role);
        resolve(state);
      } else {
        reject("???????????????????????????");
      }
    });
  },

  // user logout
  logout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      localStorage.clear();
      // window.localStorage.removeItem("USERINFO_" + defaultSettings.KEY);
      removeToken();
      commit("RESET_STATE");
      resolve();
    });
  },

  // remove token
  resetToken ({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
  // set init
  setInit ({ commit }) {
    return new Promise((resolve) => {
      commit("SET_INIT", true);
      resolve();
    });
  },
  // getControl
  getControl ({ commit, state }) {
    return new Promise((resolve, reject) => {
      let USERINFO = {};
      try {
        USERINFO = JSON.parse(
          window.localStorage.getItem("USERINFO_" + defaultSettings.KEY),
        );
      } catch (error) {}
      try {
        req("/menus/build", {}, "GET", false, true).then(function (res) {
          //?????????????????????????????????
          let rolesSet = new Set();

          function filterAsyncRouter (asyncRouterMap) {
            const accessedRouters = asyncRouterMap.filter((route) => {
              if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children);
              }
              if (route.name) {
                //???name???????????????
                if (USERINFO && USERINFO.role == "????????????") {
                  if (
                    ["academy", "professional", "occupationMenu"].indexOf(
                      route.name,
                    ) > -1
                  ) {
                    route.name = route.name + "_student";
                  }
                }
                rolesSet.add(route.name);
              }
              return true;
            });
            return accessedRouters;
          }

          filterAsyncRouter(res);

          const data = Array.from(rolesSet || []);
          commit("SET_ROLES", data);
          USERINFO.ROLES = data;
          window.localStorage.setItem(
            "USERINFO_" + defaultSettings.KEY,
            JSON.stringify(USERINFO),
          );
          resolve();
        }).catch(function (error) {
          reject(error);
        });
      } catch (error) {
        resolve();
      }
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
