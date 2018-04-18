<template>
    <div class="content-m">
        <vnav></vnav>
        <div class="group b-reg">
            <!-- 企业登录 -->
            <div class="wrap" v-if='userStatus !== "INIT"'>

                <div class="setp-box">
                    <div class="stepInfo">
                        <el-row>
                          <el-col>
                            <el-steps :space="230" :active="active" :align-center="true" >
                              <el-step title="实名认证"></el-step>
                              <el-step title="补充信息录入"></el-step>
                              <el-step title="支付密码设置"></el-step>
                              <el-step v-if='role==1' title="等待审核"></el-step>
                              <el-step v-if='role==2' title="完成"></el-step>
                            </el-steps>
                          </el-col>
                        </el-row>
                    </div>
                </div>

                <!-- <step1 v-if="active === 0" ></step1> -->
                <bindcer v-if="active === 1" ></bindcer>
                <addInfo v-if="active === 2" ></addInfo>
                <bindpassword v-if="active === 3" ></bindpassword>
                <waitvalify v-if="active === 4" ></waitvalify>
                <!-- <step1 v-if="step === 1" ></step1>
                <step2 v-if="step === 2" ></step2>
                <step3 v-if="step === 3" ></step3>
                <step4 v-if="step === 4" ></step4>
                <step5 v-if="step === 5" ></step5>
                <step6 v-if="step === 6" ></step6>
                <step7 v-if="step === 7" :msg="msg"></step7>
                <step8 v-if="step === 8" ></step8>
                <step9 v-if="step === 9" ></step9>
                <step10 v-if="step === 10" ></step10> -->
            </div>

            <!-- 企业的普通用户登录 -->
            <div class="wrap" v-if='userStatus === "INIT"'>

                <div class="setp-box">
                    <div class="stepInfo">
                        <el-row>
                          <el-col>
                            <el-steps :space="230" :active="setStep" :align-center="true" >
                              <el-step title="重置登录密码"></el-step>
                              <el-step title="设置支付密码"></el-step>
                            </el-steps>
                          </el-col>
                        </el-row>
                    </div>
                </div>

                <div style="padding-left: 130px;padding-top: 30px;">
                  <setlogin v-if="setStep === 1" ></setlogin>
                  <setpay v-if="setStep === 2" ></setpay>
                </div>
            </div>
        </div>
        <vfooter></vfooter>
    </div>
</template>

<script>

import 'common/css/lib/iconfont.css'
import 'common/css/lib/motherplate.css'
import 'common/sass/module/index.scss'
import 'common/sass/module/account.scss'
import 'common/sass/module/steps.scss'
import 'common/sass/module/member.scss'
import vnav from 'components/include/real-nav'
import left from 'components/include/left'
import vfooter from 'components/include/footer'
import addInfo from 'module/member/register/addInfo'
import bindcer from 'module/member/register/bindcer'
import bindpassword from 'module/member/register/bindpassword'
import setlogin from 'module/member/register/set-login-psw'
import setpay from 'module/member/register/set-pay-psw'
import waitvalify from 'module/member/register/waitvalify'
import dispatch from 'module/member/service/dispatch'
import cookieTools from 'common/javascript/tools/cookieTools'
// import cerService from 'common/api/service/certService'
// import accountService from 'common/api/service/accountService'
export default {
  name: 'app',
  components: {
    vnav,
    left,
    vfooter,
    addInfo,
    bindcer,
    bindpassword,
    waitvalify,
    dispatch,
    setlogin,
    setpay
  },
  data () {
    return {
      step: 10,
      role: 0,
      msg: {
      },
      active: 0,
      setStep: 1, // 普通用户登录步骤记录
      userStatus: null  // 区分是企业还是企业的普通用户
    }
  },
  mounted () {
    if (cookieTools.getCookie('step-register') === '') {
      sessionStorage.serialNo = ''
      sessionStorage.issuerDn = ''
      location.href = '#/login'
      return
    }

    this.userStatus = sessionStorage.getItem('userStatus')
    this.$bus.$on('reg-step', info => {
      this.msg = info.msg
      this.step = info.step
    })
    this.$bus.$on('on-step', info => {
      this.active = info
      cookieTools.setCookie('step-register', info - 1)
    })
    // 修改登录密码
    this.$bus.$on('set-login', info => {
      this.setStep = info
      cookieTools.setCookie('step-register', info - 1)
    })
    const step = cookieTools.getCookie('step-register')
    this.role = cookieTools.getCookie('role')
    if (this.role === '1') {
      this.step4Message = '等待审核'
    }
    if (this.role === '2') {
      this.step4Message = '完成'
    }
    // this.active = 3
    // return
    if (step !== '' && step) {
      this.active = parseInt(cookieTools.getCookie('step-register')) + 1
      this.setStep = parseInt(cookieTools.getCookie('step-register')) + 1
    }
    // accountService.userCurrent.remote({}, (user) => {
    // })
    if (dispatch.isRealName()) {
      this.$message.success('已经完成实名认证！')
      dispatch.login()
    }
  },
  methods: {
    onSubmit () {
    }
  }
}

</script>
