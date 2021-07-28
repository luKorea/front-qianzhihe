import { getToken } from "@/utils/auth";
import { req } from "../../utils/req.js";
import defaultSettings from "../../settings";
const getDefaultState = () => {
    return {
        token: getToken(),

    };
};

const state = getDefaultState();

const mutations = {
};

const actions = {
    pointData({commit}, data) {
        return new Promise((resolve, reject) => {
            // req('')
            let userInfo = JSON.parse(
                window.localStorage.getItem("USERINFO_" + defaultSettings.KEY)
            );
            resolve({
                ...data,
                ...userInfo
            });
        })
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
