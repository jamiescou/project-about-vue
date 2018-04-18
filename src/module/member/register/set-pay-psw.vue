<template>
    <el-form :model="payForm" :rules="payForm.rules" ref="payFormRef" label-width="120px">
      <el-form-item label="支付密码" prop="payNewPwd">
        <el-input v-model="payForm.payNewPwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="payNewPwd2">
        <el-input v-model="payForm.payNewPwd2" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <p class="mb10"><span class="require">*</span><span class="c999">密码为8-20位且至少2种以上的数字、字母或符号组合。</span></p>
        <el-button class="okbtn" type="primary" @click="payFormSubmit">完成</el-button>
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
import certService from 'common/api/service/certService'
import dispatch from 'module/member/service/dispatch'
import cookieTools from 'common/javascript/tools/cookieTools'

let instance = null
export default formExtends({
  name: 'app',
  components: {
  },
  data () {
    return {
      payForm: {
        payNewPwd: null,
        payNewPwd2: null,
        rules: {
          payOldPwd: { required: true, message: '必须填写', trigger: 'change' },
          payNewPwd: [
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

                callback()
              },
              trigger: 'change'
            }
          ],
          payNewPwd2: [
            { required: true, message: '必须填写', trigger: 'change' },
            {
              validator: (rule, value, callback) => {
                if (instance.payForm.payNewPwd !== instance.payForm.payNewPwd2) {
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
    this.$refs.payFormRef.resetFields()
    instance = this
  },
  beforeDestroy () {
    this.$refs.payFormRef.resetFields()
  },
  methods: {
    payFormSubmit () {
      const self = this
      self.$refs.payFormRef.validate((valid) => {
        if (valid) {
          var param = {
            payPassword: self.payForm.payNewPwd
          }
          certService.addPayPassword.remote(param, (data) => {
            if (data.data) {
              cookieTools.setCookie('step-register', 4)
              dispatch.logout()
            }
          })
        }
      })
    }
  }
})
</script>
