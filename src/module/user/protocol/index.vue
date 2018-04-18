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
                <table class="table-r table-th-block table-data">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>签署/变更时间</th>
                            <th>协议名称</th>
                            <th>协议编号</th>
                            <th>区块链存证码</th>
                            <th v-if="downAccess">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in protocolList" :key="item.index">
                            <td>{{index+1}}</td>
                            <td>{{item.uT | timestampToDate}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.no}}</td>
                            <td>{{item.blockChainAddr}}</td>
                            <td v-if="downAccess">
                                <a class="del" v-if="downAccess" :href="item.url">下载文本</a>
                                <span class="del c999" v-if="!downAccess">下载文本</span>
                            </td>
                        </tr>
                    </tbody>
                </table>


                <!-- <el-row v-if="protocolList.length !== 0">
                  <el-col :span='24' >
                    <el-pagination
                      class="page-position-base"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage"
                      :page-size="pageSize"
                      :total="pageTotal"
                      layout="total, prev, pager, next, jumper">
                    </el-pagination>
                  </el-col>
                </el-row> -->
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
import table from 'components/entries/base/table'
import merge from 'webpack-merge'
import infoManageService from 'common/api/service/infoManageService'
import tools from 'common/javascript/tools/tools'
import accessControl from 'common/javascript/tools/accessControl.js'

const base = {
  name: 'app',
  components: {
    modal: modal,
    layout: layout,
    tools: tools
  },
  data () {
    return {
      title: '协议信息',
      currentPage: 1,
      pageSize: 0,
      pageTotal: 0,
      protocolList: [],
      downAccess: false
    }
  },
  mounted () {
    this.init()
    this.downAccess = accessControl.checkAccess('/user/protocal/down')
  },
  methods: {
    init () {
      // 实名信息
      var param = []
      const self = this
      infoManageService.getProtocolList.remote(param, (data) => {
        self.protocolList = data.data.content
        for (var i = 0; i < self.protocolList.length; i++) {
          self.protocolList[i].url = tools.getUrl() + '/service/file/download/' + self.protocolList[i].contractId
        }
        self.pageSize = data.data.pageSize
        self.pageTotal = data.data.total
      })
    }
  }
}
export default merge(base, table)
</script>
