import {req} from '../../utils/req';


// 职业搜索接口
export const searchOccupation = params => {
    return req(`/schoolApi/occupationMenu/getOccupationSearch?page=${params.page}&size=${params.size}&occupationName=${params.keywords}`)
}


// 专业搜索接口
export const searchMajor = params => {
    return req(`/schoolApi/professional/getProfessionalSearch?page=${params.page}&size=${params.size}&name=${params.keywords}`)
}


// 院校搜索接口
export const searchUniversities = params => {
    return req(`/schoolApi/academy/getAcademySearch?page=${params.page}&size=${params.size}&name=${params.keywords}`)
}

// 下拉筛选数据
/**
 * dictType: {班级类型 gradeType / 年级 grade / 教师 teacherType /测试 test / 年份 vintage}
 */
export const selectTypeList = dictType => {
    return req(`/schoolApi/dictDetail?dictType=${dictType}`)
}


// 班级列表筛选
export const selectClassList = () => {
    return req(`/schoolApi/grade/getStudentGradeScreenList`)
}

// 班主任，生涯导师下拉数据获取
export const selectTeacherOrTutorList = () => {
    return req('/schoolApi/teacher/queryTeacherList')
}