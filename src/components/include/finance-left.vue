<style>
</style>
<template>
<div class="left-menu" >
    <div class="logo">
      <img src="../../common/image/logo.png" />
    </div>
    <div class="menu">
      <div class="item">
          <span class="name"><span class="iconfont icon-cebianlan-pingzhengguanli-" style="margin-right: 3px ;"></span>客户管理</span>
          <ul>
              <li ><span class="ex-area"></span><router-link to="/finance/core-enterprise">核心企业</router-link></li>
              <li ><span class="ex-area"></span><router-link to="/finance/f-supplier">供应商</router-link></li>
          </ul>
      </div>
      <div class="item">
          <span class="name"><span class="iconfont icon-cebianlan-fukuanguanli-" style="margin-right: 3px ;"></span>融资管理</span>
          <ul>
              <li ><span class="ex-area"></span><router-link to="/finance/intention-list">意向审批</router-link></li>
              <li ><span class="ex-area"></span><router-link to="/finance/apply-list">融资审批</router-link></li>
              <li ><span class="ex-area"></span><router-link to="/finance/loan-list">融资放款</router-link></li>
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
  name: 'finance-left',
  mounted () {
    let address = document.location.href.split('#')[1]
    let content = document.getElementsByClassName('left-menu')[0]
    let li = content.getElementsByTagName('li')

    // ***跳到success界面，相应导航激活 start***/
    this.$bus.$on('liActive', info => {
      Array.map(li, function (item, i) {
        var rout = li[i].getElementsByTagName('a')[0].hash.split('#')[1].trim()
        if (info.trim() === rout) {
          li[i].className = 'active'
        }
      })
    })
   // ***跳到success界面，相应导航激活 end***/

    if (address === li) {

    }
    // let go = 'true'
    // Array.map(li, function (i, m) {
    //   let a = i.children[1]
    //   let href = a.href.split('#')[1]
    //   if (address === href) {
    //     i.className = 'active'
    //     go = false
    //   }
    // })
    // if (!go) return
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
  }
}

</script>
