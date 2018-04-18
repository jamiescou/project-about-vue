<template>
  <el-form class="account-cash-confirm" :model="form" :rules="rules" ref="ruleForm" label-width="100px">
    <el-form-item label="付款账户">
      <p class="lh36">90693719606817696</p>
    </el-form-item>
    <el-form-item label="收款账户">
      <p class="lh36">XXX公司</p>
      <p class="p2">11086940289707928474624545</p>
      <p class="p3">招商银行</p>
    </el-form-item>
    <el-form-item  label="备注">
      <p class="lh36">无</p>
    </el-form-item>
    <el-form-item class="mb15" label="应付款金额">
      <p class="lh36"><span class="cbubi">4,000.00</span><span class="ml10 mr30">元</span><span>肆仟元整</span></p>
      <p class="p2 c666">（含提现金额 服务费）<span>查看收费标准</span></p>
    </el-form-item>
    <el-form-item label="支付密码">
      <el-input class="clearfix" v-model="form.name"></el-input>
      <div class="clearfix"></div>
      <p class=""><i class="iconfont icon-xuanze mr5"></i>数字证书检测成功！</p>
      <p class="top-tip"><i class="iconfont icon-iconset0144 mr5"></i>操作付款后，资金将直接转至收款账户中，无法撤回或退款。</p>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="modify()">返回修改</el-button>
      <el-button type="primary" @click="recharge()">确定提现</el-button>
    </el-form-item>
  </el-form>
</template>
<script type="text/javascript">
export default {
  name: 'app',
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
    modify () {
      this.$bus.$emit('cashConfirm', 1)
    },
    recharge () {
      location.href = '#/assistant/success?content=提交成功！等待银行处理中，可在‘提现记录’查询状态。&active=/account/sub-account'
    }
  }
}
</script>
