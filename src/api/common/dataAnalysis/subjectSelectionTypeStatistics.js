import {req, xhrGetFile} from '../../../utils/req';


let basicUrl = '/biz/courseSelectionStatistics';


// 查询学生选课征集完成率
export const getPercent = params => {
    return req(`${basicUrl}/getCourseSelectionStatisticsPercentage?courseSelectionPlanId=${params.courseSelectionPlanId}&graduate=${params.graduate}&type=${params.type}`)
    // return req(`${basicUrl}/getCourseSelectionStatisticsPercentage?grade=${params.grade}&graduate=${params.graduate}&type=${params.type}`)
}

// 获取选科征集分布
export const getPercentList = params => {
    return req(`${basicUrl}/getCourseSelectionStatisticsSubjectDistribution?courseSelectionPlanId=${params.courseSelectionPlanId}&graduate=${params.graduate}&type=${params.type}`)
    // return req(`${basicUrl}/getCourseSelectionStatisticsSubjectDistribution?grade=${params.grade}&graduate=${params.graduate}&type=${params.type}`)
}


// 获取学生选科征集列表
export const getList = params => {
    return req(`${basicUrl}/getCourseSelectionStatisticsStudentPage?courseSelectionPlanId=${params.courseSelectionPlanId}&gradeType=${params.gradeType}&graduate=${params.graduate}&page=${params.page}&size=${params.size}`)
    // return req(`${basicUrl}/getCourseSelectionStatisticsStudentPage?grade=${params.grade}&gradeType=${params.gradeType}&graduate=${params.graduate}&page=${params.page}&size=${params.size}`)
}

// 导出学生选科征集学生列表
export const downStudentList = (params, fileName) => {
    return xhrGetFile(`/schoolApi${basicUrl}/download?gradeType=${params.gradeType}&graduate=${params.graduate}&courseSelectionPlanId=${params.courseSelectionPlanId}`, fileName)
    // return xhrGetFile(`/schoolApi/${basicUrl}/download?grade=${params.grade}&gradeType=${params.gradeType}&graduate=${params.graduate}&courseSelectionPlanId=${params.courseSelectionPlanId}`, fileName)
}

// 获取选科征集筛选列表
export const getSubjectList = () => {
    return req(`/biz/courseSelectionPlan/getCourseSelectionPlanScreenList`)
}
