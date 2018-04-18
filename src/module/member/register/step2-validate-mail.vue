<template>
  <div class="step2-vm">
    <div class="inner-wrap">
      <span class="row-content">邮件已发送到您的邮箱</span>
      <span class="row-content apointer">quzhengyun@bubi.cn</span>
      <span class="row-content">请点击邮箱里的激活链接进行验证，即可完成区块链应收账款管理平台账号注册。</span>
      <div class="button-thin" style="width:100px;float:none;margin-left:50px;" @click="goMail">
        去验证邮箱
      </div>
      <span class="row-content">还没收到邮件？E-mail地址是否写错？请<span class="apointer">点击此处</span></span>
      <span class="row-content">请检查邮件是否在<span class="apointer">垃圾箱</span>里？</span>
      <span class="row-content">请稍等几分钟再查看邮件？</span>
      <span class="row-content">超过5分钟还未收到激活邮件，请点击<span class="apoiner">再次发送激活邮件</span></span>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'step2-vm',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    goMail () {
    }
  }
}

</script>
