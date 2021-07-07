import {req} from '../../../utils/req';

export const getList = params => {
    // return req(`/biz/browsingHistory/getOccupationBrowsingHistoryList?type=${params.type}`)
    return req(`/biz/browsingHistory/getOccupationBrowsingHistoryList?type=${params.type}&grade=${params.grade}&checkGraduate=${params.checkGraduate}`)
}
