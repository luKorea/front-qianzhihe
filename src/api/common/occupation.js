import {req} from '../../utils/req';


let basicUrl = '/schoolApi/occupationMenu';

/**
 * @description 获取职业分类菜单
 * @param _
 * @returns {*}
 */
export const getMenu = () => {
    return req(`${basicUrl}/getOccupationMenuAll`)
}


/**
 * @description 获取职业列表
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export const getList = params => {
    return req(`${basicUrl}/getOccupationMenu?page=${params.page}&size=${params.size}&_id=${params._id}`)
}

/**
 * @description 获取职业详情
 * @param occupationId
 * @returns {Promise | Promise<unknown>}
 */
export const getDetail = occupationId => {
    return req(`${basicUrl}/getOccupationInfo?occupationId=${occupationId}`)
}