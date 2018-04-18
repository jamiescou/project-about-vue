<template>
  <div id="app" style="overflow: auto;">
    <router-view></router-view>
    <component :is='psw' v-if='show' :payInfo="payInfo" @dialog="logClose"></component>
  </div>
</template>

<script>
import {addResizeListener} from 'common/javascript/tools/resizeEvent'
import {Message} from 'element-ui'

import CFCATools from 'common/javascript/features/cfca.js'
// import cookieTools from 'common/javascript/tools/cookieTools'
// import dispatch from 'module/member/service/dispatch'

export default {
  name: 'app',
  components: {
  },
  data () {
    return {
      show: false,
      payInfo: [],
      psw: null
    }
  },
  mounted () {
    CFCATools.initCryptoAgent()
    this.$bus.$on('message-error', info => {
      setTimeout(function () {
        Message({
          showClose: true,
          message: info.message,
          type: 'error'
        })
      }, 10)
    })
    // var locationHashStr = location.hash.substring(1, location.hash.length)
    // if (locationHashStr !== '/' && !accessControl.checkAccess(locationHashStr)) {
    //   alert('没有权限访问!')
    // }
    // const role = parseInt(cookieTools.getCookie('role'))
    // if (dispatch.isReal() && (location.href.indexOf('/supplier/') !== -1 || location.href.indexOf('/account/') !== -1)) {
    //   alert('没有权限访问!')
    //   dispatch.toReal()
    //   return
    // }
    //
    // if (location.href.indexOf('/supplier/') !== -1 && role === 1) {
    //   // new Vue().$bus.$emit('message-error', {
    //   //   message: '没有权限访问？'
    //   // })
    //   alert('没有权限访问!')
    //   location.href = '/'
    //   return
    // }
    //
    // if (location.href.indexOf('/account/') !== -1 && role === 2) {
    //   // new Vue().$bus.$emit('message-error', {
    //   //   message: '没有权限访问？'
    //   // })
    //   alert('没有权限访问!')
    //   location.href = '/'
    //   return
    // }
    // 支付密码弹窗
    this.$bus.$on('pay-popup', info => {
      require.ensure(['module/pay/psw'], () => {
        const psw = require('module/pay/psw')
        this.psw = this.$vue.component('psw', psw)
        this.show = true
        this.payInfo[0] = info.url
        this.payInfo[1] = info.method
        this.payInfo[2] = info.params
        this.payInfo[3] = info.href
      }, 'psw')
    })
  },
  methods: {
    logClose (msg) {
      this.show = msg
    }
  }
  // watch: {
  //   // 监听路由变化，相应li激活 cl*/
  //   '$route' (to, from) {
  //     let content = document.getElementsByClassName('left-menu')[0]
  //     let li = content.getElementsByTagName('li')
  //
  //     Array.map(li, function (item, i) {
  //       let rout = li[i].getElementsByTagName('a')[0].hash.split('#')[1].trim()
  //       if (to.path.indexOf(rout) >= 0) {
  //         li[i].className = 'active'
  //       } else {
  //         li[i].className = ''
  //       }
  //     })
  //     // var locationHashStr = to.hash.substring(1, to.hash.length)
  //     // if (locationHashStr !== '/' && !accessControl.checkAccess(locationHashStr)) {
  //     //   alert('没有权限访问!')
  //     // }
  //   }
  // }
}
addResizeListener(document.getElementById('app'), function () {})
</script>
