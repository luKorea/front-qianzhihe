import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import {showFullScreenLoading, tryHideFullScreenLoading} from './loading';
import store from "../store";
/**
* 请求
* @param {String} url 
* @param {Object} data 
* @param {String} type [get|post]
* @returns 
* @example
* 
* req("", {}, "post").then(function (res) {
    console.log(res)
}).catch(function (err) { });
*/
export function req(url, data, type = 'GET') {
    showFullScreenLoading();
    return new Promise(function (resolve, reject) {
        let headers = {
            Authorization: getToken() || ''
        }
        if (type === "POST" || type === 'PUT') {
            headers["Content-Type"] = "application/json";
            data = JSON.stringify(data);
        }
        let success = function (res) {
            tryHideFullScreenLoading()
            resolve(res)
        }

        let error = function (err) {
            let data = JSON.parse(err.responseText);
            tryHideFullScreenLoading();
            // 用户TOKEN已过期，重新登录
            if (data.status === 401) {
                Message({
                    message: '登录信息已过期，请重新登录',
                    type: 'error'
                });
                store.dispatch('user/logout').then(() => {
                    this.$router.push(`/login?redirect=${this.$route.fullPath}`);
                    location.reload();
                })
            } else {
                Message({
                    message: data.message,
                    type: 'error',
                    duration: 3 * 1000
                })
                reject(data.message);
            }
        }
        if (type == 'upload') {
            $.ajax({
                type: "post",
                timeout: 120000, //超时时间设置，单位毫秒
                url: process.env.VUE_APP_PATH_REWRITE + url,
                data: data,
                contentType: false,
                // 告诉jQuery不要去设置Content-Type请求头
                processData: false,
                // 告诉jQuery不要去处理发送的数据
                headers: headers,
                success: success,
                error: error,
            });
        } else {
            $.ajax({
                type: type,
                timeout: 120000, //超时时间设置，单位毫秒
                url: process.env.VUE_APP_PATH_REWRITE + url,
                data: data,
                cache: false,
                headers: headers,
                success: success,
                error: error,
            });
        }
    });
}

export function xhrGetFile(url, name) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Authorization", getToken());
        xhr.responseType = "blob";
        xhr.onload = function (oEvent) {
            if (xhr.status == 200) {
                if (xhr.response.size < 100) {
                    Message({
                        message: '下载失败',
                        type: 'error',
                        duration: 3 * 1000
                    })
                    return
                } else {
                    var content = xhr.response;
                    var fileName = `${name}.xlsx`; // 保存的文件名
                    var elink = document.createElement('a');
                    elink.download = fileName;
                    elink.style.display = 'none';
                    var blob = new Blob([content]);
                    elink.href = URL.createObjectURL(blob);
                    document.body.appendChild(elink);
                    elink.click();
                    document.body.removeChild(elink);
                    Message({
                        message: '导出成功',
                        type: 'success'
                    })
                }
                resolve();
            } else {
                Message({
                    message: '服务器端响应超时,请稍后再试',
                    type: 'error',
                    duration: 3 * 1000
                })
                reject('服务器端响应超时,请稍后再试');
            }

        };
        xhr.send();
    });
}
