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

    <!-- <el-tabs v-model="tab.activeName" @tab-click="tabHandleClick">
      <el-tab-pane label="融资申请" name="first" ></el-tab-pane>
      <el-tab-pane label="申请记录" name="second"></el-tab-pane>
    </el-tabs> -->
    <router-view></router-view>
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
      title: '融资申请',
      tab: {
        activeName: 'first'
      },
      dialogFormVisible: false
    }
  },
  mounted () {

  },
  methods: {
    tabHandleClick (item) {
      let url = ''
      if (item.name === 'first') {
        url = '#/financing/financing'
      } else if (item.name === 'second') {
        url = '#/financing/financing/list'
      }
      this.title = item.label
      document.title = item.label
      location.href = url
    }
  }
}
</script>
