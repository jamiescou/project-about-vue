<template>
	<div class="header">
		<!--logo开始-->
		<div class="logo">
			<img src="../../common/image/indexLogo.png" style="width:250px;margin-left: 180px;margin-top: 16px;float: left;"> <span style="padding-top: 35px;display:block;margin-left:356px;"></span>
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
	</div>
</template>
<script type="text/javascript">
export default {
  name: 'index-nav',
  data: function () {
    return {
      show: false
    }
  }
}

</script>
