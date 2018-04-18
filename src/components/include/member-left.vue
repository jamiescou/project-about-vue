<style>
</style>
<template>
<div class="left-menu" >
    <div class="logo" style="padding-top:5px;">
      <span class="iconfont icon-bunuoLogo" style="font-size:48px;color:#fff;margin-left: 20px;"></span>
    </div>
    <div class="menu">
      <div class="item">
          <span class="name"><span class="iconfont icon-cebianlan-liuzhuanguanli" style="margin-right: 3px ;"></span>流转管理</span>
          <ul>
              <li ><span class="ex-area"></span><router-link to="/voucher/sign">凭证签收</router-link></li>
              <li ><span class="ex-area"></span><router-link to="/supplier/voucher-assign">凭证转让</router-link></li>
          </ul>
      </div>
      <div class="item">
          <span class="name"><span class="iconfont icon-cebianlan-pingzhengguanli" style="margin-right: 3px ;"></span>凭证管理</span>
          <ul>
              <li><span class="ex-area"></span><router-link to="/supplier/voucher-search">凭证查询</router-link></li>
          </ul>
      </div>

      <div class="item">
          <span class="name"><span class="iconfont icon-cebianlan-rongziguanli" style="margin-right: 3px ;"></span>融资管理</span>
          <ul>
              <li><span class="ex-area"></span><router-link to="/supplier/finance">意向申请</router-link></li>
              <li><span class="ex-area"></span><router-link to="/supplier/financing-apply">凭证融资</router-link></li>
              <li><span class="ex-area"></span><router-link to="/supplier/financing-search">融资查询</router-link></li>
              <!-- <li><span class="ex-area"></span><router-link to="/supplier/financing-pay">还款</router-link></li> -->
          </ul>
      </div>
      <div class="item">
          <span class="name"><span class="iconfont icon-cebianlan-zhanghuguanli" style="margin-right: 3px ;"></span>客户管理</span>
          <ul>
              <li><span class="ex-area"></span><router-link to="/supplier/user-core-company">上游供应商</router-link></li>
              <li><span class="ex-area"></span><router-link to="/supplier/user-supplier">下游供应商</router-link></li>
          </ul>
      </div>
      <div class="item">
          <span class="name"><span class="iconfont icon-cebianlan-zhanghuguanli-1" style="margin-right: 3px ;"></span>账户管理</span>
          <ul>
              <li><span class="ex-area"></span><router-link to="/supplier/account-sub">子账户</router-link></li>
              <li><span class="ex-area"></span><router-link to="/supplier/account-bank">银行账户</router-link></li>
          </ul>
      </div>
      <div class="item">
          <span class="name"><span class="iconfont icon-cebianlan-xinxiguanli" style="margin-right: 3px ;"></span>信息管理</span>
          <ul>
              <li><span class="ex-area"></span><router-link to="/supplier/info-account">登录账号信息</router-link></li>
              <li><span class="ex-area"></span><router-link to="/supplier/info-real-name">实名认证信息</router-link></li>
              <li><span class="ex-area"></span><router-link to="/supplier/info-protocol">协议信息</router-link></li>
              <li><span class="ex-area"></span><router-link to="/supplier/info-certificate">证书信息</router-link></li>
              <li><span class="ex-area"></span><router-link to="/supplier/info-safe">安全信息</router-link></li>
          </ul>
      </div>
    </div>
</div>
</template>

<script type="text/javascript">
import Vue from 'vue'
import {
  Input,
  DatePicker,
  Button,
  Row,
  Col
} from 'element-ui'

Vue.use(Input)
Vue.use(DatePicker)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)

export default {
  name: 'left',
  mounted () {
    let address = document.location.href.split('#')[1]
    let content = document.getElementsByClassName('left-menu')[0]
    let li = content.getElementsByTagName('li')

    // ***跳到success界面，相应导航激活 cl*/
    this.$bus.$on('liActive', info => {
      Array.map(li, function (item, i) {
        var rout = li[i].getElementsByTagName('a')[0].hash.split('#')[1].trim()
        if (info.trim() === rout) {
          li[i].className = 'active'
        }
      })
    })
    // ***跳到success界面，相应导航激活 end*/

    let addressCache = []
    // let aLevel = address.split('/').length
    Array.map(li, function (i, m) {
      let a = i.children[1]
      let href = a.href.split('#')[1]
      if (address === href) {
      }
      if (address.indexOf(href) !== -1) {
        addressCache.push(i)
        // i.className = 'active'
      }
    })
    let hLevelArray = []
    Array.map(addressCache, function (o, i) {
      let a = o.children[1]
      let href = a.href.split('#')[1]
      let hLevel = href.split('/').length
      hLevelArray.push({
        ele: o,
        level: hLevel
      })
    })
    let most = null
    Array.map(hLevelArray, function (o, i) {
      if (!most) {
        most = o
      }
      if (most.level < o.level) {
        most = o
      }
    })
    most.ele.className = 'active'
  },
  watch: {
    // 监听路由变化，相应li激活 cl*/
    '$route' (to, from) {
      let content = document.getElementsByClassName('left-menu')[0]
      let li = content.getElementsByTagName('li')

      Array.map(li, function (item, i) {
        let rout = li[i].getElementsByTagName('a')[0].hash.split('#')[1].trim()
        if (to.path.indexOf(rout) >= 0) {
          li[i].className = 'active'
        } else {
          li[i].className = ''
        }
      })
    }
  }
}

</script>
