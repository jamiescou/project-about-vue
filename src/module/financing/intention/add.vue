<template>
  <div class="content-area" >
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
    <div class="content-body intention-add">
      <el-row>
        <el-col>
          <el-form :inline="true" :rules="rules" :model='params' label-width="100px" ref='intention' >
            <el-row style="padding:10px;background:#f6f7fc">
              <el-form-item label="乙方（贷款方）：" label-width="140px" style="margin-bottom:0" class="ie-label-mt">
                  <el-select v-model="params.targetIds" multiple placeholder="请选择" style="width:270px">
                    <el-option
                      v-for="item in options"
                      :label="item.name"
                      :value="item.comId"
                      :key='item.index'>
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="" style="margin-bottom:0">
                <span class="require">＊</span>可选择多家有意向的金融机构并提交融资意向书。
              </el-form-item>
            </el-row>

            <div class="cnt">
              <h1 class="tit1">融资意向书</h1>
              <p class="partya mb40"><span>甲方（申请人）：{{companyName}}</span></p>
              <div>
                <el-form-item label="联系人" label-width="100px" prop='linkmanName'>
                  <el-input v-model="params.linkmanName" size="small" placeholder="请输入联系人"></el-input>
                </el-form-item>
                <el-form-item label="手机号" label-width="100px" prop='linkmanPhone'>
                  <el-input v-model="params.linkmanPhone" size="small" placeholder="请输入手机号"></el-input>
                </el-form-item>
              </div>

              <div>
                <span class="inline">&nbsp;&nbsp;&nbsp;&nbsp;申请人（{{companyName}}）于</span>
                <el-form-item  prop='applyTime'>
                  <el-date-picker
                    v-model="params.applyTime"
                    type="date"
                    size="small"
                    :picker-options="pickerOptions"
                    placeholder="请选择申请日期"
                    class='date'
                    >
                  </el-date-picker>
                </el-form-item>
                <span class="inline">向我行申请以区块链应收账款管理平台的应收账款凭证作为融资标的申请融资，期限为</span>
                <el-form-item prop='timeLimit'>
                  <el-input v-model="params.timeLimit" size="small" placeholder="" @blur = 'checkTimeLimit'></el-input>
                </el-form-item>
                <span class="inline">个月，期望融资额度（元）：</span>
                <el-form-item label='' prop='value'>
                  <el-input v-model="params.value" size="small" placeholder="" @blur = 'twoDigit' @change = "toBig"></el-input>
                </el-form-item>
                <span class="inline">利率为（％）：</span>
                <el-form-item prop='rate'>
                  <el-input v-model="params.rate" size="small" placeholder="" @blur = 'checkRate'></el-input>
                </el-form-item>
              </div><br>

              <p class="paragraph">根据以上事项甲乙双方协商，同意在具备资金方融资条件的前提下，就应收账款凭证的融资项目给与信贷支持，具体条件如下：</p>
              <ol type="1">
                <li>申请人有融资需求的情况下，保证项目真实存在，手续齐全、合法方可给与支持，如申请人手续不符合资金方要求，资金方有权不予信贷支持。</li>
                <li>资金方在申请人手续齐全后，对申请人所提供的凭证进行调查、评估，如调查真实，手续合法，符合融资要求方可进行信贷支持。</li>
                <li>本融资意向书仅用于申请人向资金方说明该项目融资意向，资金方将依据《商业银行法》、《贷款通则》等有关规定及资金方有关贷款、评估办法，对项目进行调查评估，最终决定承诺贷款与否。</li>
              </ol>
              <el-button class="button-bubi-theme"  type="info" @click="submit">确认</el-button>
            </div>
          </el-form>
        </el-col>
      </el-row>
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
import supplierService from 'common/api/service/finance-management/supplierService'
import dateTools from 'common/javascript/tools/dateTools'
import formExtends from 'components/entries/base/form'
import moneyTools from 'common/javascript/tools/moneyTools'

export default formExtends({
  name: 'app',
  components: {
    vnav: vnav,
    left: left,
    vfooter: vfooter,
    modal: modal,
    layout
  },
  data () {
    /*eslint-disable */
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      title: '添加融资意向',
      tab: {
        activeName: 'first'
      },
      currentPage: '1',
      dialogFormVisible: false,
      temp: 1,
      params: {
        applyTime: new Date(),
        linkmanName: null,
        linkmanPhone: null,
        rate: null,
        timeLimit: null,
        value: null,
        targetIds: []
      },
      options: [],
      companyName: null,
      rules: {
        linkmanName: [
          { required: true, message: '必须填写', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value.length > 20) {
                callback(new Error('不能超过20个字'))
              }
              callback()
            },
            trigger: 'change'
          }
        ],
        linkmanPhone: [
          { required: true, message: '请填写联系人手机号！', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== '') {
                this.methods.isPhone(value, callback)
              }
              callback()
            },
            trigger: 'change'
          }
        ],
        timeLimit: [
          { required: true, message: '必须填写', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              const reg = /^\+?[1-9][0-9]*$/
              if (value < 0) {
                callback(new Error('非0正整数'))
              }
              if (parseFloat(value) === 0) {
                callback(new Error('请输入有效的数字值'))
              }
              if (!reg.test(value)) {
                callback(new Error('非0正整数'))
              }
              callback()
            },
            trigger: 'change' }
        ],
        value: [
          { required: true, message: '必须填写', trigger: 'blur' },
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
        rate: [
          { required: true, message: '必须填写', trigger: 'blur' },
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
        applyTime: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    this.params.targetIds = []
    this.$refs.intention.resetFields()
    setTimeout(() => {
      this.$refs.intention.resetFields()
    }, 1000)
    this.companyName = sessionStorage.getItem('currentCompany')
    this.queryBank()
  },
  beforeDestroy () {
    this.$refs.intention.resetFields()
  },
  methods: {
    // 贷款方列表
    queryBank () {
      let param = {
        name: null
      }
      supplierService.queryBank.remote(param, (list) => {
        this.options = list.data
      })
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
    checkRate (value) {
      this.$refs.intention.validateField('rate', () => {})
    },
    checkTimeLimit () {
      this.$refs.intention.validateField('timeLimit', () => {})
    },
    submit () {
      if (this.params.targetIds.length === 0) {
        this.$message.error('请选择贷款方')
      } else {
        this.$refs.intention.validate((valid) => {
          let applyTime = dateTools.dateFormater(this.params.applyTime.getTime(), 'YYYY-MM-DD')
          if (valid) {
            let param =  {
              enquiry: {
                applyTime: dateTools.dateTotimestamp(applyTime + ' 23:59:59'),
                linkmanName: this.params.linkmanName,
                linkmanPhone: this.params.linkmanPhone,
                rate: moneyTools.moneyExpand(this.params.rate),
                timeLimit: this.params.timeLimit,
                value: moneyTools.moneyExpand(this.params.value)
              },
              targetIds: this.params.targetIds
            }
            // 校验通过，提交融资意向
            supplierService.create.remote(param, (info) => {
              if (info.data) {
                location.href = '#/assistant/supplier/success?content=融资意向申请提交成功！&active=/financing/intention-apply'
              } else {
                this.$message.error(info.error.errorMessage)
              }
            })
          }
        })
      }
    }
  }
})
</script>
<style media="screen">
.paragraph .el-icon-date {
  right: 15px;
}
.intention-add .date .el-input__icon {
  top: 0
}
.inline {
  display: inline-block;
  padding-top: 8px;
}
</style>
