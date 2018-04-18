<template>
  <div class="content-area" slot="body">
      <div v-title='title'>{{title}}</div>
      <div class="group">
          <div class="span12 path-nav offset0">
              <ol>
                  <li>凭证管理</li>>
                  <li><strong>凭证登记</strong></li>
              </ol>
          </div>
      </div>
      <div class="content-body" >
        <div v-show='next===false'>
          <div class="group  font1" style="margin-top: 20px;height:15px;">
            <label class="form-label fl-ie9"  style="margin-left:77px;">凭证编号：</label>
            <div class="field">{{no}}</div>
          </div>
          <!--<div class="group font1 mb8-ie9" style="margin-top: 20px;height:15px;">
              <label class="form-label fl-ie9 mr15"  style="margin-left: 25px;">是否上传贸易信息</label>
              <el-radio-group v-model="isUploadTradeInfo">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>
          </div>-->
          <el-form id="formId" :model="formField" :rules="rules" ref="formField"  :inline="false"  class="unite-form "  action="" label-width="150px" >
              <fieldset>
                  <div class="group form-row " style="margin-top: 20px;"></div>
                  <el-row >
                    <el-col :span="10">
                      <el-form-item
                      label="指定供应商"
                      prop='selectName'>
                      <el-autocomplete
                        v-model="formField.selectName"
                        :fetch-suggestions="querySearchAsync"
                        placeholder="请输入指定供应商名称"
                        @select="handleSelect"
                        style="width:100%"
                        icon="null iconfont icon-qiye1">
                      </el-autocomplete>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row >
                    <el-col :span="10">
                      <el-form-item label="供应商名称" prop="companyName" >
                          <el-input
                            v-model="formField.companyName"
                            placeholder="请输入供应商名称"
                            :disabled="true"
                          ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="区块链账户地址"  >
                        <!-- <el-tooltip class="item" effect="dark" :disabled='formField.address===""' :content="formField.address" placement="top"> -->
                          <el-input
                            v-model="formField.address"
                            placeholder="请输入区块链账户地址"
                            :disabled="true"
                          ></el-input>
                        <!-- </el-tooltip> -->
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row >
                    <el-col :span="10">
                      <el-form-item label="银行账号"  >
                          <el-input
                            v-model="formField.bankAccount"
                            placeholder="请输入银行账号"
                            :disabled="true"
                          ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="银行名称"  >
                          <el-input
                            v-model="formField.bankName"
                            placeholder="请输入银行名称"
                            :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
              </fieldset>

              <fieldset>
                  <div class="dashed-line mb30" style="border-color: #339999;"></div>
                  <div v-if='false'>
                      <el-form-item label="授信类型" prop="needCredit">
                          <el-radio-group v-model="formField.needCredit" @change='creditType'>
                            <el-radio label="0">无授信</el-radio>
                            <el-radio label="0">保贴授信</el-radio>
                          </el-radio-group>
                      </el-form-item>
                  </div>

                  <el-row v-show="formField.needCredit === '1'">
                    <el-col :span="10">
                      <el-form-item label="剩余额度">
                        <el-input
                          placeholder="剩余额度"
                          v-model="formField.remainingAmount"
                          :disabled="true">
                          <template slot="append">元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="剩余额度大写">
                          <el-input
                            placeholder="剩余额度大写"
                            v-model="formField.remainingAmountBig"
                            :disabled="true">
                          </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row >
                    <el-col :span="10">
                      <el-form-item label="付款金额"  prop='value'>
                        <el-input
                          placeholder="请输入付款金额"
                          v-model="formField.value"
                          autocomplete="off"
                          @change = "toBig"
                          @blur = 'twoDigit'>
                          <template slot="append">元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="付款金额大写"  >
                          <el-input
                            placeholder="付款金额大写"
                            v-model="formField.valueBig"
                            :disabled="true">
                          </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row >
                    <el-col :span="10">
                      <el-form-item label="付款日期" prop='cashTimeView'>
                        <el-date-picker
                          type="date"
                          placeholder="请选择日期"
                          v-model = "formField.cashTimeView"
                          @change = 'cashTimeChange'
                          style="width:100%"
                          :picker-options="pickerOptions"
                          :editable='false'
                          autocomplete="off"
                          >
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row >
                    <el-col :span="22">
                      <el-form-item label="凭证备注">
                        <el-input
                          type="textarea"
                          :rows="4"
                          placeholder="请输入凭证备注"
                          v-model="formField.remark"
                          @change="remarkChange"
                          style="width:100%;">
                        </el-input>
                          <span style="float: right;">还能输入<span class="require">{{length}}</span>个字符</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="20">
                          <el-form-item label="付款类型" prop="paymentType">
                              <el-radio-group v-model="formField.paymentType" @change='payTypeChange'>
                                <el-radio label="0">一次性付款</el-radio>
                                <el-radio label="1">分期付款</el-radio>
                              </el-radio-group>
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="20">
                        <el-checkbox style="margin-left:150px;" v-model="checkedPromiss" ref='canRead'>我已同意<a @click.stop.prevent='dialogToggle'>《付款承诺函》</a></el-checkbox>
                    </el-col>
                  </el-row>

                  <div v-show="isUploadTradeInfo === '1'" style="width:100%; padding-left:30px;">
                    <div class="dashed-line" style="margin-left:-30px; border-color:#339999;"></div>
                    <div class='mt20 mb10 font3'>附：贸易信息</div>
                    <tradeinfo></tradeinfo>
                  </div>
                  <div class="group form-row " style="margin-top: 20px;">
                      <span class="wrapper center center-ie9">
                        <el-button class="button-bubi-theme center-ie9" :disabled="!checkedPromiss" type="info" size="small" @click = "preview">提交预览</el-button>
                      </span>
                  </div>
              </fieldset>
          </el-form>
        </div>
        <div v-if='next===true'>
          <!--凭证模版-->
          <cvoucher :voucher='detail'></cvoucher>
          <div class="font1" style="width:942px;margin:20px auto;">
            <span class="require">＊</span> 确认登记后，需在待提交凭证中完成提交审批操作。
          </div>
          <div class="group form-row " style="margin:20px;text-align:center">
              <span class="wrapper center center-ie9">
                <el-button class="button-bubi-theme"  type="info" size="small" @click = "next=false">上一步</el-button>
                <el-button class="button-bubi-theme"  type="info" size="small" @click = "redirect">确认</el-button>
              </span>
          </div>
        </div>
    </div>
    <cletter ref='letterDialog' v-on:read-letter='agreeMentChange' title='付款承诺函'></cletter>
  </div>
</template>

<script type="text/javascript">
import model from 'common/api/voucherTemplate'
import smallToBig from 'common/javascript/tools/smallToBig'
import moneyTools from 'common/javascript/tools/moneyTools'
import cvoucher from 'components/entries/common/voucher'
import cletter from 'components/entries/common/payCommitmentLetter'
import tradeinfo from 'components/entries/common/voucher-tradeInfo'
import voucherService from 'common/api/service/voucherService'
import companyService from 'common/api/service/companyService'

export default {
  name: 'app',
  components: {
    cvoucher,
    cletter,
    tradeinfo
  },
  data () {
    let d = new Date()
    return {
      date: d,
      no: '',
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      letterVisible: false,
      title: '凭证登记',
      currentCompany: {
        bankCard: {
          bankName: null,
          bankType: null,
          id: 0,
          no: 0
        },
        blockchainAddress: null,
        id: 0,
        name: null
      },
      next: false,
      isUploadTradeInfo: '1',
      show: true,
      value8: '',
      length: 50,
      checkedPromiss: true,
      readyForWrite: false,
      detail: {
      },
      tradeInfoFiles: [],
      contract: {
        status: false,
        no: null,
        goodsInfo: null
      },
      formField: {
        cashTimeView: '',
        selectName: '',
        companyName: '',
        needCredit: '0',
        paymentType: '',
        bankAccount: '', // 银行账号
        address: '', // 区块链地址
        bankName: '', // 银行名称
        remainingAmount: 0, // 剩余金额
        remainingAmountBig: '', // 剩余金额大写
        valueBig: '', // 对付金融大写
        cashTime: '',
        companyId: '', // 供应商ID
        createdCompanyId: '', // 创建者Id  不填数据
        needFile: false, // 是否上传文件
        no: '', // 凭证编号
        remark: '', // 备注
        value: '', // 兑付金额
        fileIds: []
      },
      rules: {
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
              const tip = '兑付金额不能大于剩余额度'
              if (this.formField.remainingAmount === undefined) {
                callback(new Error(tip))
              }
              if (parseFloat(value) > parseFloat(moneyTools.delcommafy(this.formField.remainingAmount)) && this.formField.needCredit === '1') {
                callback(new Error(tip))
              }
              callback()
            },
            trigger: 'change, blur' }
        ],
        cashTimeView: [
          { type: 'date', required: true, message: '必须填写', trigger: 'change' }
        ],
        selectName: [
          { required: true, message: '必须填写', trigger: 'change' }
        ],
        paymentType: [
          { required: true, message: '必须填写', trigger: 'change' }
        ],
        needCredit: [
          { required: true, message: '必须填写', trigger: 'change' },
          { validator: (rule, value, callback) => {
            if (this.formField.value !== '') {
              this.$refs.formField.validateField('value')
              callback()
            }
          },
            trigger: 'change, blur'
          }
        ]
        // companyName: [
        //   {
        //     validator: (rule, value, callback) => {
        //       value = moneyTools.delcommafy(value)
        //       if (value === '' || !value) {
        //         callback(new Error('请选择供应商！'))
        //       }
        //       callback()
        //     },
        //     trigger: 'change' }
        // ]
      },
      tableData: [],
      headers: {'Accept': '*/*'},
      supplierData: []
    }
  },
  beforeMount () {
    // 当前登录人企业信息
    companyService.getCurrentCompany.remote({}, (result) => {
      this.currentCompany = result.data
      this.currentCompany.bankCard = result.data.subAccount
      this.formField.createdCompanyId = result.data.id
    })
    // const me = this
    // this.$bus.$on('info-init', function (info) {
    //   me.currentCompany = info
    // })
    // 授信额度
    companyService.getCurrentCompanyCredit.remote({}, (result) => {
      if (result.success) {
        if (result.data) {
          // if (credit.value === 0 || credit.value === '0') {
          //   this.$message.error('剩余额度不足')
          // }
          var credit = result.data[0]
          this.formField.remainingAmount = moneyTools.moneyNarrow(credit.value)
          this.formField.remainingAmountBig = smallToBig(moneyTools.doubleDigit(credit.value / 10000))
        } else {
          this.formField.remainingAmount = moneyTools.moneyNarrow(0)
          this.formField.remainingAmountBig = smallToBig(moneyTools.doubleDigit(0))
        }
      } else {
        this.$message.error('获取授信信息失败!')
      }
    })
    // 获取凭证编号
    voucherService.getVoucherNo.remote({}, (result) => {
      this.formField.no = result.data
      this.no = 'NO.' + result.data
    })
    this.$bus.$on('voucher-tradeinfo', info => {
      this.tradeInfoFiles = info
    })
    this.$bus.$on('contractInfo', info => {
      this.contract.status = info.status
      this.contract.no = info.contractNo
      this.contract.goodsInfo = info.goodsInfo
    })
  },
  mounted () {
    setTimeout(() => {
      this.$refs['formField'].resetFields()
      this.$refs['formField'].resetFields()
      this.$refs['formField'].resetFields()
    }, 1000)
    this.supplier()
  },
  methods: {
    preview: function () {
      const self = this
      if (self.isUploadTradeInfo === '1' && !this.contract.status) {
        this.$bus.$emit('contractStatus', 1)
      }
      this.$refs.formField.validate((valid) => {
        if (valid) {
          if (self.isUploadTradeInfo === '1' && !this.contract.status) {
            this.$bus.$emit('contractStatus', 1)
            return
          }
          // if (self.isUploadTradeInfo === '1' && this.tradeInfoFiles.length === 0) {
          //   this.$message.error('请上传贸易文件')
          //   return
          // }
          var detail = {}
          detail.no = this.formField.no
          detail.value = moneyTools.delcommafy(self.formField.value)
          detail.cashTime = this.formField.cashTime
          detail.remark = this.formField.remark
          detail.originCreateCompany = {
            name: this.currentCompany.name
          }
          detail.createCompany = {
            name: this.currentCompany.name,
            subAccount: {
              no: this.currentCompany.bankCard.no,
              bankName: this.currentCompany.bankCard.issuer.name
            }
          }
          detail.company = {
            name: this.formField.companyName,
            subAccount: {
              bankName: this.formField.bankName,
              no: this.formField.bankAccount
            }
          }
          this.detail = detail
          this.$bus.$emit('voucher-refurbish', this.detail)
          self.next = true
        } else {
        }
      })
    },

    removeByValue (arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
          arr.splice(i, 1)
          break
        }
      }
    },
    creditType (value) {
      if (this.formField.needCredit === '0' && this.formField.value !== '') {
        this.$refs.formField.validateField('value')
      }
      // this.formField.value = null
    },
    remarkChange (value) {
      if (value.length > 50) {
        // 异步处理
        setTimeout(() => {
          this.formField.remark = value.substring(0, 50)
        }, 10)
        this.length = 0
        return
      }
      this.length = 50 - value.length
    },
    supplier () {
      companyService.supplierList.remote({value: ''}, (data) => {
        this.supplierData = data
      })
    },
    querySearchAsync (queryString, cb) {
      // const restaurants = this.restaurants
      // const results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
      if (queryString === '') {
        cb(this.supplierData)
        return
      }
      companyService.supplierList.remote({value: queryString}, (data) => {
        cb(data)
      })
    },
    cashTimeChange (value) {
      this.$refs.formField.validateField('cashTimeView')
      this.formField.cashTime = value
    },
    toBig (value) {
      // 处理千分符
      this.formField.value = moneyTools.commafy(moneyTools.delcommafy(value.toString())) // + point
      // 处理空
      if (!moneyTools.delcommafy(value)) {
        this.formField.valueBig = ''
        return
      }
      // 处理金额大写
      this.formField.valueBig = smallToBig(moneyTools.delcommafy(value))
      this.$refs.formField.validateField('value')
    },
    twoDigit () {
      this.formField.value = moneyTools.delcommafy(this.formField.value)
      // 保留两位小数 + 千分符
      this.formField.value = moneyTools.moneyShow(this.formField.value)
    },
    handleSelect (item) {
      if (this.formField.selectName) {
        this.$refs.formField.validateField('selectName')
      }
      if (this.formField.companyId === item.id) return
      companyService.getCompanyById.remote({id: item.id}, (result) => {
        if (result.success) {
          this.formField.companyName = result.data.name
          this.formField.companyId = result.data.id
          this.formField.bankAccount = result.data.subAccount.no
          this.formField.address = result.data.blockchainAddress
          this.formField.bankName = result.data.subAccount.issuer.name
        } else {
          this.$message.error('获取企业信息失败!')
        }
      })
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.value.indexOf(queryString.toLowerCase()) === 0)
      }
    },
    redirect () {
      // if (this.isUploadTradeInfo === '1' && this.tradeInfoFiles.length === 0) {
      //   this.$message.error('请上传贸易文件')
      //   return
      // } else if (this.isUploadTradeInfo === '1' && this.tradeInfoFiles.length !== 0) {
      //   this.tradeInfoFiles[0].detailCreateVO.name = this.contract.no
      //   this.tradeInfoFiles[0].detailCreateVO.content = this.contract.goodsInfo
      // }
      let params = {
        'cashTime': this.formField.cashTime,
        'companyId': this.formField.companyId,
        'createdCompanyId': this.formField.createdCompanyId,
        'needFile': this.isUploadTradeInfo === '1',
        'no': this.formField.no,
        'remark': this.formField.remark,
        'value': this.formField.value,
        'needCredit': this.formField.needCredit === '1',
        'paymentType': this.formField.paymentType === '0' ? 'FULL_PAYMENT' : 'DIVIDED_PAYMENT',
        'detail': (this.isUploadTradeInfo === '1' && this.tradeInfoFiles.length !== 0) ? this.tradeInfoFiles : null
      }
      params.value = moneyTools.delcommafy(params.value)
      params.cashTime = this.formField.cashTimeView.getTime() + (24 * 60 * 60 - 1) * 1000
      this.$http.post('/service/voucher', params, response => {
        let result = model[response.config.url](response, this)
        if (result.success) {
          location.href = '#/assistant/success?content=凭证信息登记成功！如需提交审批，请在暂存凭证中进行操作！&active=/voucher/create'
        } else {
        }
      })
    },
    dialogToggle () {
      // if (!this.readyForWrite) {
      //   this.$bus.$emit('message-error', {
      //     message: '请先选择供应商！'
      //   })
      //   return
      // }
      const info = {
        show: true,
        partya: this.currentCompany.name,
        partyaBank: this.currentCompany.bankCard.no,
        payDate: this.formField.cashTimeView,
        payAmount: this.formField.value,
        payAmount2: this.formField.valueBig,
        partyb: this.formField.companyName,
        partybBank: this.formField.bankAccount
      }
      this.$refs.letterDialog.$emit('toggle-dialog', info)
    },
    agreeMentChange () {
      this.checkedPromiss = true
    },
    // radio按钮组值改变触发
    payTypeChange () {
      this.$refs.formField.validateField('paymentType')
    }
  }
}
</script>
