

<template>
  <div class="content-area" >
    <div v-title='title'>
      {{title}}
    </div>
      <div class="group">
          <div class="span12 path-nav ">
              <ol>
                  <li><a href="#"><strong></strong></a></li>
              </ol>
          </div>
      </div>
      <div class="content-body" >
        <span class="font2" style="margin:100px auto;display:block;width:600px;overflow: hidden;">
          <span class="iconfont icon-error " style="font-size:80px;margin-right:30px;color:#fe3748;float:left"></span>
          <span style="display:block;margin-top:50px"><strong>{{content}}</strong>
          </span>
        </span>
      </div>
  </div>
</template>

<script type="text/javascript">
import 'common/css/lib/iconfont.css'
import 'common/css/lib/motherplate.css'
import 'common/sass/main.scss'
import 'common/sass/module/account.scss'
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
      title: '失败页面',
      content: '',
      active: ''
    }
  },
  mounted () {
    this.content = this.$route.query.content
    var bank = this.$route.query.bankType
    if (bank) {
      this.content += bank
    }
    this.active = this.$route.query.active
    if (this.$route.query.title) {
      document.title = this.$route.query.title
    }
    this.$bus.$emit('liActive', this.active)
  },
  methods: {
  }
}
</script>
