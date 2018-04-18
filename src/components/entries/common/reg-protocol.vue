<template>
    <el-dialog v-model="show" :title="title" size='small'>
      <div slot='title'>
          <div style="text-align:center;float:left;width:96%;"><h4>区块链应收账款管理平台用户注册协议</h4></div>
      </div>
      <div style="margin-top:26px;height:400px;" id='signPdfContent' ref='pdfContent'>

      </div>
      <!-- <iframe :src='pdfPath'></iframe> -->
      <span slot="footer" class="dialog-footer" style="margin: 0px auto;width: 80px;display: block;">
        <el-button type="primary" :disabled='isSigned' @click="agreeMent">提交签署</el-button>
      </span>

    </el-dialog>
</template>

<script type="text/javascript">
import dateTools from 'common/javascript/tools/dateTools'
import sign from 'common/javascript/features/sign'
import tools from 'common/javascript/tools/tools'
import contractService from 'common/api/service/contractService'
import authorityService from 'common/api/service/authorityService'
import Vue from 'vue'
export default {
  name: 'c-letter',
  components: {
  },
  props: {
    dialogVisible: {
      type: Boolean,
      'default': false
    },
    title: {
      type: String,
      'default': ''
    }
    // companyName: {
    //   type: String,
    //   'default': ''
    // }
  },
  data () {
    return {
      show: false,
      date: '',
      time: 0,
      companyName: '',
      companySealPic: '',
      contractId: '',
      isSigned: false,
      pdfPath: '',
      contractInfo: {
        lx: 0,
        ly: 0,
        page: 0
      }
    }
  },
  beforeMount () {
    this.$on('toggle-dialog', info => {
      this.show = info.show
      this.companyName = info.companyName
      // sign.OpenWebFile(tools.getUrl() + '/static/protocol.pdf')
      if (this.time === 0) {
        setTimeout(() => {
          sign.addSign('signPdfContent')
          authorityService.getSession.remote({}, (session) => {
            sign.OpenWebFile(tools.getUrl() + '/service/file/pdf/download/' + this.contractId + '.pdf', session.data)
          })
        }, 200)
      }
      this.time++
    })
    const me = this
    contractService.getContract.remote({}, (info) => {
      me.companySealPic = info.data.companySealPic
      me.isSigned = info.data.status === 1 // 等于1 为已签，等于0 为未签
      me.contractId = info.data.contractId
      me.contractInfo.lx = info.data.lx
      me.contractInfo.ly = info.data.ly
      me.contractInfo.page = info.data.page
    })
  },
  mounted () {
    this.date = dateTools.dateFormater('YYYY年MM月DD日')
  },
  methods: {
    agreeMent () {
      if (this.companySealPic === '') {
        new Vue().$bus.$emit('message-error', {
          message: '没有获取到签章图片！'
        })
      }
      if (!sign.SelectSignCert()) return
      sign.TriggerPlaceSignature(this.companySealPic)
      sign.OnClickPoint(this.contractInfo.page, 430, 107)
      this.submit()
    },
    submit () { // 提交签署
      this.$bus.$emit('check-agreen', {})
      authorityService.getSession.remote({}, (info) => {
        const result = sign.UploadCurrentFile(tools.getUrl() + '/service/file/upload?', info.data)
        const data = JSON.parse(result).data
        if (data === null) {
          this.$bus.$emit('message-error', {message: '上传文档失败！'})
          return
        }
        contractService.getContractSign.remote({id: data}, (info) => {
          if (info.data) {
            this.show = false
            this.isSigned = true
          }
        })
      })
    }
  },
  watch: {
    isSigned: function (val, oldVal) {
      if (val) {
        this.$bus.$emit('check-agreen', {
          promiss: true,
          canRead: false
        })
      }
    }
  }
}

</script>

<style>

</style>
