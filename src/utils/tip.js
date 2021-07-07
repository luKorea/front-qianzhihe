import { MessageBox, Message } from 'element-ui'


/**
 * @description success tip
 * @method successTip
 * @param message {string}
 * @param duration {number}
 */
export const successTip = (message = '操作成功', duration= 3000) => {
    Message({
        message,
        type: 'success',
        duration: duration,
        center: true
    })
}

/**
 * @description errorTip
 * @method errorTip
 * @param message {string}
 * @param duration {number}
 */
export const errorTip = (message = '出错了', duration= 3000) => {
    Message({
        message,
        type: 'error',
        duration: duration,
        center: true
    })
}

/**
 * @description 用户操作
 * @method operationTip
 * @param params {Object}
 * @param success {Function}
 */
export const operationTip = (params = {
    message: '删除操作',
    title: '提示',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
}, success) => {
    MessageBox.confirm(params.message, params.title, {
        confirmButtonText: params.confirmButtonText,
        cancelButtonText: params.cancelButtonText,
        type: 'warning',
        closeOnClickModal: false,
        closeOnPressEscape: false,
        showClose: false,
        center: true
    }).then(() => {
        success();
    }).catch((err) => {
        console.info('operationTip error tip', err);
    })
}