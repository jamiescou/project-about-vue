<template>
  <div class="content-area" >

    <div v-title='title'>
      {{title}}
    </div>
    <div class="group">
        <div class="span12 path-nav offset0">
            <ol>
                <li><a href="javascript:void()">账户管理</a></li>>
                <li><a href="javascript:void()"><strong>{{title}}</strong></a></li>
            </ol>
        </div>
    </div>

    <div class="content-body account-manage account-trade-record pt20 pr20 pb40 pl20">
      <div class="item-group">
          <div class="item-tit"><span class="item-tit-icon"></span>子账号 {{no}}</div>
          <div class="item-cnt mb0">
              <el-row>
                <el-col :span='24' >
                  <el-form class="unite-form" :inline="true" label-width="100px">
                      <fieldset class="pb0">
                        <el-form-item label="出/入账时间">
                          <el-date-picker
                            v-model="txDate"
                            type="daterange"
                            placeholder="选择日期范围"
                            @change = 'createTimeChange'
                            range-separator = " 到 "
                            style="width:200px;">
                          </el-date-picker>
                        </el-form-item>
                        <el-form-item label="类型" label-width="70px">
                          <el-select v-model="transfor" placeholder="请选择">
                          <el-option
                            v-for="item in transferType"
                            :label="item.label"
                            :value="item.value"
                            :key='item.index'>
                          </el-option>
                        </el-select>
                        <el-button class="button-bubi-theme searchBtn ml30" type="info" icon="null iconfont icon-search-bt" @click = "search">搜索</el-button>
                      </el-form-item>
                      </fieldset>

                  </el-form>
                </el-col>
              </el-row>
              <div class="">
                <div class="content-body" style='background: #fff;'>
                  <el-row style="padding-top:10px">
                    <el-col :span='24' >
                      <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%">
                        <el-table-column
                          prop='accountTime'
                          label="出/入账时间"
                          align="center"
                          width="180"
                          :formatter = "dateFormaterPrecise">
                        </el-table-column>
                        <el-table-column
                          prop="serialNo"
                          label="流水号"
                          align="center"
                          width='220'>
                        </el-table-column>
                        <el-table-column
                          prop="voucherNo"
                          label="凭证编号"
                          width='220'
                          align="center">
                        </el-table-column>
                        <el-table-column
                          prop=""
                          label="类型"
                          align="center">
                          <template scope="scope">
                            <span v-show='scope.row.bizType === "transfer" && scope.row.txType === "1"'>收款</span>
                            <span v-show='scope.row.bizType === "transfer" && scope.row.txType === "0"'>付款</span>
                            <span v-show='scope.row.bizType === "recharge"'>充值</span>
                            <span v-show='scope.row.bizType === "withdraw"'>提现</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop=""
                          label="入账（元）"
                          align="center"
                          min-width='150'>
                          <template scope="scope">
                            <span v-show='scope.row.txType === "1"'>{{scope.row.amount | moneyShow(100)}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop=""
                          label="出账（元）"
                          :formatter = "moneyNarrow"
                          align="center"
                          min-width='150'>
                          <template scope="scope">
                            <span v-show='scope.row.txType === "0"'>{{scope.row.amount | moneyShow(100)}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop=""
                          label="余额（元）"
                          align="center"
                          min-width='170'
                          >
                          <template scope="scope">
                            <span>{{scope.row.accountBalance | moneyShow(100)}}</span>
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
import subAccountService from 'common/api/service/subAccountService'
import type from 'common/config/type'
import dateTools from 'common/javascript/tools/dateTools'
import table from 'components/entries/base/table'
import merge from 'webpack-merge'
import config from 'common/config/config'

export default merge(table, {
  name: 'app',
  components: {
    modal: modal,
    layout: layout
  },
  data () {
    return {
      title: '所有交易记录',
      tableData: [],
      transfor: '',
      txDate: null,
      no: null,
      transferType: type.transferType,
      searchData: {
        bizType: null,
        pageSize: config.pageSize,
        pageNum: 1,
        txType: 2,
        endTime: null,
        startTime: null
      },
      currentPage: 1,
      total: 0
    }
  },
  mounted () {
    this.no = this.$route.query.no
    this.getGrid()
  },
  methods: {
    getGrid () {
      // 提现3：bizType:"withdraw",txType:2
      // 充值2：bizType:"recharge",txType:2
      // 收款0：bizType:"transfer",txType:1
      // 付款1：bizType:"transfer",txType:0
      if (this.transfor === 0) {
        this.searchData.bizType = 'transfer'
        this.searchData.txType = 1
      } else if (this.transfor === 1) {
        this.searchData.bizType = 'transfer'
        this.searchData.txType = 0
      } else if (this.transfor === 2) {
        this.searchData.bizType = 'recharge'
        this.searchData.txType = 2
      } else if (this.transfor === 3) {
        this.searchData.bizType = 'withdraw'
        this.searchData.txType = 2
      } else if (this.transfor === null) {
        this.searchData.bizType = null
        this.searchData.txType = 2
      }
      subAccountService.getTxRecord.remote(this.searchData, (data) => {
        this.tableData = data.data.detail
        this.total = data.data.count
      })
    },
    createTimeChange (value) { // 创建时间变化
      const array = value.split('到')
      this.searchData.startTime = dateTools.dateTotimestamp(array[0] + ' 00:00:00')
      this.searchData.endTime = dateTools.dateTotimestamp(array[1] + ' 23:59:59')
    },
    handleSizeChange (page, a, b) {
    }
  }
})
</script>
