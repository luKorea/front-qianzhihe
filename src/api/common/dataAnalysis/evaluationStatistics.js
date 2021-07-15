import {req} from '../../../utils/req';


let basicUrl = '/biz/evaluationStatistics';



// 获取性格测试兴趣测试结果分布
export const getList = params => {
    return req(`${basicUrl}/getUserEvaluationResultDistribution?grade=${params.grade}&graduate=${params.graduate}&type=${params.type}`)
}


// 获取用户完成率
export const getPercentageType = params => {
    return req(`${basicUrl}/getUserEvaluationPercentage?type=${params.type}&grade=${params.grade}&graduate=${params.graduate}`)
}

// 获取推荐职业，推荐专业
export const getUserEvaluationOccupationOrProfession = params => {
    return req(`${basicUrl}/getUserEvaluationOccupationOrProfessionTop20?type=${params.type}&grade=${params.grade}&graduate=${params.graduate}`)
}