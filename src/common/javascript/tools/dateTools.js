/**
* 日期处理函数
*/

import moment from 'moment'
import tools from 'common/javascript/tools/tools'
const dateTooles = {
  dateFormater (value, format) {
    if (tools.isString(value)) {
      value = parseInt(value)
    }
    let date = new Date(value)
    // 单参数处理
    if (arguments.length === 1) {
      date = new Date()
      format = value
    }

    if (!format) {
      format = 'YYYY-MM-DD'
    }
    return moment(date).format(format)
  },
  createDate (value) { // 创建日期
    if (tools.isString(value)) {
      value = parseInt(value)
    }
    let date = new Date(value)
    return date
  },
  stringToDate (timeStr, formatStr) { // 字符串转日期时间戳
    if (!formatStr) {
      formatStr = 'YYYY-MM-DD HH:mm:ss'
    }
    const date = moment(timeStr, formatStr)
    if (!date.isValid()) {
      return null
    } else {
      return date.valueOf()
    }
  },
  getDateObject (timeStr, formatStr) { // 字符串转日期
    if (!formatStr) {
      formatStr = 'YYYY-MM-DD HH:mm:ss'
    }
    const date = moment(timeStr, formatStr)
    if (!date.isValid()) {
      return null
    } else {
      return date
    }
  },
  // 日期（2014-08-12 09:25:24）转时间戳（毫秒级）
  dateTotimestamp (date) {
    var str = date.trim().replace(/-/g, ':').replace(' ', ':')
    var arr = str.split(':')
    return Date.parse(new Date(arr[0], (arr[1] - 1), arr[2], arr[3], arr[4], arr[5]))
  }
}
export default dateTooles
