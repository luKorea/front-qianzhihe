import {req} from '../../utils/req';


let basicUrl = '/biz/teacher';



// 获取教师列表
export const getTeacherList = params => {
    return req(`${basicUrl}/queryTeacherPage?page=${params.page}&size=${params.size}&teacherType=${params.teacherType}&grade=${params.grade}&queryOrTeacherNameOrPhone=${params.queryOrTeacherNameOrPhone}`
    )
}


// 新增教师
export const addTeacher = params => {
    return req(`${basicUrl}/create`, params, 'POST')
}


// 更新教师
export const updateTeacher = params => {
    return req(`${basicUrl}/update`, params, 'PUT')
}

// 删除教师
export const deleteTeacher = params => {
    return req(`${basicUrl}/delete`)
}


// 获取编辑信息
export const getEditInfo = teacherId => {
    return req(`${basicUrl}/queryTeacherUpdateInfo?teacherId=${teacherId}`)
}

// 查看老师信息
export const getTeacherInfo = params => {
    return req(`${basicUrl}/queryExamineTeacherInfo?page=${params.page}&size=${params.size}&teacherId=${params.teacherId}`)
}