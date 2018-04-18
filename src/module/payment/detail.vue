<template>
  <div class="content-area" >
    <div v-title='title'>{{title}}</div>
      <div class="group">
          <div class="span12 path-nav ">
              <ol>
                  <li>凭证管理</li>>
                  <li><strong>{{title}}</strong></li>
              </ol>
          </div>
      </div>
      <div class="content-body">
          <div class="tab-bar" style="padding:40px 5px;" >
            <span
            class="tab-button"
            v-for="(item, index) in tabsData"
            :index = "index"
            v-bind:class="item.selected ? 'active':''"
            @click="tabChange(index)">
            {{item.name}}
            </span>
          </div>
      </div>
      <div style="overflow:hidden;background:#fff;" v-if ="whichShow==0">
        <cvoucher :voucher='detail'></cvoucher>
      </div>
      <div v-if ="whichShow==1" style="background:#fff;overflow: hidden;padding:0px 10px 20px 10px;">
        <voucherAttachment :voucher="attachmentInfo"></voucherAttachment>
      </div>
      <div v-if ="whichShow==2" style="background:#fff;overflow:hidden;padding:0px 10px 20px 10px">
        <payRecord :voucher="voucherObject"></payRecord>
      </div>
      <div v-if ="whichShow==3" style="background:#fff;overflow:hidden;padding:0px 10px 20px 10px">
        <operationLog :voucher="voucherObject"></operationLog>
      </div>
  </div>
</template>

<script type="text/javascript">
import tools from 'common/javascript/tools/tools'
import coreCompanyVoucherService from 'common/api/service/coreCompanyVoucherService'
import cvoucher from 'components/entries/common/voucher'
import payRecord from 'components/entries/common/voucher-payRecord'
import operationLog from 'components/entries/common/voucher-operationLog'
import voucherAttachment from 'components/entries/common/voucher-attachment'
import accessControl from 'common/javascript/tools/accessControl.js'

export default {
  name: 'app',
  components: {
    cvoucher,
    operationLog,
    voucherAttachment,
    payRecord
  },
  data () {
    return {
      title: '凭证详情',
      tabsData: [
        {name: '基础信息', selected: true, access: true},
        {name: '贸易信息', selected: false, access: false},
        {name: '付款记录', selected: false, access: false},
        {name: '操作日志', selected: false, access: false}
      ],
      whichShow: 0,
      detail: {
        no: null,
        value: null,
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
      }
    }
  },
  beforeMount () {
    this.voucherId = this.$route.query.id
    this.getVoucher()
  },
  mounted () {
    this.tabsData[0].access = accessControl.checkAccess('/payment/*/detail/base') //
    this.tabsData[0].selected = this.tabsData[0].access // 激活还是不激活与权限一致，无权限：不激活；有权限：激活
    this.tabsData[1].access = accessControl.checkAccess('/payment/*/detail/trade')
    this.tabsData[1].selected = this.tabsData[1].access ? !this.tabsData[0].selected : this.tabsData[1].access // 无权限：不激活；有权限：第1个tab未激活才激活
    this.tabsData[2].access = accessControl.checkAccess('/payment/*/detail/paymentApply')
    this.tabsData[2].selected = this.tabsData[2].access ? !this.tabsData[0].selected && !this.tabsData[2].selected : this.tabsData[2].access // 无权限：不激活；有权限：第1个和第2个tab未激活才激活
    this.tabsData[3].access = accessControl.checkAccess('/payment/*/detail/operate')
    this.tabsData[3].selected = this.tabsData[3].access ? !this.tabsData[0].selected && !this.tabsData[2].selected && !this.tabsData[3].selected : this.tabsData[3].access // 无权限：不激活；有权限：第1个和第2个tab未激活才激活
  },
  methods: {
    tabChange: function (index) {
      this.tabsData.forEach(function (item) {
        item.selected = false
      })
      this.$bus.$emit('voucher-refurbish', this.detail)
      this.tabsData[index].selected = true
      this.whichShow = index
      if (index === 1) {
        this.attachmentInfo = {files: this.files}
      }
      if (index === 2) {
        this.voucherObject = {voucherId: this.voucherId}
      }
      if (index === 3) {
        this.voucherObject = {voucherId: this.voucherId}
      }
    },
    getVoucher () {
      coreCompanyVoucherService.getVoucher.remote({id: this.voucherId}, (result) => {
        let data = result.data
        this.detail = data
        this.detail.originCreateCompany = data.createCompany
        this.detail.createCompany = data.createCompany
        this.files = data.files
        for (var i = 0; i < this.files.length; i++) {
          this.files[i].downUrl = tools.getUrl() + '/service/file/download/' + this.files[i].fileId
        }
        this.$bus.$emit('voucher-refurbish', this.detail)
      })
    }
  }
}
</script>
