import {req} from '../../../utils/req';

export const getList = params => {
    return req(`/biz/courseStatistics/getCourseStatisticsList?grade=${params.grade}&graduate=${params.graduate}`)
}