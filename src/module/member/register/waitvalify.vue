<template>
  <div class="step7-ccs">
    <div class="inner-wrap">
      <div class="group">
          <span  class="iconfont icon-woshou icon-style"></span>
          <div class="span8 local-info-box">
              <div class="font2 text-center">{{msg.tit}}</div>
              <div class="font1 text-center ">{{msg.content}} <span v-if='showTimeRun'>{{times}}秒后进入系统</span></div>
          </div>

      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import cookieTools from 'common/javascript/tools/cookieTools'
import config from 'common/config/config'
import certService from 'common/api/service/certService'

export default {
  name: 'step7-ccs',
  components: {
  },
  data () {
    return {
      showTimeRun: false,
      msg: {
        tit: '',
        content: ''
      },
      companyId: '',
      times: 5
    }
  },
  mounted () {
    let role = cookieTools.getCookie('role')
    if (role === '2') {
      this.msg.tit = '身份认证已完成！'
      this.msg.content = '系统将自动添加您的结算户信息。'
      let loading = this.$loading.service({
        fullscreen: true
      })
      certService.getCurrentCompany.remote({}, (info) => {
        this.companyId = info.data && info.data.id
        if (this.companyId === '' || this.companyId === null) {
          this.$bus.$emit('message-error', {message: '企业Id错误！'})
          return
        }
        this.showTimeRun = true
        const inte = setInterval(() => {
          if (this.times === 1) {
            this.$bus.$emit('on-step', 5) // 设置信息
            clearInterval(inte)
            location.href = config.supplierIndex
            return
          }
          this.times --
        }, 1000)
        loading.close()
      })
    }
    // alert(role)
    if (role === '1') {
      this.msg.tit = '已完成实名认证，等待审核！'
      this.msg.content = '审核通过后，系统将自动添加您的授信及结算户信息。'
      this.showTimeRun = false
      certService.userAuthStep.remote({}, (info) => {
        if (parseInt(info.data) === 4) {
          cookieTools.setCookie('step-register', 4)
          location.href = '#/voucher/create'
        }
      })
    }
  },
  methods: {
  }
}

</script>
