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
          <div class="item-tit"><span class="item-tit-icon"></span>子账号 9010959069195</div>
          <div class="item-cnt mb0">
              <el-row class="mb15">
                <el-col :span='24' >
                  <el-form class="unite-form" label-width="100px">
                      <fieldset class="pb0">
                        <el-form-item label="充值时间">
                          <el-date-picker class="fl mr40"
                            v-model="txDate"
                            type="daterange"
                            @change = 'changePayDate'
                            range-separator = " 到 "
                            placeholder="选择日期范围"
                            style="width:200px;">
                            </el-date-picker>
                          </el-date-picker>
                          <div class="tx-group">
                            <span class="tx-item" v-for="item in txTimeOption" @click="txTime(item.value)" v-bind:class="item.value===txTimeActive?'active':''">{{item.label}}</span>
                          </div>
                        </el-form-item>
                        <el-form-item label="状态">
                          <div class="tx-group">
                            <span class="tx-item" v-for="item in txStatusOption" @click="txStatus(item.value)" v-bind:class="item.value===txStatusActive?'active':''">{{item.label}}</span>
                            <el-button class="button-bubi-theme searchBtn ml30" type="info" icon="null iconfont icon-search-bt" @click = "">搜索</el-button>
                          </div>
                        </el-form-item>
                      </fieldset>
                  </el-form>
                </el-col>
              </el-row>
              <div class="tx-table">
                  <table class="table-r table-th-block table-data">
                      <thead>
                          <tr>
                              <th>充值时间</th>
                              <th>流水号</th>
                              <th>充值渠道</th>
                              <th>银行流水单号</th>
                              <th>金额（元）</th>
                              <th>状态</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="item in txRecord" :key="item.index">
                              <td>{{item.rechargeTime | timestampToDate}}</td>
                              <td>{{item.serialNo}}</td>
                              <td>{{item.rechargeChannel}}</td>
                              <td>{{item.bankSerialNo}}</td>
                              <td><span v-if='item.txType===0'>+</span><span v-if='item.txType!==0'>-</span>{{item.amount}}</td>
                              <td><span v-for='o in txStatusOption' :key="o.index" v-if='item.txStatus===o.value'>{{o.label}}</span></td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              <el-pagination
                class="page-position-base"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="100"
                layout="total, prev, pager, next, jumper"
                :total="1000">
              </el-pagination>
          </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import 'common/css/lib/iconfont.css'
import 'common/css/lib/motherplate.css'
import 'common/sass/main.scss'
import 'common/sass/module/table.scss'
import 'common/sass/module/account.scss'
import modal from 'components/entries/modal'
import layout from 'components/include/layout-l-r'
import subAccountService from 'common/api/service/subAccountService'
import type from 'common/config/type'
import status from 'common/config/status'
import dateTools from 'common/javascript/tools/dateTools'

export default {
  name: 'app',
  components: {
    modal: modal,
    layout
  },
  data () {
    return {
      title: '充值记录',
      financeType: type.supplierFinanceType,
      statusObtions: status.supplierSubAccountTxRecordStatus,
      txDate: null,
      currentPage: 1,
      txRecord: null,
      moneyTypeActive: 'all',
      // 交易时间
      txTimeActive: 0,
      txTimeOption: [
        {
          label: '今日',
          value: 0
        },
        {
          label: '昨日',
          value: 1
        },
        {
          label: '最近7天',
          value: 2
        },
        {
          label: '最近30天',
          value: 3
        },
        {
          label: '最近60天',
          value: 4
        }
      ],
      // 交易状态
      txStatusActive: 0,
      txStatusOption: [
        {
          label: '全部',
          value: '0'
        },
        {
          label: '银行处理中',
          value: '1'
        },
        {
          label: '成功',
          value: '2'
        },
        {
          label: '失败',
          value: '3'
        }
      ]
    }
  },
  mounted () {
    this.getRechargeRecord()
  },
  methods: {
    // 交易记录 bizType账户类型、accountTimeType时间类型、txType入账类型支出0收入1全部2、start开始页、
    getRechargeRecord () {
      const self = this
      var param = {
        accountTimeType: 0,
        startTime: null,
        endTime: null,
        subAccNo: null,
        txStatus: null,
        bubiAddress: null,
        pageSize: 0,
        start: 0,
        txType: 0
      }
      subAccountService.getRechargeRecord.remote(param, (data) => {
        self.txRecord = data.data.detail
      })
    },
    txTime (value) {
      this.txTimeActive = value
    },
    txStatus (value) {
      this.txStatusActive = value
    },
    // 修改付款时间
    changePayDate (value) {
      var arr = value.split(' 到 ')
      this.searchData.cashTimeBegin = dateTools.dateTotimestamp(arr[0] + ' 00:00:00')
      this.searchData.cashTimeEnd = dateTools.dateTotimestamp(arr[1] + ' 23:59:59')
    },
    handleSizeChange (page, a, b) {
    },
    handleCurrentChange (page, a, b) {
      this.currentPage = page
    }
  }
}
</script>
