<template>
  <div class="content-area" >

    <div v-title='title'>{{title}}</div>
    <div class="group">
        <div class="span12 path-nav offset0">
            <ol>
                <li>流转管理</li>>
                <li><strong>{{title}}</strong></li>
            </ol>
        </div>
    </div>

    <div class="content-body" style='background: #fff;'>
      <el-row>
        <el-col :span='24' >
          <el-form :inline="true" :model="searchData"  class="stand-form " style="margin-top:10px" label-width="100px" >
              <fieldset>
                <el-form-item label="凭证编号">
                  <el-input v-model="searchData.no" placeholder="请输入凭证编号"></el-input>
                </el-form-item>
                <el-form-item label="凭证登记方">
                  <el-input v-model="searchData.originCreatedCompanyQStr" placeholder="请输入凭证登记方名称"></el-input>
                </el-form-item>
                <el-form-item label="凭证付款方">
                  <el-input v-model="searchData.createdCompanyQStr" placeholder="请输入凭证付款方名称"></el-input>
                </el-form-item>
                <!-- <el-form-item label="凭证状态">
                  <el-select v-model="searchData.origin" placeholder="请选择">
                    <el-option
                      v-for="item in statusOptions"
                      :label="item.label"
                      :value="item.value"
                      :key='item.index'>
                    </el-option>
                  </el-select>
                </el-form-item> -->
                <el-form-item label="付款日期" class="last-item">
                  <el-date-picker
                    v-model="searchData.cashTime"
                    type="daterange"
                    placeholder="选择日期范围"
                    range-separator=' 到 '
                    style="width:200px;"
                    @change='cashTimeChange'>
                  </el-date-picker>
                  <el-button class="button-bubi-theme searchBtn ml30" type="info" icon="null iconfont icon-search-bt" @click = "search">搜索</el-button>
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
              width = '215'>
              <template scope="scope">
                <el-button v-if="detailAccess" @click='toInfo(scope.row.id)' type="text" size="small">{{scope.row.no}}</el-button>
                <span v-if="!detailAccess">{{scope.row.no}}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="originCreateCompany.name"
              :show-overflow-tooltip="true"
              label="凭证登记方"
              width="200">
            </el-table-column>

            <el-table-column
              prop="cashTime"
              label="登记方承诺付款日期"
              :formatter = "dateFormater"
              width="180">
            </el-table-column>

            <el-table-column
              prop="total"
              label="凭证金额（元）"
              :formatter = "moneyShow"
              width="150">
            </el-table-column>
            <el-table-column
              prop="paymentType"
              :formatter = "paymentType"
              label="付款方式"
              width="120">
            </el-table-column>

            <el-table-column
              prop="createCompany.name"
              :show-overflow-tooltip="true"
              label="凭证付款方"
              min-width="180">
            </el-table-column>

            <el-table-column
              prop="cashTime"
              label="付款日期"
              :formatter = "dateFormater"
              width="120">
            </el-table-column>

            <el-table-column
              prop="needFile"
              label="贸易信息"
              :formatter = "dealOperate"
              width="120">
            </el-table-column>

            <el-table-column
              v-if="signAccess"
              prop="id"
              fixed="right"
              label="操作"
              width="90">
              <template scope="scope" >
                <el-button v-if="signAccess" @click='sign(scope.row.id)' type="text" size="small">签收</el-button>
              </template>
            </el-table-column>

          </el-table>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span='24'  v-if = 'tableData.length > 0'>
          <el-pagination
            class="page-position-base"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total">
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

export default merge({
  name: 'app',
  components: {
  },
  data () {
    return {
      title: '凭证签收',
      statusOptions: status.toSignVoucher,
      searchData: {
        cashTime: null,
        cashTimeBegin: null,
        cashTimeEnd: null,
        companyQstr: null,
        createdCompanyQStr: null,
        no: null,
        origin: null,
        pageNum: 1,
        pageSize: config.pageSize
      },
      tableData: [],
      signAccess: false,
      detailAccess: false
    }
  },
  mounted () {
    this.getGrid()
    this.signAccess = accessControl.checkAccess('/voucher/sign/sign')
    this.detailAccess = accessControl.checkAccess('/voucher/sign/detail')
  },
  methods: {
    cashTimeChange (value) { // 时间变化
      const array = value.split(' 到 ')
      this.searchData.cashTimeBegin = dateTools.dateTotimestamp(array[0] + ' 00:00:00')
      this.searchData.cashTimeEnd = dateTools.dateTotimestamp(array[1] + ' 23:59:59')
    },
    getGrid () { // 获得表数据
      let params = this.searchData
      params = this.handleParams(params)
      supplierVoucherService.getSigningVoucher.remote(params, (result) => {
        this.total = result.data.total
        this.pageSize = result.data.pageSize
        this.pageNum = result.data.pageNum
        this.tableData = result.data.content || []
      })
    },
    sign (id) {
      this.selectId = id
      location.href = '/#/voucher/sign/sign?id=' + id
    },
    toInfo (id) {
      location.href = '/#/voucher/sign/detail?id=' + id
    }
  }
}, table)
</script>
