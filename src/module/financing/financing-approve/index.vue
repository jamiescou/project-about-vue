<template>
  <div class="content-area" >

    <div v-title='title'>
      {{title}}
    </div>
    <div class="group">
        <div class="span12 path-nav offset0">
            <ol>
                <li>融资管理</li>>
                <li><strong>{{title}}</strong></li>
            </ol>
        </div>
    </div>

    <el-tabs v-model="tab.activeName" @tab-click="tabHandleClick">
      <el-tab-pane label="待审批" name="first" v-if="pendingAccess"></el-tab-pane>
      <el-tab-pane label="审批通过" name="second" v-if="passAccess"></el-tab-pane>
      <el-tab-pane label="审批未通过" name="third" v-if="rejectAccess"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>
<script type="text/javascript">
import 'common/css/lib/iconfont.css'
import 'common/css/lib/motherplate.css'
import 'common/sass/main.scss'
import 'common/sass/module/account.scss'
import vnav from 'components/include/nav'
import left from 'components/include/left'
import vfooter from 'components/include/footer'
import modal from 'components/entries/modal'
import layout from 'components/include/layout-l-r'
import accessControl from 'common/javascript/tools/accessControl.js'

export default {
  name: 'app',
  components: {
    vnav: vnav,
    left: left,
    vfooter: vfooter,
    modal: modal,
    layout
  },
  data () {
    return {
      title: '待审批',
      tab: {
        activeName: 'second'
      },
      dialogFormVisible: false,
      pendingAccess: false,
      passAccess: false,
      rejectAccess: false
    }
  },
  mounted () {
    // 页面刷新tab激活状态改变
    let url = location.href.toString().split('/')
    if (url[url.length - 1] === 'pass') {
      this.tab.activeName = 'second'
    } else if (url[url.length - 1] === 'reject') {
      this.tab.activeName = 'third'
    } else {
      this.tab.activeName = 'first'
    }
    this.pendingAccess = accessControl.checkAccess('/financing/intention-approve/pending')
    this.passAccess = accessControl.checkAccess('/financing/intention-approve/pass')
    this.rejectAccess = accessControl.checkAccess('/financing/intention-approve/reject')
  },
  methods: {
    tabHandleClick (item) {
      let url = ''
      if (item.name === 'first') {
        url = '#/financing/financing-approve/pending'
      } else if (item.name === 'second') {
        url = '#/financing/financing-approve/pass'
      } else if (item.name === 'third') {
        url = '#/financing/financing-approve/reject'
      }
      this.activeName = item.name
      this.title = item.label
      document.title = item.label
      location.href = url
    }
  }
}
</script>
