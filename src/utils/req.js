import { MessageBox, Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import {showFullScreenLoading, tryHideFullScreenLoading} from './loading';
/**
* 请求
* @param {String} url 
* @param {Object} data 
* @param {String} type [get|post]
* @param {Boolean} tips [true=成功提示]
* @param {Boolean} flag [true=请求失败也返回完整报文]
* @returns 
* @example
* 
* req("", {}, "post").then(function (res) {
    console.log(res)
}).catch(function (err) { });
*/
export function req(url, data, type = 'GET', tips, flag) {
    showFullScreenLoading();
    return new Promise(function (resolve, reject) {
        let headers = {
            Authorization: getToken() || ''
        }
        if (type === "POST" || type === 'PUT') {
            headers["Content-Type"] = "application/json";
            data = JSON.stringify(data);
            console.log(data, 'post');
        }
        let success = function (res) {
            if (tips) {
                Message({
                    message: res.message,
                    type: 'success',

                })
            }
            //请求成功200 成功才会返回
            tryHideFullScreenLoading()
            resolve(res)
            // else if (res.code == 403) {
            //     MessageBox.confirm('您已注销，可以取消以停留在此页面，或重新登录', '确认注销', {
            //         confirmButtonText: '重新登录',
            //         cancelButtonText: '取消',
            //         type: 'warning'
            //     }).then(() => {
            //         store.dispatch('user/resetToken').then(() => {
            //             location.reload()
            //         })
            //     })
            //
            // }
            // else {
            //     Message({
            //         message: res.message,
            //         type: 'error',
            //         duration: 3 * 1000
            //     })
            //
            //     if (flag) {//请求失败也返回报文
            //         resolve(res);
            //     } else {
            //         reject(res);
            //     }
            // }
        }

        let error = function (err) {
            let data = JSON.parse(err.responseText);
            console.log(data);
            tryHideFullScreenLoading();
            Message({
                message: data.message,
                type: 'error',
                duration: 3 * 1000
            })
            reject(data.message);
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



export function xhrGet(url, name) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        let xhrurl = '';
        if ((url && url.indexOf('http://')) || (url && url.indexOf('https://'))) {
            xhrurl = url;
        } else {
            xhrurl = process.env.VUE_APP_PATH_REWRITE + url;
        }


        xhr.open("GET", xhrurl, true);
        xhr.setRequestHeader("token", getToken());
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
                }
                resolve();
            } else {
                Message({
                    message: '服务器端响应超时,请稍后再试',
                    type: 'error',
                    duration: 3 * 1000
                })
                reject('服务器端响应超时,请稍后再试');
                return
            }

        };
        xhr.send();
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
                }
                resolve();
            } else {
                Message({
                    message: '服务器端响应超时,请稍后再试',
                    type: 'error',
                    duration: 3 * 1000
                })
                reject('服务器端响应超时,请稍后再试');
                return
            }

        };
        xhr.send();
    });
}
