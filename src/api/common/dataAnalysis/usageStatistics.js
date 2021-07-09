import {req} from '../../../utils/req';


// 计算用户平均使用时长
export const getTime = params => {
    return req(`/biz/appUsage/getAppUsageAverageTime?grade=${params.grade}&graduate=${params.graduate}`)
}

// 查询用户操作记录
export const getHistory = params => {
    return req(`/biz/appUsage/getAppUsagePage?grade=${params.grade}&graduate=${params.graduate}&page=${params.page}&size=${params.size}&searchText=${params.searchText}`)
}