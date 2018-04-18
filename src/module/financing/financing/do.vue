<template>
    <div class="content-area">
        <div v-title='title'>{{title}}</div>
        <div class="group">
            <div class="span12 path-nav ">
                <ol>
                    <li>融资管理</li>>
                    <li><strong>{{title}}</strong></li>
                </ol>
            </div>
        </div>
        <div class="content-body apply-do">
            <div v-show="hasData1 === 1 && hasData2 === 1">
                <el-form :model="params" :rules="rules" ref="ruleForm" class="unite-form" label-width="120px">
                  <fieldset>
                    <div class="item-group">
                      <el-row>
                        <el-col>
                          <div class="item-cnt">
                              <!--<el-row>
                                  <el-col :span="20">
                                      <el-form-item label="选择融资方式" prop="finType" class="is-required">
                                          <el-radio-group v-model="params.finType">
                                            <el-radio label="HYPOTHECATION">质押融资</el-radio>
                                            <el-radio label="FACTOR">保理融资</el-radio>
                                          </el-radio-group>
                                          <div v-show='message.finType' class="el-form-item__error" style="margin-top: -9px">请选择融资方式</div>
                                      </el-form-item>
                                  </el-col>
                              </el-row>-->
                              <el-form-item label="选择贷款方" prop='creditSideId' :class="{'is-required': true, 'is-error': message.creditSideId}">
                                <el-select style="width:280px;" v-model="params.creditSideId" placeholder="请选择贷款方">
                                  <el-option
                                    v-for="item in bankOption"
                                    :label="item.name"
                                    :value="item.comId"
                                    :key='item.comId'>
                                  </el-option>
                                </el-select>
                                <div v-show='message.creditSideId' class="el-form-item__error">请选择贷款方</div>
                              </el-form-item>

                              <div class="dashed-line mb30" style="border-color: #339999;"></div>

                              <div class="item-group">
                                  <el-row>
                                    <el-col>
                                      <div class="item-tit"><span class="item-tit-icon"></span>凭证信息</div>
                                      <div class="item-cnt">
                                        <table class="table-tb">
                                            <thead>
                                                  <tr>
                                                      <th>凭证编号</th>
                                                      <th>凭证签发方</th>
                                                      <th>签发方承诺付款日期</th>
                                                      <th>凭证金额（元）</th>
                                                      <th>凭证余额（元）</th>
                                                      <th>凭证付款方</th>
                                                      <th>付款日期</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{{voucher.no}}</td>
                                                    <td>{{voucher.originCreateCompany.name}}</td>
                                                    <td>{{voucher.cashTime | timestampToDateDay}}</td>
                                                    <td>{{voucher.total | moneyShow}}</td>
                                                    <td>{{voucher.restValue | moneyShow}}</td>
                                                    <td>{{voucher.originCreateCompany.name}}</td>
                                                    <td>{{voucher.cashTime | timestampToDateDay}}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                      </div>
                                    </el-col>
                                  </el-row>
                              </div>
                              <div class="item-group">
                                  <el-row>
                                    <el-col>
                                      <div class="item-tit"><span class="item-tit-icon"></span>融资信息</div>
                                      <div class="item-cnt">
                                        <el-row >
                                          <el-col :span="8">
                                            <el-form-item label="本次融资金额"  prop='finAmount' label-width="108px">
                                                <el-input
                                                  placeholder="请输入融资金额"
                                                  v-model="params.finAmount"
                                                  @blur = 'twoDigit'
                                                  >
                                                </el-input>
                                            </el-form-item>
                                          </el-col>
                                          <el-col :span="8">
                                            <el-form-item label="" label-width="10px">
                                              {{finAmountBig}}
                                            </el-form-item>
                                          </el-col>
                                          <el-col :span="8">
                                            <el-form-item label="融资期限" prop='finLimit' label-width="80px">
                                                <el-input
                                                  placeholder="请输入融资期限"
                                                  v-model="params.finLimit">
                                                  <template slot="append">月</template>
                                                </el-input>
                                            </el-form-item>
                                          </el-col>
                                        </el-row>
                                        <!-- <el-row >
                                          <el-col :span="8">
                                            <el-form-item label="实际出账金额"  prop='value' label-width="110px">
                                              <el-input
                                                placeholder=""
                                                v-model="notSet"
                                                :disabled = 'true'>
                                              </el-input>
                                            </el-form-item>
                                          </el-col>
                                          <el-col :span="8">
                                            <el-form-item label="" label-width="10px">
                                            </el-form-item>
                                          </el-col>
                                          <el-col :span="8">
                                            <el-form-item label="融资比例"  label-width="80px">
                                                <el-input
                                                  placeholder="-"
                                                  v-model="notSet"
                                                  :disabled="true">
                                                </el-input>
                                            </el-form-item>
                                          </el-col>
                                        </el-row> -->
                                        <!-- <p><span class="require"> * </span><span class="c999">融资成功后，显示出账金额、融资比例。实际融资金额以贵阳银行实际出账金额为准。</span></p> -->
                                      </div>
                                    </el-col>
                                  </el-row>
                              </div>

                              <div class="pl30 pr30">
                                <div class="button-group mt30 mb30">
                                    <el-button class="cancel mr20" type="info" @click="goback">取消</el-button>
                                    <el-button class="confirm" type="info" @click="submit">提交</el-button>
                                </div>
                              </div>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                </fieldset>
              </el-form>
          </div>
          <div v-show="hasData1 === 2 || hasData2 === 2">
              <div class="tc m15"><i class="iconfont icon-iconset0144 cbubi mr5"></i>获取融资信息失败，<span class="cbubi pointer" @click="reload">点击这里</span>刷新重试。</div>
          </div>
      </div>
  </div>

</template>

<script type="text/javascript">

import 'common/css/lib/iconfont.css'
import 'common/css/lib/motherplate.css'
import 'common/sass/module/regular.scss'
import 'common/sass/module/account.scss'
import 'common/sass/module/table.scss'
import 'common/sass/module/supplier.scss'
import vnav from 'components/include/nav'
import left from 'components/include/member-left'
import vfooter from 'components/include/footer'
import supplierService from 'common/api/service/finance-management/supplierService'
import smallToBig from 'common/javascript/tools/smallToBig'
import moneyTools from 'common/javascript/tools/moneyTools'

export default {
  name: 'app',
  components: {
    vnav: vnav,
    left: left,
    vfooter: vfooter
  },
  data () {
    return {
      title: '申请详情',
      bankOption: null,
      params: {
        creditSideId: 5,
        finAmount: null,
        finType: 'HYPOTHECATION',
        finLimit: null,
        voucherId: null
      },
      hasData1: 0,
      hasData2: 0,
      finAmountBig: null,
      notSet: '-',
      voucher: {
        originCreateCompany: {
          name: null
        },
        createCompany: {
          name: null
        }
      },
      message: {
        // finType: false,
        creditSideId: false
      },
      rules: {
        finType: [
          {
            validator: (rule, value, callback) => {
              this.message.finType = !value ? 'true' : false
              callback()
            },
            trigger: 'change' }
        ],
        creditSideId: [
          {
            validator: (rule, value, callback) => {
              this.message.creditSideId = !value ? 'true' : false
              callback()
            },
            trigger: 'change' }
        ],
        finAmount: [
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
              if (!reg.test(value)) {
                callback(new Error('非0正数，保留小数点后两位'))
              }
              if (parseFloat(value) > parseFloat(this.voucher.restValue)) {
                callback(new Error('融资金额不可大于凭证余额'))
              }
              callback()
            },
            trigger: 'change' }
        ],
        finLimit: [
          { required: true, message: '必须填写', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              const reg = /^\+?[1-9][0-9]*$/
              if (value > 999) {
                callback(new Error('融资期限不可超过999个月'))
              }
              // if (parseFloat(value) === 0) {
              //   callback(new Error('请输入有效的数字值'))
              // }
              if (!reg.test(value)) {
                callback(new Error('融资期限仅可以输入正整数'))
              }
              callback()
            },
            trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    this.params.voucherId = this.$route.query.id
    this.$refs.ruleForm.resetFields()
    this.getGrid()
  },
  methods: {
    getGrid () {
      supplierService.voucherDetail.remote(this.params.voucherId, (list) => {
        if (list.success) {
          this.hasData1 = 1
          this.voucher = list.data || []
          this.params.finAmount = moneyTools.moneyShow(this.voucher.restValue)
          this.finAmountBig = smallToBig(this.voucher.restValue)
        } else {
          this.hasData1 = 2
        }
      })
      // 贷款方列表
      supplierService.bankQuery.remote((list) => {
        // this.bankOption = list.data || []
        if (list.success) {
          this.hasData2 = 1
          this.bankOption = [{
            comId: 5,
            name: '贵阳银行',
            type: 1
          }]
        } else {
          this.hasData2 = 2
        }
      })
    },
    twoDigit () {
      this.params.finAmount = moneyTools.delcommafy(this.params.finAmount)
      this.$refs.ruleForm.validateField('finAmount', valid => {
        if (!valid) {
          // 处理金额大写
          this.finAmountBig = smallToBig(this.params.finAmount)
        }
      })
      // 保留两位小数 + 千分符
      this.params.finAmount = moneyTools.moneyShow(this.params.finAmount)
    },
    goback () {
      if (confirm('确定取消融资吗？')) {
        history.go(-1)
      }
    },
    reload () {
      location.reload()
    },
    submit () {
      /*eslint-disable */
      // 使用case穿透，跳过eslint校验
      // 表单校验
      switch (true) {
        // case !this.params.finType: this.message.finType = true
        case !this.params.creditSideId: this.message.creditSideId = true
        default: break
      }
      /*eslint-disable */
      let result = false // 校验结果
      for (let item in this.message) {
        if (this.message[item]) {
          result = true
        }
      }
      this.$refs.ruleForm.validate(valid => {
        if (valid && !result) {
          let param = {
            creditSideId: this.params.creditSideId,
            finAmount: moneyTools.delcommafy(this.params.finAmount),
            finType: this.params.finType,
            finLimit: this.params.finLimit,
            voucherId: this.params.voucherId
          }
          supplierService.financingCreate.remote(param, (list) => {
            if (list.success) {
              if (list.data) {
                location.href = '#/assistant/success?content=凭证融资提交成功，等待审批！&active=/financing/financing'
              } else {
                this.$message.error(list.data.error.errorMessage)
              }
            } else {
              this.$message.error('提交失败，请重新提交')
            }
          })
        }
      })
    }
  }
}

</script>
