import {req} from "../../utils/req";


let basicUrl = '/biz/userEvaluationRecord'



// 兴趣测试题目提交
export const examSendToHolland = data => {
    return req(`/biz/holland/addCalculate`, data, 'POST')
}
// 兴趣测试结果推荐职业
export const getHollandOccupation = () => {
    return req(`/biz/holland/getHollandOccupation`)
}

// 性格测试题目提交
export const examSendToMbti = data => {
    return req(`/biz/quizResult/addQuizResult`, data, 'POST')
}
// 性格测试结果推荐职业
export const getMbtiOccupation = () => {
    return req(`/biz/quizResult/getPersonalityOccupation`)
}





// 兴趣测试结果类型
export const getEvaluationType = type => {
    return req(`${basicUrl}/getEvaluationInfo?type=${type}`)
}


// 获取学生测评记录列表
export const getStudentEvaluationList = params => {
    return req(`${basicUrl}/getUserEvaluationList?page=${params.page}&size=${params.size}`)
}
// 获取测评结果
export const getEvaluationDetails = params => {
    return req(`${basicUrl}/getUserHollandResult?hollandId=${params.hollandId}&type=${params.type}`)
}


// 测试Id查询结果推荐专业
export const getEvaluationMajor = params => {
    return req(`${basicUrl}/getHollandOccupationProfession?hollandId=${params.hollandId}&type=${params.type}`)
}
