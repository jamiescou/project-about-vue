<template>
  <div class="content-area" >
    <div v-title='title'>
      {{title}}
    </div>
    <div class="group">
        <div class="span12 path-nav offset0">
            <ol>
                <li>信息管理</li>>
                <li><strong>{{title}}</strong></li>
            </ol>
        </div>
    </div>
    <div class="content-body account-manage account-bank pt20 pr20 pb40 pl20">
        <div class="item-group">
            <div class="item-tit"><!-- <span class="item-tit-icon"></span> --></div>
            <div class="item-cnt">
                <div class="inner-wrap">
                    <p class="top-tip"><i class="iconfont icon-iconset0144"></i>添加的银行账户必须为与该系统实名信息一致的银行一类账户。</p>
                    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="110px">
                      <el-form-item label="银行账户名">
                        {{bankName}}
                      </el-form-item>
                      <el-form-item label="所属银行" prop='bank' :class="{'is-required': true, 'is-error': message.bank}">
                        <el-select v-model="form.bank" placeholder="请选择" @visible-change='bankChange'>
                          <el-option
                            v-for="item in bank"
                            :key="item.bankCode"
                            :label="item.name"
                            :value="item.bankCode">
                          </el-option>
                        </el-select>
                        <div v-show='message.bank' class="el-form-item__error" style="margin-top: -9px">请选择所属银行</div>
                      </el-form-item>
                      <el-row style="width: 410px">
                        <el-col :span="12">
                          <el-form-item :class="{'select-group': true, 'is-required': true, 'is-error': message.province}" label="银行所在地区" prop='province'>
                            <el-select v-model="form.province" placeholder="请选择省份" @visible-change='provinceChange'>
                              <el-option
                                v-for="item in province"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                              </el-option>
                            </el-select>
                            <div v-show='message.province' class="el-form-item__error" style="margin-top: -9px">请选择省份</div>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item :class="{'select-group': true, 'is-error': message.city}" style="margin-left: -54px">
                            <el-select v-model="form.city" placeholder="请选择城市" @visible-change='cityChange'>
                              <el-option
                                v-for="item in city"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                              </el-option>
                            </el-select>
                            <div v-show='message.city' class="el-form-item__error" style="margin-top: -9px">请选择城市</div>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-form-item label="支行名称" prop='subBank' :class="{'is-required': true, 'is-error': message.subBank}">
                        <el-select v-model="form.subBank" placeholder="请选择支行名称" @visible-change='subChange'>
                          <el-option
                            v-for="item in subBank"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                        <div v-show='message.subBank' class="el-form-item__error" style="margin-top: -9px">请选择支行名称</div>
                      </el-form-item>
                      <el-form-item label="银行账户号" prop='no' :class="{'is-error': message.no}" style="margin-bottom: 38px">
                        <el-input v-model="form.no" placeholder='请填写银行账户号' @blur='noCheck' @change='checkNull'></el-input>
                        <div v-show='message.no' class="el-form-item__error" style="padding-top: 8px">该银行卡已经添加，不可重复添加</div>
                      </el-form-item>
                      <el-form-item label="账户号类型" :class="{'is-required': true, 'is-error': message.accountType}">
                        <el-select v-model="form.accountType" @visible-change='accountChange' placeholder="请选择账号类型">
                          <el-option
                            v-for="item in accountType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                        <div v-show='message.accountType' class="el-form-item__error" style="margin-top: -8px">请选择账户号类型</div>
                      </el-form-item>
                      <el-form-item label="备注名" prop='remark'>
                        <el-input v-model="form.remark"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button class="okbtn" type="primary" @click="onSubmit">确定添加</el-button>
                      </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import 'common/css/lib/iconfont.css'
import 'common/css/lib/motherplate.css'
import 'common/sass/module/table.scss'
import 'common/sass/main.scss'
import 'common/sass/module/supplier.scss'
import vnav from 'components/include/nav'
import left from 'components/include/left'
import vfooter from 'components/include/footer'
import modal from 'components/entries/modal'
import layout from 'components/include/layout-l-r'
import bankAccountService from 'common/api/service/bankAccountService'
import bank from 'common/config/bank'
// import arrayTools from 'common/javascript/tools/arrayTools'

export default {
  name: 'app',
  components: {
    vnav: vnav,
    left: left,
    vfooter: vfooter,
    modal: modal,
    layout
  },
  data () {
    return {
      title: '添加银行账户',
      bank: [],
      province: [],
      city: [],
      accountType: bank.accountType,
      bankName: sessionStorage.getItem('currentCompany'),
      subBank: null,
      form: {
        bank: '',
        province: '',
        city: '',
        subBank: '',
        accountType: '',
        no: '',
        remark: ''
      },
      message: {
        bank: false,
        province: false,
        city: false,
        subBank: false,
        accountType: false,
        no: false
      },
      rules: {
        no: [
          { required: true, message: '请填写银行账户号', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              const reg = /^\d+$/
              if (!reg.test(value)) {
                this.message.no = false
                callback(new Error('银行账户号仅支持数字'))
              }
              if (value.length > 20) {
                this.message.no = false
                callback(new Error('银行账户号不可超过20个数字'))
              }
              callback()
            },
            trigger: 'change' }
        ],
        remark: [
          {
            validator: (rule, value, callback) => {
              if (value.length > 20) {
                callback(new Error('请输入少于20个字符'))
              }
              callback()
            },
            trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    this.$refs.ruleForm.resetFields()
    this.list()
  },
  beforeDestroy () {
    this.$refs.ruleForm.resetFields()
  },
  methods: {
    list () {
      // 获取银行列表
      bankAccountService.bankList.remote((list) => {
        this.bank = list.data
      })
    },
    // 下拉框出现/隐藏时触发: 获取下一个选择框的数据
    bankChange (show) {
      if (!show) {
        this.message.bank = this.form.bank === '' ? 1 : false
      }
      if (!show && this.form.bank) {
        this.form.province = ''
        this.form.city = ''
        this.form.subBank = ''
        // 获取省份列表
        bankAccountService.queryProvince.remote(this.form.bank, (list) => {
          this.province = list.data
        })
      }
    },
    provinceChange (show) {
      /*eslint-disable */
      // 使用case穿透，跳过eslint校验
      switch (true) {
        case !show: this.message.province = this.form.province === '' ? 1 : false
        case !show && !this.form.bank: this.message.bank = this.form.bank === '' ? 1 : false
        default: break
      }
      if (!show && this.form.province) {
        this.form.city = ''
        this.form.subBank = ''
        bankAccountService.queryCity.remote(this.form.bank, this.form.province, (list) => {
          this.city = list.data
        })
      }
    },
    cityChange (show) {
      switch (true) {
        case !show: this.message.city = this.form.city === '' ? 1 : false
        case !show && !this.form.bank: this.message.bank = this.form.bank === '' ? 1 : false
        case !show && !this.form.province: this.message.province = this.form.province === '' ? 1 : false
        default: break
      }
      if (!show && this.form.city) {
        this.form.subBank = ''
        let param = {
          bankCode: this.form.bank,
          provinceId: this.form.province,
          cityId: this.form.city
        }
        bankAccountService.querySubBank.remote(param, (list) => {
          this.subBank = list.data
        })
      }
    },
    subChange (show) {
      switch (true) {
        case !show: this.message.subBank = this.form.subBank === '' ? 1 : false
        case !show && !this.form.bank: this.message.bank = this.form.bank === '' ? 1 : false
        case !show && !this.form.province: this.message.province = this.form.province === '' ? 1 : false
        case !show && !this.form.city: this.message.city = this.form.city === '' ? 1 : false
        default: break
      }
    },
    accountChange (show) {
      switch (true) {
        case !show: this.message.accountType = this.form.accountType === '' ? 1 : false
        default: break
      }
    },
    // 检测卡号是否被绑定
    noCheck (value) {
      this.$refs.ruleForm.validateField('no', (valid) => {
        if (valid === '') {
          let param = {
            'no': this.form.no
          }
          bankAccountService.cardCheck.remote(param, (data) => {
            if (data.data) {
              this.message.no = true
            } else {
              this.message.no = false
            }
          })
        }
      })
    },
    checkNull () {
      if (this.form.no === '') {
        this.message.no = false
      }
    },
    onSubmit () {
      // 表单校验
      switch (true) {
        case !this.form.bank: this.message.bank = true
        case !this.form.province: this.message.province = true
        case !this.form.city: this.message.city = true
        case !this.form.subBank: this.message.subBank = true
        default: break
      }
      if (!this.form.accountType) {
        this.message.accountType = true
      }
      let result = false // 校验结果
      let formNo = false
      for (let item in this.message) {
        if (this.message[item]) {
          result = true
        }
      }
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          formNo = true
        } else {
          formNo = false
        }
      })

      if (!result && formNo) {
        let param = {
          businessScope: this.form.accountType,
          issuer: this.form.subBank,
          no: this.form.no,
          remark: this.form.remark
        }
        bankAccountService.cardAdd.remote(param, (data) => {
          if (data.data) {
            location.href = location.href = '#/assistant/success?content=银行账户添加成功，可在‘银行账户’进行查询。&active=/account/bank-account'
          }
        })
      }
    }
  }
}
</script>
