import {req} from "../../utils/req";


export const getData = params => {
    return req(`/biz/course/getCourseSelectionProfession?page=${params.page}&size=${params.size}&study_categor=${params.study_categor}&first_choice=${params.first_choice}&Re_choice=${params.Re_choice}`)
}