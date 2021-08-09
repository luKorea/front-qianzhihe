import {req} from "../../utils/req";



// 获取学生信息
export const getInfo = () => {
    return req(`/biz/myFiles/queryMyFilesUserInfo`)
}


// 获取学生选科征集信息
export const getCourseSelection = () => {
    return req(`/biz/myFiles/queryUserCourseSelection`)
}

// 修改学生信息
export const editInfo = params => {
    return req(`/biz/myFiles/update`, params, 'PUT')
}
