import {req} from '../utils/req';


let basicUrl = '/schoolApi/teacher';



// 获取教师列表
export const getTeacherList = params => {
    return req(`${basicUrl}/queryTeacherPage?page=${params.page}&size=${params.size}&teacherType=${params.teacherType}&grade=${params.grade}&queryOrTeacherNameOrPhone=${params.queryOrTeacherNameOrPhone}`
    )
}


// 新增教师
export const addTeacher = params => {
    return req(`${basicUrl}/create?name=${params.name}&password=${params.password}&phone=${params.phone}&teacherType=${params.teacherType}&username=${params.username}`, '', 'POST'
    )
}

// 获取编辑信息
export const getEditInfo = teacherId => {
    return req(`${basicUrl}/queryTeacherUpdateInfo?teacherId=${teacherId}`)
}

// 查看老师信息
export const getTeacherInfo = params => {
    return req(`${basicUrl}/queryExamineTeacherInfo?page=${params.page}&size=${params.size}&teacherId=${params.teacherId}`)
}