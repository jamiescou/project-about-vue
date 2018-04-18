<template>
  <el-dialog title="邀请码注册" show-close='false' close-on-click-modal='true' :before-close='closeInvit' v-model="supplierRegister" size=tiny>
    <el-form :model="inviteForm" ref = 'inviteForm' :rules="inviteRules" label-width="100px" style="width:450px;margin:0px auto;">
      <el-form-item label="邀请码" prop="invite" >
        <el-input v-model="inviteForm.invite" placeholder="请输入邀请码" style="width:200px;" @change="getRelevanceCom" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="关联企业" prop='companyName'>
        <el-input v-model="inviteForm.companyName" style="width:200px;"  :disabled='true'  auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="登录账号" prop="name">
        <el-input v-model="inviteForm.name" style="width:200px;"  placeholder="请输入登录账号" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="登录密码" prop="password">
        <el-input v-model="inviteForm.password" style="width:200px;" placeholder="请输入登录密码" type="password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="agin">
        <el-input v-model="inviteForm.agin" style="width:200px;" placeholder="请输入确认密码" type="password" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="margin:-20px auto 0px; width:180px;">
      <el-button @click="closeInvit">取 消</el-button>
      <el-button type="primary" @click="userRegister">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script type="text/javascript">
import formExtends from 'components/entries/base/form'
import certService from 'common/api/service/certService'
import merge from 'webpack-merge'

let instance = null
export default formExtends({
  name: 'registerForm',
  props: {
    supplierRegister: {
      type: Boolean,
      'default': true
    }
  },
  data () {
    return {
      inviteForm: {
        invite: '',
        enable: '',
        name: '',
        password: '',

        companyName: '',
        agin: ''
      },
      inviteRules: {
        name: [
          { required: true, message: '请填写登录账号！', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              if (value.length < 4 || value.length > 15) {
                callback('用户名长度为4到15位字符！')
              }
              if (!instance.regular.userName.test(value)) {
                callback('用户名需要字母和数字组合！')
              }
              callback()
            },
            trigger: 'change'
          },
          {
            validator: (rule, value, callback) => {
              const param = {
                name: value
              }
              if (value === '') {
                return
              }
              certService.checkUserName.remote(param, (data) => {
                if (data.data) {
                  callback('该用户名后台已存在！')
                } else {
                  callback()
                }
              })
            },
            trigger: 'blur'
          }
        ],
        invite: [
          { required: true, message: '请填写邀请码！', trigger: 'change' }
        ],
        password: [

          { required: true, message: '请填写登录密码！', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              // var reg = new RegExp(instance.regular.password)
              if (value === '') {
                return
              }
              if (value.length < 8 || value.length > 20) {
                callback('密码长度为8到20位！')
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
        agin: [
          { required: true, message: '请填写确认密码！', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              if (instance.inviteForm.password !== instance.inviteForm.agin) {
                callback('两次密码输入保持一致！')
              }
              callback()
            },
            trigger: 'change'
          }
        ],
        companyName: [
          { required: true, message: '请获取关联企业！', trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    instance = this
  },
  methods: {
    userRegister () { // 邀请码注册
      this.$refs.inviteForm.validate((valid) => {
        if (valid) {
          const param = merge({}, this.inviteForm)
          this.inviteForm = this.clearForm(this.inviteForm)
          param.enable = true
          certService.userRegister.remote(param, (data) => {
            this.checkName = data.data
            if (data.success) {
              alert('注册成功,请登录！')
              location.href = '/'
            } else {
              alert(data.erroe.errorMessage)
            }
            this.supplierRegister = false
          })
        }
      })
    },
    closeInvit () {
      this.$bus.$emit('register-close-dialog', false)
      // this.supplierRegister = false
      this.$refs.inviteForm.resetFields()
    },
    getRelevanceCom () { // 获取关联公司
      const param = merge({}, this.inviteForm)
      if (param.invite.length < 6) return
      certService.getRelevanceCom.remote(param, (data) => {
        this.inviteForm.companyName = data.data
      })
    },
    checkedAccount () { // 检测
      const param = merge({}, this.inviteForm)
      certService.checkUserName.remote(param, (data) => {
        this.checkName = data.data
      })
      return this.checkName
    }
  }
})
</script>

<style>

</style>
