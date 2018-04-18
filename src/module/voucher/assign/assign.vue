<template>
    <div class="content-area register" >
      <div class="group">
          <div class="span12 path-nav  offset0 ">
              <ol>
                  <li>流转管理</li>>
                  <li>{{title}}</li>
              </ol>
          </div>
      </div>
      <div class="content-body supplier-voucher-assign" >
          <div v-show="next === 0">
              <div class="transferable-funds" style="padding-left:30px;">
                  <span class="font1" style="display:block;width:100%;"><strong>当前可流转金额（元）：{{voucher.value | moneyShow}}</strong></span>
                  <span class="font10"><span class="require">＊</span>可流转金额＝凭证金额－已转出金额，流转金额不能超过当前可流转金额。</span>
              </div>
              <div class="operation-detail">
                <el-form id="formId" :model="formField" :rules="formField.rules" ref="ruleForm" :inline="false" class="unite-form" action="">
                  <div class="box" style="height: 400px;background-size:930px 400px;">
                    <div class="header">
                      <span class="title"> 应收账款凭证 </span> <span class="secondary">{{voucher.originCreateCompany.name}}</span>
                      <span class="require cashTime font10 ">凭证登记方承诺 {{voucher.cashDate}} 付款。</span>
                      <span class="no">NO.{{formField.no}}</span>
                    </div>
                    <div class="certificatie-tbale-area">
                          <table class="certificate-table">
                            <tbody>
                                <tr>
                                    <td rowspan="3" class="center td-name"><span class="text-vertical">付款方</span></td>
                                    <td class="center">全称</td>
                                    <td width="280px">{{voucher.company.name}}</td>
                                    <td rowspan="3" class="center td-name"> <span class="text-vertical">收款方</span></td>
                                    <td colspan="2" class="center">全称</td>
                                    <td colspan="9" class="form-row payee supplier-voucher-assign-payee">
                                      <div class="field input-width">
                                        <el-form-item prop="companyName" label="" style="width:300px;">
                                          <el-autocomplete
                                            v-model="formField.companyName"
                                            :fetch-suggestions="querySearchAsync"
                                            placeholder="请输入收款方全称"
                                            @select="handleSelect"
                                            style="width:100%">
                                          </el-autocomplete>
                                        </el-form-item>
                                      </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="center">账号</td>
                                    <td>{{voucher.company.subAccount.no}}</td>
                                    <td colspan="2" class="center">账号</td>
                                    <td colspan="9">{{formField.bankAccount}}</td>
                                </tr>
                                <tr>
                                    <td class="center">开户行</td>
                                    <td>{{voucher.company.subAccount.bankName}}</td>
                                    <td colspan="2" class="center">开户行</td>
                                    <td colspan="9">{{formField.bankName}}</td>
                                </tr>
                                <tr class="">
                                    <td colspan="2" rowspan="2" class="center td-name"><span>付款金额</span></td>
                                    <td colspan="2" rowspan="2" class="pay-amount supplier-voucher-assign-pay-amount">
                                      <el-form-item label="" prop="value" style="width:300px;">
                                        <el-input type="text" style="width:300px;" v-model="formField.value" @change="voucherAmountChange" @blur = 'twoDigit' placeholder="请输入流转后付款金额"></el-input>
                                      </el-form-item>
                                    </td>
                                    <td class="center">亿</td>
                                    <td class="center">千</td>
                                    <td class="center">百</td>
                                    <td class="center">十</td>
                                    <td class="center">万</td>
                                    <td class="center">千</td>
                                    <td class="center">百</td>
                                    <td class="center">十</td>
                                    <td class="center">元</td>
                                    <td class="center">角</td>
                                    <td class="center">分</td>
                                </tr>
                                <tr height="33">
                                    <td v-for='item in valueArray' class="center" >{{item}}</td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="height:40px;" class="center td-name"><span>付款日期</span></td>
                                    <td colspan="2" class="form-row">
                                      <div class="field input-width">{{voucher.cashDate}}</div>
                                    </td>
                                    <td colspan="11"></td>
                                </tr>
                                <tr>
                                  <td colspan="2" class="noborder center td-name"><span>凭证备注</span></td>
                                  <td colspan="2" class="noborder">
                                    <el-form-item class="textarea-remark" label="" prop="remark" style="width:300px; margin-bottom: 8px; margin-left: 2px;margin-top:10px;">
                                      <el-input class="textarea" style="resize: none;"
                                        type="textarea"
                                        :autosize="{ minRows: 2, maxRows: 3}"
                                        placeholder="请输入内容"
                                        v-model="formField.remark">
                                      </el-input>
                                    </el-form-item>
                                  </td>
                                  <div class="sign-ellipse" >
                                      <span>{{voucher.company.name}}</span>
                                      <span>记账凭证</span>
                                  </div>
                                </tr>
                                <!-- <tr class="tr-remark">
                                    <td colspan="2" class="center noborder title-text">
                                      <div class="remark" v-show='voucher.blockchainaddress'>区块链智能合约编号</div>
                                    </td>
                                    <td colspan="20" class="noborder">
                                      <div class="remark" v-show='voucher.blockchainaddress'>{{voucher.blockchainaddress}}</div>
                                    </td>
                                </tr> -->
                              </tbody>
                          </table>
                      </div>
                  </div>
                </el-form>
              </div>

              <div class="protocol" style="padding-left:30px;">
                <el-checkbox v-model="checkedPromiss" ref='canRead' :disabled="canRead">我已同意<a @click.stop.prevent='dialogToggle'>《付款承诺函》</a></el-checkbox>
              </div>

              <div class="dashed-line" style="border-color: #339999;"></div>
              <div class="group  " style="margin-top: 20px;height:15px;">
                <label class="span2 form-label"  style="max-width:150px;margin-left:30px;">该转让是否附带贸易信息</label>
                <div class="field span1 ">
                    <input type="radio" name="radio1" v-model="info" @click = "infoToggle(1)" value="1"/>是
                </div>
                <div class="field span1 ">
                    <input type="radio" name="radio2" v-model="info" @click = "infoToggle(2)" value="2"/>否
                </div>
              </div>
              <div style="width:100%" v-show="show">
                  <div class='mt20 mb10 font3'>附：贸易信息</div>
                  <tradeinfo></tradeinfo>
              </div>
              <div class="group form-row">
                  <div class="center button-bar supplier-voucher-assign-btn">
                    <el-button type="primary" size="small" onclick="history.back();">取消</el-button>
                    <el-button type="primary" size="small" @click="submit" :disabled="!checkedPromiss">下一步</el-button>
                  </div>
              </div>
          </div>

          <div v-if="next === 1">
              <voucherTpl slot="operation-detail" :voucher="newVoucher"></voucherTpl>
              <div class="group form-row " style="margin:20px;">
                  <span class="wrapper center supplier-voucher-assign-btn">
                    <el-button class="button-bubi-theme"  type="info" size="small" @click = "next=0">上一步</el-button>
                    <el-button class="button-bubi-theme"  type="info" size="small" @click = "submit">确认</el-button>
                  </span>
              </div>
          </div>
      </div>

      <cletter ref='letterDialog' v-on:read-letter='agreeMentChange' title='付款承诺函'></cletter>
    </div>
</template>
<script type="text/javascript">
import dateTools from 'common/javascript/tools/dateTools'
import moneyTools from 'common/javascript/tools/moneyTools'
import smallToBig from 'common/javascript/tools/smallToBig'
import cletter from 'components/entries/common/letter'
import voucherTpl from 'components/entries/common/voucher'
import tradeinfo from 'components/entries/common/voucher-tradeInfo'
import voucherService from 'common/api/service/voucherService'
import accountService from 'common/api/service/accountService'
import companyService from 'common/api/service/companyService'
import supplierVoucherService from 'common/api/service/supplierVoucherService'

export default {
  name: 'app',
  components: {
    voucherTpl,
    cletter,
    tradeinfo
  },
  data () {
    let d = new Date()
    return {
      title: '凭证转让',
      next: 0,
      date: d,
      show: false,
      info: 2,
      supplierData: [],
      suppliersData: [],
      voucherId: null,
      targetComId: null,
      readyForWrite: false,
      // 付款函相关数据
      no: null,
      companyId: null,
      paymentId: null,
      paymentFileId: null,
      companyName: null,
      voucher: {
        formatValue: '123456',
        cashDate: null,
        company: {
          name: null,
          subAccount: {
            no: null,
            bankName: null
          }
        },
        originCreatedCompany: {
          name: null
        }
      },
      tradeInfoFiles: [],
      canRead: true,          // 读协议
      checkedPromiss: false,  // 按钮

      newVoucher: {
        no: null,
        valueBig: null,
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
      formField: {
        no: null,
        companyName: '',
        companyId: null,
        bankAccount: null,
        address: null,
        bankName: null,
        remark: '',
        value: '',
        needFile: false,
        payee: null,
        rules: {
          value: [
            { required: true, message: '必须填写', trigger: 'change' },
            {
              validator: (rule, value, callback) => {
                // const reg = /^[0-9]+(.[0-9]{1,2})?$/
                // if (!reg.test(this.formField.value)) {
                //   callback(new Error('请输入数字值'))
                // }
                //
                // if (parseFloat(this.formField.value) === 0) {
                //   callback(new Error('请输入有效的数字值'))
                // }
                value = moneyTools.delcommafy(value)
                const reg = /^\d+(\.\d{1,2})?$/
                if (value < 0) {
                  callback(new Error('金额为不为零的正数'))
                }

                if (parseFloat(value) === 0) {
                  callback(new Error('请输入有效的数字值'))
                }
                if (!reg.test(value)) {
                  callback(new Error('非0正数，保留小数点后两位'))
                }
                const tip = '付款金额不能大于可流转金额 '
                if (this.formField.value === undefined) {
                  callback(new Error(tip))
                }
                if (parseFloat(this.formField.value) > parseFloat(this.voucher.value)) {
                  callback(new Error(tip))
                }
                callback()
              },
              trigger: 'change'
            }
          ],
          companyName: [
            { required: true, message: '必须填写', trigger: 'change' }
          ],
          remark: [
            {
              validator: (rule, value, callback) => {
                if (value.length > 50) {
                  callback(new Error('凭证备注为50字内'))
                }
                callback()
              },
              trigger: 'change'
            }
          ]
        }
      }
    }
  },
  beforeMount () {
    this.$bus.$on('voucher-tradeinfo', info => {
      this.tradeInfoFiles = info
    })
  },
  mounted () {
    const self = this
    self.voucherId = self.$route.query.id
    self.findVoucher()
    self.supplier()
  },
  methods: {
    // 获得凭证详情
    findVoucher () {
      supplierVoucherService.getVoucher.remote({id: this.voucherId}, (result) => {
        this.voucher = result.data
        // this.voucher.blockchainaddress = 'voucher.blockchainaddress'
        // if (this.voucher.company.name.length > 13) { // 判断章中文字的大小
        //   this.isBig = false
        // }
        this.voucher.formatValue = moneyTools.commafy(moneyTools.doubleDigit(this.voucher.value))
        this.voucher.cashDate = dateTools.dateFormater(this.voucher.cashTime, 'YYYY-MM-DD')
        // 新凭证创建方
        this.newVoucher.cashTime = this.voucher.cashTime
        this.newVoucher.createCompany = this.voucher.company
        this.newVoucher.originCreateCompany.name = this.voucher.originCreateCompany.name
      })
      // 生成新的凭证编号
      voucherService.getVoucherNo.remote({}, (result) => {
        this.formField.no = result.data
        this.newVoucher.no = this.formField.no
      })
    },

    // 提交
    submit () {
      const self = this
      self.$refs.ruleForm.validate((valid) => {
        var supplierIsValid = false
        if (valid) {
          if (this.show && this.tradeInfoFiles.length === 0) {
            this.$message.error('请上传贸易文件')
            return
          }
          if (self.next === 0) { // 预览
            for (var i = 0; i < this.suppliersData.length; i++) {
              if (this.formField.companyName === this.suppliersData[i].name && this.formField.companyId === this.suppliersData[i].id) {
                supplierIsValid = true
                break
              }
            }
            if (!supplierIsValid) {
              this.$message.error('请选择正确的收款方')
              return
            }
            self.newVoucher.valueBig = smallToBig(this.formField.value)
            self.newVoucher.valueArray = moneyTools.dealValue(this.formField.value)
            self.newVoucher.remark = this.formField.remark
            self.newVoucher.value = moneyTools.delcommafy(this.formField.value)
            this.$bus.$emit('voucher-refurbish', self.newVoucher)
            self.next = 1
          } else {
            const data = {
              id: parseInt(this.voucherId),
              no: this.formField.no,
              targetComId: this.formField.companyId,
              value: moneyTools.delcommafy(this.formField.value),
              needFile: (this.show && this.tradeInfoFiles.length !== 0),
              cashTime: this.voucher.cashTime,
              remark: this.formField.remark,
              vouFiles: (this.show && this.tradeInfoFiles.length !== 0) ? this.tradeInfoFiles : null
            }
            supplierVoucherService.transferVoucher.remote(data, (result) => {
              if (result.data) {
                alert('转让成功')
                location.href = '#/voucher/assign'
              } else {
                alert('哎呀，出错了')
              }
            })
          }
        }
      })
    },

    // 查询供应商具体信息
    handleSelect (item) {
      const self = this
      companyService.getCompanyById.remote({id: item.id}, (result) => {
        if (typeof (result.data.subAccount) === 'undefined') {
          self.formField.bankAccount = ''
          self.formField.bankName = ''
          self.newVoucher.company.subAccount.bankName = ''
          self.newVoucher.company.subAccount.no = ''
        } else {
          self.formField.bankName = result.data.subAccount.bankName
          self.formField.bankAccount = result.data.subAccount.no
          self.newVoucher.company.subAccount.bankName = result.data.subAccount.bankName
          self.newVoucher.company.subAccount.no = result.data.subAccount.no
        }
        self.formField.companyName = result.data.name
        self.formField.companyId = result.data.id
        self.targetComId = result.data.id
        self.formField.address = result.data.blockchainAddress
        // 新凭证
        self.newVoucher.company.name = result.data.name

        const param = {
          no: 'NO.' + this.formField.no,
          partyBComId: this.formField.companyId
        }
        companyService.paymentLetter.remote(param, (info) => { // 获取付款函
          this.paymentId = info.data.id
          this.paymentFileId = info.data.fileId
          this.readyForWrite = true
          this.canRead = true
          this.checkedPromiss = false
        })
      })
    },

    // 查询所有供应商
    supplier () {
      accountService.supplierList.remote({value: ''}, (data) => {
        this.supplierData = data
        this.suppliersData = data
      })
    },
    querySearchAsync (queryString, cb) {
      if (queryString === '') {
        cb(this.supplierData)
        return
      }
      accountService.supplierList.remote({value: queryString}, (data) => {
        cb(data)
      })
    },

    // 阅读协议弹框
    dialogToggle () {
      if (!this.readyForWrite) {
        this.$bus.$emit('message-error', {
          message: '请先选择供应商！'
        })
        return
      }
      const info = {
        show: true,
        companyName: this.voucher.company.name,
        fileId: this.paymentFileId,
        id: this.paymentId
      }
      this.$refs.letterDialog.$emit('toggle-dialog', info)
    },

    // 同意按钮
    agreeMentChange (info) {
      let updateInfo = {
        fileId: info.fileId,
        id: info.id
      }
      companyService.paymentUpdate.remote(updateInfo, (info) => {
        if (info.data) {
          // 付款函上传并更新成功，进入业务
          this.canRead = false
          this.checkedPromiss = true
        } else {
          this.$message.error('付款函更新失败')
        }
      })
    },

    // 凭证金额监听
    voucherAmountChange (value) {
      var valueArray = moneyTools.dealValue(value)
      if (typeof (valueArray) === 'undefined') {
        this.valueArray = ['', '', '', '', '', '', '', '', '', '', '']
      } else {
        this.valueArray = valueArray
      }
    },
    twoDigit () {
      this.formField.value = moneyTools.delcommafy(this.formField.value)
      // 保留两位小数 + 千分符
      this.formField.value = moneyTools.moneyShow(this.formField.value)
    },
    infoToggle (info) {
      if (info === 1) {
        this.show = true
      } else {
        this.show = false
      }
    }
  }
}
</script>

<style>
  .td-name span{ font-weight:600; }
  .protocol{ margin:20px 0px }
  .operation-detail .box .header{ height: 80px; }
  .operation-detail .box .header .title{ margin-top: 15px; }
  .operation-detail .box .secondary{ margin-top: 22px; }
  .payee{ padding: 5px 5px; }
  .payee .el-form-item{ margin:0px; }
  /*.el-form-item__content{ margin-left: -150px; }*/
  .el-input input{ background: transparent; border-radius: 2px; }
  .input-width input{ background: transparent; border-radius: 2px;}
  .input-width{ position:relative; width:300px;}
  .input-width input{ padding:5px 10px !important;}
  .el-textarea{ max-height:65px; background: transparent;}
  .el-textarea__inner{ resize:none; max-height:65px; background: transparent; padding:5px 10px !important; }
  .transferable-funds{ position: relative; margin:10px 0px; float: inherit !important; height: auto; overflow: auto; }
  .el-input__icon{ top: 2px; }
  .transferable-funds span{ position: relative; float:left; padding:0px !important; vertical-align: inherit !important; }
  .stand-form{ margin-bottom:0px !important; }
  .form-row .field{ margin-bottom:0px; }
  .form-row .field .input-icon{ padding:3px 9px 0px 0px !important; }
  .pay-amount .el-form-item{margin-bottom:0px;}
  .pay-amount .el-form-item__content{margin-left:0px !important;}
  /*.bigSize{ font-size: 14px; }
  .smallSize{ font-size:8px; }*/
</style>
