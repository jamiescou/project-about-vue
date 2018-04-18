<template>
  <div class="step10-ssp">
    <div class="inner-wrap">
      <h2 class="tit2">支付密码<span>（操作资产、资金转移时需输入，不能与登录密码一致）</span></h2>
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="支付密码">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="protocol">
            <el-checkbox v-model="checkedPromiss" ref='canRead' :disabled="canRead">我已同意<a @click.stop.prevent='dialogToggle'>《区块链应收账款管理平台协议》</a></el-checkbox>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="w300" type="primary" @click="onSubmit">下一步</el-button>
        </el-form-item>
      </el-form>
      <cletter  ref='letterDialog' v-on:read-letter='agreeMentChange' title='区块链应收账款管理平台协议'></cletter>
    </div>
  </div>

</template>

<script type="text/javascript">
import cletter from 'components/entries/common/letter'
export default {
  name: 'step10-ssp',
  components: {
    cletter
  },
  data () {
    return {

      canRead: true,          // 读协议
      checkedPromiss: false,  // 按钮

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
      var obj = {
        step: 7,
        msg: {
          tit: '身份认证已完成！',
          content: '系统将自动添加您的结算户信息。'
        }
      }
      this.$bus.$emit('reg-step', obj)
    },

    // 阅读协议弹框
    dialogToggle () {
      const info = {
        show: true,
        companyName: '公司'
      }
      this.$refs.letterDialog.$emit('toggle-dialog', info)
    },

    // 同意按钮
    agreeMentChange () {
      this.canRead = false
      this.checkedPromiss = true
    }
  }
}

</script>
