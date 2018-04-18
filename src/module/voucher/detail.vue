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
            <span class="span-wrap">
              <span
                class="tab-button"
                v-for="(item, index) in tabsData"
                :index = "index"
                v-show="item.access"
                v-bind:class="item.selected ? 'active':''"
                @click="tabChange(index)">
                {{item.name}}
              </span>
            </span>
          </div>
      </div>
      <div v-if ="whichShow==0 && tabsData[0].access" style="overflow:hidden;background:#fff;">
        <cvoucher :voucher='detail'></cvoucher>
      </div>
      <div v-if ="whichShow==1 && tabsData[1].access" style="background:#fff;overflow: hidden;padding:0px 10px 20px 10px;">
        <voucherAttachment :voucher="attachmentInfo"></voucherAttachment>
      </div>
      <div v-if ="whichShow==2 && tabsData[2].access" style="background:#fff;overflow: hidden;padding:0px 10px 20px 10px;">
        <voucherDownstream :voucher="voucherObject"></voucherDownstream>
      </div>
      <div v-if ="whichShow==3 && tabsData[3].access" style="background:#fff;overflow: hidden;padding:0px 10px 20px 10px;">
        <voucherUpstream :voucher="voucherObject"></voucherUpstream>
      </div>
      <div v-if ="whichShow==4 && tabsData[4].access" style="background:#fff;overflow:hidden;padding:0px 10px 20px 10px">
        <payRecord :voucher="voucherObject"></payRecord>
      </div>
      <div v-if ="whichShow==5 && tabsData[5].access" style="background:#fff;overflow:hidden;padding:0px 10px 20px 10px">
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
import voucherUpstream from 'components/entries/common/voucher-upstream'
import voucherDownstream from 'components/entries/common/voucher-downstream'
import accessControl from 'common/javascript/tools/accessControl.js'

export default {
  name: 'app',
  components: {
    cvoucher,
    operationLog,
    voucherAttachment,
    voucherDownstream,
    voucherUpstream,
    payRecord
  },
  data () {
    return {
      title: '凭证详情',
      tabsData: [
        {name: '基础信息', selected: true, access: false},
        {name: '贸易信息', selected: false, access: false},
        {name: '流转信息', selected: false, access: false},
        {name: '溯源信息', selected: false, access: false},
        {name: '付款记录', selected: false, access: false},
        {name: '操作日志', selected: false, access: false}
      ],
      whichShow: 0,
      tmpWhichShow: 0,
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
        },
        files: [],
        attachmentInfo: {files: []}
      }
    }
  },
  mounted () {
    var hash = location.hash
    var position = hash.indexOf('?')
    if (position > -1) {
      hash = hash.substring(1, position)
    }
    var detailStart = hash.indexOf('/detail')
    var module = hash.substring(9, detailStart)

    this.tabsData[0].access = accessControl.checkAccess('/voucher/' + module + '/detail/base') || accessControl.checkAccess('/payment/' + module + '/detail/base')
    this.tabsData[0].selected = this.tabsData[0].access // 激活还是不激活与权限一致，无权限：不激活；有权限：激活
    this.tabsData[1].access = accessControl.checkAccess('/voucher/' + module + '/detail/trade') || accessControl.checkAccess('/payment/' + module + '/detail/trade')
    this.tabsData[1].selected = this.tabsData[1].access ? !this.tabsData[0].selected : this.tabsData[1].access // 无权限：不激活；有权限：第1个tab未激活才激活
    this.tabsData[2].access = false // accessControl.checkAccess('/voucher/' + module + '/detail/downstream') || accessControl.checkAccess('/payment/' + module + '/detail/downstream')
    this.tabsData[2].selected = false // this.tabsData[2].access ? !this.tabsData[0].selected && !this.tabsData[1].selected : this.tabsData[2].access // 无权限：不激活；有权限：第1个和第2个tab未激活才激活
    this.tabsData[3].access = false // accessControl.checkAccess('/voucher/' + module + '/detail/upstream') || accessControl.checkAccess('/payment/' + module + '/detail/upstream')
    this.tabsData[3].selected = false // this.tabsData[3].access ? !this.tabsData[0].selected && !this.tabsData[1].selected && !this.tabsData[2].selected : this.tabsData[3].access // 无权限：不激活；有权限：第1个和第2个tab未激活才激活
    this.tabsData[4].access = accessControl.checkAccess('/voucher/' + module + '/detail/paymentApply') || accessControl.checkAccess('/payment/' + module + '/detail/paymentApply')
    this.tabsData[4].selected = this.tabsData[4].access ? !this.tabsData[0].selected && !this.tabsData[1].selected && !this.tabsData[2].selected && !this.tabsData[3].selected : this.tabsData[4].access // 无权限：不激活；有权限：第1个和第2个tab未激活才激活
    this.tabsData[5].access = accessControl.checkAccess('/voucher/' + module + '/detail/operate') || accessControl.checkAccess('/payment/' + module + '/detail/operate')
    this.tabsData[5].selected = this.tabsData[5].access ? !this.tabsData[0].selected && !this.tabsData[1].selected && !this.tabsData[2].selected && !this.tabsData[3].selected && !this.tabsData[4].selected : this.tabsData[5].access // 无权限：不激活；有权限：第1个和第2个tab未激活才激活
    this.tmpWhichShow = this.tabsData[0].selected ? 0 : (this.tabsData[1].selected ? 1 : (this.tabsData[2].selected ? 2 : (this.tabsData[3].selected ? 3 : (this.tabsData[4].selected ? 4 : (this.tabsData[5].selected ? 5 : 0)))))

    this.getVoucher()
  },
  beforeMount () {
    this.voucherId = this.$route.query.id
    this.voucherObject = {voucherId: this.voucherId}
  },
  methods: {
    tabChange: function (index) {
      this.tabsData.forEach(function (item) {
        item.selected = false
      })
      this.$bus.$emit('voucher-refurbish', this.detail)
      this.tabsData[index].selected = true
      this.whichShow = index
    },
    getVoucher () {
      var self = this
      if (this.tabsData[0].access || this.tabsData[1].access) {
        coreCompanyVoucherService.getVoucher.remote({id: this.voucherId}, (result) => {
          let data = result.data
          this.detail = data
          this.detail.value = data.total
          this.detail.originCreateCompany = data.createCompany
          this.detail.createCompany.subAccount = {
            bankName: data.createCompany.subAccount.issuer.name,
            no: data.createCompany.subAccount.no
          }
          this.detail.company.subAccount = {
            bankName: data.company.subAccount.issuer.name,
            no: data.company.subAccount.no
          }
          this.files = data.files
          for (var i = 0; i < this.files.length; i++) {
            this.files[i].downUrl = tools.getUrl() + '/service/file/pdf/download/' + this.files[i].fileId
          }
          this.attachmentInfo = {files: this.files}
          setTimeout(function () {
            self.whichShow = self.tmpWhichShow
          }, 50)
          this.$bus.$emit('voucher-refurbish', this.detail)
        })
      } else {
        setTimeout(function () {
          self.whichShow = self.tmpWhichShow
        }, 50)
      }
    }
  }
}
</script>
