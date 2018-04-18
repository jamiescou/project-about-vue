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
      <div v-if ="whichShow==2" style="background:#fff;overflow: hidden;padding:0px 10px 20px 10px;">
        <voucherDownstream :voucher="voucherObject"></voucherDownstream>
      </div>
      <div v-if ="whichShow==3" style="background:#fff;overflow: hidden;padding:0px 10px 20px 10px;">
        <voucherUpstream :voucher="voucherObject"></voucherUpstream>
      </div>
  </div>
</template>

<script type="text/javascript">
import tools from 'common/javascript/tools/tools'
import supplierVoucherService from 'common/api/service/supplierVoucherService'
import cvoucher from 'components/entries/common/voucher'
import voucherUpstream from 'components/entries/common/voucher-upstream'
import voucherAttachment from 'components/entries/common/voucher-attachment'
import voucherDownstream from 'components/entries/common/voucher-downstream'

export default {
  name: 'app',
  components: {
    cvoucher,
    voucherAttachment,
    voucherDownstream,
    voucherUpstream
  },
  data () {
    return {
      title: '凭证详情',
      tabsData: [
        {name: '基础信息', selected: true},
        {name: '贸易信息', selected: false},
        {name: '流转信息', selected: false},
        {name: '溯源信息', selected: false}
      ],
      DownstreamData: null,
      UpstreamData: null,
      files: [],
      whichShow: 0,
      voucherId: null,
      detail: {
        no: null,
        value: null,
        capitalValue: null,
        cashDate: null,
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
      }
    }
  },
  beforeMount () {
    this.voucherId = this.$route.query.id
    this.DownstreamData = {voucherId: this.voucherId}
    this.UpstreamData = {voucherId: this.voucherId}
    this.getVoucher()
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
      if (index === 1) {
        for (var i = 0; i < this.files.length; i++) {
          this.files[i].downUrl = tools.getUrl() + '/service/file/download/' + this.files[i].fileId
        }
        this.attachmentInfo = {files: this.files}
      }
    },
    getVoucher () {
      supplierVoucherService.getVoucher.remote({id: this.voucherId}, (result) => {
        let data = result.data
        this.detail = data
        this.files = data.files || []
        // for (var i = 0; i < this.files.length; i++) {
        //   this.files[i].downUrl = tools.getUrl() + '/service/file/download/' + this.files[i].fileId
        // }
        this.detail.value = this.detail.total
        this.$bus.$emit('voucher-refurbish', this.detail)
      })
    }
  }
}
</script>
