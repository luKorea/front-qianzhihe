import {req} from '../../utils/req';


let basicUrl = '/biz/student';



// 获取学生列表
export const getStudentList = params => {
    return req(`${basicUrl}/queryStudentPage?page=${params.page}&graduate=${params.graduate}&size=${params.size}&gradeType=${params.gradeType}&grade=${params.grade}&queryOrIdOrNameOrPhone=${params.queryOrIdOrNameOrPhone}`
    )
}


// 获取编辑信息
export const getEditInfo = teacherId => {
    return req(`${basicUrl}/queryTeacherUpdateInfo?teacherId=${teacherId}`)
}

// 查看学生信息
export const getStudentInfo = params => {
    // return req(`${basicUrl}/queryStudentUpdate?gradeId=${params.gradeId}&studentId=${params.studentId}`)
    return req(`${basicUrl}/queryStudentUpdate?studentId=${params.studentId}`)
}

// 移除学生班级关联
export const removeStudentToClass = studentId => {
    return req(`${basicUrl}/updateStudentGradeBinding`, studentId, 'PUT')
}


// 新增学生信息
export const createStudentInfo = data => {
    return req(`${basicUrl}/create`, data, 'POST')
}
// 更新学生信息
export const updateStudentInfo = data => {
    return req(`${basicUrl}/update`, data, 'PUT')
}

// 导入学生数据
export const importData = (file) => {
    return req(`${basicUrl}/importStudent`, file, 'upload')
}

// 删除学生
export const deleteStudent = ids => {
    return req(`${basicUrl}/delete`, ids, 'DELETE')
}
