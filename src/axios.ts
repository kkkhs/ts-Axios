import Axios from './core/Axios'
import { extend } from './helpers/util'
import { AxiosInstance } from './types'

// 创建混合对象(对象是一个函数，且要包括 Axios 类的所有原型属性和实例属性)
function createInstance(): AxiosInstance {
  const context = new Axios() // 既拥有.get等类中方法
  const instance = Axios.prototype.request.bind(context) // 又可以直接使用request()方法
  // 加bind的原因:因为Axios有this的使用

  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
