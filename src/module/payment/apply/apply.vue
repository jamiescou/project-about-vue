

<template>
  <div class="content-area" >
    <div v-title='title'>
      {{title}}
    </div>
      <div class="group">
          <div class="span12 path-nav ">
              <ol>
                  <li>付款管理</li>>
                  <li><strong>{{title}}</strong></li>
              </ol>
          </div>
      </div>
      <div class="content-body">
        <cvoucher :voucher='detail'></cvoucher>

        <div class="font1" style="width:927px;margin:20px auto;">
          <el-form :model="ruleForm" :rules="rules" class="demo-ruleForm" ref='ruleForm'>
            <el-row >
              <el-col :span="10">
                <el-form-item label="待付款金额" label-width="110px">
                  <b>&nbsp;{{valuePay}} 元 </b>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="待付款金额大写"  label-width="170px">
                    <el-input
                      placeholder="付款金额大写"
                      v-model="valueBig"
                      :disabled="true">
                    </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="10">
                <el-form-item label="申请付款金额"  prop='value' label-width="110px">
                  <el-input
                    placeholder="请输入申请付款金额"
                    v-model="ruleForm.value"
                    @change = "toBig"
                    @blur = 'twoDigit'
                    :disabled = 'payFull'>
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="申请付款金额大写"  label-width="170px">
                    <el-input
                      placeholder="申请付款金额大写"
                      v-model="payValue"
                      :disabled="true">
                    </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="10">
                <el-form-item label="付款类型"  prop='payType' label-width="80px" class="is-required">
                  <el-radio-group v-model="ruleForm.payType" @change='checkType'>
                    <el-radio label="CASH_PAYMENT">现金</el-radio>
                    <el-radio label="BILL_PAYMENT">票据</el-radio>
                  </el-radio-group>
                  <div v-show='typeError' class="el-form-item__error" style="margin-top: -9px">请选择付款类型</div>
                </el-form-item>
              </el-col>
              <el-col :span="14">
              </el-col>
            </el-row>
          </el-form>
          <el-form :model="ruleForm" :rules="rules" class="demo-ruleForm">
            <el-form-item label="" prop="desc">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入申请理由"
                v-model="ruleForm.desc">
              </el-input>
              <div style="text-align: right">还能输入<span style='color: red'>{{length}}</span>个字符</div>
            </el-form-item>
          </el-form>
        </div>
        <!-- <div class="font1" style="width:942px;margin:0px auto;">
          <span class="require">＊</span>申请通过后该笔付款资金将从您的账户转移至凭证签收方（收款方）账户。
        </div> -->
        <div class="group form-row " style="margin:20px;text-align:center">
            <span class="wrapper center center-ie9">
              <el-button class="button-bubi-theme" type="info" size="small" @click = "cancle">取消</el-button>
              <el-button class="button-bubi-theme" type="info" size="small" @click = "redirect">确认</el-button>
            </span>
        </div>

      </div>
  </div>
</template>

<script type="text/javascript">
import 'common/css/lib/iconfont.css'
import 'common/css/lib/motherplate.css'
import 'common/sass/main.scss'
import 'common/sass/module/account.scss'
import voucherService from 'common/api/service/voucherService'
import cvoucher from 'components/entries/common/voucher'
import moneyTools from 'common/javascript/tools/moneyTools'
import smallToBig from 'common/javascript/tools/smallToBig'

export default {
  name: 'app',
  components: {
    cvoucher: cvoucher
  },
  data () {
    return {
      title: '付款申请确认',
      vouId: null,
      length: 20,
      payFull: null,
      typeError: false,
      detail: {
        no: null,
        value: null,
        capitalValue: null,
        cashTime: null,
        remark: null,
        originCreateCompany: {
          name: null
        },
        createCompany: {
          name: null,
          subAccount: {
            bankName: null,
            no: null
          }
        },
        company: {
          name: null,
          subAccount: {
            bankName: null,
            no: null
          }
        }
      },
      ruleForm: {
        desc: '',
        value: '',
        payType: ''
      },
      valueBig: '',
      valuePay: '',
      payValue: '',
      rules: {
        // payType: [
        //   {
        //     validator: (rule, value, callback) => {
        //       this.typeError = !value ? 'true' : false
        //       callback()
        //     },
        //     trigger: 'change' }
        // ],
        value: [
          { required: true, message: '必须填写', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              value = moneyTools.delcommafy(value)
              const reg = /^\d+(\.\d{1,2})?$/
              if (value < 0) {
                callback(new Error('金额为不为零的正数'))
              }
              if (parseFloat(value) === 0) {
                callback(new Error('请输入有效的数字值'))
              }
              if (parseFloat(value) > 999999999.99) {
                callback(new Error('金额过大！'))
              }

              if (!reg.test(value)) {
                callback(new Error('非0正数，保留小数点后两位'))
              }
              const tip = '付款金额不能大于待付款金额'
              if (parseFloat(value) > parseFloat(moneyTools.delcommafy(this.valuePay))) {
                callback(new Error(tip))
              }
              callback()
            },
            trigger: 'change' }
        ],
        desc: [
          {
            validator: (rule, value, callback) => {
              if (value.length > 20) {
                callback(new Error('请输入少于20个字符'))
                setTimeout(() => {
                  this.ruleForm.desc = value.substring(0, 20)
                  this.length = 0
                }, 1)
              } else {
                this.length = 20 - value.length
              }
            },
            trigger: 'change' }
        ]
      }
    }
  },
  beforeMount () {
    this.getVoucher()
  },
  mounted () {
    if (!this.payFull) {
      this.$refs.ruleForm.resetFields()
    }
  },
  methods: {
    redirect () {
      this.$refs.ruleForm.validate((valid) => {
        this.typeError = !this.ruleForm.payType ? 'true' : false
        if (valid && !this.typeError) {
          let params = {
            apply_reason: this.ruleForm.desc,
            vouId: this.vouId,
            value: moneyTools.delcommafy(this.ruleForm.value),
            type: this.ruleForm.payType
          }
          this.$http.post('/service/payapply/create', params, response => {
            let result = response.data
            if (result.data === null) {
              var eref = '#/assistant/error?content=' + result.error.errorMessage + ' &active=/payment/apply'
              location.href = eref
            } else {
              var ref = '#/assistant/success?content=付款申请提交成功！请耐心等待审批结果！&active=/payment/apply &title=申请结果'
              location.href = ref
            }
          })
        }
      })
    },
    cancle () {
      location.href = '#/payment/apply'
    },
    checkType (value) {
      this.typeError = !value ? 'true' : false
    },
    getVoucher () {
      this.id = this.$route.query.id
      voucherService.getVoucher.remote({id: this.id}, (result) => {
        this.detail = result.data
        this.detail.value = result.data.total
        this.valuePay = moneyTools.moneyShow(result.data.restValue)
        this.detail.originCreateCompany = result.data.createCompany || ''
        this.detail.createCompany.subAccount.bankName = result.data.createCompany.subAccount.issuer.name
        this.detail.company.subAccount.bankName = result.data.company.subAccount.issuer.name
        this.$bus.$emit('voucher-refurbish', this.detail)
        this.vouId = result.data.id
        this.valueBig = smallToBig(moneyTools.delcommafy(this.valuePay))
        this.payFull = result.data.paymentType === 'FULL_PAYMENT'
        if (this.payFull) {
          this.ruleForm.value = this.valuePay
          this.payValue = smallToBig(moneyTools.delcommafy(this.ruleForm.value))
        }
      })
    },
    toBig (value) {
      // 处理千分符
      this.ruleForm.value = moneyTools.commafy(moneyTools.delcommafy(value.toString())) // + point
      // 处理空
      if (!moneyTools.delcommafy(value)) {
        this.payValue = ''
        return
      }
      // 处理金额大写
      this.payValue = smallToBig(moneyTools.delcommafy(value))
    },
    twoDigit () {
      this.ruleForm.value = moneyTools.delcommafy(this.ruleForm.value)
      // 保留两位小数 + 千分符
      this.ruleForm.value = moneyTools.moneyShow(this.ruleForm.value)
    }
  }
}
</script>
