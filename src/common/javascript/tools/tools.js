const gettype = Object.prototype.toString
const tools = {
  protocol: 'http',
  getUrl () { // 获取域名
    const url = document.location.href
    let path = url.split('//')[1]
    let result = path.substring(0, path.indexOf('/'))
    return url.split('//')[0] + '//' + result
  },
  isString (o) {
    return gettype.call(o) === '[object String]'
  },
  isNumber (o) {
    return gettype.call(o) === '[object Number]'
  },
  // 是否为正整数
  isPositiveInteger (value) {
    var patrn = /^(-)?\d+(\.\d+)?$/
    if (patrn.exec(value) === null || value === '') {
      return false
    } else {
      return true
    }
  },
  isBoolean (o) {
    return gettype.call(o) === '[object Boolean]'
  },
  isObject: function (o) {
    return gettype.call(o) === '[object Object]'
  },

  isArray: function (o) {
    return gettype.call(o) === '[object Array]'
  },

  isNULL: function (o) { // 空字符串  null  undefined
    return gettype.call(o) === '[object Null]' || gettype.call(o) === '[object Undefined]' || o === ''
  },

  isUndefined: function (o) {
    return gettype.call(o) === '[object Undefined]'
  },

  isDocument: function (o) { // ?
    return gettype.call(o) === '[object Document]' || '[object HTMLDocument]'
  },
  toString (value) {
    if (this.isNumber(value)) {
      return value + ''
    }
    if (this.isObject(value) || this.isArray(value)) {
      return JSON.stringify(value)
    }
  },
  toInt (value) {
  },
  toDate (value) {
  },
  toBoolean (value) {
  }
}
export default tools
