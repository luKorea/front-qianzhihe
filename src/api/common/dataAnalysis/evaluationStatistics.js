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
