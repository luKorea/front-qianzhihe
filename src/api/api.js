// this file may be overwrite by api code builder, don't change it. Go to api.config.json to config output file
// 本文件可能会被 api code builder 重写覆盖，请勿修改它。配置 api.config.json 来修改生成文件
/* eslint-disable */
import axios from '@/utils/req.js'

if (!axios.defaults.baseURL)
  axios.defaults.baseURL = '/'

export default {
  company: {
    /**
     * 充值金额
     * @param {any} data
     */
    postAddBalance(data, axiosConfig) {
      const method = 'post'
      return axios('/company/addBalance', { method, data, ...axiosConfig })
    },
    /**
     * 增加公司
     * @param {any} data
     */
    postAddCompany(data, axiosConfig) {
      const method = 'post'
      return axios('/company/addCompany', { method, data, ...axiosConfig })
    },
    /**
     * 根据公司ID删除公司
     * @param {{ companyId?: number }} params
     */
    getDeleteCompanyId(params, axiosConfig) {
      const method = 'get'
      return axios('/company/deleteCompanyId', { method, params, ...axiosConfig })
    },
    /**
     * 导出商家信息
     * @param {{ map: any }} params
     */
    getDeriveExcel(params, axiosConfig) {
      const method = 'get'
      return axios('/company/deriveExcel', { method, params, ...axiosConfig })
    },
    /**
     * 导入商家信息
     * @param {{ file?: any }} formData
     */
    postExcelCompany(formData, axiosConfig) {
      const method = 'post'
      const data = new FormData()
      Object.entries(formData).forEach(([name, value]) => {
        if (value === undefined) return
        if (value instanceof Array)
          value.forEach(value => data.append(name, value))
        else
          data.append(name, value)
      })
      return axios('/company/excelCompany', { method, data, ...axiosConfig })
    },
    /**
     * 根据用户输入的天数取出所有符合条件的订单
     * @param {{ bicId: string, time: string }} params
     */
    getFindDayOrder(params, axiosConfig) {
      const method = 'get'
      return axios('/company/findDayOrder', { method, params, ...axiosConfig })
    },
    /** 查询所有公司 */
    getGetAll(axiosConfig) {
      const method = 'get'
      return axios('/company/getAll', { method, ...axiosConfig })
    },
    /**
     * 查询公司列表（分页）
     * @param {any} data
     */
    postGetCompany(data, axiosConfig) {
      const method = 'post'
      return axios('/company/getCompany', { method, data, ...axiosConfig })
    },
    /**
     * 调减余额
     * @param {any} data
     */
    postSubBalance(data, axiosConfig) {
      const method = 'post'
      return axios('/company/subBalance', { method, data, ...axiosConfig })
    },
    /**
     * 修改公司信息
     * @param {any} data
     */
    postUpdateCompany(data, axiosConfig) {
      const method = 'post'
      return axios('/company/updateCompany', { method, data, ...axiosConfig })
    }
  },
  control: {
    /** 获取当前用户的权限列表 */
    getGetControl(axiosConfig) {
      const method = 'get'
      return axios('/control/getControl', { method, ...axiosConfig })
    }
  },
  excelTask: {
    /**
     * 获取商家导入错误信息
     * @param {{ taskId: string }} params
     */
    getGetCompanyExcelTaskErrList(params, axiosConfig) {
      const method = 'get'
      return axios('/excelTask/getCompanyExcelTaskErrList', { method, params, ...axiosConfig })
    },
    /**
     * 获取获取商家导入任务列表
     * @param {{ pageNum: string, pageSize: string, type: string }} params
     */
    getGetCompanyExcelTaskList(params, axiosConfig) {
      const method = 'get'
      return axios('/excelTask/getCompanyExcelTaskList', { method, params, ...axiosConfig })
    },
    /**
     * 获取订单导入错误信息
     * @param {{ taskId: string }} params
     */
    getGetOrderExcelTaskErrList(params, axiosConfig) {
      const method = 'get'
      return axios('/excelTask/getOrderExcelTaskErrList', { method, params, ...axiosConfig })
    },
    /**
     * 获取订单导入任务列表
     * @param {{ pageNum: string, pageSize: string, type: string }} params
     */
    getGetOrderExcelTaskList(params, axiosConfig) {
      const method = 'get'
      return axios('/excelTask/getOrderExcelTaskList', { method, params, ...axiosConfig })
    },
    /**
     * 获取质检导入错误信息
     * @param {{ taskId: string }} params
     */
    getGetQualityTestingExcelTaskErrList(params, axiosConfig) {
      const method = 'get'
      return axios('/excelTask/getQualityTestingExcelTaskErrList', { method, params, ...axiosConfig })
    },
    /**
     * 获取质检导入任务列表
     * @param {{ pageNum: string, pageSize: string, type: string }} params
     */
    getGetQualityTestingExcelTaskList(params, axiosConfig) {
      const method = 'get'
      return axios('/excelTask/getQualityTestingExcelTaskList', { method, params, ...axiosConfig })
    }
  },
  exportTask: {
    /**
     * 获取商家导出任务列表
     * @param {{ pageNum: string, pageSize: string, type: string }} params
     */
    getGetCompanyExportTaskList(params, axiosConfig) {
      const method = 'get'
      return axios('/exportTask/getCompanyExportTaskList', { method, params, ...axiosConfig })
    },
    /**
     * 获取订单导出任务列表
     * @param {{ pageNum: string, pageSize: string, type: string }} params
     */
    getGetOrderExportTaskList(params, axiosConfig) {
      const method = 'get'
      return axios('/exportTask/getOrderExportTaskList', { method, params, ...axiosConfig })
    },
    /**
     * 获取质检导出任务列表
     * @param {{ pageNum: string, pageSize: string, type: string }} params
     */
    getGetQualityTestingExportTaskList(params, axiosConfig) {
      const method = 'get'
      return axios('/exportTask/getQualityTestingExportTaskList', { method, params, ...axiosConfig })
    }
  },
  logCompany: {
    /**
     * 根据日期查询快递
     * @param {any} data
     */
    postGetOrderByDayAndbicId(data, axiosConfig) {
      const method = 'post'
      return axios('/logCompany/getOrderByDayAndbicId', { method, data, ...axiosConfig })
    },
    /**
     * 根据日期查询质检
     * @param {any} data
     */
    postGetQualityTestingByDayAndbicName(data, axiosConfig) {
      const method = 'post'
      return axios('/logCompany/getQualityTestingByDayAndbicName', { method, data, ...axiosConfig })
    },
    /**
     * 查询日志
     * @param {any} data
     */
    postGetTopUpLog(data, axiosConfig) {
      const method = 'post'
      return axios('/logCompany/getTopUpLog', { method, data, ...axiosConfig })
    },
    /**
     * orderStatistics
     * @param {{ bicId?: string, pageNum?: number, pageSize?: number }} params
     */
    getOrderStatistics(params, axiosConfig) {
      const method = 'get'
      return axios('/logCompany/orderStatistics', { method, params, ...axiosConfig })
    }
  },
  myCompany: {
    /**
     * 导出商家信息
     * @param {{ map: any }} params
     */
    getDeriveExcel(params, axiosConfig) {
      const method = 'get'
      return axios('/myCompany/deriveExcel', { method, params, ...axiosConfig })
    },
    /**
     * 根据用户输入的天数取出所有符合条件的订单
     * @param {{ time: string }} params
     */
    getFindDayOrder(params, axiosConfig) {
      const method = 'get'
      return axios('/myCompany/findDayOrder', { method, params, ...axiosConfig })
    },
    /** 查询我的公司 */
    postGetCompany(axiosConfig) {
      const method = 'post'
      return axios('/myCompany/getCompany', { method, ...axiosConfig })
    },
    /**
     * 获取导出列表
     * @param {{ pageNum: string, pageSize: string, type: string }} params
     */
    getGetExportTaskList(params, axiosConfig) {
      const method = 'get'
      return axios('/myCompany/getExportTaskList', { method, params, ...axiosConfig })
    },
    /**
     * 根据日期查询快递
     * @param {any} data
     */
    postGetOrderByDayAndbicId(data, axiosConfig) {
      const method = 'post'
      return axios('/myCompany/getOrderByDayAndbicId', { method, data, ...axiosConfig })
    },
    /**
     * 根据日期查询质检
     * @param {any} data
     */
    postGetQualityTestingByDayAndbicName(data, axiosConfig) {
      const method = 'post'
      return axios('/myCompany/getQualityTestingByDayAndbicName', { method, data, ...axiosConfig })
    },
    /**
     * 我的查询充值/调减记录
     * @param {any} data
     */
    postGetTopUpLog(data, axiosConfig) {
      const method = 'post'
      return axios('/myCompany/getTopUpLog', { method, data, ...axiosConfig })
    },
    /**
     * 使用记录
     * @param {{ pageNum?: number, pageSize?: number }} params
     */
    getOrderStatistics(params, axiosConfig) {
      const method = 'get'
      return axios('/myCompany/orderStatistics', { method, params, ...axiosConfig })
    }
  },
  myOrder: {
    /**
     * 导出订单信息
     * @param {{ map: any }} params
     */
    getExportOrder(params, axiosConfig) {
      const method = 'get'
      return axios('/myOrder/exportOrder', { method, params, ...axiosConfig })
    },
    /**
     * 获取导出列表
     * @param {{ pageNum: string, pageSize: string, type: string }} params
     */
    getGetExportTaskList(params, axiosConfig) {
      const method = 'get'
      return axios('/myOrder/getExportTaskList', { method, params, ...axiosConfig })
    },
    /**
     * 查询订单
     * @param {any} data
     */
    postGetOrder(data, axiosConfig) {
      const method = 'post'
      return axios('/myOrder/getOrder', { method, data, ...axiosConfig })
    }
  },
  myQuelityTesting: {
    /**
     * 导出质检费信息
     * @param {{ map: any }} params
     */
    getExportQualityTesting(params, axiosConfig) {
      const method = 'get'
      return axios('/myQuelityTesting/exportQualityTesting', { method, params, ...axiosConfig })
    },
    /**
     * 获取列表
     * @param {{ pageNum: string, pageSize: string, type: string }} params
     */
    getGetExportTaskList(params, axiosConfig) {
      const method = 'get'
      return axios('/myQuelityTesting/getExportTaskList', { method, params, ...axiosConfig })
    },
    /**
     * 查询质检费
     * @param {any} data
     */
    postGetQualityTesting(data, axiosConfig) {
      const method = 'post'
      return axios('/myQuelityTesting/getQualityTesting', { method, data, ...axiosConfig })
    }
  },
  order: {
    /**
     * 导入订单信息
     * @param {{ file?: any }} formData
     */
    postExcelOrder(formData, axiosConfig) {
      const method = 'post'
      const data = new FormData()
      Object.entries(formData).forEach(([name, value]) => {
        if (value === undefined) return
        if (value instanceof Array)
          value.forEach(value => data.append(name, value))
        else
          data.append(name, value)
      })
      return axios('/order/excelOrder', { method, data, ...axiosConfig })
    },
    /**
     * 导出订单信息
     * @param {{ map: any }} params
     */
    getExportOrder(params, axiosConfig) {
      const method = 'get'
      return axios('/order/exportOrder', { method, params, ...axiosConfig })
    },
    /**
     * 查询订单
     * @param {any} data
     */
    postGetOrder(data, axiosConfig) {
      const method = 'post'
      return axios('/order/getOrder', { method, data, ...axiosConfig })
    }
  },
  quelityTesting: {
    /**
     * 导入质检信息
     * @param {{ file?: any }} formData
     */
    postExcelOrder(formData, axiosConfig) {
      const method = 'post'
      const data = new FormData()
      Object.entries(formData).forEach(([name, value]) => {
        if (value === undefined) return
        if (value instanceof Array)
          value.forEach(value => data.append(name, value))
        else
          data.append(name, value)
      })
      return axios('/quelityTesting/excelOrder', { method, data, ...axiosConfig })
    },
    /**
     * 导出订单信息
     * @param {{ map: any }} params
     */
    getExportQualityTesting(params, axiosConfig) {
      const method = 'get'
      return axios('/quelityTesting/exportQualityTesting', { method, params, ...axiosConfig })
    },
    /**
     * 查询质检费
     * @param {any} data
     */
    postGetQualityTesting(data, axiosConfig) {
      const method = 'post'
      return axios('/quelityTesting/getQualityTesting', { method, data, ...axiosConfig })
    }
  },
  role: {
    /**
     * 新增角色
     * @param {any} data
     */
    postAddRole(data, axiosConfig) {
      const method = 'post'
      return axios('/role/addRole', { method, data, ...axiosConfig })
    },
    /**
     * 删除角色
     * @param {{ roleId?: number }} params
     */
    getDeRoleByUId(params, axiosConfig) {
      const method = 'get'
      return axios('/role/deRoleByUId', { method, params, ...axiosConfig })
    },
    /**
     * 查询角色列表（分页）
     * @param {{ pageNum?: number, pageSize?: number, roleName?: string }} params
     */
    getFindAll(params, axiosConfig) {
      const method = 'get'
      return axios('/role/findAll', { method, params, ...axiosConfig })
    },
    /**
     * findByRId
     * @param {{ id?: number }} params
     */
    getFindByRId(params, axiosConfig) {
      const method = 'get'
      return axios('/role/findByRId', { method, params, ...axiosConfig })
    },
    /** findControl */
    getFindControl(axiosConfig) {
      const method = 'get'
      return axios('/role/findControl', { method, ...axiosConfig })
    },
    /**
     * findOtherByRId
     * @param {{ id?: number }} params
     */
    getFindOtherByRId(params, axiosConfig) {
      const method = 'get'
      return axios('/role/findOtherByRId', { method, params, ...axiosConfig })
    },
    /**
     * 角色关联权限
     * @param {any} data
     */
    postRoleRelevanceCon(data, axiosConfig) {
      const method = 'post'
      return axios('/role/roleRelevanceCon', { method, data, ...axiosConfig })
    },
    /**
     * updateRole
     * @param {any} data
     */
    postUpdateRole(data, axiosConfig) {
      const method = 'post'
      return axios('/role/updateRole', { method, data, ...axiosConfig })
    },
    /**
     * 用户关联角色
     * @param {any} data
     */
    postUserRelevanceRole(data, axiosConfig) {
      const method = 'post'
      return axios('/role/userRelevanceRole', { method, data, ...axiosConfig })
    }
  },
  user: {
    /**
     * 新增用户
     * @param {any} data
     */
    postAddUser(data, axiosConfig) {
      const method = 'post'
      return axios('/user/addUser', { method, data, ...axiosConfig })
    },
    /**
     * 根据用户编号删除用户
     * @param {{ uId: string }} params
     */
    getDeleteUserById(params, axiosConfig) {
      const method = 'get'
      return axios('/user/deleteUserById', { method, params, ...axiosConfig })
    },
    /**
     * 查询用户下拥有所有角色
     * @param {{ uId?: string }} params
     */
    getFindByRole(params, axiosConfig) {
      const method = 'get'
      return axios('/user/findByRole', { method, params, ...axiosConfig })
    },
    /**
     * 查询用户没有的角色
     * @param {{ uId?: string }} params
     */
    getFindOtherRole(params, axiosConfig) {
      const method = 'get'
      return axios('/user/findOtherRole', { method, params, ...axiosConfig })
    },
    /**
     * 查询用户列表
     * @param {any} data
     */
    postGetUser(data, axiosConfig) {
      const method = 'post'
      return axios('/user/getUser', { method, data, ...axiosConfig })
    },
    /**
     * 用户登录
     * @param {any} data
     */
    postLogin(data, axiosConfig) {
      const method = 'post'
      return axios('/user/login', { method, data, ...axiosConfig })
    },
    /**
     * 修改用户信息
     * @param {any} data
     */
    postUpdateUser(data, axiosConfig) {
      const method = 'post'
      return axios('/user/updateUser', { method, data, ...axiosConfig })
    }
  }
}

/**
 * @typedef Result
 * @property {number} [code] 错误码
 * @property {any} [data] 数据
 * @property {boolean} flag 是否成功
 * @property {string} [message] 提示信息
 */
