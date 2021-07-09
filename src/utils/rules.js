/**
 * 表单必填规则
 * @param {*} title 
 * @returns 
 */
export function required(title) {
    return [{
        required: true,
        message: `请输入${title}`,
        trigger: "blur"
    }]
}



export function ruleUserType(type) {
    let url = '';
    switch (type) {
        case '学校管理员':
            url = '/grade';
            break;
        case '教师账号':
            url = '/teacherGrade';
            break;
        case '学生账号':
            url = '/studentArchives/studentArchives';
            break;
    }
    return url;
}

