import {req} from '../../utils/req';


let basicUrl = '/biz/myTeacherGrade';



// 获取学生列表
export const getStudentList = params => {
    return req(`${basicUrl}/queryStudentPage?page=${params.page}&size=${params.size}&gradeType=${params.gradeType}&grade=${params.grade}&queryOrIdOrNameOrPhone=${params.queryOrIdOrNameOrPhone}`
    )
}


// 获取编辑信息
export const getEditInfo = teacherId => {
    return req(`${basicUrl}/queryTeacherUpdateInfo?teacherId=${teacherId}`)
}

// 查看学生信息
export const getStudentInfo = params => {
    return req(`${basicUrl}/queryStudentUpdate?gradeId=${params.gradeId}&studentId=${params.studentId}`)
}

// 移除学生班级关联
export const removeStudentToClass = studentId => {
    return req(`${basicUrl}/updateStudentGradeBinding`, studentId, 'PUT')
}

// 更新学生信息
export const updateStudentInfo = data => {
    return req(`${basicUrl}/update`, data, 'PUT')
}


// 班级列表筛选
export const selectClassList = () => {
    return req(`${basicUrl}/getStudentGradeScreenList`)
}