<template>
  <div class="content-area" >

    <div v-title='title'>{{title}}</div>
    <div class="group">
        <div class="span12 path-nav offset0">
            <ol>
                <li>凭证管理</li>>
                <li><strong>{{title}}</strong></li>
            </ol>
        </div>
    </div>

    <div class="content-body" style='background: #fff;'>
      <el-row>
        <el-col :span='24' >
          <el-form :inline="true" :model="searchData" class="stand-form" style="margin-top:10px" label-width="100px" >
              <fieldset>
                <el-form-item label="凭证编号" width='180'>
                  <el-input v-model="searchData.no" placeholder="请输入凭证编号"></el-input>
                </el-form-item>
                <el-form-item label="凭证状态">
                  <el-select v-model="searchData.status" placeholder="请选择">
                  <el-option
                    v-for="item in statusOptions"
                    :label="item.label"
                    :value="item.value"
                    :key='item.index'>
                  </el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="指定供应商">
                  <el-input v-model="searchData.companyQstr" placeholder="请输入指定供应商名称"></el-input>
                </el-form-item>
                <el-form-item label="操作日期">
                  <el-date-picker
                    v-model="txDate"
                    type="daterange"
                    placeholder="选择日期范围"
                    @change = 'changeTxDate'
                    range-separator = " 到 "
                    style="width:200px;">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="付款日期" class="last-item">
                  <el-date-picker
                    v-model="payDate"
                    type="daterange"
                    placeholder="选择日期范围"
                    @change = 'changePayDate'
                    range-separator = " 到 "
                    style="width:200px;">
                  </el-date-picker>
                  <el-button class="button-bubi-theme searchBtn ml30" type="info" icon="null iconfont icon-search-bt" @click="searchVoucher">搜索</el-button>
                </el-form-item>
              </fieldset>
          </el-form>

        </el-col>
      </el-row>
      <el-row style="padding-top:10px">
        <el-col :span='24' >
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              align='center'
              width="80">
            </el-table-column>
            <el-table-column
              prop="no"
              label="凭证编号"
              width = '213'>
              <template scope="scope">
                <el-button v-if="detailAccess" @click='toInfo(scope.row.id)' type="text" size="small">{{scope.row.no}}</el-button>
                <span v-if="!detailAccess">{{scope.row.no}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="total"
              :formatter = "moneyShow"
              label="凭证金额（元）"
              width="150">
            </el-table-column>
            <el-table-column
              prop="paymentType"
              :formatter = "paymentType"
              label="付款方式"
              width="120">
            </el-table-column>
            <el-table-column
              prop="restValue"
              :formatter = "moneyShow"
              label="待付款金额"
              width="150">
            </el-table-column>
            <el-table-column
              prop="cashTime"
              :formatter = "dateFormater"
              label="付款日期"
              width="150">
            </el-table-column>
            <el-table-column
              prop="company.name"
              :show-overflow-tooltip="true"
              label="指定供应商"
              min-width="150">
            </el-table-column>
            <el-table-column
              prop="needFile"
              label="贸易信息"
              :formatter = "dealOperate"
              width="120">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              width="150">
              <template scope="scope">
                <el-tag type="gray" v-for='item in statusOptions' :key="item.index" v-if='scope.row.status===item.value'>{{item.label}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="updateTime"
              :formatter = "dateFormaterPrecise"
              label="操作时间"
              width = '190'>
            </el-table-column>
            <el-table-column
              v-if="detailAccess"
              prop="state"
              fixed="right"
              label="操作"
              width="80">
              <template scope="scope" >
                <el-button v-if="detailAccess" @click='toInfo(scope.row.id)' type="text">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span='24' v-if = 'tableData.length > 0'>
          <el-pagination
            class="page-position-base"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="searchData.pageSize"
            :total="total"
            layout="total, prev, pager, next, jumper">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
import status from 'common/config/status'
import config from 'common/config/config'
import dateTools from 'common/javascript/tools/dateTools'
import table from 'components/entries/base/table'
import merge from 'webpack-merge'
import supplierVoucherService from 'common/api/service/supplierVoucherService'
import accessControl from 'common/javascript/tools/accessControl.js'

const base = {
  name: 'app',
  components: {
  },
  data () {
    return {
      title: '凭证查询',
      searchData: {
        no: null,
        cashTime: null,
        companyQstr: null,
        cashTimeBegin: null,
        cashTimeEnd: null,
        updateTimeBegin: null,
        updateTimeEnd: null,
        pageNum: 1,
        status: null,
        pageSize: config.pageSize
      },
      txDate: null,
      payDate: null,
      currentPage: 1,
      total: 0,
      dialogFormVisible: false,
      statusOptions: status.vsVoucherSearch, // 0：待签收、1：已签收、2：拒收、3：已付款
      tableData: [],
      detailAccess: false
    }
  },
  mounted () {
    this.getGrid()
    this.detailAccess = accessControl.checkAccess('/voucher/query/detail')
  },
  methods: {
    // 查询凭证
    getGrid () {
      let params = merge({}, this.searchData)
      supplierVoucherService.getVouchers.remote(params, (result) => {
        this.tableData = result.data.content || []
        this.searchData.pageSize = result.data.pageSize
        this.total = result.data.total
      })
    },

    // 搜索凭证
    searchVoucher () {
      this.getGrid()
    },

    // 修改付款时间
    changePayDate (value) {
      if (value === '') {
        this.searchData.cashTimeBegin = this.searchData.cashTimeEnd = null
      } else {
        var arr = value.split(' 到 ')
        this.searchData.cashTimeBegin = dateTools.dateTotimestamp(arr[0] + ' 00:00:00')
        this.searchData.cashTimeEnd = dateTools.dateTotimestamp(arr[1] + ' 23:59:59')
      }
    },

    // 修改接收、转让时间
    changeTxDate (value) {
      if (value === '') {
        this.searchData.updateTimeBegin = this.searchData.updateTimeEnd = null
      } else {
        var arr = value.split(' 到 ')
        this.searchData.updateTimeBegin = dateTools.dateTotimestamp(arr[0] + ' 00:00:00')
        this.searchData.updateTimeEnd = dateTools.dateTotimestamp(arr[1] + ' 23:59:59')
      }
    },
    toInfo (id) {
      location.href = '/#/voucher/query/detail?id=' + id
    }
  }
}
export default merge(base, table)
</script>
