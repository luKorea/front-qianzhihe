import {req} from "../../utils/req";


let basicUrl = '/biz/evaluation'


// 兴趣测试结果类型
export const getEvaluationType = type => {
    return req(`${basicUrl}/getEvaluationInfo?type=${type}`)
}


// 获取学生测评记录列表
export const getStudentEvaluationList = params => {
    return req(`${basicUrl}/getUserEvaluationList?page=${params.page}&searchText=${params.searchText}&size=${params.size}&type=${params.type}&graduate=${params.graduate}`)
}
// 获取测评结果
export const getEvaluationDetails = params => {
    return req(`${basicUrl}/getUserHollandResult?hollandId=${params.hollandId}&type=${params.type}`)
}


// 测试Id查询结果推荐专业
export const getEvaluationMajor = params => {
    return req(`${basicUrl}/getHollandOccupationProfession?hollandId=${params.hollandId}&type=${params.type}`)
}