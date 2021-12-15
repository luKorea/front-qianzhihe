import { req } from '../../utils/req';

let basicUrl = '/biz/courseSelectionPlan';

// 获取班级列表
export const getSubjectPlainList = params => {
  return req(
    `${basicUrl}/getCourseSelectionPlanPage?page=${params.page}&size=${params.size}&enrollmentYear=${params.enrollmentYear}`,
  )
}

// 获取编辑信息
export const getEditInfo = _id => {
  return req(`${basicUrl}/getCourseSelectionPlanById?_id=${_id}`)
}


// 添加/修改选科征集计划接口
export const addOrEditSubjectPlain = data => {
  return req(`${basicUrl}/saveCourseSelectionPlan`, data, 'POST')
}
