import {req} from '../../utils/req';


// 职业搜索接口
export const searchOccupation = params => {
    return req(`/biz/occupationMenu/getOccupationSearch?page=${params.page}&size=${params.size}&occupationName=${params.keywords}`)
}


// 专业搜索接口
export const searchMajor = params => {
    return req(`/biz/professional/getProfessionalSearch?page=${params.page}&size=${params.size}&name=${params.keywords}`)
}


// 院校搜索接口
export const searchUniversities = params => {
    return req(`/biz/academy/getAcademySearch?page=${params.page}&size=${params.size}&name=${params.keywords}`)
}

// 下拉筛选数据
/**
 * dictType: {班级类型 gradeType / 年级 grade / 教师 teacherType /测试 test / 年份 vintage}
 */
export const selectTypeList = dictType => {
    return req(`/biz/dictDetail?dictType=${dictType}`)
}


// 班级列表筛选
export const selectClassList = (grade = '') => {
    return req(`/biz/grade/getStudentGradeScreenList?grade=${grade}`)
}

// 班主任，生涯导师下拉数据获取
export const selectTeacherOrTutorList = () => {
    return req('/biz/teacher/queryTeacherList')
}