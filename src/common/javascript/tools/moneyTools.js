/*eslint-disable */
/**
*金额处理工具
*/
/**
 * 数字格式转换成千分位
 * @param{Object}num
 */

// 金额处理：扩大times倍传给后台，缩小times倍后显示
 var times = 10000

 function commafy(num){
   if((num+"").trim()==""){
    return"";
   }
   if(isNaN(num)){
    return num;
   }
   num = num+"";
   if(/^.*\..*$/.test(num)){
    var pointIndex =num.lastIndexOf(".");
    var intPart = num.substring(0,pointIndex);
    var pointPart =num.substring(pointIndex+1,num.length);
      intPart = intPart +"";
     var re =/(-?\d+)(\d{3})/
     while(re.test(intPart)){
      intPart =intPart.replace(re,"$1,$2")
     }
    num = intPart+"."+pointPart;
   }else{
    num = num +"";
     var re =/(-?\d+)(\d{3})/
     while(re.test(num)){
      num =num.replace(re,"$1,$2")
     }
   }
   return num;
 }

/**
 * 去除千分位
 *@param{Object}num
 */
function delcommafy(num){
  if((num+"").trim()==""){
   return"";
  }
  num = num + ''
  num=num.replace(/,/gi,'');
  return num;
}

// 金额显示处理：千分符 + 小数点后两位
function moneyShow (value) {
  if (isNaN(value) || value === '' || value === null) {
    return ''
  }
  return moneyTools.commafy(moneyTools.doubleDigit(value))
}

// 金额显示处理： 扩大times倍 + 千分符 + 小数点后两位
function moneyExpand (value) {
  if (value === '') {
    return ''
  }
  return moneyTools.delcommafy(value) * times
}

// 金额显示处理： 缩小times倍 + 千分符 + 小数点后两位
function moneyNarrow (value) {
  if (isNaN(value) || value === '') {
    return ''
  }
  return moneyTools.commafy(moneyTools.doubleDigit(value / times))
}

// 利率显示处理： 缩小times倍
function rateNarrow (value) {
  if (isNaN(value) || value === '') {
    return ''
  }
  return (value / times)
}

//金额拆分成小票的金额
function dealValue (value) {
  let sum = 11
  if (!value) return ['', '', '', '', '', '', '', '', '', '', '']
  if (!/^[0-9]+(.[0-9]{1,2})?$/.test(value)) {
    this.valueArray = []
    return
  }
  value = parseInt(accMul(parseFloat(delcommafy(value)).toFixed(2), 100))
  let array = value.toString().split('')
  let tempArray = []
  let i = 0
  while (i < sum) {
    tempArray.push('')
    i++
  }
  Array.map(array, (item, index) => {
    let l = sum - array.length + index
    tempArray[l] = item
  })
  return tempArray
}

function doubleDigit(value) {  // 保留两位小数
  if (isNaN(value) || value === '' || value === null) {
    return ''
  }
  var val = Math.round(parseFloat(value) * 100) / 100
  const num = val.toString().split('.')
  if (num.length === 1) {
    return val.toString() + '.00'
  }
  if (num.length > 1) {
    if (num[1].length < 2) {

      val = val.toString() + '0'
    }
    return val
  }
}

/*eslint-disable */
// 浮点型加减乘除
// 除法函数，用来得到精确的除法结果
// 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
// 调用：accDiv(arg1,arg2)
// 返回值：arg1除以arg2的精确结果

function accDiv (arg1, arg2) {
  let t1=0,t2=0,r1,r2;
  try {
    t1 = arg1.toString().split('.')[1].length
  } catch (e) {

  }
  try {
    t2 = arg2.toString().split('.')[1].length
  } catch (e) {

  }
  r1 = Number(arg1.toString().replace('.', ''))
  r2 = Number(arg2.toString().replace('.', ''))
  return (r1 / r2) * Math.pow(10, t2 - t1)
}
// 给Number类型增加一个div方法，调用起来更加方便。
Number.prototype.div = function (arg) {
  return accDiv(this, arg)
}

// 乘法函数，用来得到精确的乘法结果
// 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
// 调用：accMul(arg1,arg2)
// 返回值：arg1乘以arg2的精确结果
function accMul (arg1, arg2) {
  var m=0,s1=arg1.toString(),s2=arg2.toString();
  try {
    m += s1.split('.')[1].length
  } catch (e) {

  }
  try {
    m += s2.split('.')[1].length
  } catch (e) {

  }
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}
// 给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function (arg) {
  return accMul(arg, this)
}

// 加法函数，用来得到精确的加法结果
// 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
// 调用：accAdd(arg1,arg2)
// 返回值：arg1加上arg2的精确结果
function accAdd (arg1, arg2) {
var r1, r2, m
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}
// 给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function (arg) {
  return accAdd(arg, this)
}

// 减法函数，用来得到精确的减法结果
// 说明：javascript的减法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。
// 调用：accSubtr(arg1,arg2)
// 返回值：arg1减去arg2的精确结果
function accSubtr (arg1, arg2) {
var r1, r2, m, n
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
// 动态控制精度长度
  n = (r1 >= r2) ? r1 : r2
  return ((arg1 * m - arg2 * m) / m).toFixed(n)
}
// 给Number类型增加一个subtr 方法，调用起来更加方便。
Number.prototype.subtr = function (arg) {
  return accSubtr(arg, this)
}
/*eslint-enable */

const moneyTools = {
  commafy: commafy,
  delcommafy: delcommafy,
  doubleDigit: doubleDigit,
  dealValue: dealValue,
  moneyShow: moneyShow,
  accDiv: accDiv, // float 除法
  accMul: accMul, // float 乘法
  accAdd: accAdd, // float 加法
  accSubtr: accSubtr, // float 减法
  moneyExpand: moneyExpand, // 金额扩大
  moneyNarrow: moneyNarrow, // 金额缩小
  rateNarrow: rateNarrow // 比率缩小
}

export default moneyTools
