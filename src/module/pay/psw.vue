<template>
  <div>
    <el-dialog title="支付密码" size="tiny" :visible.sync="show" v-if='index === 0' :before-close="cancle" :close-on-click-modal="false" >
      <el-input v-model="password" type='password' auto-complete="off" placeholder="请输入支付密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="系统提示" size="tiny" :visible.sync="show" v-if='index === 2' :before-close="cancle" :close-on-click-modal="false">
      <div style="padding-bottom: 10px">
        <span class="iconfont icon-iconset0144" style="color:#FFCC00"></span>支付密码错误，请重新输入
      </div>
      <el-input v-model="password" type='password' placeholder="请输入支付密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Axios from 'axios'
import CFCATools from 'common/javascript/features/cfca'

export default {
  name: 'psw',
  props: {
    payInfo: null
  },
  data () {
    return {
      password: '',
      index: 0,
      show: true,
      url: null,
      method: null,
      params: null,
      href: null
    }
  },
  mounted () {
    this.url = this.payInfo[0]
    this.method = this.payInfo[1]
    this.params = this.payInfo[2]
    this.href = this.payInfo[3]
    this.password = ''
  },
  methods: {
    sure () {
      let loading = this.$loading.service({
        fullscreen: true
      })
      let url = this.url
      Axios.defaults.headers.common['tx-psw'] = this.password
      Axios[this.method](url, this.params)
      .then(response => {
        loading.close()
        this.$delete(Axios.defaults.headers.common, 'tx-psw')
        this.complete(response)
      })
    },
    complete (response) {
      if (response.data.error) {
        if (response.data.error.errorCode === 1992) { // 密码错误
          this.index = 2
          this.password = ''
        } else {
          this.$message.error(response.data.error.errorMessage)
          this.cancle()
        }
      } else if (response.data.data.blob) {
        this.$emit('dialog', false)
        setTimeout(() => {
          // CFCATools.selectCert()
          CFCATools.selectCert('', '', '', false)
          let param = {}
          param.hash = response.data.data.hash
          param.sign = response.data.data.blob
          if (response.data.data.vouNo) {
            param.vouNo = response.data.data.vouNo
          }
          if (typeof param.blob === 'string') {
            param.sign = CFCATools.defaultSign(param.sign)
          } else {
            param.sign = CFCATools.defaultSign(JSON.stringify(param.sign))
          }
          this.dealSign(response, param) // 其他接口签名
        }, 10)
      } else if (response.data.transactionNo) {
        this.$emit('dialog', false)
        setTimeout(() => {
          // CFCATools.selectCert()
          CFCATools.selectCert('', '', '', false)
          Axios.defaults.headers.common['tx_no'] = response.data.transactionNo
          this.dealSign(response, response.data.transactionNo) // 付款接口签名
        }, 10)
      } else {
        this.success()
      }
    },
    dealSign (response, param) { // 处理签名
      let loading = this.$loading.service({
        fullscreen: true
      })
      // Axios.defaults.headers.common['tx-psw'] = this.password
      let url = this.url + '/transaction/submit'

      Axios[this.method](url, param)
      .then(response => {
        loading.close()
        if (response.data.success) {
          this.success()
        } else {
          this.$message.error(response.data.error.errorMessage)
          this.cancle()
        }
      })
      this.$delete(Axios.defaults.headers.common, 'sign')
      // this.$delete(Axios.defaults.headers.common, 'tx-psw')
      Axios.defaults.headers.common.hash && this.$delete(Axios.defaults.headers.common, 'hash')
      Axios.defaults.headers.common.tx_no && this.$delete(Axios.defaults.headers.common, 'tx_no')
    },
    success () {
      this.$emit('dialog', false)
      this.$delete(Axios.defaults.headers.common, 'tx-psw')
      this.password = ''
      let ref = this.href.split('#')[1].split('/')[1]
      if (ref === 'supplier') {
        location.href = '#/assistant/supplier/success?content=操作完成！'
      } else if (ref === 'finance') {
        location.href = '#/assistant/finance/success?content=操作完成！'
      } else {
        location.href = '#/assistant/success?content=操作完成！'
      }
    },
    cancle () {
      this.$delete(Axios.defaults.headers.common, 'tx-psw')
      this.$emit('dialog', false)
    }
  }
}
</script>
