<template>
  <div class="content-area">
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

    <div class="content-body">
      <el-tabs v-model="tab.activeName" @tab-click="tabHandleClick">
        <el-tab-pane label="还款" name="first" ></el-tab-pane>
        <el-tab-pane label="还款记录" name="second"></el-tab-pane>
      </el-tabs>
      <router-view></router-view>
    </div>
  </div>
</template>
<script type="text/javascript">
import 'common/css/lib/iconfont.css'
import 'common/css/lib/motherplate.css'
import 'common/sass/module/table.scss'
import 'common/sass/main.scss'
import 'common/sass/module/account.scss'
import vnav from 'components/include/nav'
import left from 'components/include/left'
import vfooter from 'components/include/footer'
import modal from 'components/entries/modal'
import layout from 'components/include/layout-l-r'

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
      title: '还款',
      tab: {
        activeName: 'first'
      },
      dialogFormVisible: false
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
  },
  methods: {
    tabHandleClick (item) {
      let url = ''
      if (item.name === 'first') {
        url = '#/supplier/financing-pay'
      } else if (item.name === 'second') {
        url = '#/supplier/financing-pay/record'
      }
      this.title = item.label
      document.title = item.label
      location.href = url
    }
  }
}
</script>
