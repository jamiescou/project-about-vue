<template>
  <el-form :model="loginForm" :rules="loginForm.rules" ref="loginFormRef" label-width="120px">
    <el-form-item label="密码" prop="newPwd">
      <el-input v-model="loginForm.newPwd" type="password" @change='newPwdChange'></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="newPwd2">
      <el-input v-model="loginForm.newPwd2" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <p class="mb10"><span class="require">*</span><span class="c999">密码为8-20位且至少2种以上的数字、字母或符号组合。</span></p>
      <el-button class="okbtn" type="primary" @click="loginFormSubmit">下一步</el-button>
    </el-form-item>
  </el-form>
</template>
<script type="text/javascript">
import 'common/css/lib/iconfont.css'
import 'common/css/lib/motherplate.css'
import 'common/sass/module/table.scss'
import 'common/sass/main.scss'
import 'common/sass/module/supplier.scss'
import formExtends from 'components/entries/base/form'
import infoManageService from 'common/api/service/infoManageService'
import cfca from 'common/javascript/features/cfca'

let instance = null
export default formExtends({
  name: 'app',
  components: {
  },
  data () {
    return {
      loginForm: {
        newPwd: null,
        newPwd2: null,
        rules: {
          newPwd: [
            { required: true, message: '必须填写', trigger: 'change' },
            {
              validator: (rule, value, callback) => {
                if (value.length < 8 || value.length > 20) {
                  callback(new Error('密码长度为8-20位'))
                }

                if (instance.regular.num.test(value) || instance.regular.word.test(value)) {
                  callback('密码包含数字、字母和字符中最少两种的组合！')
                }

                if (!(instance.regular.nonNum.test(value) || instance.regular.nonWord.test(value))) {
                  callback('密码包含数字、字母和字符中最少两种的组合！')
                }
                // if (!instance.regular.password.test(value)) {
                //   callback('密码是数字和字母组合')
                // }
                callback()
              },
              trigger: 'change'
            }
          ],
          newPwd2: [
            { required: true, message: '必须填写', trigger: 'change' },
            {
              validator: (rule, value, callback) => {
                if (instance.loginForm.newPwd !== instance.loginForm.newPwd2) {
                  callback('两次密码输入不一致')
                }
                callback()
              },
              trigger: 'change'
            }
          ]
        }
      }
    }
  },
  mounted () {
    this.$refs.loginFormRef.resetFields()
    instance = this
  },
  beforeDestroy () {
    this.$refs.loginFormRef.resetFields()
  },
  methods: {
    newPwdChange (value) {
      // 先输入确认新密码，再输入新密码 - 校验
      if (instance.loginForm.newPwd2) {
        instance.$refs.loginFormRef.validateField('newPwd2', (valid) => {})
      }
    },
    loginFormSubmit () {
      const self = this
      let dn = sessionStorage.issuerDn
      if (dn === 'null' || dn === null || dn === '' || dn === undefined) {
        this.$message.error('请先绑定证书！')
      } else {
        self.$refs.loginFormRef.validate((valid) => {
          if (valid) {
            // cfca.selectCert()
            cfca.selectCert('', '', '', false)
            const info = cfca.getInfo()
            var param = {
              issuerDn: info.issuerDN,
              serialNo: info.serialNumber,
              modifyParam: {
                newPwd: self.loginForm.newPwd,
                oldPwd: 'a1b2c3d4'
              }
            }
            param.originalStr = param.modifyParam
            param.signStr = this.sign(JSON.stringify(param.modifyParam))
            infoManageService.modifyLoginPassword.remote(param, (data) => {
              if (data.data) {
                this.$bus.$emit('set-login', 2)
              }
            })
          }
        })
      }
    }
  }
})
</script>
