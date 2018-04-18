import Vue from 'vue'
import dateTools from 'common/javascript/tools/dateTools'
/* 过滤器 start */
// 时间戳转时间，具体到天
Vue.filter('timestampToDay', function (value) {
  var time = new Date(parseInt(value))
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  y = isNaN(y) ? '0000' : y
  m = isNaN(m) ? '00' : m
  d = isNaN(d) ? '00' : d
  return y + '.' + m + '.' + d
})
// 时间戳转时间，具体到天
Vue.filter('timestampToDateDay', function (value) {
  return dateTools.dateFormater(value, 'YYYY.MM.DD')
})
// 时间戳转时间
Vue.filter('timestampToDate', function (value) {
  var time = new Date(parseInt(value))
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  var h = time.getHours() + ''
  var mm = time.getMinutes() + ''
  var s = time.getSeconds() + ''

  if (h.length === 1) {
    h = '0' + h
  }
  if (mm.length === 1) {
    mm = '0' + mm
  }
  if (s.length === 1) {
    s = '0' + s
  }
  y = isNaN(y) ? '0000' : y
  m = isNaN(m) ? '00' : m
  d = isNaN(d) ? '00' : d
  h = isNaN(h) ? '00' : h
  mm = isNaN(mm) ? '00' : mm
  s = isNaN(s) ? '00' : s
  return y + '.' + m + '.' + d + ' ' + h + ':' + mm + ':' + s
})
// 时间戳转换为精确到秒
Vue.filter('timestampToDateStyle', function (value) {
  return dateTools.dateFormater(value, 'YYYY.MM.DD HH:mm:ss')
})
// 千分位+小数点后两位 + 缩小times倍
Vue.filter('moneyShow', function (value, times) {
  value = isNaN(value) || value === null || typeof value === 'undefined' ? '' : value
  if (value !== '') {
    times = times || 1
    var res = Vue.$moneyt.moneyShow(value / times)
  }
  return res
})

// 千分位显示数字
Vue.filter('commafy', function (value) {
  value = isNaN(value) || value === null || typeof value === 'undefined' ? 0 : value
  var res = Vue.$moneyt.commafy(value)
  return res
})

// 供应商编号格式化
Vue.filter('sixEnterpriseCode', function (value) {
  var no = isNaN(value) || value === null || typeof value === 'undefined' ? '0' : value + ''
  switch (no.length) {
    case 1:
      return '00000' + no
    case 2:
      return '0000' + no
    case 3:
      return '000' + no
    case 4:
      return '00' + no
    case 5:
      return '0' + no
    default:
      return no
  }
})

// 数据为空的处理
Vue.filter('dealNull', function (value) {
  if (value === '' || value === null) {
    return '无'
  } else {
    return value
  }
})

// 数据为空的处理
Vue.filter('vPaymentType', function (value) {
  if (value === 'FULL_PAYMENT') {
    return '一次性付款'
  } else {
    return '分期付款'
  }
})

function vfilter () {
}
export default vfilter
