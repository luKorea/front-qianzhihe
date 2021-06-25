import {req} from '../utils/req';

/**
 * @description 获取图形验证码
 * @param _
 * @returns {*}
 */
export const getCode = _ => {
    return req('/auth/code');
}