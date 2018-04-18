<template>
  <div class="content-area">
    <div v-title='title'>
      {{title}}
    </div>
    <div class="group">
        <div class="span12 path-nav offset0">
            <ol>
                <li>融资管理</li>>
                <li><strong>{{title}}</strong></li>
            </ol>
        </div>
    </div>
    <div class="content-body intention-info pt20 pr20 pb40 pl20">
        <div class="item-group">
          <div class="item-tit"><span class="item-tit-icon"></span>申请信息</div>
          <table class="table-lr" >
              <tbody>
                <tr>
                    <td class="l" width="200">供应商名称</td>
                    <td class="r" width="200">{{detail.fromName}}</td>
                    <td class="l" width="200">期望融资额度（元）</td>
                    <td class="r" width="200">{{detail.value}}</td>
                </tr>
                <tr>
                    <td class="l" width="200">申请期限（月）</td>
                    <td class="r" width="200">{{detail.timeLimit}}</td>
                    <td class="l" width="200">期望利率（%）</td>
                    <td class="r" width="200">{{detail.rate}}%</td>
                </tr>
                <tr>
                    <td class="l" width="200">联系人</td>
                    <td class="r" width="200">{{detail.linkmanName}}</td>
                    <td class="l" width="200">手机号</td>
                    <td class="r" width="200">{{detail.linkmanPhone}}</td>
                </tr>
                <tr>
                    <td class="l">申请时间</td>
                    <td class="r">{{detail.createTime}}</td>
                    <td class="l">状态</td>
                    <td class="r">待审批</td>
                </tr>
              </tbody>
          </table>
          <div class="font2 mt20">
            附：<a class="spointer" @click="letterDialog">《融资意向书》</a>
          </div>
          <div class="cnt">
            <intention  ref='intentDialog' :detail='detail' title='融资意向书'></intention>
          </div>
        </div>
        <div class="item-group" style="padding-top: 20px">
          <div class="item-tit"><span class="item-tit-icon"></span>审批信息</div>
          <div class="item-cnt">
            <el-form :rules="rules" :model="params" ref="approveOpinion" label-width="200px">
              <el-row>
                <el-col :span="9">
                  <el-form-item label="审批意见" >
                    <el-radio-group v-model="result" @change ='radioChange'>
                      <el-radio :label="false">通过</el-radio>
                      <el-radio :label="true">退回</el-radio>
                    </el-radio-group>
                  </el-form-item>
                 </el-col>
              </el-row>
              <el-row style="padding-left:200px">
                 <el-col :span="18" style="margin-left:-200px;">
                   <el-form-item label="" prop="reason">
                     <el-input
                       type="textarea"
                       :autosize="{ minRows: 2, maxRows: 4}"
                       placeholder="请输入审批意见。"
                       v-model="params.reason"
                       >
                     </el-input>
                     <div style="text-align: right">还能输入<span style='color: red'>{{length}}</span>个字符</div>
                   </el-form-item>
                 </el-col>
              </el-row>
              <div :class="{approveReject: result}">
                <el-row>
                  <el-col :span="9">
                    <el-form-item label="融资额度" prop='value'>
                     <el-input v-model="params.value" :disabled="result" @blur = 'twoDigit' @change = "toBig">
                        <template slot="append">元</template>
                     </el-input>
                    </el-form-item>
                   </el-col>
                   <el-col :span="15" class="inputMsg">供应商通过凭证所能融资的最大上限</el-col>
                </el-row>
                <el-row>
                  <el-col :span="9">
                    <el-form-item label="融资比率" prop='ratio'>
                     <el-input v-model="params.ratio" :disabled="result" @blur = 'checkRatio'>
                        <template slot="append">%</template>
                     </el-input>
                    </el-form-item>
                   </el-col>
                   <el-col :span="15" class="inputMsg">供应商通过凭证融资时凭证面值的打折比例</el-col>
                </el-row>
                <el-row>
                  <el-col :span="9">
                    <el-form-item label="融资利率" prop='rate'>
                     <el-input v-model="params.rate" :disabled="result" @blur = 'checkRate'>
                        <template slot="append">%</template>
                     </el-input>
                    </el-form-item>
                   </el-col>
                   <el-col :span="15" class="inputMsg">供应商还款时计息依据</el-col>
                </el-row>
                <el-row>
                  <el-col :span="9">
                    <div>
                      <el-form-item label="还款方式" prop='repayType'>
                        <el-select v-model="params.repayType" :disabled="result" placeholder="请选择还款方式" style="width: 100%">
                          <el-option
                            v-for="item in repayType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                     </div>
                   </el-col>
                   <el-col :span="15" class="inputMsg">供应商还款时所使用的方式</el-col>
                </el-row>
                <el-row>
                  <el-col :span="20">
                    <div>
                      <el-form-item label="辅助材料">
                        <el-checkbox-group
                          v-model="params.fileTypes"
                          >
                          <el-checkbox v-for="file in files" :label="file.value" :key="file.value" :value="file.value" :disabled="result">{{file.label}}</el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>
                    </div>
                   </el-col>
                </el-row>
                <el-row>
                  <el-col :span="9" class="msg">
                      供应商通提交凭证融资时所需要上传的材料。
                  </el-col>
                </el-row>
                <el-row>
                  <el-col style="margin-top: 10px">
                    <el-form-item>
                      <el-button type="primary" @click="cancel">取消</el-button>
                      <el-button type="primary" @click="onSubmit">确认</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
          </el-form>
          </div>
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
import vnav from 'components/include/nav'
import left from 'components/include/member-left'
import vfooter from 'components/include/footer'
import intention from 'components/entries/common/finance-intention'
import bankService from 'common/api/service/finance-management/bankService'
import moneyTools from 'common/javascript/tools/moneyTools'
import dateTools from 'common/javascript/tools/dateTools'
import file from 'common/config/file'
import type from 'common/config/type'

export default {
  name: 'app',
  components: {
    vnav: vnav,
    left: left,
    vfooter: vfooter,
    intention
  },
  data () {
    return {
      title: '融资意向详情',
      result: false,
      files: file.financeFiles,
      repayType: type.repayTypeSelect,
      length: 20,
      value: null,
      params: {
        enquiryTaskId: null,
        fileTypes: [],
        rate: null,
        ratio: null,
        reason: '',
        repayType: 0,
        value: null
      },
      rejectParams: {
        id: null,
        reason: null
      },
      detail: {
        fromName: '',
        value: '',
        timeLimit: '',
        rate: '',
        createTime: ''
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
              if (!reg.test(value)) {
                callback(new Error('非0正数，保留小数点后两位'))
              }
              callback()
            },
            trigger: 'change' }
        ],
        ratio: [
          { required: true, message: '必须填写', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              value = moneyTools.delcommafy(value)
              const reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d{1,4})$/
              const regNum = /^[+]{0,1}([1-9]\d*)$|^[+]{0,1}([1-9]\d*\.\d{1,4})$|^[+]{0,1}(0\.\d{1,4})$/
              if (value < 0) {
                callback(new Error('非0正数'))
              }
              if (parseFloat(value) === 0) {
                callback(new Error('请输入有效的数字值'))
              }
              if (!reg.test(value)) {
                callback(new Error('保留小数点后四位'))
              }
              if (!regNum.test(value)) {
                callback(new Error('请输入有效的数字值'))
              }
              callback()
            },
            trigger: 'change' }
        ],
        rate: [
          { required: true, message: '必须填写', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              value = moneyTools.delcommafy(value)
              const reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d{1,4})$/
              const regNum = /^[+]{0,1}([1-9]\d*)$|^[+]{0,1}([1-9]\d*\.\d{1,4})$|^[+]{0,1}(0\.\d{1,4})$/
              if (value < 0 || value > 100) {
                callback(new Error('不超过100的非负数字'))
              }
              if (parseFloat(value) === 0) {
                callback(new Error('请输入有效的数字值'))
              }
              if (!reg.test(value)) {
                callback(new Error('保留小数点后四位'))
              }
              if (!regNum.test(value)) {
                callback(new Error('请输入有效的数字值'))
              }
              callback()
            },
            trigger: 'change' }
        ],
        reason: [
          {
            validator: (rule, value, callback) => {
              if (value.length > 20) {
                callback(new Error('请输入少于20个字符'))
                setTimeout(() => {
                  this.params.reason = value.substring(0, 20)
                  this.length = 0
                }, 1)
              } else {
                this.length = 20 - value.length
                callback()
              }
            },
            trigger: 'change' }
        ],
        repayType: [
          { required: true }
        ]
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.$refs['approveOpinion'].resetFields()
      this.$refs['approveOpinion'].resetFields()
      this.$refs['approveOpinion'].resetFields()
    }, 1000)
    this.detailInfo()
  },
  methods: {
    detailInfo () {
      let param = this.$route.query.id
      bankService.detail.remote(param, (detail) => {
        this.detail = detail.data.enquiryTask.enquiry || this.detail
        this.detail.value = moneyTools.moneyNarrow(this.detail.value) || ''
        this.detail.rate = moneyTools.rateNarrow(this.detail.rate)
        this.detail.createTime = dateTools.dateFormater(this.detail.createTime, 'YYYY.MM.DD HH:mm:ss')
        this.detail.applyTime = dateTools.dateFormater(this.detail.applyTime, 'YYYY.MM.DD')
        this.detail.targetName = detail.data.enquiryTask.targetName
        this.detail.fromName = detail.data.enquiryTask.companyName

        this.params.enquiryTaskId = detail.data.enquiryTask.id || null
        this.rejectParams.id = detail.data.enquiryTask.id || null
      })
    },
    // 融资意向书
    letterDialog () {
      const intentInfo = {
        show: true
      }
      this.$refs.intentDialog.$emit('toggle-dialog', intentInfo)
    },
    cancel () {
      history.go(-1)
    },
    toBig (value) {
      // 处理千分符
      this.params.value = moneyTools.commafy(moneyTools.delcommafy(value + '')) // + point
    },
    twoDigit () {
      this.params.value = moneyTools.delcommafy(this.params.value)
      // 保留两位小数 + 千分符
      this.params.value = moneyTools.moneyShow(this.params.value)
    },
    radioChange () {
      this.$refs.approveOpinion.resetFields()
      this.params.repayType = 0
      this.params.fileTypes = []
      this.params.reason = ''
    },
    // 校验数字
    checkRatio (value) {
      this.$refs.approveOpinion.validateField('ratio', () => {})
    },
    checkRate (value) {
      this.$refs.approveOpinion.validateField('rate', () => {})
    },
    // 校验输入字符是否为数字
    onSubmit () {
      if (!this.result) {
        // 审批通过
        this.$refs.approveOpinion.validate((valid) => {
          if (valid) {
            let param = {
              enquiryTaskId: this.params.enquiryTaskId,
              fileTypes: this.params.fileTypes,
              rate: moneyTools.moneyExpand(this.params.rate),
              ratio: moneyTools.moneyExpand(this.params.ratio),
              reason: this.params.reason,
              repayType: this.params.repayType,
              value: moneyTools.moneyExpand(this.params.value)
            }
            bankService.replyCreate.remote(param, (info) => {
              if (info) {
                var sref = '#/assistant/finance/success?content=已完成融资意向审批！ &active=/financing/intention-approve'
                location.href = sref
              }
            })
          }
        })
      } else {
        // 审批不通过
        this.rejectParams.reason = this.params.reason || null
        bankService.taskReject.remote(this.rejectParams, (info) => {
          var sref = '#/assistant/finance/success?content=已完成融资意向审批！ &active=/financing/intention-approve'
          location.href = sref
        })
      }
    }
  }
}

</script>
<style>
.msg {
  margin-left: 200px;
  margin-top: -15px;
  margin-bottom: 5px;
  color: gray;
}
.approveReject .el-form-item__label,.approveReject .inputMsg, .approveReject .el-checkbox__label, .approveReject .msg {
  color: #e3e3e3;
}
</style>
