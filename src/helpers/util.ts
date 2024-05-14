const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  // 谓词保护
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

// 普通对象判断
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

// 功能: from 全部拷贝到 to (使用混合类型)
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
