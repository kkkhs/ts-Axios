import Axios from './core/Axios'
import { extend } from './helpers/util'
import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from './types'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

// 创建混合对象(对象是一个函数，且要包括 Axios 类的所有原型属性和实例属性)
function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config) // 既拥有.get等类中方法
  const instance = Axios.prototype.request.bind(context) // 又可以直接使用request()方法
  // 加bind的原因:因为Axios有this的使用

  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config!))
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

export default axios
