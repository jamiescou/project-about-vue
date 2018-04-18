<template>
<div class="left-menu" >
    <div class="logo" style="padding-top:5px; text-align:center;">
      <!--<span class="iconfont icon-gyb" style="font-size:48px;margin-left: 20px;"></span>-->
      <img src = '../../common/image/indexLogo.png' style='width:250px;' />
    </div>
    <div class="menu">
      <div class="item" v-for="menu in menuArr">
          <span class="name"><span :class="menu.icon" style="margin-right: 3px ;"></span>{{menu.label}}</span>
          <ul>
              <li v-for="item in menu.children" v-if='item.id !== 708'><span class="ex-area"></span><router-link :to="item.url">{{item.label}}</router-link></li>
          </ul>
      </div>
      <!-- <div class="item" v-if='!rightsEnable'>
          <span class="name"><span class="iconfont icon-cebianlan-shouxinguanli-" style="margin-right: 3px ;"></span>授信管理</span>
          <ul>
            <li><span class="ex-area"></span><router-link to="/credit/enterprise">我的授信</router-link></li>
            <li><span class="ex-area"></span><router-link to="/credit/supplier">授信信息</router-link></li>
          </ul>
      </div> -->
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

// import accessControlService from 'common/api/service/accessControlService'
import accessControl from 'common/javascript/tools/accessControl.js'
import config from 'common/config/config'

Vue.use(Input)
Vue.use(DatePicker)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)

export default {
  name: 'left',
  data () {
    return {
      menuArr: [],
      rightsEnable: config.rightsEnable
    }
  },
  mounted () {
    let address = document.location.href.split('#')[1]
    let content = document.getElementsByClassName('left-menu')[0]
    let li = content.getElementsByTagName('li')
    this.initMenu()
    // ***跳到success界面，相应导航激活 cl*/
    this.$bus.$on('liActive', info => {
      Array.map(li, function (item, i) {
        var rout = li[i].getElementsByTagName('a')[0].hash.split('#')[1].trim()
        if (info.trim() === rout) {
          li[i].className = 'active'
        }
      })
    })

   // ***跳到success界面，相应导航激活 end***/

    let addressCache = []
    Array.map(li, function (i, m) {
      let a = i.children[1]
      let href = a.href.split('#')[1]
      if (address.indexOf(href) !== -1) {
        addressCache.push(i)
        // i.className = 'active'
      }
    })
    // let hLevelArray = []
    // Array.map(addressCache, function (o, i) {
    //   let a = o.children[1]
    //   let href = a.href.split('#')[1]
    //   let hLevel = href.split('/').length
    //   hLevelArray.push({
    //     ele: o,
    //     level: hLevel
    //   })
    // })
    // let most = null
    // Array.map(hLevelArray, function (o, i) {
    //   if (!most) {
    //     most = o
    //   }
    //   if (most.level < o.level) {
    //     most = o
    //   }
    // })
    // most.ele.className = 'active'
    this.generateLeft()
    this.initUrl()
  },
  methods: {
    rec (parentId, data) {
      var tree = []
      for (var i = 0; i < data.length; i++) {
        var json = data[i]
        if (json.parentId === parentId && json.type < 3) {
          var tmp = {id: json.id, label: json.name, url: json.url, icon: json.icon, children: []}
          tmp.children = this.rec(json.id, data)
          tree.push(tmp)
        }
      }
      return tree
    },
    initMenu () {
      // if (localStorage.resource !== undefined && localStorage.resource !== null) {
      //   accessControlService.getUserAccess.remote({}, (data) => {
      //     localStorage.resource = JSON.stringify(data.data)
      //     accessControl.initResourceStr()
      //     var tmp = accessControl.getAllAccess()
      //     this.menuArr = this.rec(0, tmp)
      //   })
      // }
      var tmp = accessControl.getAllAccess()
      this.menuArr = this.rec(0, tmp)

      this.$nextTick(function () {
        var content = document.getElementsByClassName('left-menu')[0]
        var li = content.getElementsByTagName('li')

        Array.map(li, function (item, i) {
          let rout = li[i].getElementsByTagName('a')[0].hash.split('#')[1].trim()
          if (location.hash.indexOf(rout) >= 0) {
            li[i].className = 'active'
          } else {
            li[i].className = ''
          }
        })
      })
    },
    generateLeft () {
      const resource = localStorage.resource && JSON.parse(localStorage.resource)
      const promiseArray = []
      Array.forEach(resource, function (n, i) {
        /*eslint-disable */
        n = window.eval('(' + n + ')')
        if (n.isMenu === false) {
          n.children = []
          promiseArray.push(n)
        }
      })
      Array.forEach(resource, function (n, i) {
        /*eslint-disable */
        n = window.eval('(' + n + ')')
        if (n.isMenu === true) {
          Array.forEach(promiseArray, function (o, j) {
            if (o.id === n.parentId) {
              o.children.push(n)
              return
            }
          })
        }
      })
    },
    initUrl () {
      var tab1 = ''
      var tab2 = ''
      var tab3 = ''
      var locationHash = location.hash

      // 已审批的凭证
      if (locationHash === '#/voucher/approved') {
        tab1 = accessControl.checkAccess('/voucher/approved/pass')
        tab2 = accessControl.checkAccess('/voucher/approved/bounced')
        if (tab1) {
          location.href = '#/voucher/approved/pass'
        } else if (tab2) {
          location.href = '#/voucher/approved/bounced'
        }
      }

      // 转让申请
      if (location.hash === '#/voucher/assign-apply') {
        var tab1 = accessControl.checkAccess('/voucher/assign-apply/index')
        var tab2 = accessControl.checkAccess('/voucher/assign-apply/record')
        if (tab1) {
          location.href = '#/voucher/assign-apply/index'
        } else if (tab2) {
          location.href = '#/voucher/assign-apply/record'
        }
      }

      // 转让审批
      if (location.hash === '#/voucher/assign-approve') {
        var tab1 = accessControl.checkAccess('/voucher/assign-approve/index')
        var tab2 = accessControl.checkAccess('/voucher/assign-approve/record')
        if (tab1) {
          location.href = '#/voucher/assign-approve/index'
        } else if (tab2) {
          location.href = '#/voucher/assign-approve/record'
        }
      }

      // 付款审批
      if (locationHash === '#/payment/approve') {
        tab1 = accessControl.checkAccess('/payment/approve/index')
        tab2 = accessControl.checkAccess('/payment/approve/record')
        if (tab1) {
          location.href = '#/payment/approve/index'
        } else if (tab2) {
          location.href = '#/payment/approve/record'
        }
      }

      // 付款申请
      if (locationHash === '#/payment/apply') {
        tab1 = accessControl.checkAccess('/payment/apply/index')
        tab2 = accessControl.checkAccess('/payment/apply/record')
        if (tab1) {
          location.href = '#/payment/apply/index'
        } else if (tab2) {
          location.href = '#/payment/apply/record'
        }
      }

      // 意向申请
      if (locationHash === '#/financing/intention-apply') {
        tab1 = accessControl.checkAccess('/financing/intention-apply/pending')
        tab2 = accessControl.checkAccess('/financing/intention-apply/pass')
        tab3 = accessControl.checkAccess('/financing/intention-apply/reject')
        if (tab1) {
          location.href = '#/financing/intention-apply/pending'
        } else if (tab2) {
          location.href = '#/financing/intention-apply/pass'
        } else if (tab3) {
          location.href = '#/financing/intention-apply/reject'
        }
      }

      // 意向审批
      if (locationHash === '#/financing/intention-approve') {
        tab1 = accessControl.checkAccess('/financing/intention-approve/pending')
        tab2 = accessControl.checkAccess('/financing/intention-approve/pass')
        tab3 = accessControl.checkAccess('/financing/intention-approve/reject')
        if (tab1) {
          location.href = '#/financing/intention-approve/pending'
        } else if (tab2) {
          location.href = '#/financing/intention-approve/pass'
        } else if (tab3) {
          location.href = '#/financing/intention-approve/reject'
        }
      }

      // 融资审批
      if (locationHash === '#/financing/financing-approve') {
        tab1 = accessControl.checkAccess('/financing/financing-approve/pending')
        tab2 = accessControl.checkAccess('/financing/financing-approve/pass')
        tab3 = accessControl.checkAccess('/financing/financing-approve/reject')
        if (tab1) {
          location.href = '#/financing/financing-approve/pending'
        } else if (tab2) {
          location.href = '#/financing/financing-approve/pass'
        } else if (tab3) {
          location.href = '#/financing/financing-approve/reject'
        }
      }
    }
  },
  watch: {
    // 监听路由变化，相应li激活 cl*/
    '$route' (to, from) {
      let content = document.getElementsByClassName('left-menu')[0]
      let li = content.getElementsByTagName('li')

      this.initUrl()

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
