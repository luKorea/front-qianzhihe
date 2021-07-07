import {req} from '../../../utils/req';


// 计算用户平均使用时长
export const getTime = params => {
    return req(`/biz/appUsage/getAppUsageAverageTime?grade=${params.grade}&checkGraduate=${params.checkGraduate}`)
}

// 查询用户操作记录
export const getHistory = params => {
    return req(`/biz/appUsage/getAppUsagePage?grade=${params.grade}&checkGraduate=${params.checkGraduate}&page=${params.page}&size=${params.size}&searchText=${params.searchText}`)
}