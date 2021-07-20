import {req} from '../../utils/req';

/**
 * @description 获取图形验证码
 * @param _
 * @returns {*}
 */
export const getCode = _ => {
    return req('/auth/code');
}

// 获取学生登录，用户绑定信息
export const getStudentInfo = username => {
    return req('/auth/getUserBindingInfo?username=' + username)
}

// 绑定手机号
export const bindPhone = (params) => {
    return req(`/auth/bindingPhone?phone=${params.phone}&username=${params.username}&gender=${params.gender}`,
        '', 'PUT')
}

// 修改密码
export const changePassword = params => {
    return req(`/biz/student/updateUserPassword`, params, 'PUT')
}