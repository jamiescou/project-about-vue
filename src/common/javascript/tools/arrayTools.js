// 数组及数组对象的处理方法
/*eslint-disable */
var tableStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var table = tableStr.split("");
var atob = function (base64) {
  if (/(=[^=]+|={3,})$/.test(base64)) throw new Error("String contains an invalid character");
  base64 = base64.replace(/=/g, "");
  var n = base64.length & 3;
  if (n === 1) throw new Error("String contains an invalid character");
  for (var i = 0, j = 0, len = base64.length / 4, bin = []; i < len; ++i) {
    var a = tableStr.indexOf(base64[j++] || "A"), b = tableStr.indexOf(base64[j++] || "A");
    var c = tableStr.indexOf(base64[j++] || "A"), d = tableStr.indexOf(base64[j++] || "A");
    if ((a | b | c | d) < 0) throw new Error("String contains an invalid character");
    bin[bin.length] = ((a << 2) | (b >> 4)) & 255;
    bin[bin.length] = ((b << 4) | (c >> 2)) & 255;
    bin[bin.length] = ((c << 6) | d) & 255;
  };
  return String.fromCharCode.apply(null, bin).substr(0, bin.length + n - 4);
};

var btoa = function (bin) {
  for (var i = 0, j = 0, len = bin.length / 3, base64 = []; i < len; ++i) {
    var a = bin.charCodeAt(j++), b = bin.charCodeAt(j++), c = bin.charCodeAt(j++);
    if ((a | b | c) > 255) throw new Error("String contains an invalid character");
    base64[base64.length] = table[a >> 2] + table[((a << 4) & 63) | (b >> 4)] +
                            (isNaN(b) ? "=" : table[((b << 2) & 63) | (c >> 6)]) +
                            (isNaN(b + c) ? "=" : table[c & 63]);
  }
  return base64.join("");
};

const arrayTools = {
  // 单元素数组和对象元素数组去重
  unique: function (arr, key) {
    var n = [arr[0]];
    for (var i = 1; i < arr.length; i++) {
        if (key === undefined) {
            if (n.indexOf(arr[i]) == -1) n.push(arr[i]);
        } else {
            inner: {
                var has = false;
                for (var j = 0; j < n.length; j++) {
                    if (arr[i][key] == n[j][key]) {
                        has = true;
                        break inner;
                    }
                }
            }
            if (!has) {
                n.push(arr[i]);
            }
        }
    }
    return n;
  },
  contains : function (arr, value) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === value) {
        return true;
      }
    }
    return false;
  },
  // 删除指定value的元素
  remove : function (arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1)
    }
  },
  //十六进制字符串转字节数组
  Str2Bytes (str) {
      var pos = 0;
      var len = str.length;
      if(len %2 != 0)
      {
         return null;
      }
      len /= 2;
      var hexA = new Array();
      for(var i=0; i<len; i++)
      {
         var s = str.substr(pos, 2);
        //  var v = parseInt(s, 16);
        s = parseInt(s, 16).toString(2)
        var v = arrayTools.nosignTosign (s)
         hexA.push(v);
         pos += 2;
      }
      return hexA;
  },
  // 无符号二进制数转为有符号十进制数
  nosignTosign (value) {
    value = value.toString().split('')
    while (value.length < 8) {
      value.unshift('0')
    }
    if (value[0] === '0') {
      return parseInt(value.join(''), 2) // 整数转为十进制
    } else if (value[0] === '1') {
      value.shift() // 删除符号位
      Array.map(value, (val, i) => {
        value[i] = val === '1' ? 0 : 1
      })
      value = -(parseInt(value.join(''), 2) + 1) // 负数取反加1转为10进制
      return value
    }
  },
  hexToBase64(str) {
  return btoa(String.fromCharCode.apply(null,
    str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
  );
},

  base64ToHex(str) {
  for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
    var tmp = bin.charCodeAt(i).toString(16);
    if (tmp.length === 1) tmp = "0" + tmp;
    hex[hex.length] = tmp;
  }
  return hex.join(" ");
}
}

export default arrayTools
