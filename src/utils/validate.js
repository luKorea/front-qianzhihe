export const validateCode = (rule, value, callback) => !value ? callback(new Error('请输入图形验证码')) : callback();
export const validateUsername = (rule, value, callback) => !value ? callback(new Error('用户名不能为空')) : callback();
export const validatePassword = (rule, value, callback) => !value ? callback(new Error('密码不能为空')) : callback();
export const validateTeacherName = (rule, value, callback) => !value ? callback(new Error('教师名不能为空')) : callback();
export const validateTeacherType = (rule, value, callback) => !value ? callback(new Error('教师类型不能为空')) : callback();
export const validatePhone = (rule, value, callback) => {
  if (!value) {
     callback(new Error('手机号码不能为空'))
  }
  /^1[3-9]\d{9}$/.test(value) ? callback() : callback(new Error('手机号码格式不正确'))
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
