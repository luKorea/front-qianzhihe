import {req} from "../../utils/req";



// 获取学生信息
export const getInfo = () => {
    return req(`/biz/myFiles/queryMyFilesUserInfo`)
}

// 修改学生信息
export const editInfo = params => {
    return req(`/biz/myFiles/update`, params, 'PUT')
}