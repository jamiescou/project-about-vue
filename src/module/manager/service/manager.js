// 企业管理模块js  *cl**/
/*eslint-disable */
import CFCATools from 'common/javascript/features/cfca'
import arrayTools from 'common/javascript/tools/arrayTools.js'
import Vue from 'vue'

const vue = new Vue()
const manager = {
  // blob签名
  blobSign (hash, blob, baseUrl, callback) {
    let param = {}
    param.hash = hash
    let byteArray = arrayTools.Str2Bytes(blob)
    blob =  String.fromCharCode.apply(String, byteArray)
    // var blob1 = [
    //   10,46,97,48,48,49,53,51,49,50,48,100,49,53,56,99,101,50,50,55,100,49,56,57,54,99,99,98,49,53,52,97,99,50,99,54,56,102,52,102,56,51,52,97,51,56,49,50,16,-127,2,34,106,8,5,18,46,97,48,48,52,97,100,50,50,52,55,56,48,52,56,99,49,56,48,49,56,52,48,52,97,53,50,52,101,98,48,101,48,48,101,98,52,102,48,100,55,54,101,53,55,48,52,82,54,8,3,18,50,10,46,97,48,48,49,54,102,98,102,100,48,51,50,51,100,53,51,57,100,98,102,48,48,55,97,49,54,48,102,50,52,48,55,98,56,99,99,55,97,100,102,97,52,55,51,51,99,16,3,34,68,8,6,18,46,97,48,48,52,97,100,50,50,52,55,56,48,52,56,99,49,56,48,49,56,52,48,52,97,53,50,52,101,98,48,101,48,48,101,98,52,102,48,100,55,54,101,53,55,48,52,90,16,34,2,8,3,34,2,8,1,34,2,8,4,34,2,8,2,42,4,55,98,55,100
    // ]
    // blob1 =  String.fromCharCode.apply(String, blob1)
    param.sign = CFCATools.defaultSign(blob)

    let url = baseUrl + '/transaction/submit'
    let result = vue.$http.post(url, param, response => {
      callback(response.data)
    })
    return result
  }
}

export default manager
