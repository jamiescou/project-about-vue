<template>
  <div class="content-area" >

    <div v-title='title'>
      {{title}}
    </div>
    <div class="group">
        <div class="span12 path-nav offset0">
            <ol>
                <li>融资管理</li>>
                <li><strong>{{title}}</strong></li>
            </ol>
        </div>
    </div>

    <div class="content-body">
      <el-row>
        <el-col>
          <el-form :inline="true" class="stand-form" label-width="100px">
              <fieldset class="pb0">
                <el-form-item label="凭证编号">
                  <el-input v-model="searchData.voucherNo" placeholder="请输入凭证编号"></el-input>
                </el-form-item>

                <!-- <el-form-item label="申请机构">
                  <el-input v-model="searchData.applyParty" placeholder="请输入申请机构"></el-input>
                </el-form-item> -->

                <el-form-item label="融资状态">
                  <el-select v-model="searchData.finStatus" placeholder="请选择">
                    <el-option
                      v-for="item in financingResult"
                      :label="item.label"
                      :value="item.value"
                      :key='item.index'>
                    </el-option>
                  </el-select>
                </el-form-item>
                <!-- <el-form-item label="回款状态">
                  <el-select v-model="searchData.repayStatus" placeholder="请选择">
                    <el-option
                      v-for="item in moneyBack"
                      :label="item.label"
                      :value="item.value"
                      :key='item.index'>
                    </el-option>
                  </el-select>
                </el-form-item> -->

                <el-form-item label="申请日期">
                  <el-date-picker
                    v-model="applyDate"
                    type="daterange"
                    placeholder="选择日期范围"
                    range-separator = " 到 "
                    @change = 'changePayDate'
                    style="width:200px;">
                  </el-date-picker>
                </el-form-item>

                <el-form-item label="申请金额" class="amount-range last-item">
                  <el-col :span="10">
                    <el-input placeholder="请输入金额" v-model="searchData.applyAmountMin" style="width:150px;" @change='cashChange(searchData.applyAmountMin,"applyAmountMin")'>
                      <template slot="append">元</template>
                    </el-input>
                  </el-col>
                  <el-col :span="2" style="text-align:center;width:25px">-</el-col>
                  <el-col :span="10">
                    <el-input placeholder="请输入金额" v-model="searchData.applyAmountMax" style="width:150px;" @change='cashChange(searchData.applyAmountMax,"applyAmountMax")'>
                      <template slot="append">元</template>
                    </el-input>
                  </el-col>
                  <el-col :span="2" style="text-align:center;width:25px">
                    <el-button class="button-bubi-theme searchBtn ml30" @click='search' type="info" icon="null iconfont icon-search-bt">搜索</el-button>
                  </el-col>
                  <el-col :span="10" style="position:absolute;top:30px;color:red" v-if='msgShow'>
                     请输入数字
                  </el-col>
                </el-form-item>
              </fieldset>
          </el-form>
        </el-col>
      </el-row>

      <el-row class="table-op">
        <el-col>
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
              prop="voucherNo"
              label="凭证编号"
              width = '220'>
              <template scope="scope">
                <el-button v-if="detailAccess" @click='toInfo(scope.row.voucherId)' type="text" size="small">{{scope.row.voucherNo}}</el-button>
                <span v-if="!detailAccess">{{scope.row.voucherNo}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="finAmount"
              label="申请融资金额（元）"
              :formatter = "moneyShow"
              min-width = '180'>
            </el-table-column>
            <!-- <el-table-column
              prop="actualAccountAmount"
              label="出账金额（元）"
              :formatter = "moneyShow"
              min-width = '160'>
            </el-table-column> -->
            <el-table-column
              prop="finStatus"
              label="融资状态"
              width='110'>
              <template scope="scope">
                <el-tag type="gray" v-for='item in financingResult' :key="item.index" v-if='scope.row.finStatus===item.value' >
                  {{item.label}}
                </el-tag>
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="repayStatus"
              label="回款状态"
              width='110'>
              <template scope="scope">
                <el-tag type="gray" v-for='item in moneyBack' :key="item.index" v-if='scope.row.repayStatus===item.value' >
                  {{item.label}}
                </el-tag>
              </template>
            </el-table-column> -->
            <el-table-column
              prop="applyTime"
              label="申请时间"
              :formatter='dateFormaterPrecise'
              width = '180'>
            </el-table-column>
            <el-table-column
              v-if='toDdetailAccess'
              fixed="right"
              prop="state"
              label="操作">
              <template scope="scope" >
                <el-button  type="text" size="small" @click='toDetail(scope.row.id)'>详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <el-row class="mt20 mb20" v-show="tableData.length != 0">
        <el-col>
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
      <!--分页 end-->
    </div>
  </div>
</template>
<script type="text/javascript">
import 'common/css/lib/iconfont.css'
import 'common/css/lib/motherplate.css'
import 'common/sass/module/table.scss'
import 'common/sass/main.scss'
import 'common/sass/module/account.scss'
import layout from 'components/include/layout-l-r'
import status from 'common/config/status'
import table from 'components/entries/base/table'
import merge from 'webpack-merge'
import config from 'common/config/config'
import supplierService from 'common/api/service/finance-management/supplierService'
import accessControl from 'common/javascript/tools/accessControl.js'
import dateTools from 'common/javascript/tools/dateTools'

const base = {
  name: 'app',
  components: {
    layout
  },
  data () {
    return {
      title: '融资查询',
      applyDate: null,
      msgShow: false,
      searchData: {
        applyTimeBegin: null,
        applyTimeEnd: null,
        applyAmountMax: null,
        applyAmountMin: null,
        finStatus: null,
        repayStatus: null,
        pageNum: 1,
        pageSize: config.pageSize
      },
      currentPage: 1,
      financingResult: status.financingResult,
      moneyBack: status.moneyBack,
      tableData: [],
      detailAccess: false,
      toDdetailAccess: false
    }
  },
  mounted () {
    this.getGrid()
    this.detailAccess = accessControl.checkAccess('/financing/query/voucher/detail')
    this.toDdetailAccess = accessControl.checkAccess('/financing/query/detail')
  },
  methods: {
    getGrid () {
      supplierService.financingQuery.remote(this.searchData, (list) => {
        this.total = list.data.total
        this.tableData = list.data.content || []
        // this.tableData.map((item, i) => {
        //   item.value = list.data.content[i].enquiry.value
        //   item.createTime = list.data.content[i].enquiry.createTime
        // })
      })
    },
    cashChange (value, mum) {
      if (!isNaN(value) === true) {
        this.searchData[mum] = value
        this.msgShow = false
      } else {
        this.msgShow = true
        setTimeout(() => {
          this.searchData[mum] = null
        }, 1)
      }
    },
    changePayDate (value) {
      var arr = value.split(' 到 ')
      this.searchData.applyTimeBegin = dateTools.dateTotimestamp(arr[0] + ' 00:00:00')
      this.searchData.applyTimeEnd = dateTools.dateTotimestamp(arr[1] + ' 23:59:59')
    },
    toDetail (id) {
      location.href = '/#/financing/query/detail?id=' + id
    },
    toInfo (id) {
      location.href = '/#/financing/query/voucher/detail?id=' + id
    }
  }
}
export default merge(base, table)
</script>
