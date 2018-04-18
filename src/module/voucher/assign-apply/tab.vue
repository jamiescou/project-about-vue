<template>
  <div class="content-area" >

    <div v-title='title'>{{title}}</div>
    <div class="group">
        <div class="span12 path-nav offset0">
            <ol>
                <li>凭证管理</li>>
                <li><strong>{{title}}</strong></li>
            </ol>
        </div>
    </div>

    <el-tabs v-model="tab.activeName" @tab-click="tabHandleClick">
      <el-tab-pane label="转让申请" name="first" v-if="indexAccess"></el-tab-pane>
      <el-tab-pane label="申请记录" name="second" v-if="recordAccess"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>
<script type="text/javascript">
import 'common/css/lib/iconfont.css'
import 'common/css/lib/motherplate.css'
import 'common/sass/main.scss'
import 'common/sass/module/account.scss'
import modal from 'components/entries/modal'
import layout from 'components/include/layout-l-r'
import accessControl from 'common/javascript/tools/accessControl.js'

export default {
  name: 'app',
  components: {
    modal: modal,
    layout
  },
  data () {
    return {
      title: '凭证管理',
      tab: {
        activeName: 'second'
      },
      dialogFormVisible: false,
      approvedPassAccess: false,
      approvedBouncedAccess: false
    }
  },
  mounted () {
    // 页面刷新tab激活状态改变
    let url = location.href.toString().split('/')
    if (url[url.length - 1] === 'record') {
      this.tab.activeName = 'second'
    } else {
      this.tab.activeName = 'first'
    }
    this.indexAccess = accessControl.checkAccess('/voucher/assign-apply/index')
    this.recordAccess = accessControl.checkAccess('/voucher/assign-apply/record')
  },
  methods: {
    tabHandleClick (item) {
      let url = ''
      if (item.name === 'first') {
        url = '#/voucher/assign-apply/index'
      } else if (item.name === 'second') {
        url = '#/voucher/assign-apply/record'
      }
      this.activeName = item.name
      this.title = item.label
      document.title = item.label
      location.href = url
    }
  },
  watch: {
    '$route' (to, from) {
      // 页面刷新tab激活状态改变 cl*/
      let url = location.href.toString().split('/')
      if (url[url.length - 1] === 'record') {
        this.tab.activeName = 'second'
      } else {
        this.tab.activeName = 'first'
      }
    }
  }
}
</script>
