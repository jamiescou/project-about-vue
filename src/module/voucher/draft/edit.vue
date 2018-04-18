<template>
  <div class="content-area" slot="body">
      <div class="group">
          <div class="span12 path-nav offset0">
              <ol>
                  <li>凭证管理</li>>
                  <li><strong>凭证编辑</strong></li>
              </ol>
          </div>
      </div>
      <div class="content-body">
        <div v-show='next===0'>
          <div class="group  font1" style="margin-top: 20px;height:15px;">
            <label class="form-label "  style="margin-left:77px;">凭证编号：{{no}}</label>
            <!-- <div class="field"></div> -->
          </div>
          <!--<div class="group  font1" style="margin-top: 20px;height:15px;">
              <label class="span2 form-label mr15 fl-ie9"  style="max-width: 111px;margin-left:77px;">是否上传贸易信息</label>
              <el-radio-group v-model="isUploadTradeInfo" class="fl-ie9">
                <el-radio label="1">是</el-radio>
                <el-radio label="2" disabled >否</el-radio>
              </el-radio-group>
          </div>-->
          <el-form id="formId" :data="voucher" :model="formField" :rules="rules" ref="formField"  :inline="false"  class="unite-form fl-ie9"  action="" label-width="150px" >
              <fieldset>
                  <div class="group form-row " style="margin-top: 20px;">
                      <!-- <label class="span5 form-label" style="color: #990000;"><span class="iconfont icon-iconset0144" style="vertical-align: middle;"></span>该账户未进行会员认证，无法进行应收账款凭证登记。<a class='apointer'>马上会员认证</a></label> -->
                  </div>
                  <el-row >
                    <el-col :span="10">
                      <el-form-item label="指定供应商" prop='selectName'>
                        <el-autocomplete
                          v-model="formField.selectName"
                          :fetch-suggestions="querySearchAsync"
                          placeholder="请输入内容"
                          @select="handleSelect"
                          style="width:100%"
                          icon="null iconfont icon-qiye1">
                        </el-autocomplete>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row >
                    <el-col :span="10">
                      <el-form-item label="供应商名称">
                          <el-input
                            size="small"
                            v-model="formField.companyName"
                            placeholder="供应商名称"
                            :disabled="true"
                          ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="区块链账户地址"  >
                          <el-input
                            size="small"
                            v-model="formField.address"
                            placeholder="区块链账户地址"
                            :disabled="true"
                          ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row >
                    <el-col :span="10">
                      <el-form-item label="银行账号"  >
                          <el-input
                            size="small"
                            v-model="formField.bankAccount"
                            placeholder="银行账号"
                            :disabled="true"
                          ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="银行名称"  >
                          <el-input
                            size="small"
                            v-model="formField.bankName"
                            placeholder="银行名称"
                            :disabled="true"
                          ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
              </fieldset>

              <fieldset>
                  <div class="dashed-line" style="margin-bottom:30px; border-color: #339999;"></div>

                  <!--<div>
                      <el-form-item label="授信类型" prop="needCredit">
                          <el-radio-group v-model="formField.needCredit">
                            <el-radio label="0">无授信</el-radio>
                            <el-radio label="1">保贴授信</el-radio>
                          </el-radio-group>
                      </el-form-item>
                  </div>-->

                  <el-row  v-show="formField.needCredit === '1'" style="margin-top:30px">
                    <el-col :span="10">
                      <el-form-item label="剩余额度"  >
                        <el-input
                          size="small"
                          placeholder="剩余额度"
                          v-model="formField.remainingAmount"
                          :disabled="true">
                          <template slot="append">元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="剩余额度大写"  >
                          <el-input
                            size="small"
                            placeholder="剩余额度大写"
                            v-model="formField.remainingAmountBig"
                            :disabled="true"
                            >
                          </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row >
                    <el-col :span="10">
                      <el-form-item label="付款金额" prop='payAmount'>
                        <el-input
                          size="small"
                          placeholder="付款金额"
                          v-model="formField.payAmount"
                          @change = "toBig"
                          @blur = 'twoDigit'
                          >
                          <template slot="append">元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="付款金额大写">
                          <el-input
                            size="small"
                            placeholder="付款金额大写"
                            v-model="formField.valueBig"
                            :disabled="true"
                            >
                          </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row >
                    <el-col :span="10">
                      <el-form-item label="付款日期" prop='cashTimeView'>
                        <el-date-picker
                          type="date"
                          placeholder="选择日期"
                          v-model = "formField.cashTimeView"
                          @change = 'cashTimeChange'
                          format = 'yyyy-MM-dd'
                          size="small"
                          style="width:100%"
                          :picker-options="pickerOptions"
                          :editable='false'>
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row >
                    <el-col :span="20">
                      <el-form-item label="凭证备注"  >
                        <el-input
                          type="textarea"
                          :rows="4"
                          placeholder="请输入内容"
                          v-model="formField.remark"
                          @change="remarkChange"
                          >
                        </el-input>
                          <span style="float: right;">还能输入<span class="require">{{length}}</span>个字符
                          </span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="20">
                          <el-form-item label="付款类型" prop="paymentType">
                              <el-radio-group v-model="formField.paymentType">
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

                  <div style="width:100%;border-color: #339999;" v-show="isUploadTradeInfo === '1'">
                    <div class="dashed-line" style="border-color: #339999;"></div>
                    <div class='font3' style="margin-top:10px;margin-left:10px;">
                      附：贸易信息
                      <editTradeInfo :vouId="voucherId"></editTradeInfo>
                    </div>
                  </div>
                  <div class="group form-row " style="margin-top: 20px;text-align: center">
                      <span class="wrapper center center-ie9">
                        <el-button class="button-bubi-theme" type="info" size="small" @click = "cancel">取消</el-button>
                        <el-button class="button-bubi-theme" :disabled="!checkedPromiss" type="info" size="small" @click="preview">提交预览</el-button>
                      </span>
                  </div>
              </fieldset>
          </el-form>
        </div>
        <div v-if='next===1'>
          <cvoucher></cvoucher>
          <div class="font1" style="width:942px;margin:20px auto;">
            <span class="require">＊</span> 确认登记后，需在待提交凭证中完成提交审批操作。
          </div>
          <div class="group form-row " style="margin:20px;text-align: center">
              <span class="wrapper center center-ie9">
                <el-button class="button-bubi-theme"  type="info" size="small" @click = "next=0">上一步</el-button>
                <el-button class="button-bubi-theme"  type="info" size="small" @click = "redirect">确认</el-button>
              </span>
          </div>
        </div>
    </div>
    <cletter ref='letterDialog' v-on:read-letter='agreeMentChange' title='付款承诺函'></cletter>
  </div>
</template>

<script type="text/javascript">
import moneyTools from 'common/javascript/tools/moneyTools'
import smallToBig from 'common/javascript/tools/smallToBig'
import cvoucher from 'components/entries/common/voucher'
import dataTools from 'common/javascript/tools/dateTools'
import merge from 'webpack-merge'
import accountService from 'common/api/service/accountService'
import companyService from 'common/api/service/companyService'
// import voucherService from 'common/api/service/voucherService'
import coreCompanyVoucherService from 'common/api/service/coreCompanyVoucherService'
import cletter from 'components/entries/common/payCommitmentLetter'
import editTradeInfo from 'components/entries/common/voucher-edit-tradeInfo'

export default {
  name: 'app',
  components: {
    cvoucher,
    cletter,
    editTradeInfo
  },
  data () {
    let d = new Date()
    return {
      voucherId: this.$route.query.id,
      voucher: null,
      date: d,
      next: 0,
      isUploadTradeInfo: '1',
      no: '',
      value8: '',
      tradeInfoFiles: [],
      oldTradeInfoFiles: [],
      deletedFile: [], // 最终需要删除的文件
      deletedOldFile: [],
      length: 50,
      checkedPromiss: true,
      paymentId: '', // 付款函id
      paymentFileId: '',
      readyForWrite: false,
      contract: {
        status: true,
        no: null,
        goodsInfo: null
      },
      formField: {
        // 指定会员、供应商名称、区块链地址、银行账号、银行名称
        selectName: '',
        companyName: '',
        bankAccount: '',
        address: '',
        bankName: '',
        // 剩余金额、剩余金额大写、付款金额、付款金额大写、付款日期、凭证备注
        remainingAmount: 0,
        remainingAmountBig: '',
        payAmount: '',
        historyPayAmount: '',
        valueBig: '',
        cashTime: '',
        remark: '',
        cashTimeView: '',
        // 凭证编号、供应商ID、创建者Id（不填数据）、是否上传文件、上传文件相关域
        no: '',
        companyId: '',
        createdCompanyId: '',
        needFile: false,
        needCredit: '0',
        paymentType: null,
        fileIds: []
      },
      // 校验规则
      rules: {
        payAmount: [
          {required: true, message: '必须填写'},
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
              const tip = '兑付金额不能大于剩余额度 '
              if (this.formField.remainingAmount === undefined) {
                callback(new Error(tip))
              }
              if (parseFloat(value) > parseFloat(moneyTools.delcommafy(this.formField.remainingAmount)) && this.formField.needCredit === '1') {
                callback(new Error(tip))
              }
              callback()
            },
            trigger: 'change, blur'
          }
        ],
        cashTimeView: { type: 'date', required: true, message: '必须填写', trigger: 'change' },
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
              this.$refs.formField.validateField('payAmount')
              callback()
            }
          },
            trigger: 'change, blur'
          }
        ],
        companyName: [
          {
            validator: (rule, value, callback) => {
              value = moneyTools.delcommafy(value)
              if (value === '' || !value) {
                callback(new Error('请选择供应商！'))
              }
              callback()
            },
            trigger: 'change' }
        ]
      },
      tableData: [],
      supplierData: [],
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      }
    }
  },
  beforeMount () {
    this.$bus.$on('voucher-tradeinfo', info => {
      // this.deletedFile = info.deletedFile || []
      // this.tradeInfoFiles = info.filesArr || []
      this.tradeInfoFiles = info
    })
    this.$bus.$on('contractInfo', info => {
      this.contract.status = info.status
      this.contract.no = info.contractNo
      this.contract.goodsInfo = info.goodsInfo
    })
  },
  mounted () {
    this.voucherId = this.$route.query.id
    this.findVoucher()
    this.supplier()
  },
  methods: {
    // 查询凭证
    findVoucher () {
      const self = this
      coreCompanyVoucherService.getVoucher.remote({id: this.voucherId}, (result) => {
        this.voucher = result.data
        // 贸易信息
        this.isUploadTradeInfo = this.voucher.files.length > 0 ? '1' : '2'
        this.formField.needCredit = this.voucher.creditId === 0 ? '0' : '1'
        this.formField.paymentType = this.voucher.paymentType === 'FULL_PAYMENT' ? '0' : '1'
        this.oldTradeInfoFiles = this.voucher.files
        setTimeout(function () {
          self.$bus.$emit('voucher-tradeinfo-fiels', self.voucher.files)
        }, 100)
        // 指定会员、供应商名称、区块链账户地址、银行账号、银行名称
        this.formField.selectName = this.voucher.company.name
        this.formField.companyName = this.voucher.company.name
        this.formField.address = this.voucher.company.blockchainAddress
        this.formField.bankAccount = this.voucher.company.subAccount.no
        this.formField.bankName = this.voucher.company.subAccount.issuer.name
        // 付款金额、付款金额大写、付款日期、凭证备注
        this.formField.payAmount = moneyTools.commafy(moneyTools.doubleDigit(this.voucher.value))
        this.formField.historyPayAmount = moneyTools.commafy(moneyTools.doubleDigit(this.voucher.value))
        this.toBig(this.formField.payAmount)
        // 展示凭证编号
        this.no = this.voucher.no
        this.formField.cashTimeView = new Date(dataTools.dateFormater(this.voucher.cashTime, 'YYYY/MM/DD') + ' 00:00:00')
        this.formField.cashTime = dataTools.dateFormater(this.voucher.cashTime, 'YYYY.MM.DD')
        this.formField.remark = this.voucher.remark
        this.formField.no = this.voucher.no
        this.formField.companyId = this.voucher.company.id
        this.formField.createdCompanyId = this.voucher.createCompany.id
        this.getCurrentCompanyInfo()
        // const param = {
        //   no: this.no,
        //   partyBComId: this.formField.companyId
        // }
        // companyService.paymentLetter.remote(param, (info) => { // 获取付款函
        //   this.paymentId = info.data.id
        //   this.paymentFileId = info.data.fileId
        //   this.readyForWrite = true
        // })
        this.remarkChange(self.voucher.remark)
      })
    },
    // 限制备注为50字
    remarkChange (value) {
      if (value.length > 50) {
        setTimeout(() => {
          this.formField.remark = value.substring(0, 50)
        }, 10)
        this.length = 0
        return
      }
      this.length = 50 - value.length
    },
    // 供应商列表
    supplier () {
      accountService.supplierList.remote({value: ''}, (result) => {
        this.supplierData = result
      })
    },
    // 登录企业的信息
    getCurrentCompanyInfo () {
      // 登录企业信息
      companyService.getCurrentCompany.remote({}, (result) => {
        if (result.success) {
          this.currentCompany = result.data
          this.currentCompany.bankCard = result.data.subAccount
        } else {
          this.$message.error('获取授信信息失败!')
        }
      })
      // 登录企业授信信息
      companyService.getCurrentCompanyCredit.remote({}, (result) => {
        if (result.success) {
          // if (result.data.value === 0 || result.data.value === '0') {
          //   this.$message.error('剩余额度不足')
          // }
          if (result.data) {
            var credit = result.data[0]
            const value = parseFloat(credit.value / 10000) + (this.voucher.creditId === 0 ? 0 : parseFloat(moneyTools.delcommafy(this.formField.payAmount))) // 剩余额度 = 剩余额度+付款金额
            this.formField.remainingAmount = moneyTools.commafy(moneyTools.doubleDigit(value))
            this.formField.remainingAmountBig = smallToBig(moneyTools.doubleDigit(value))   // 处理授信额度大写
            this.$refs.formField.validateField('payAmount')
          } else {
            this.formField.remainingAmount = moneyTools.commafy(moneyTools.doubleDigit(0))
            this.formField.remainingAmountBig = smallToBig(moneyTools.doubleDigit(0))   // 处理授信额度大写
          }
        } else {
          this.$message.error('获取授信信息失败!')
        }
      })
    },
    querySearchAsync (queryString, cb) {
      if (queryString === '') {
        cb(this.supplierData)
        return
      }
      if (queryString !== this.formField.companyName) {
        this.formField.companyName = ''
        this.formField.bankAccount = ''
        this.formField.address = ''
        this.formField.bankName = ''
      }
      accountService.supplierList.remote({value: queryString}, (data) => {
        cb(data)
      })
    },
    cashTimeChange (value) {
      this.formField.cashTime = value
    },
    toBig (value) {
      // 处理千分符
      this.formField.payAmount = moneyTools.commafy(moneyTools.delcommafy(value.toString())) // + point
      // 处理空
      if (!moneyTools.delcommafy(value)) {
        this.formField.valueBig = ''
        return
      }
      // 处理金额大写
      this.formField.valueBig = smallToBig(moneyTools.delcommafy(value))
    },
    twoDigit () {
      this.formField.payAmount = moneyTools.delcommafy(this.formField.payAmount)
      // 保留两位小数 + 千分符
      this.formField.payAmount = moneyTools.moneyShow(this.formField.payAmount)
    },
    handleSelect (item) {
      if (this.formField.companyId === item.id) return
      companyService.getCompanyById.remote({id: item.id}, (result) => {
        if (result.success) {
          this.formField.companyName = result.data.name
          this.formField.companyId = result.data.id
          this.formField.bankAccount = result.data.subAccount.no
          this.formField.address = result.data.blockchainAddress
          this.formField.bankName = result.data.subAccount.issuer.name
          // const param = {
          //   no: this.no,
          //   partyBComId: this.formField.companyId
          // }
          // companyService.paymentLetter.remote(param, (info) => { // 获取付款函
          //   this.paymentId = info.data.id
          //   this.paymentFileId = info.data.fileId
          //   this.readyForWrite = true
          // })
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
    cancel () {
      history.go(-1)
    },
    dialogToggle () {
      const info = {
        show: true,
        partya: this.currentCompany.name,
        partyaBank: this.currentCompany.bankCard.no,
        payDate: this.formField.cashTimeView,
        payAmount: this.formField.payAmount,
        payAmount2: this.formField.valueBig,
        partyb: this.formField.companyName,
        partybBank: this.formField.bankAccount
      }
      this.$refs.letterDialog.$emit('toggle-dialog', info)
    },
    agreeMentChange () {
      this.checkedPromiss = true
    },
    // 凭证预览
    preview: function () {
      const self = this
      this.$refs.formField.validate((valid) => {
        if (self.isUploadTradeInfo === '1' && !this.contract.status) {
          this.$bus.$emit('contractStatus', 1)
        }
        if (valid) {
          // 贸易信息中文件的数量
          // let fileLength = self.oldTradeInfoFiles.length + self.tradeInfoFiles.length - self.deletedFile.length
          if (self.isUploadTradeInfo === '1' && !this.contract.status) {
            this.$bus.$emit('contractStatus', 1)
            return
          }
          // if (self.isUploadTradeInfo === '1' && (fileLength === 0)) {
          //   this.$message.error('请上传贸易文件')
          //   return
          // }
          let detail = {}
          detail.no = this.formField.no
          detail.value = moneyTools.delcommafy(self.formField.payAmount)
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
          this.detail = merge({}, detail)
          // 显示凭证预览
          self.next = 1
          setTimeout(() => {
            this.$bus.$emit('voucher-refurbish', detail)
          }, 100)
        } else {
        }
      })
    },
    redirect () {
      // if (this.isUploadTradeInfo === '2') {
      //   var files = this.oldTradeInfoFiles
      //   for (var i = 0; i < files.length; i++) {
      //     this.deletedOldFile.push(files[i].fileId)
      //   }
      // }
      // if (this.tradeInfoFiles.length) {
      //   this.tradeInfoFiles[0].detailCreateVO.name = this.contract.no
      //   this.tradeInfoFiles[0].detailCreateVO.content = this.contract.goodsInfo
      // } else if (this.contract.no !== '' || this.contract.goodsInfo !== '') {
      //   this.tradeInfoFiles.push({
      //     fileId: 0,
      //     type: '0',
      //     detailCreateVO: {
      //       content: this.contract.goodsInfo,
      //       name: this.contract.no
      //     }
      //   })
      // }
      this.editSaveVoucher()
    },
    // 保存
    editSaveVoucher () {
      let params = {
        cashTime: this.formField.cashTimeView.getTime() + (24 * 60 * 60 - 1) * 1000,
        companyId: this.formField.companyId,
        createdCompanyId: this.formField.createdCompanyId,
        id: this.voucherId,
        needCredit: this.formField.needCredit === '1',
        paymentType: this.formField.paymentType === '0' ? 'FULL_PAYMENT' : 'DIVIDED_PAYMENT',
        needFile: this.isUploadTradeInfo === '1',
        files: this.isUploadTradeInfo === '1' ? this.tradeInfoFiles : null,
        no: this.formField.no,
        remark: this.formField.remark,
        value: moneyTools.delcommafy(this.formField.payAmount)
        // updateFileId: this.isUploadTradeInfo === '1' ? this.deletedFile : this.deletedOldFile
      }
      coreCompanyVoucherService.editSave.remote(params, (result) => {
        if (result.success) {
          location.href = '#/assistant/success?content=凭证编辑完成！如需提交审批，请在暂存凭证中进行操作！&active=/voucher/draft'
        } else {
          alert('编辑失败')
        }
      })
    }
  }
}
</script>
