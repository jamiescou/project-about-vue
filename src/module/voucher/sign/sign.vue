<template>
  <div class="content-area">
      <div v-title='title'>{{title}}</div>
      <div class="group">
          <div class="span12 path-nav ">
              <ol>
                  <li>凭证管理</li>>
                  <li><strong>{{title}}</strong></li>
              </ol>
          </div>
      </div>
      <div class="tab-menu">
          <div class="tab-bar">
            <span class="span-wrap">
              <span class="tab-button" v-for="(item, index) in tabsData" :index = "index" v-show="item.access" v-bind:class="item.selected ? 'active':''" @click="tabChange(index)">{{item.name}}</span>
            </span>
          </div>
      </div>
      <div class="tab-cnt">
          <cvoucher v-if ="whichShow==0 && tabsData[0].access" :voucher='detail'></cvoucher>
          <voucherAttachment v-if ="whichShow==1 && tabsData[1].access" :voucher="attachmentInfo"></voucherAttachment>
          <voucherDownstream v-if ="whichShow==2 && tabsData[2].access" :voucher="downstreamInfo"></voucherDownstream>
          <voucherUpstream v-if ="whichShow==3 && tabsData[3].access" :voucher="upstreamInfo"></voucherUpstream>
      </div>
      <cletter  ref='letterDialog' @read-letter='agreeMentChange' title='付款承诺函'></cletter>

      <div class="voucher-operate">
        <div class="group form-row " style="background:#fff;">
          <div class="font1" style="width:927px;margin:20px auto;">
            <el-form :model="ruleForm" :rules="rules" class="demo-ruleForm">
               <el-form-item label="" prop="desc">
                 <el-input
                   type="textarea"
                   :autosize="{ minRows: 2, maxRows: 4}"
                   placeholder="请输入签收/拒签理由"
                   v-model="ruleForm.desc">
                 </el-input>
                 <div style="text-align: right">还能输入<span style='color: red'>{{length}}</span>个字符</div>
               </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="group form-row " style="text-align:center; background:#fff;">
            <span class="wrapper center center-ie9">
              <el-button class="button-bubi-theme"  type="info" size="small" @click = "back">取消</el-button>
              <el-button class="button-bubi-theme"  type="info" size="small" @click = "reject">拒收</el-button>
              <el-button class="button-bubi-theme"  type="info" size="small" v-if="this.detail.expire === 0" @click="approve">签收</el-button>
              <el-button class="button-bubi-theme button-expire" type="info" size="small" v-if="this.detail.expire === 1" @click="expireSign">签收</el-button>
            </span>
        </div>
      </div>
  </div>

</template>

<script type="text/javascript">
import tools from 'common/javascript/tools/tools'
import supplierVoucherService from 'common/api/service/supplierVoucherService'
import cvoucher from 'components/entries/common/voucher'
import voucherUpstream from 'components/entries/common/voucher-upstream'
import voucherDownstream from 'components/entries/common/voucher-downstream'
import voucherAttachment from 'components/entries/common/voucher-attachment'
import cletter from 'components/entries/common/letter'
import companyService from 'common/api/service/companyService'
import accessControl from 'common/javascript/tools/accessControl.js'

export default {
  name: 'app',
  components: {
    cvoucher,
    voucherUpstream,
    voucherDownstream,
    voucherAttachment,
    cletter
  },
  data () {
    return {
      title: '凭证详情',
      tabsData: [
        {name: '基础信息', selected: true, access: true},
        {name: '贸易信息', selected: false, access: false},
        {name: '流转信息', selected: false, access: false},
        {name: '溯源信息', selected: false, access: false}
      ],
      length: 20,
      files: [],
      detail: {
        expire: 1
      },
      ruleForm: {
        desc: ''
      },
      rules: {
        desc: [
          {
            validator: (rule, value, callback) => {
              if (value.length > 20) {
                callback(new Error('请输入少于20个字符'))
                setTimeout(() => {
                  this.ruleForm.desc = value.substring(0, 20)
                  this.length = 0
                }, 1)
              } else {
                this.length = 20 - value.length
              }
            },
            trigger: 'change' }
        ]
      },
      whichShow: 0,
      tmpWhichShow: 0,
      voucherId: 0,
      // 付款函相关数据
      paymentId: null,
      paymentFileId: null,
      companyName: null,
      paymentState: null
    }
  },
  mounted () {
    this.voucherId = this.$route.query.id
    this.getVoucher()
    this.tabsData[0].access = accessControl.checkAccess('/voucher/sign/detail/base') //
    this.tabsData[0].selected = this.tabsData[0].access // 激活还是不激活与权限一致，无权限：不激活；有权限：激活
    this.tabsData[1].access = accessControl.checkAccess('/voucher/sign/detail/trade')
    this.tabsData[1].selected = this.tabsData[1].access ? !this.tabsData[0].selected : this.tabsData[1].access // 无权限：不激活；有权限：第1个tab未激活才激活
    this.tabsData[2].access = false // accessControl.checkAccess('/voucher/sign/detail/downstream')
    this.tabsData[2].selected = false // this.tabsData[2].access ? !this.tabsData[0].selected && !this.tabsData[1].selected : this.tabsData[3].access // 无权限：不激活；有权限：第1个和第2个tab未激活才激活
    this.tabsData[3].access = false // accessControl.checkAccess('/voucher/sign/detail/upstream')
    this.tabsData[3].selected = false // this.tabsData[3].access ? !this.tabsData[0].selected && !this.tabsData[1].selected && !this.tabsData[2].selected : this.tabsData[3].access // 无权限：不激活；有权限：第1个和第2个tab未激活才激活
    this.tmpWhichShow = this.tabsData[0].selected ? 0 : (this.tabsData[1].selected ? 1 : (this.tabsData[2].selected ? 2 : (this.tabsData[3].selected ? 3 : 0)))
  },
  methods: {
    tabChange: function (index) {
      this.tabsData.forEach(function (item) {
        item.selected = false
      })
      this.tabsData[index].selected = true
      this.whichShow = index
      if (index === 1) {
        this.attachmentInfo = {files: this.files}
      }
      if (index === 2) {
        this.downstreamInfo = {voucherId: this.voucherId}
      }
      if (index === 3) {
        this.upstreamInfo = {voucherId: this.voucherId}
      }
    },
    getVoucher () {
      if (this.tabsData[0].access || this.tabsData[0].access) {
        supplierVoucherService.getVoucher.remote({id: this.voucherId}, (result) => {
          var self = this
          this.detail = result.data

          this.detail.originCreateCompany = this.detail.createCompany
          this.detail.createCompany.subAccount = {
            bankName: this.detail.createCompany.subAccount.issuer.name,
            no: this.detail.createCompany.subAccount.no
          }
          this.detail.company.subAccount = {
            bankName: this.detail.company.subAccount.issuer.name,
            no: this.detail.company.subAccount.no
          }

          this.files = this.detail.files
          for (var i = 0; i < this.files.length; i++) {
            this.files[i].downUrl = tools.getUrl() + '/service/file/pdf/download/' + this.files[i].fileId
          }
          this.attachmentInfo = {files: this.files}
          setTimeout(function () {
            self.whichShow = self.tmpWhichShow
          }, 150)
          this.detail.expire = (this.detail.cashTime > (new Date()).valueOf()) ? 0 : 1
          this.$bus.$emit('voucher-refurbish', this.detail)
          // 文件id、付款函id
          this.companyName = this.detail.company.name
          this.paymentFileId = this.detail.paymentLetter.fileId
          this.paymentId = this.detail.paymentLetter.id
          this.paymentState = parseInt(this.detail.paymentLetter.status)
        })
      } else {
        setTimeout(function () {
          self.whichShow = self.tmpWhichShow
        }, 50)
      }
    },
    back () {
      history.back()
    },
    approve () {
      this.voucherApprove()
      // if (this.paymentState === 2) { // 已签付款函
      // } else {
      //   // 获取甲方签署的付款函
      //   const letterInfo = {
      //     show: true,
      //     companyName: this.companyName,
      //     fileId: this.paymentFileId,
      //     id: this.paymentId
      //   }
      //   this.$refs.letterDialog.$emit('toggle-dialog', letterInfo)
      // }
    },
    agreeMentChange (info) {
      let updateInfo = {
        fileId: info.fileId,
        id: info.id
      }
      companyService.payUpdate.remote(updateInfo, (info) => {
        if (info.data) { // 付款函上传并更新成功，进入业务
          this.voucherApprove()
        } else {
          this.$message.error('付款函更新失败')
        }
      })
    },
    voucherApprove () { // 凭证签收
      var params = {
        'id': this.voucherId,
        'operation_reason': this.ruleForm.desc
      }
      // setTimeout(() => { // 延时确保付款函弹窗关闭
      if (confirm('确定签收吗？')) {
        supplierVoucherService.receiveVoucher.remote(params, (result) => {
          if (result.success === true) {
            alert('签收成功！')
            history.back()
            this.getGrid()
          }
        })
      }
      // }, 800)
    },
    reject () {
      var params = {
        'id': this.voucherId,
        'operation_reason': this.ruleForm.desc
      }
      if (confirm('确定拒收吗？')) {
        supplierVoucherService.rejectVoucher.remote(params, (result) => {
          if (result.success === true) {
            alert('拒收成功！')
            history.back()
            this.getGrid()
          }
        })
      }
    },
    expireSign () {
      this.$message.error('该凭证已超过付款日期不能操作签收。')
    }
  }
}
</script>
