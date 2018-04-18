<template>
  <el-dialog v-model="show" :title="title" size='small'>
    <div slot='title'>
        <div style="text-align:center;float:left;width:96%;"><h4>{{title}}</h4></div>
    </div>
    <div style="margin-top:26px;height:400px;" id='signPdfContent' ref='pdfContent'>
    </div>

    <span slot="footer" class="dialog-footer" style="margin: 0px auto;width: 60px;display: block;">
      <el-button type="primary" @click="agreeMent">同意</el-button>
    </span>
  </el-dialog>
</template>

<script type="text/javascript">
import sign from 'common/javascript/features/sign'
import dateTools from 'common/javascript/tools/dateTools'
import authorityService from 'common/api/service/authorityService'
import tools from 'common/javascript/tools/tools'

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
    },
    companyName: {
      type: String,
      'default': ''
    }
  },
  data () {
    return {
      show: false,
      date: '',
      // companyName: '',
      fileId: '',
      id: '',
      update: null
    }
  },
  beforeMount () {
    this.$on('toggle-dialog', info => {
      this.show = info.show
      this.id = info.id
      if (this.fileId === info.fileId) {
        return
      }
      // this.companyName = info.companyName
      this.fileId = info.fileId
      setTimeout(() => {
        sign.addSign('signPdfContent')
        authorityService.getSession.remote({}, (session) => {
          sign.OpenWebFile(tools.getUrl() + '/service/file/pdf/download/' + this.fileId + '.pdf', session.data)
        })
      }, 200)
    })
  },
  mounted () {
    this.date = dateTools.dateFormater('YYYY年MM月DD日')
  },
  methods: {
    agreeMent () {
      if (!sign.SelectSignCert()) return
      sign.TriggerPlaceSignature()
      sign.OnClickPoint(1, 430, 107)
      authorityService.getSession.remote({}, (info) => {
        const result = sign.UploadCurrentFile(tools.getUrl() + '/service/file/upload?', info.data)
        const data = JSON.parse(result).data
        if (data === null) {
          this.$bus.$emit('message-error', {message: '上传文档失败！'})
          return
        } else {
          // 更新付款函
          let updateInfo = {
            fileId: data,
            id: this.id
          }
          this.$emit('read-letter', updateInfo)
        }
        this.show = false
      })
    }
  }
}

</script>

<style>

</style>
