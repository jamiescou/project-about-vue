<template>
    <div class="content-area" >
        <div v-title='title'>{{title}}</div>
        <div class="group">
            <div class="span12 path-nav ">
                <ol>
                    <li><a href="javascript:void()">账户管理</a></li>>
                    <li><a href="javascript:void()"><strong>{{title}}</strong></a></li>
                </ol>
            </div>
        </div>
        <div class="content-body financing-info pt20 pr20 pb40 pl20">
            <div class="item-group">
                <el-row>
                  <el-col>
                    <el-form :inline="true"  class="stand-form " style="margin-bottom:0">
                        <fieldset>
                          <!-- 隐藏元素占位，解决input中点击回车页面刷新问题 -->
                          <el-form-item label="" v-show='false'>
                            <el-input v-model="searchData.no"></el-input>
                          </el-form-item> 

                          <el-form-item label="银行账户号">
                            <el-input v-model="searchData.no" placeholder="请输入银行账户号"></el-input>
                          </el-form-item>
                          <el-button class="button-bubi-theme searchBtn" type="info" icon="null iconfont icon-search-bt" @click = "search">搜索</el-button>
                        </fieldset>
                    </el-form>
                    <div>
                        <el-button class="fr mb20" type="primary" v-if="addAccess" @click="addBankAccount()">添加银行账户</el-button><br>
                        <div style='background: #fff;margin-top: 30px'>
                          <el-row style="padding-top:10px">
                            <el-col :span='24' >
                              <el-table
                                :data="tableData"
                                stripe
                                style="width: 100%">
                                <el-table-column
                                  type="index"
                                  label="序号"
                                  align="center"
                                  width="80">
                                </el-table-column>
                                <el-table-column
                                  prop="ownerName"
                                  :show-overflow-tooltip="true"
                                  label="账户名称"
                                  align="center"
                                  min-width='180'>
                                </el-table-column>
                                <el-table-column
                                  prop="issuer.bankName"
                                  :show-overflow-tooltip="true"
                                  label="开户银行"
                                  min-width='160'
                                  align="center">
                                </el-table-column>
                                <el-table-column
                                  prop="no"
                                  :show-overflow-tooltip="true"
                                  label="银行账户号"
                                  align="center"
                                  min-width='210'>
                                </el-table-column>
                                <el-table-column
                                  prop="businessScope"
                                  :show-overflow-tooltip="true"
                                  label="账户号类型"
                                  align="center"
                                  min-width='120'>
                                  <template scope="scope">
                                      <span>{{businessScope[scope.row.businessScope]}}</span>
                                  </template>
                                </el-table-column>
                                <el-table-column
                                  prop="remark"
                                  :show-overflow-tooltip="true"
                                  label="备注名"
                                  align="center"
                                  min-width='150'>
                                </el-table-column>
                                <el-table-column
                                  prop="cT"
                                  label="添加时间"
                                  align="center"
                                  min-width='180'
                                  :formatter = "dateFormaterPrecise">
                                </el-table-column>
                                <el-table-column
                                  v-if="detailAccess"
                                  prop=""
                                  label="操作"
                                  width='100'
                                  align="center">
                                  <template scope="scope">
                                    <el-button @click='toInfo(scope.row.id)' type="text" size="small">查看</el-button>
                                  </template>
                                </el-table-column>
                              </el-table>
                            </el-col>
                          </el-row>
                          <el-row v-show="tableData.length != 0">
                            <el-col :span='24' >
                              <el-pagination
                                class="page-position-base"
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-size="searchData.pageSize"
                                layout="total, prev, pager, next, jumper"
                                :total="total">
                              </el-pagination>
                            </el-col>
                          </el-row>
                        </div>
                    </div>
                  </el-col>
                </el-row>
            </div>
      </div>
  </div>

</template>

<script type="text/javascript">

import 'common/css/lib/iconfont.css'
import 'common/css/lib/motherplate.css'
import 'common/sass/module/regular.scss'
import 'common/sass/module/table.scss'
import 'common/sass/module/supplier.scss'
import vnav from 'components/include/nav'
import left from 'components/include/member-left'
import vfooter from 'components/include/footer'
import table from 'components/entries/base/table'
import merge from 'webpack-merge'
import bankAccountService from 'common/api/service/bankAccountService'
import config from 'common/config/config'
import bank from 'common/config/bank'
import accessControl from 'common/javascript/tools/accessControl.js'

export default merge(table, {
  name: 'app',
  components: {
    vnav: vnav,
    left: left,
    vfooter: vfooter
  },
  data () {
    return {
      title: '银行账户',
      tableData: [],
      businessScope: bank.businessScope,
      total: 0,
      searchData: {
        no: null,
        pageNum: 1,
        pageSize: config.pageSize
      },
      addAccess: false,
      detailAccess: false
    }
  },
  mounted () {
    this.getGrid()
    this.addAccess = accessControl.checkAccess('/account/bank-account/add')
    this.detailAccess = accessControl.checkAccess('/account/bank-account/detail')
  },
  methods: {
    // 列表数据
    getGrid () {
      if (this.searchData.no === '') this.searchData.no = null
      bankAccountService.queryBank.remote(this.searchData, (list) => {
        this.tableData = list.data.content
        this.total = list.data.total
      })
    },
    // 绑定银行账户
    addBankAccount () {
      location.href = '#/account/bank-account/add'
    },
    // 银行账户详情
    toInfo (id) {
      location.href = '#/account/bank-account/detail?id=' + id
    }
  }
})
</script>
