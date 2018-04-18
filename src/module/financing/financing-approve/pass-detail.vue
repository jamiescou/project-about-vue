<template>
    <div class="content-area" >
        <div v-title='title'>{{title}}</div>
        <div class="group">
            <div class="span12 path-nav ">
                <ol>
                    <li><a href="javascript:void()">融资管理</a></li>>
                    <li><a href="javascript:void()"><strong>{{title}}</strong></a></li>
                </ol>
            </div>
        </div>
  </div>

</template>

<script type="text/javascript">

import 'common/css/lib/iconfont.css'
import 'common/css/lib/motherplate.css'
import 'common/sass/module/regular.scss'
import 'common/sass/module/table.scss'
import vnav from 'components/include/nav'
import left from 'components/include/member-left'
import vfooter from 'components/include/footer'

export default {
  name: 'app',
  components: {
    vnav: vnav,
    left: left,
    vfooter: vfooter
  },
  data () {
    return {
      title: '融资详情'
    }
  },
  methods: {
    close () {
      history.go(-1)
    }
  }
}

</script>
