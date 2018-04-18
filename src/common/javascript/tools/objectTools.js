// 对象处理工具类 cl */

const objectTools = {
  // 对象中的''替换为null
  emptyStrToNull (obj) {
    for (let val in obj) {
      if (obj[val] === '') {
        obj[val] = null
      }
    }
    return obj
  }
}
export default objectTools
