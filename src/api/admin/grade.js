import {req, xhrGetFile} from '../../utils/req';


let basicUrl = '/biz/grade';



// 获取班级列表
export const getGradeList = params => {
    return req(`${basicUrl}/queryGradePage?page=${params.page}&size=${params.size}&gradeType=${params.gradeType}&grade=${params.grade}&searchText=${params.searchText}&graduate=${params.graduate}`
    )
}



// 获取编辑信息
export const getEditInfo = _id => {
    return req(`${basicUrl}/queryGradeById?_id=${_id}`)
}

// 获取查看班级信息
export const getGradeVisitInfo = params => {
    return req(`${basicUrl}/queryGradeStudentPage?gradeId=${params.gradeId}&page=${params.page}&size=${params.size}`)
}


// 添加班级
export const addGrade = data => {
    return req(`${basicUrl}/create`, data, 'POST')
}

// 更新班级
export const updateGrade = data => {
    return req(`${basicUrl}/update`, data, 'PUT')
}

// 导出学生名单
export const exportStudent = (gradeId, fileName) => {
    return xhrGetFile(`/schoolApi/biz/student/download?gradeId=${gradeId}`, fileName)
}

// 开启选课征集 我的班级 班级管理
export const updateCourseSelectionFor = params => {
    return req(`${basicUrl}/updateCourseSelectionFor?_id=${params._id}&openCourseSelectionFor=${params.openCourseSelectionFor}`, '', 'PUT')
}