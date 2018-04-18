
<template>
  <layout>
    <left slot="left"></left>
    <vnav slot="header"></vnav>
    <router-view slot="body"></router-view>
    <vfooter slot="footer">
    </vfooter>
  </layout>
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
// import Vue from 'vue'

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
      currentPage: 1,
      temp: 1
    }
  },
  methods: {
    addContract () {
      this.$refs.addContract.show = true
    },
    stateFormat () {
      return '1'
    },
    handleSizeChange (page, a, b) {
    },
    handleCurrentChange (page, a, b) {
      this.currentPage = page
    }
  }
}
</script>
