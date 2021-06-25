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


