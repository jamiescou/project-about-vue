/**
*字符串工具类
*/

const stringTooles = {
  cellContentSub (value) {
    if (!value) {
      return '无'
    }
    const length = 10
    if (value.length > 10) {
      return value.substring(0, length) + '...'
    }
    return value
  },
  // 编号不够6位自动补全
  completeNo (val) {
    let value = val.toString()
    if (val === 0) {
      value = null
    } else {
      while (value.length < 6) {
        value = '0' + value
      }
    }
    return value
  }
}
export default stringTooles
