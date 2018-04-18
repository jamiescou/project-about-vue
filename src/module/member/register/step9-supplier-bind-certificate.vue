<template>
  <div class="step9-sbc">
    <div class="inner-wrap">
      <h2 class="tit2">数字证书</h2>
      <p>（操作资产时身份确认时使用）</p>
      <p>请安装XXXX控件........</p>
      <p>企业名称</p>
      <p>XX证书DN：96016818600699069 091095091951</p>
      <el-button class="okbtn" type="primary" @click="onSubmit">下一步</el-button>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'step9-sbc',
  components: {
  },
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
      }
    }
  },
  methods: {
    onSubmit () {
    },
    login () {
      // 登录
    }
  }
}

</script>
