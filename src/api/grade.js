import {req} from '../utils/req';


let basicUrl = '/schoolApi/grade';



// 获取班级列表
export const getGradeList = params => {
    return req(`${basicUrl}/queryGradePage?page=${params.page}&size=${params.size}&gradeType=${params.gradeType}&grade=${params.grade}&searchText=${params.searchText}`
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