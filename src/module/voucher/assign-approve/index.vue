<template>
  <div class="content-body" >
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
      <div v-title="title">{{title}}</div>
      <el-row>
        <el-col :span='24' >
          <el-form :inline="true" :model="searchData" class="stand-form " style="margin-top:10px" label-width="100px">
              <fieldset>
                <el-form-item label="凭证编号" width = '180'>
                  <el-input v-model="searchData.no" placeholder="请输入凭证编号"></el-input>
                </el-form-item>
                <el-form-item label="指定供应商">
                  <el-input v-model="searchData.companyQstr" placeholder="请输入凭证付款方名称"></el-input>
                </el-form-item>

                <el-form-item label="申请日期" class="amount-range last-item">
                  <el-date-picker
                    v-model="payDate"
                    type="daterange"
                    @change = 'changePayDate'
                    range-separator = " 到 "
                    placeholder="选择日期范围"
                    style="width:200px;">
                  </el-date-picker>
                  <el-button class="button-bubi-theme searchBtn ml30" icon="null iconfont icon-search-bt" type="info" @click = "searchVoucher">搜索</el-button>
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
              width='215'>
              <template scope="scope">
                <el-button v-if="detailAccess" @click='toInfo(scope.row.id)' type="text" size="small">{{scope.row.no}}</el-button>
                <span v-if="!detailAccess">{{scope.row.no}}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="value"
              label="申请转让金额（元）"
              :formatter = "moneyShow"
              width="190">
            </el-table-column>

            <el-table-column
              prop="paymentType"
              :formatter = "paymentType"
              label="转让付款方式"
              width="180">
            </el-table-column>

            <el-table-column
              prop="company.name"
              label="指定供应商"
              :show-overflow-tooltip="true"
              width="150">
            </el-table-column>

            <el-table-column
              prop="cashTime"
              :formatter = "dateFormater"
              label="转让凭证付款日期"
              width="170">
            </el-table-column>

            <el-table-column
              label="凭证承兑方"
              prop="originCreateCompany.name"
              :show-overflow-tooltip="true"
              width="170">
            </el-table-column>

            <el-table-column
              prop="cashTime"
              :formatter = "dateFormater"
              label="承兑付款日期"
              width="150">
            </el-table-column>

            <el-table-column
              prop="needFile"
              label="贸易信息"
              :formatter = "dealOperate"
              width="120">
            </el-table-column>

            <el-table-column
              prop="createTime"
              :show-overflow-tooltip="true"
              :formatter = "dateFormaterPrecise"
              label="申请时间"
              min-width="180">
            </el-table-column>

            <el-table-column
              v-if="assignAccess"
              prop="id"
              fixed="right"
              label="操作"
              width="80">
              <template scope="scope">
                <el-button @click='apply(scope.row.id)' type="text">审批</el-button>
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
import merge from 'webpack-merge'
import modal from 'components/entries/modal'
import config from 'common/config/config'
import table from 'components/entries/base/table'
import dateTools from 'common/javascript/tools/dateTools'
import supplierVoucherService from 'common/api/service/supplierVoucherService'
import accessControl from 'common/javascript/tools/accessControl.js'

export default merge({
  name: 'app',
  components: {
    modal: modal
  },
  data () {
    return {
      title: '凭证转让',
      expire: [],
      searchData: {
        no: null,
        companyQstr: null,
        createdCompanyQstr: null,
        cashTimeBegin: null,
        pageNum: 1,
        pageSize: config.pageSize
      },
      payDate: null,
      currentPage: 1,
      total: 0,
      tableData: [],
      assignAccess: false,
      detailAccess: false
    }
  },
  mounted () {
    this.getGrid()
    this.detailAccess = accessControl.checkAccess('/voucher/assign-approve/index/detail')
    this.assignAccess = accessControl.checkAccess('/voucher/assign-approve/approve')
  },
  methods: {
    // 查询凭证
    getGrid () {
      const self = this
      var params = this.searchData
      supplierVoucherService.getTransferToapproval.remote(params, (result) => {
        self.tableData = result.data.content || []
        self.searchData.pageSize = result.data.pageSize
        self.total = result.data.total
        // for (var i = 0; i < this.tableData.length; i++) {
          // this.tableData[i].expire = (this.tableData[i].cashTime > (new Date()).valueOf()) ? 0 : 1
          // this.tableData[i].expire = (this.tableData[i].value === 0 || this.tableData[i].value === '0') ? 1 : this.tableData[i].expire
          // this.tableData[i].expire = (this.tableData[i].paystatus === 1) ? 1 : this.tableData[i].expire
          // this.expire[this.tableData[i].id] = this.tableData[i].expire
        // }
      })
    },

    // 搜索凭证
    searchVoucher () {
      this.getGrid()
    },

    // 修改付款时间
    changePayDate (value) {
      var arr = value.split(' 到 ')
      this.searchData.createTimeBegin = dateTools.dateTotimestamp(arr[0] + ' 00:00:00')
      this.searchData.createTimeEnd = dateTools.dateTotimestamp(arr[1] + ' 23:59:59')
    },

    apply (id) {
      location.href = '/#/voucher/assign-approve/approve?id=' + id
    },
    toInfo (id) {
      location.href = '/#/voucher/assign-approve/index/detail?id=' + id
    },
    expireFun () {
      // this.$message.error('无可转让余额')
    }
  }
}, table)
</script>
