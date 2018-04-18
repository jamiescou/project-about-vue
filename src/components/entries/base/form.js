// import dateTools from 'common/javascript/tools/dateTools'
// import stringTooles from 'common/javascript/tools/stringTools'
// import moneyTools from 'common/javascript/tools/moneyTools'
// import config from 'common/config/config'
// import merge from 'webpack-merge'
import cfca from 'common/javascript/features/cfca'
import config from 'common/config/config'
import merge from 'webpack-merge'
import Vue from 'vue'
const form = {
  name: 'table',
  data: {
    regular: {
      password: /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{8,20}$/,
      userName: /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{4,15}$/,
      phone: /^1\d{10}$/,
      email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
      chinese: /^[\u4e00-\u9fa5]{0,}$/,
      idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
      socialCode: /^[a-zA-Z0-9]{18}$/,  // 18位数字或字母
      taxCode: /^[a-zA-Z0-9]{15,18}$/,
      num: /^\d+$/,
      word: /^[a-zA-Z]*$/,
      mix: /^[0-9a-zA-Z]*$/,
      nonNum: /\d+/,
      nonWord: /[a-zA-Z]+/,
      contactNo: /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{1,30}$/
    },
    uploadPath: 'service/file/upload'
  },
  methods: {
    sign (source, selectedAlg, signType) { // 签名 PKCS#7 Attach PKCS#7 Detach
      return cfca.defaultSign(source)
    },
    clearForm (object) {
      for (var key in object) {
        let temp = object[key]
        if (typeof temp === 'string') {
          temp = ''
        }
      }
      return object
    },
    beforeImageUpload (file, fileList) {
      const fileType = (file.type === 'image/jpeg')
      const isLt3M = (file.size / 1024 / 1024 < 3)
      if (!fileType) {
        new Vue().$message.error('格式要求jpeg')
      }
      if (!isLt3M) {
        new Vue().$message.error('文件大小不能超过 3MB')
      }
      return fileType && isLt3M
    },
    getImagePath (id) {
      return config.imgDownUrl + id
    },

    // form所用正则校验 start **/
    phoneAndEmail (value, callback) { // 手机或邮箱
      let reg = /^1\d{10}$|^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
      if (!reg.test(value)) {
        callback(new Error('请输入正确的联系方式'))
      }
      callback()
    },
    isPhone (value, callback) { // 手机号校验
      const reg = form.data.regular.phone.test(value)
      if (!reg) {
        callback(new Error('请输入正确的手机号'))
      }
      callback()
    },
    isEmail (value, callback) { // 邮箱校验
      let reg = form.data.regular.email.test(value)
      if (!reg) {
        callback(new Error('请输入正确的邮箱'))
      }
      callback()
    },
    isChinese (value, callback) { // 中文校验
      let reg = form.data.regular.chinese.test(value)
      if (!reg) {
        callback(new Error('请输入中文'))
      }
      callback()
    },
    isCardNo (value, callback) { // 身份证号校验
      let reg = form.data.regular.idCard.test(value)
      if (!reg) {
        callback(new Error('请输入合法的身份证号'))
      }
      callback()
    },
    isSocialCode (value, callback) { // 社会统一信用代码校验
      let reg = form.data.regular.socialCode.test(value)
      if (!reg) {
        callback(new Error('必须为18位数字或字母'))
      }
      callback()
    },
    isTaxCode (value, callback) { // 社会统一信用代码校验
      return form.data.regular.taxCode.test(value)
    }
    // form所用正则校验 end **/
  }
}
function formExtends (object) {
  let oldData = object.data()
  let newData = merge(oldData, form.data)
  object.data = function () {
    return newData
  }
  object.methods = merge(object.methods, form.methods)
  return object
}

export default formExtends
