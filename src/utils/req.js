import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import {showFullScreenLoading, tryHideFullScreenLoading} from './loading';
import store from "../store";

import NProgress from 'nprogress' // progress bar

NProgress.configure({
    showSpinner: true,
    speed: 100,
    trickleSpeed: 1
}) // NProgress Configuration


/**
 *
 * @param url
 * @param data
 * @param type
 * @returns {Promise<unknown>}
 */
export function req(url, data, type = 'GET') {
    // showFullScreenLoading();
    NProgress.start();
    return new Promise(function (resolve, reject) {
        let headers = {
            Authorization: getToken() || ''
        }
        if (type === "POST" || type === 'PUT' || type === 'DELETE') {
            headers["Content-Type"] = "application/json";
            data = JSON.stringify(data);
        }
        let success = function (res) {
            NProgress.done();
            // tryHideFullScreenLoading();
            resolve(res)
        }

        let error = function (err) {
            console.log(err.status, 'erere');
            if (err.status === 502) {
                this.$notify.error({
                    title: '系统更新',
                    message: '系统正在重启，请稍后刷新重试'
                });
            }
            let data = JSON.parse(err.responseText);
            NProgress.done();
            // tryHideFullScreenLoading();
            // 用户TOKEN已过期，重新登录
            if (data.status === 401) {
                // Message({
                //     message: '登录信息已过期，请重新登录',
                //     type: 'error'
                // });
                store.dispatch('user/logout').then(() => {
                    window.location.href = '/';
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

export function xhrGetFile(url, name, message = '导出成功') {
    return new Promise(function (resolve, reject) {
        showFullScreenLoading();
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
                    tryHideFullScreenLoading();
                    return
                } else {
                    var content = xhr.response;
                    var fileName = `${name}`; // 保存的文件名
                    var elink = document.createElement('a');
                    elink.download = fileName;
                    elink.style.display = 'none';
                    var blob = new Blob([content]);
                    elink.href = URL.createObjectURL(blob);
                    document.body.appendChild(elink);
                    elink.click();
                    document.body.removeChild(elink);
                    Message({
                        message: message,
                        type: 'success'
                    });
                    tryHideFullScreenLoading()
                }
                resolve();
            } else {
                console.log(xhr);
                tryHideFullScreenLoading()
                Message({
                    message: xhr.statusText,
                    type: 'error',
                    duration: 3 * 1000
                });
                reject(xhr.statusText);
            }

        };
        xhr.send();
    });
}
