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
            req('/biz/userActivity/addUserActivity', data, 'POST')
                .then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
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
