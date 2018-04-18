<template>

  <div class="content-m">
      <vnav></vnav>
      <div class="out-box" style="">
        <el-row class="content">
          <el-col :span="12" style="position:relative; height:100%;">
              <div class="idea-item top-item" style="position: absolute; top: 50%; left: 170px; height: 80px; margin-top: -100px;">
                <span class="title">区块链应收账款管理平台</span>
                <span>爽爽的银行，成就您的爽爽人生</span>
              </div>
            <!-- <el-row >
              <el-col :span="16" :offset="8">
                <div class="idea-item">
                 <span class="subDis">发现、传递商业价值</span>
                 <span class="subDis">搭建、加速融合创新</span>
               </div>
              </el-col>
            </el-row>-->
          </el-col>
          <el-col  :span="12">
            <div class="info-box animation-fide-in top-item">
             <div class="title">
               <!-- <span :class="{acitve: isActice === 1}" @click="tabChange(1)" >账号登录</span><span>|</span><span :class="{acitve: isActice === 2}" @click="tabChange(2)" >证书登录</span> -->
               <span :class="{acitve: isActice === 1}" @click="tabChange(1)" >账号登录</span>
             </div>

             <div v-if="isActice===1">

               <el-form :model="form" :rules="rules" ref="ruleForm" label-width="0px">
                 <el-form-item label="" prop = 'username'>
                   <el-input v-model="form.username" placeholder="请输入注册账号信息" ></el-input>
                 </el-form-item>

                 <el-form-item label="" prop = 'password'>
                   <el-input v-model="form.password" type='password' placeholder="请输入账号密码" ></el-input>
                 </el-form-item>
               </el-form>

             </div>
              <div v-if="isActice===2">
                <!-- <div class="item" style="height:20px">
                  <input type="text"  placeholder="" name="password" v-model="signModel" class="input-login">
                </div> -->
              </div>
             <div class="forget">
              <!-- <a href="#this">忘记密码？</a> -->
             </div>
             <button class="login-button" @click="userNameLogin" style='margin-top:15px;margin-bottom:20px;'>登录</button>

             <div class="tip">
               <span>邀请码用户请前往<a  @click="getRegisterDialog" style="text-decoration:none;">注册</a></span>
               <!-- <a  class="forget-password" href="index/register.html" style="text-decoration:none;">忘记密码?</a> -->
             </div>

            </div>
          </el-col>
        </el-row>
      </div>
      <vfooter></vfooter>
      <!-- <dialogForm> </dialogForm> -->
      <component v-bind:is="register" v-bind:supplierRegister='supplierRegister'></component>

  </div>
</template>

<script>
import 'common/css/lib/iconfont.css'
import 'common/css/lib/motherplate.css'
import 'common/sass/module/index.scss'
import 'common/sass/module/account.scss'
import vnav from 'components/include/index-nav'
import left from 'components/include/left'
import vfooter from 'components/include/index-footer'
import CFCATools from 'common/javascript/features/cfca.js'
import formExtends from 'components/entries/base/form'
import certService from 'common/api/service/certService'
import authorityService from 'common/api/service/authorityService'
import accountService from 'common/api/service/accountService'
import cookieTools from 'common/javascript/tools/cookieTools'
import merge from 'webpack-merge'
import dispatch from 'module/member/service/dispatch'
import accessControl from 'common/javascript/tools/accessControl.js'
import config from 'common/config/config'

let instance = null
export default formExtends({
  name: 'app',
  components: {
    vnav,
    left,
    vfooter
    // dialogForm
  },
  data () {
    return {
      supplierRegister: false,
      checkName: false,
      register: null,
      form: {
        username: '',
        password: ''
      },
      inviteForm: {
        invite: '',
        enable: '',
        name: '',
        password: '',

        companyName: '',
        agin: ''
      },
      rules: {
        username: { required: true, message: '请填写用户名！', trigger: 'change' },
        password: { required: true, message: '请填写密码！', trigger: 'change' }
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
      },
      isActice: 1,
      tempSequenceNo: null,
      signModel: '',
      IssuerDN: ''
    }
  },
  mounted () {
    instance = this
    this.$bus.$on('register-close-dialog', (switchOpen) => {
      this.supplierRegister = switchOpen
    })
    this.form.password = ''
    const role = cookieTools.getCookie('role')
    if (role) {
      this.direct()
    }
  },
  methods: {
    login () {
      location.href = '#/'
    },
    tabChange (id, _this) { // 切换登录方式
      this.isActice = id
    },
    selectCert () {
      // if (this.signModel === '') {
      CFCATools.selectCert('', '', '', false)
      // }
      const SubjectDN = CFCATools.getCertInfo('SubjectDN')
      const IssuerDN = CFCATools.getCertInfo('IssuerDN')

      this.signModel = SubjectDN
      this.IssuerDN = IssuerDN
    },
    userNameLogin () { // 登录操作
      if (this.isActice === 1) {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            // const param = merge({}, this.form)
            // param.username = this.form.username
            // param.username = encodeURI(JSON.stringify({
            //   type: this.isActice - 1,
            //   value: this.form.username
            // }))
            // certService.userNameLogin.remote(param, (data) => {
            //   this.loginHandle(data)
            // })
            this.selectCert()
            authorityService.onece.remote({}, (info) => {
              this.tempSequenceNo = info.data
            }).then(() => {
              const param = merge({}, this.form)
              // if (this.signModel === '' || !this.signModel) {
              //   return
              // }
              const info = CFCATools.getInfo()
              const signStr = encodeURI(this.sign(this.tempSequenceNo))
              param.username = encodeURI(JSON.stringify({
                type: this.isActice - 1,
                value: this.form.username,
                serialNo: info.serialNumber,
                issuerDn: info.issuerDN,
                sequenceNo: this.tempSequenceNo,
                signStr: signStr
              }))
              certService.userNameLogin.remote(param, (data) => {
                this.loginHandle(data)
              })
            })
          }
        })
      } else {
        // this.selectCert()
        // authorityService.onece.remote({}, (info) => {
        //   this.tempSequenceNo = info.data
        // }).then(() => {
        //   const param = {}
        //   if (this.signModel === '' || !this.signModel) {
        //     return
        //   }
        //   const info = CFCATools.getInfo()
        //   param.password = encodeURI(this.sign(this.tempSequenceNo))
        //   param.username = encodeURI(JSON.stringify({
        //     type: this.isActice - 1,
        //     value: info.serialNumber,
        //     issuerDn: info.issuerDN,
        //     sequenceNo: this.tempSequenceNo
        //   }))
        //   certService.userNameLogin.remote(param, (data) => {
        //     this.loginHandle(data)
        //   })
        // })
      }
    },
    loginHandle (data) { // 登录成功
      var accessArr = []
      var companyType = 1
      const info = data.data
      const isReal = !(info.userInfo.registerStep < 4)
      if (info.staticResources) {
        localStorage.resource = JSON.stringify(info.staticResources)
        accessControl.initResourceStr()
        accessArr = accessControl.getAllAccess()
        for (var i = 0; i < accessArr.length; i++) {
          if (accessArr[i].url.indexOf('/voucher/create') !== -1) {
            companyType = 1
            break
          } else if (accessArr[i].url.indexOf('/voucher/sign') !== -1) {
            companyType = 2
            break
          } else if (accessArr[i].url.indexOf('/finance/intention-list') !== -1) {
            companyType = 3
            break
          }
        }
        cookieTools.setCookie('role', companyType, 0.05)
      }

      cookieTools.setCookie('certificationStatus', isReal ? 1 : 0)
      cookieTools.setCookie('step-register', info.userInfo.registerStep)
      sessionStorage.setItem('userStatus', info.userInfo.status)
      sessionStorage.setItem('userName', info.userInfo.name)
      accountService.userCurrent.remote({}, (user) => {
        sessionStorage.setItem('serialNo', user.data.cert.serialNo)
        sessionStorage.setItem('issuerDn', user.data.cert.issuerDn)
        console.log('sessionStorage', sessionStorage)
      }).catch(error => {
        console.log(error)
      })

      if (!isReal) {
        // 实名未完成
        accountService.userCurrent.remote({}, (user) => {
          sessionStorage.setItem('serialNo', user.data.cert.serialNo)
          sessionStorage.setItem('issuerDn', user.data.cert.issuerDn)
        })
        location.href = '#/member/register'
        return
      } else if (info.staticResources === undefined || info.staticResources === null || info.staticResources === '' && config.rightsEnable) {
        // 没有权限
        location.href = '#/noaccess'
        return
      }
      for (let i = 0; i < accessArr.length; i++) {
        if (accessArr[i].type === 1) {
          location.href = '#' + accessArr[i].url
          return
        }
      }
      // 特殊情况下（如添加融资意向的路由没出来），没有有效路由
      location.href = '#/noaccess'
    },
    direct () {
      dispatch.login()
    },
    getRegisterDialog () {
      require.ensure(['components/entries/register/dialogForm'], () => {
        const register = require('components/entries/register/dialogForm')
        this.register = this.$vue.component('dialogForm', register)
        this.supplierRegister = true
          // stepone.checkone()
      }, 'register')
    }
  }
})
</script>
