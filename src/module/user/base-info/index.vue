<template>
  <div class="content-area" >
    <div v-title='title'>
      {{title}}
    </div>
    <div class="group">
        <div class="span12 path-nav offset0">
            <ol>
                <li><a href="javascript:void()">信息管理</a></li>>
                <li><a href="javascript:void()"><strong>{{title}}</strong></a></li>
            </ol>
        </div>
    </div>
    <div class="content-body info-manage pt20 pr20 pb40 pl20">
        <div class="item-group">
        <div class="item-tit"><span class="item-tit-icon"></span>{{title}}</div>
        <div class="item-cnt">
            <table class="table-lr">
                <tbody>
                  <tr>
                      <td class="l" width="25%">注册时间</td>
                      <td class="r" width="75%">{{info.createTime | timestampToDate}}</td>
                  </tr>
                  <tr>
                      <td class="l" width="25%">登录账号</td>
                      <td class="r" width="75%">{{info.username}}</td>
                  </tr>
                  <tr>
                      <td class="l" width="25%">企业编码</td>
                      <td class="r" width="75%">{{info.comId | sixEnterpriseCode}}</td>
                  </tr>
                  <tr>
                      <td class="l" width="25%">区块链账户</td>
                      <td class="r" width="75%">{{info.blockchainAddress}}</td>
                  </tr>
                </tbody>
            </table>
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
import modal from 'components/entries/modal'
import layout from 'components/include/layout-l-r'
import infoManageService from 'common/api/service/infoManageService'

export default {
  name: 'app',
  components: {
    modal: modal,
    layout
  },
  data () {
    return {
      title: '登录账号信息',
      info: {
        createTime: null,
        username: null,
        comId: null,
        comName: null,
        blockchainAddress: null
      }
    }
  },
  mounted () {
    this.getInfo()
  },
  methods: {
    getInfo () {
      const self = this
      var param = {}
      infoManageService.getSysInfo.remote(param, (data) => {
        self.info.createTime = parseInt(data.data.userInfo.createTime)
        self.info.username = data.data.userInfo.name
        self.info.comId = data.data.customerInfo.id
        self.info.comName = data.data.customerInfo.name
        self.info.blockchainAddress = data.data.cert.blockchainAddress
      })
    }
  }
}
</script>
