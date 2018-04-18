<style>
	.icon-header {
		font-size: 24px;
		display: block;
    margin-top: -10px;
		margin-left:40px;
	}
</style>
<template>
	<div class="header">
		<div>
			<span class="title">区块链应收账款管理平台</span>
		</div>
		<!-- <nav class="nav"> <a href="/module/index.html">首页</a> <a>业务介绍</a> <a>产品服务</a> <a>会员服务</a>
		</nav> -->
		<div class="right login ">
			<!--<img src = '../../common/image/user.png' style='float:left;margin-top:-17px;margin-right:14px;' />-->
			<a @click="toRealInfo" style="display:block;margin-top:-4px;float:left;">您好：{{currentCompany.name}}</a>
			<!-- <el-badge is-dot class='item '  >
				<span class="iconfont icon-youjian icon-header"></span>
			</el-badge>
			<el-badge is-dot class='item ' style="margin-top:-4px;">
				<span class="iconfont icon-iconfontcolor25 icon-header" style="font-size: 20px;    margin-top: -13px;"></span>
			</el-badge> -->
			<el-badge is-dot hidden class='item ' style="margin-top:-4px;" >
				<span class="iconfont icon-tuichu icon-header" @click='logout' style="font-size: 20px;    margin-top: -13px;"></span>
			</el-badge>
		</div>
	</div>
</template>
<script type="text/javascript">
import Vue from 'vue'
import model from 'common/api/voucherTemplate'
import authorityService from 'common/api/service/authorityService'
import dispatch from 'module/member/service/dispatch'
// import accountService from ''
import {
  Badge
} from 'element-ui'
Vue.use(Badge)

export default {
  name: 'nav',
  data () {
    return {
      currentCompany: {
      }
    }
  },
  beforeMount () {
    this.$http.get('/service/company/current', response => {
      // 数据模型处理
      let result = model[response.config.url](response, self)
      if (result.success === false) {
        throw new Error('获取当前企业失败！')
      }
      this.currentCompany = result.data
      this.currentCompany.name = result.data.name
      this.currentCompany.bankCard = this.currentCompany.subAccount
      sessionStorage.setItem('currentCompany', result.data.name)
      // 初始化当前企业信息
      this.$bus.currentCompany = result.data
      const me = this
      setTimeout(function () {
        me.$bus.$emit('info-init', result.data)
      }, 2000)
    })
  },
  mounted () {
  },
  methods: {
    logout () {
      authorityService.logout.remote({}, () => {
        dispatch.logout()
      })
    },
    toRealInfo () {
      dispatch.toRealInfo()
    }
  }
}
</script>
