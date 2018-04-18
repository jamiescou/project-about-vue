<template>

    <div class="content-body">
      <!--搜索框 start-->
      <el-row>
        <el-col>
          <el-form :inline="true"  class="stand-form" label-width="90px">
              <fieldset class="pb0 pt20">
                <el-form-item label="融资机构">
                  <el-input v-model="searchData.financeAparty" placeholder="请输入融资机构"></el-input>
                </el-form-item>

                <el-form-item label="状态">
                  <el-select v-model="searchData.status" placeholder="请选择">
                    <el-option
                      v-for="item in statusOptions"
                      :label="item.label"
                      :value="item.value"
                      :key='item.index'>
                    </el-option>
                  </el-select>
                </el-form-item>

                <!-- <el-form-item label="还款日期">
                  <el-date-picker
                    v-model="searchData.repaymentDate"
                    type="daterange"
                    placeholder="选择日期范围"
                    style="width:200px;">
                  </el-date-picker>
                </el-form-item> -->

                <el-form-item label="融资到期日" class="last-item">
                  <el-date-picker
                    v-model="searchData.expireDate"
                    type="daterange"
                    placeholder="选择日期范围"
                    style="width:200px;">
                  </el-date-picker>
                  <el-button class="button-bubi-theme searchBtn ml30" type="info" icon="null iconfont icon-search-bt" @click = "">搜索</el-button>
                </el-form-item>
              </fieldset>
          </el-form>
        </el-col>
      </el-row>
      <!--搜索框 end-->

      <!--表格 start-->
      <el-row class="table-op">
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
              prop="loadEndTime"
              label="还款日期"
              width = '180'>
            </el-table-column>
            <el-table-column
              prop="loadEndDate"
              label="融资到期日"
              width="180">
            </el-table-column>
            <el-table-column
              prop="financeAparty"
              :show-overflow-tooltip="true"
              label="融资机构"
              min-width="200">
            </el-table-column>
            <el-table-column
              prop="sum"
              label="融资放款金额（元）"
              :formatter = "moneyShow"
              width="200">
            </el-table-column>
            <el-table-column
              prop="loadInterestAmount"
              label="融资利息（元）"
              :formatter = "moneyShow"
              width="200">
            </el-table-column>
            <el-table-column
              prop="loadTotalAmount"
              label="实际还款（元）"
              :formatter = "moneyShow"
              width="200">
            </el-table-column>
            <el-table-column
              prop="repaymentRecordStatus"
              label="状态"
              width="150">
              <template scope="scope">
                <el-tag type="gray" v-for='item in statusOptions' :key="item.index" v-if='scope.row.repaymentRecordStatus===item.value' >
                  {{item.label}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="80">
              <template scope="scope" >
                <el-button  type="text" @click='toInfo'>详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <!--表格 end-->
      <!--分页 start-->
      <el-row class="mt20 mb20">
        <el-col >
          <el-pagination
            class="page-position-base"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="100"
            layout="total, prev, pager, next, jumper"
            :total="5">
          </el-pagination>
        </el-col>
      </el-row>
      <!--分页 end-->
    </div>
</template>
<script type="text/javascript">
import 'common/css/lib/iconfont.css'
import 'common/css/lib/motherplate.css'
import 'common/sass/module/table.scss'
import 'common/sass/main.scss'
import 'common/sass/module/account.scss'
import vnav from 'components/include/nav'
import left from 'components/include/left'
import vfooter from 'components/include/footer'
import modal from 'components/entries/modal'
import layout from 'components/include/layout-l-r'
import table from 'components/entries/base/table'
import merge from 'webpack-merge'
import status from 'common/config/status'

const base = {
  name: 'app',
  components: {
    vnav: vnav,
    left: left,
    vfooter: vfooter,
    modal: modal,
    layout
  },
  data () {
    return {
      title: '还款记录',
      tab: {
        activeName: 'second'
      },
      currentPage: 1,
      searchData: {
        financeAparty: null,
        status: null,
        repaymentDate: null,
        expireDate: null
      },
      statusOptions: status.supplierFinanceRepaymentRecordStatus,
      tableData: [
        {
          financeAparty: '中信银行',
          loadEndTime: '2016.05.20',
          loadEndDate: '2016.06.30',
          sum: '20000000',
          loadInterestAmount: '100000',
          loadTotalAmount: '20100000',
          repaymentRecordStatus: 1
        },
        {
          financeAparty: '华夏银行',
          loadEndTime: '2016.04.20',
          loadEndDate: '2016.06.25',
          sum: '30000000',
          loadInterestAmount: '100000',
          loadTotalAmount: '30100000',
          repaymentRecordStatus: 1
        },
        {
          financeAparty: '平安银行',
          loadEndTime: '2016.05.21',
          loadEndDate: '2016.05.30',
          sum: '20000000',
          loadInterestAmount: '300000',
          loadTotalAmount: '20300000',
          repaymentRecordStatus: 2
        },
        {
          financeAparty: '中信银行',
          loadEndTime: '2016.05.20',
          loadEndDate: '2016.06.30',
          sum: '20000000',
          loadInterestAmount: '100000',
          loadTotalAmount: '20100000',
          repaymentRecordStatus: 3
        },
        {
          financeAparty: '华夏银行',
          loadEndTime: '2016.05.20',
          loadEndDate: '2016.06.30',
          sum: '40000000',
          loadInterestAmount: '100000',
          loadTotalAmount: '40100000',
          repaymentRecordStatus: 1
        }]
    }
  },
  methods: {
    handleSizeChange (page, a, b) {
    },
    handleCurrentChange (page, a, b) {
      this.currentPage = page
    },
    toInfo () {
      location.href = '#/supplier/financing-pay/repay-record-detail'
    }
  }
}
export default merge(base, table)
</script>
