import {req, xhrGetFile} from '../../utils/req';


let basicUrl = '/schoolApi/grade';



// 获取班级列表
export const getGradeList = params => {
    return req(`${basicUrl}/queryGradePage?page=${params.page}&size=${params.size}&gradeType=${params.gradeType}&grade=${params.grade}&searchText=${params.searchText}`
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
    return xhrGetFile(`/schoolApi/student/download?gradeId=${gradeId}`, fileName)
}