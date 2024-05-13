import { isPlainObject } from './util'

// 规范 HeaderName 键大写
function normalzeHeaderName(headers: any, normalzedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalzedName && name.toUpperCase() === normalzedName.toUpperCase()) {
      headers[normalzedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalzeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}
