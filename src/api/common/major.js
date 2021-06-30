import {req} from '../../utils/req';


let basicUrl = '/schoolApi/professional';

/**
 * @description 获取专业列表
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export const getList = params => {
    return req(`${basicUrl}/getProfessionalMenu?page=${params.page}&size=${params.size}&study_category=${params.study_category}`)
}

/**
 * @description 获取专业详情基本信息
 * @param id
 * @returns {Promise | Promise<unknown>}
 */
export const getBasicInfo = id => {
    return req(`${basicUrl}/getProfessionalInfo?_id=${id}`)
}

/**
 * @description 获取专业详情介绍
 * @param id
 * @returns {Promise | Promise<unknown>}
 */
export const getBasicDesc = id => {
    return req(`${basicUrl}/getProfessionalIntroduce?_id=${id}`)
}
/**
 * @description 获取专业详情选考建议
 * @param id
 * @returns {Promise | Promise<unknown>}
 */
export const getBasicProposal = id => {
    return req(`${basicUrl}/getProfessionalChooseProposal?_id=${id}`)
}
/**
 * @description 获取专业详情就业信息
 * @param id
 * @returns {Promise | Promise<unknown>}
 */
export const getBasicEmployment = id => {
    return req(`${basicUrl}/getProfessionalEmploymentInformation?_id=${id}`)
}