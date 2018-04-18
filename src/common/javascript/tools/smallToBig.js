/**
*数字小写转大写
*/
// function smallToBig (n) {
//   if (n < 0) return ''
//   if (!n || n === '' || isNaN(n)) return ''
//   var fraction = ['角', '分']
//   var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
//   var unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']]
//   var head = n < 0 ? '欠' : ''
//   n = Math.abs(n)
//
//   var s = ''
//
//   for (let i = 0; i < fraction.length; i++) {
//     s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
//   }
//   s = s || '整'
//   n = Math.floor(n)
//
//   for (let i = 0; i < unit[0].length && n > 0; i++) {
//     var p = ''
//     for (var j = 0; j < unit[1].length && n > 0; j++) {
//       p = digit[n % 10] + unit[1][j] + p
//       n = Math.floor(n / 10)
//     }
//     s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
//   }
//   return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')
// }
/*eslint-disable */
function smallToBig(num) {
    ///<summery>小写金额转化大写金额</summery>
    ///<param name=num type=number>金额</param>
      if (num < 0) return ''
      if (num === 0 || num === 0.0 || num === 0.00) return '零'
      if (!num || num === '' || isNaN(num)) return ''
    const reg = /^\d+(\.\d{1,2})?$/
    if (!reg.test(num)) {
      return '无效数值！'
    }
    if(isNaN(num))return "无效数值！";
    var strPrefix="";
    if(num<0)strPrefix ="(负)";
    num=Math.abs(num);
    if(num>999999999.99)return "无效数值！";
    var strOutput = "";
    var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
    var strCapDgt='零壹贰叁肆伍陆柒捌玖';
    num += "00";
    var intPos = num.indexOf('.');
    if (intPos >= 0){
        num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
    }
    strUnit = strUnit.substr(strUnit.length - num.length);
    for (var i=0; i < num.length; i++){
        strOutput += strCapDgt.substr(num.substr(i,1),1) + strUnit.substr(i,1);
    }
    return strPrefix+strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元");
};
export default smallToBig
