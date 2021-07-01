import {req} from '../../utils/req';


let basicUrl = '/biz/academy';

/**
 * @description 获取院校分类菜单
 * @param _
 * @returns {*}
 */
export const getMenu = () => {
    return req(`${basicUrl}/getOccupationMenuAll`)
}


/**
 * @description 获取院校列表
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export const getList = params => {
    return req(`${basicUrl}/getListPage?page=${params.page}&size=${params.size}&region=${params.region}&education_level=${params.education_level}&type=${params.type}`)
}

export const getBasicInfo = academyName => {
    return req(`${basicUrl}/getAcademyInfo?academyName=${academyName}`)
}


export const getBasicDesc = academyName => {
    return req(`${basicUrl}/getAcademySynopsis?academyName=${academyName}`)
}

// 获取院校排行
export const getAcademyTop = academyName => {
    return req(`${basicUrl}/getAcademyTop?academyName=${academyName}`)
}
// 获取院校升学率
export const getFurther = academyName => {
    return req(`${basicUrl}/getAcademyEmployment?academyName=${academyName}`)
}

// 获取院校下拉框数据
export const getSelectUniversities = academyName => {
    return req(`${basicUrl}/isAcademyAdmissions?academyName=${academyName}`)
}

// 获取院校历年录取分数线
export const getYearScopeLIst = params => {
    return req(`${basicUrl}/getAcademyCalendarYearScores?academyName=${params.academyName}&vintage=${params.vintage}&artsSciences=${params.artsSciences}`)
}

// 获取院校历年招生计划
export const getYearPlanList = params => {
    return req(`${basicUrl}/getAcademyProfessionalAdmissions?academyName=${params.academyName}&vintage=${params.vintage}&artsSciences=${params.artsSciences}&batch=${params.batch}`)
}

// 获取院校历年录取专业
export const getYearMajorList = params => {
    return req(`${basicUrl}/getAcademyChineseCalendar?academyName=${params.academyName}&vintage=${params.vintage}&artsSciences=${params.artsSciences}&batch=${params.batch}`)
}