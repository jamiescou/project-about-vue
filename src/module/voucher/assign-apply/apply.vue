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
      <div class="content-body" >
        <div v-show='next===0'>
          <div class="group  font1" style="margin-top: 20px;height:15px;">
            <label class="form-label fl-ie9"  style="margin-left: 25px;">凭证编号：</label>
            <div class="field">{{no}}</div>
          </div>
          <div class="group  font1" style="margin-top: 20px;height:15px;">
              <label class="span2 form-label fl-ie9 mr15"  style="max-width: 111px;margin-left: 25px;">是否上传贸易信息</label>
              <el-radio-group v-model="isUploadTradeInfo">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>
          </div>
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
                      <el-form-item label="区块链账户地址">
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
                      <el-form-item label="银行账号">
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
                  <div class="dashed-line" style="border-color: #339999;"></div>
                  <p style="margin:15px 55px;"><span class="require mr5">*</span>可转让金额＝凭证金额－已转出金额，转让申请金额不能超过当前可转让金额。</p>
                  <el-row >
                    <el-col :span="10">
                      <el-form-item label="可转让金额">
                        <el-input
                          size="small"
                          placeholder="可转让金额"
                          v-model="formField.canTransferAmount"
                          @change = "toBig2"
                          :disabled="true"
                          @blur = 'twoDigit'>
                          <template slot="append">元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="可转让金额大写">
                          <el-input
                            size="small"
                            placeholder="可转让金额大写"
                            v-model="formField.canTransferAmountBig"
                            :disabled="true"
                            >
                          </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="10">
                      <el-form-item label="转让申请金额"  prop="transformAmount">
                        <el-input
                          size="small"
                          placeholder="请输入转让申请金额"
                          v-model="formField.transformAmount"
                          @change = "toBig"
                          @blur = 'twoDigit'>
                          <template slot="append">元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="转让申请金额大写">
                          <el-input
                            size="small"
                            placeholder="转让申请金额大写"
                            v-model="formField.transformAmountBig"
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
                          placeholder="选择日期"
                          v-model = "formField.cashTimeView"
                          @change = 'cashTimeChange'
                          format = 'yyyy-MM-dd'
                          size="small"
                          style="width:100%"
                          :picker-options="pickerOptions"
                          :editable='false'
                          :disabled="true">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row >
                    <el-col :span="20">
                      <el-form-item label="凭证备注">
                        <el-input
                          type="textarea"
                          :rows="4"
                          placeholder="请输入内容"
                          v-model="formField.remark"
                          @change="remarkChange">
                        </el-input>
                          <span style="float: right;">还能输入<span class="require">{{length}}</span>个字符
                          </span>
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
          <cvoucher ></cvoucher>
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
import successTpl from 'module/assistant/success'
import dataTools from 'common/javascript/tools/dateTools'
import merge from 'webpack-merge'
import accountService from 'common/api/service/accountService'
import companyService from 'common/api/service/companyService'
import cletter from 'components/entries/common/letter0'
import editTradeInfo from 'components/entries/common/voucher-tradeInfo'
import voucherService from 'common/api/service/voucherService'
import supplierVoucherService from 'common/api/service/supplierVoucherService'

export default {
  name: 'app',
  components: {
    cvoucher,
    cletter,
    successTpl,
    editTradeInfo
  },
  data () {
    let d = new Date()
    return {
      voucherId: this.$route.query.id,
      voucher: null,
      date: d,
      next: 0,
      isUploadTradeInfo: '2',
      contract: {
        status: false,
        no: null,
        goodsInfo: null
      },
      no: '',
      value8: '',
      opCallback: {
        msg: '暂存凭证编辑成功',
        redirect: '/voucher/bounced'
      },
      checkedPromiss: true,
      paymentId: '', // 付款函id
      paymentFileId: '',
      readyForWrite: false,
      length: 50,
      tradeInfoFiles: [], // 需要增加的文件
      oldTradeInfoFiles: [], // 原贸易信息中文件的数量
      deletedFile: [], // 需要删除的文件
      deletedOldFile: [], // 删除原贸易所有文件
      formField: {
        // 指定会员、供应商名称、区块链地址、银行账号、银行名称
        selectName: '',
        companyName: '',
        bankAccount: '',
        address: '',
        bankName: '',
        // 剩余金额、剩余金额大写、付款金额、付款金额大写、付款日期、凭证备注
        canTransferAmount: '',
        transformAmount: '',
        historyPayAmount: '',
        canTransferAmountBig: '',
        cashTime: '',
        remark: '',
        cashTimeView: '',
        // 凭证编号、供应商ID、创建者Id（不填数据）、是否上传文件、上传文件相关域
        no: '',
        companyId: '',
        createdCompanyId: '',
        needFile: false,
        fileIds: []
      },
      // 校验规则
      rules: {
        transformAmount: [
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
              if (parseFloat(value) > parseFloat(this.voucher.value)) {
                callback(new Error('转让申请金额不能大于可转让金额'))
              }
              callback()
            },
            trigger: 'change,blur'
          }
        ],
        selectName: [
          { required: true, message: '必须填写', trigger: 'change' }
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
    // 获取凭证编号
    voucherService.getVoucherNo.remote({}, (result) => {
      this.formField.no = result.data
      this.no = 'NO.' + result.data
    })
  },
  methods: {
    // 查询凭证
    findVoucher () {
      const self = this
      supplierVoucherService.getVoucher.remote({id: this.voucherId}, (result) => {
        this.voucher = result.data
        // 贸易信息
        // this.isUploadTradeInfo = this.voucher.files.length > 0 ? '1' : '2'
        this.oldTradeInfoFiles = this.voucher.files
        setTimeout(function () {
          self.$bus.$emit('voucher-tradeinfo-fiels', self.voucher.files)
        }, 100)
        // 指定会员、供应商名称、区块链账户地址、银行账号、银行名称
        // this.formField.selectName = this.voucher.company.name
        // this.formField.companyName = this.voucher.company.name
        // this.formField.address = this.voucher.company.blockchainAddress
        // this.formField.bankAccount = this.voucherz.company.subAccount.no
        // this.formField.bankName = this.voucher.company.subAccount.bankName
        // 付款金额、付款金额大写、付款日期、凭证备注
        this.formField.canTransferAmount = moneyTools.commafy(moneyTools.doubleDigit(this.voucher.value))
        this.formField.historyPayAmount = moneyTools.commafy(moneyTools.doubleDigit(this.voucher.value))
        this.toBig2(this.formField.canTransferAmount)
        // 展示凭证编号
        // this.no = this.voucher.no
        this.formField.cashTimeView = new Date(dataTools.dateFormater(this.voucher.cashTime, 'YYYY/MM/DD') + ' 00:00:00')
        this.formField.cashTime = dataTools.dateFormater(this.voucher.cashTime, 'YYYY.MM.DD')
        // this.formField.remark = this.voucher.remark
        // this.formField.no = this.voucher.no
        this.formField.companyId = this.voucher.company.id
        this.formField.createdCompanyId = this.voucher.createCompany.id
        this.getCurrentCompanyInfo()
        // this.remarkChange(self.voucher.remark)
      })
    },
    twoDigit () {
      this.formField.transformAmount = moneyTools.delcommafy(this.formField.transformAmount)
      // 保留两位小数 + 千分符
      this.formField.transformAmount = moneyTools.moneyShow(this.formField.transformAmount)
    },
    toBig (value) {
      // 处理千分符
      // this.formField.value = moneyTools.commafy(moneyTools.delcommafy(value.toString())) // + point
      // 处理空
      if (!moneyTools.delcommafy(value)) {
        this.formField.transformAmountBig = ''
        return
      }
      // 处理金额大写
      this.formField.transformAmountBig = smallToBig(moneyTools.delcommafy(value))
    },
    toBig2 (value) {
      // 处理空
      if (!moneyTools.delcommafy(value)) {
        this.formField.canTransferAmountBig = ''
        return
      }
      // 处理金额大写
      this.formField.canTransferAmountBig = smallToBig(moneyTools.delcommafy(value))
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
      accountService.supplierList.remote({value: ''}, (data) => {
        this.supplierData = data
        this.suppliersData = data
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
    handleSelect (item) {
      if (this.formField.companyId === item.id) return
      companyService.getCompanyById.remote({id: item.id}, (result) => {
        if (result.success) {
          this.formField.companyName = result.data.name
          this.formField.companyId = result.data.id
          this.formField.bankAccount = result.data.subAccount.no
          this.formField.address = result.data.blockchainAddress
          this.formField.bankName = result.data.subAccount.bankName
        } else {
          this.$message.error('获取企业信息失败!')
        }
      })
    },
    dialogToggle () {
      const info = {
        show: true,
        companyName: this.currentCompany.name,
        fileId: this.paymentFileId,
        id: this.paymentId
      }
      this.$refs.letterDialog.$emit('toggle-dialog', info)
    },
    agreeMentChange () {
      this.checkedPromiss = true
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.value.indexOf(queryString.toLowerCase()) === 0)
      }
    },

    cancel () {
      history.go(-1)
    },
    // 凭证预览
    preview: function () {
      const self = this
      if (self.isUploadTradeInfo === '1' && !self.contract.status) {
        this.$bus.$emit('contractStatus', 1)
      }
      this.$refs.formField.validate((valid) => {
        if (valid) {
          if (self.isUploadTradeInfo === '1' && !self.contract.status) {
            this.$bus.$emit('contractStatus', 1)
            return
          }
          // 贸易信息中文件的数量
          // if (self.isUploadTradeInfo === '1' && (this.tradeInfoFiles.length === 0)) {
          //   this.$message.error('请上传贸易文件')
          //   return
          // }
          let detail = {}
          detail.no = this.formField.no
          detail.value = moneyTools.delcommafy(self.formField.transformAmount)
          detail.cashTime = this.voucher.cashTime
          detail.remark = this.formField.remark
          detail.originCreateCompany = this.voucher.originCreateCompany
          detail.createCompany = {
            name: this.currentCompany.name,
            subAccount: this.currentCompany.subAccount
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
      // if (this.isUploadTradeInfo === '1' && this.tradeInfoFiles.length === 0) {
      //   this.$message.error('请上传贸易文件')
      //   return
      // } else
      // if (this.isUploadTradeInfo === '1' && this.tradeInfoFiles.length !== 0) {
      //   this.tradeInfoFiles[0].detailCreateVO.name = this.contract.no
      //   this.tradeInfoFiles[0].detailCreateVO.content = this.contract.goodsInfo
      // }
      const data = {
        id: parseInt(this.voucherId),
        no: this.formField.no,
        targetComId: this.formField.companyId,
        value: moneyTools.delcommafy(this.formField.transformAmount),
        needFile: this.isUploadTradeInfo === '1',
        cashTime: this.voucher.cashTime,
        remark: this.formField.remark,
        vouFiles: (this.isUploadTradeInfo === '1' && this.tradeInfoFiles.length !== 0) ? this.tradeInfoFiles : null
      }
      supplierVoucherService.transferVoucher.remote(data, (result) => {
        if (result.data) {
          alert('转让成功')
          location.href = '#/voucher/assign'
          location.href = '#/assistant/success?content=凭证编辑完成！如需提交审批，请在暂存凭证中进行操作！&active=/voucher/assign-apply'
        } else {
          alert('哎呀，出错了')
        }
      })
    }
  }
}
</script>
