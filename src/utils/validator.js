// ---------------------常用的正则表达式-----------------------
// 匹配中文字符
export const chineseWorldReg = /[\u4e00-\u9fa5]/gm

// 只能输入数字
export const numReg = /^\d+$/

// 只能输入英文
export const EnglishWordReg = /^[a-z]+$/i

// 只能输入数字、英文
export const numEnglishWordReg = /^[a-z0-9]+$/i

// 只能由数字、英文、下划线组成
export const variableReg = /^\w+$/

// 匹配手机号码
export const phoneReg = /^(1[3456789])[0-9]{9}$/

// 匹配手机与座机号
export const telReg = /(^((0|86|17951)?)?(1[3456789])[0-9]{9}$)|(^(\d3,4|\d{3,4}\-)?\d{7,8}$)/

// 匹配URL地址

export const urlReg = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i

// 匹配身份证号
export const IdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/

// 校验金额只能输入最多两位小数的数字
export const numberFixed2 = /^((0{1}\.\d{1,2})|([0-9]\d*\.{1}\d{1,2})|([0-9]+\d*))$/

// 校验数量只能输入最多3位小数的数字
export const numberFixed3 = /^((0{1}\.\d{1,3})|([1-9]\d*\.{1}\d{1,3})|([1-9]+\d*))$/

// 校验金额只能输入最多4位小数的数字
export const numberFixed4 = /^((0{1}\.\d{1,4})|([1-9]\d*\.{1}\d{1,4})|([1-9]+\d*))$/

// 通用校验18位
export const unionReg18 = /^\S(.{0,16}\S)?$/

// 通用校验20位
export const unionReg20 = /^\S(.{0,18}\S)?$/

// 通用校验40位
export const unionReg40 = /^\S(.{0,38}\S)?$/

// 通用校验80位
export const unionReg80 = /^\S(.{0,78}\S)?$/

// 文本校验规则
export const textareaReg = /^[\u4e00-\u9fa5a-zA-Z]{0,200}$/

// 不能有空格
export const spaceReg = /^[^\s]*$/
