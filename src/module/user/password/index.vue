<template>
  <div class="content-area" >
    <div v-title='title'>
      {{title}}
    </div>
    <div class="group">
        <div class="span12 path-nav offset0">
            <ol>
                <li><a href="javascript:void()">信息管理</a></li>>
                <li><a href="javascript:void()"><strong>{{title}}</strong></a></li>
            </ol>
        </div>
    </div>
    <div class="content-body info-manage info-safe pt20 pr20 pb40 pl20">

        <div class="item-group">
            <div class="item-tit"><span class="item-tit-icon"></span>{{title}}</div>
            <div class="item-cnt">
                <div class="tab-bar mb20 pt20">
                  <span class="span-wrap">
                    <span
                    class="tab-button"
                    v-for="(item, index) in tabsData"
                    :index = "index"
                    v-show="item.access"
                    v-bind:class="item.selected ? 'active':''"
                    @click="tabChange(index)">
                    {{item.name}}
                    </span>
                  </span>
                </div>
                <div class="inner-wrap" v-show ="whichShow==0 && tabsData[0].access">
                    <el-form :model="loginForm" :rules="loginForm.rules" ref="loginFormRef" label-width="120px">
                      <el-form-item label="原密码" prop="oldPwd">
                        <el-input v-model="loginForm.oldPwd" type="password"></el-input>
                      </el-form-item>
                      <el-form-item label="新密码" prop="newPwd">
                        <el-input v-model="loginForm.newPwd" type="password" @change='newPwdChange'></el-input>
                      </el-form-item>
                      <el-form-item label="确认新密码" prop="newPwd2">
                        <el-input v-model="loginForm.newPwd2" type="password"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <p class="mb10"><span class="require">*</span><span class="c999">密码为8-20位且至少2种以上的数字、字母或符号组合。</span></p>
                        <el-button class="okbtn" type="primary" @click="loginFormSubmit">修改</el-button>
                      </el-form-item>
                    </el-form>
                </div>
                <div class="inner-wrap" v-show ="whichShow==1 && tabsData[1].access">
                    <modifypaypwd></modifypaypwd>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import 'common/css/lib/iconfont.css'
import 'common/css/lib/motherplate.css'
import 'common/sass/module/table.scss'
import 'common/sass/main.scss'
import 'common/sass/module/supplier.scss'
import formExtends from 'components/entries/base/form'
import modifypaypwd from 'module/user/password/modify-paypwd'
import infoManageService from 'common/api/service/infoManageService'
import cfca from 'common/javascript/features/cfca'
import accessControl from 'common/javascript/tools/accessControl.js'

let instance = null
export default formExtends({
  name: 'app',
  components: {
    modifypaypwd: modifypaypwd
  },
  data () {
    return {
      title: '安全信息',
      whichShow: 0,
      tabsData: [
        {name: '登录密码', selected: true, access: true},
        {name: '支付密码', selected: false, access: false}
      ],
      loginForm: {
        oldPwd: null,
        newPwd: null,
        newPwd2: null,
        rules: {
          oldPwd: { required: true, message: '必须填写', trigger: 'change' },
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
    this.tabChange(0)
    instance = this
    this.tabsData[0].selected = this.tabsData[0].access = accessControl.checkAccess('/user/password/modify-login')
    this.tabsData[1].access = accessControl.checkAccess('/user/password/modify-pay')
    this.tabsData[1].selected = !this.tabsData[0].access
    this.whichShow = this.tabsData[0].selected ? 0 : 1
  },
  beforeDestroy () {
    this.$refs.loginFormRef.resetFields()
  },
  methods: {
    tabChange: function (index) {
      // 清空表单信息
      this.$refs.loginFormRef.resetFields()

      this.tabsData.forEach(function (item) {
        item.selected = false
      })
      this.tabsData[index].selected = true
      this.whichShow = index
    },
    newPwdChange (value) {
      // 先输入确认新密码，再输入新密码 - 校验
      if (instance.loginForm.newPwd2) {
        instance.$refs.loginFormRef.validateField('newPwd2', (valid) => {})
      }
    },
    loginFormSubmit () {
      const self = this
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
              oldPwd: self.loginForm.oldPwd
            }
          }
          param.signStr = this.sign(JSON.stringify(param.modifyParam))
          infoManageService.modifyLoginPassword.remote(param, (data) => {
            if (data.data) {
              self.$message.success('密码修改成功')
              setTimeout(function () {
                location.reload()
              }, 2000)
            } else {
              self.$message({
                message: data.error.errorMessage,
                type: 'error'
              })
            }
          })
        }
      })
    }
  }
})
</script>
