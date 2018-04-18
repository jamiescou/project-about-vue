<template>
	<div class="header">
		<!--logo开始-->
		<div class="logo">
			<img src="../../common/image/indexLogo.png" style="width:250px;margin-left: 180px;margin-top: 16px;float: left;"> <span style="padding-top: 31px;display:block;margin-left:356px;">区块链应收账款管理平台</span>
		</div>
		<!--logo结束-->
    <!--导航开始-->
		<!-- <ul class="menu-bar">
			<li class="drop-down" @mouseenter="show=true" @mouseleave="show=false"><a class="title"><span>快速切换</span>&nbsp;&nbsp;<span class="iconfont icon-change" style="margin-top:2px;"></span></a>
					<ul class="drop-down-content" v-show="show">
						<li><a><span class="iconfont icon-zuanshi">&nbsp;&nbsp;</span>综合会员</a></li>
						<li><a><span class="iconfont icon-huiyuan">&nbsp;&nbsp;</span>普通会员</a></li>
						<li><a><span class="iconfont icon-jigou">&nbsp;&nbsp;</span>银行机构</a></li>
					</ul>
			</li>
		</ul> -->
		<!--导航结束-->
		<div class="right login ">
			<el-badge is-dot hidden class='item ' style="margin-top:-4px;" >
				<span class="iconfont icon-tuichu icon-header" @click='logout' style="font-size: 20px;    margin-top: -13px;"></span>
			</el-badge>
		</div>

	</div>
</template>
<script type="text/javascript">
import Vue from 'vue'
import authorityService from 'common/api/service/authorityService'
import dispatch from 'module/member/service/dispatch'
import {
  Badge
} from 'element-ui'
Vue.use(Badge)

export default {
  name: 'index-nav',
  data: function () {
    return {
      show: false
    }
  },
  methods: {
    logout () {
      authorityService.logout.remote({}, () => {
        dispatch.logout()
      })
    }
  }
}

</script>
