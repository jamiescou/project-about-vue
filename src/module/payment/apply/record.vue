<template>
    <div class="content-body" style='background: #fff;'>
      <el-row>
        <el-col :span='24' >
          <el-form :inline="true"  class="stand-form " style="margin-top:10px" label-width="100px" >
              <fieldset>
                <el-form-item label="凭证编号">
                  <el-input v-model="searchData.no" placeholder="请输入凭证编号"></el-input>
                </el-form-item>

                <el-form-item label="凭证签收方">
                  <el-input v-model="searchData.companyQStr" placeholder="请输入凭证签收方名称"></el-input>
                </el-form-item>

                <el-form-item label="付款日期">
                  <el-date-picker
                    v-model="cashTime"
                    type="daterange"
                    placeholder="选择日期范围"
                    style="width:200px;"
                    range-separator='到'
                    @change='cashTimeChange'
                    >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="审批结果" class="amount-range">
                  <el-select v-model="searchData.status" placeholder="请选择" @change='payChange'>
                    <el-option
                      v-for="item in options"
                      :label="item.label"
                      :value="item.value"
                      :key='item.index'
                      >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="付款状态" class="amount-range last-item">
                  <el-select v-model="searchData.paystatus" placeholder="请选择">
                    <el-option
                      v-for="item in status"
                      :label="item.label"
                      :value="item.value"
                      :key='item.index'
                      >
                    </el-option>
                  </el-select>
                  <el-button class="button-bubi-theme searchBtn" type="info" icon="null iconfont icon-search-bt" @click = "search">搜索</el-button>
                </el-form-item>
              </fieldset>
          </el-form>

        </el-col>
      </el-row>

      <!--表格-->
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
              prop="c_t"
              label="申请时间"
              :formatter = "dateFormaterPrecise"
              width = '180'
              >
            </el-table-column>
            <el-table-column
              prop="no"
              label="凭证编号"
              width = '215'>
              <template scope="scope">
                <el-button v-if="detailAccess" @click='toInfo(scope.row.vou_id)' type="text" size="small">{{scope.row.no}}</el-button>
                <span v-if="!detailAccess">{{scope.row.no}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="total"
              label="凭证金额（元）"
              :formatter = "moneyShow"
              width="180">
            </el-table-column>
            <el-table-column
              prop="value"
              label="申请付款金额（元）"
              :formatter = "moneyShow"
              width="180">
            </el-table-column>
            <el-table-column
              prop="cashTime"
              label="付款日期"
              :formatter = "dateFormater"
              width="150">
            </el-table-column>
            <el-table-column
              prop="companyInfo.name"
              :show-overflow-tooltip="true"
              min-width="220"
              label="凭证签收方">
            </el-table-column>
            <el-table-column
              prop="remark"
              width="150"
              :show-overflow-tooltip="true"
              label="凭证备注">
            </el-table-column>
            <el-table-column
              prop="file"
              label="贸易信息"
              :formatter = "dealOperate"
              width="150">
            </el-table-column>
            <el-table-column
              prop="apply_status"
              label="审批结果"
              width="120"
              >
              <template scope="scope">
                <el-tooltip  effect="dark" placement="top" :disabled="scope.row.applyRemark && scope.row.apply_status===2 ? false : true">
                  <div slot="content">{{scope.row.applyRemark}}</div>
                  <el-tag type="gray" v-for='item in options' :key="item.index" v-if='scope.row.apply_status===item.value' >
                    {{item.label}}
                  </el-tag>
                </el-tooltip>
              </template>
            </el-table-column>

            <el-table-column
              prop="pay_status"
              label="付款状态"
              width="130"
              >
              <template scope="scope">
                <el-tag type="gray" v-for='item in statusPay' :key="item.index" v-if='scope.row.pay_status===item.value' >
                  {{item.label}}
                </el-tag>
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
</template>
<script type="text/javascript">
import 'common/css/lib/iconfont.css'
import 'common/css/lib/motherplate.css'
import 'common/sass/main.scss'
import 'common/sass/module/table.scss'
import 'common/sass/module/account.scss'
import modal from 'components/entries/modal'
import layout from 'components/include/layout-l-r'
import config from 'common/config/config'
import model from 'common/api/voucherTemplate'
import table from 'components/entries/base/table'
import merge from 'webpack-merge'
import status from 'common/config/status'
import accessControl from 'common/javascript/tools/accessControl.js'
import dateTools from 'common/javascript/tools/dateTools'
import objectTools from 'common/javascript/tools/objectTools'

export default merge({
  name: 'app',
  components: {
    modal: modal,
    layout
  },
  data () {
    return {
      tab: {
        activeName: 'first'
      },
      pageSize: config.pageSize,
      status: status.vpay_apply,
      statusPay: status.vpay_apply,
      options: status.vpayApprove,
      cashTime: null,
      searchData: {
        cashTBegin: null,
        cashTEnd: null,
        companyQStr: null,
        companyStr: null,
        valueMax: null,
        valueMin: null,
        no: null,
        pageSize: config.pageSize,
        status: null,
        paystatus: null,
        pageNum: 1,
        originCreatedCompanyStr: null
      },
      total: 0,
      currentPage: 1,
      tableData: [],
      dialogFormVisible: false,
      temp: 1,
      status1: [
        {
          value: 0,
          label: '待付款'
        }
      ],
      status2: [
        {
          value: 1,
          label: '付款成功'
        },
        {
          value: 2,
          label: '付款中'
        },
        {
          value: 3,
          label: '付款失败'
        }
      ],
      detailAccess: false
    }
  },
  beforeMount () {
    this.searchData.status = null
  },
  mounted () {
    this.getGrid()
    this.detailAccess = accessControl.checkAccess('/payment/apply/record/detail')
  },
  methods: {
    addContract () {
      this.$refs.addContract.show = true
    },
    stateFormat () {
      return '1'
    },
    handleSizeChange (page, a, b) {
    },
    getGrid () { // 获得表数据
      let params = objectTools.emptyStrToNull(this.searchData)
      this.$http.post('/service/payapply/queryList', params, response => {
        // 数据模型处理
        let result = model[response.config.url](response, this)
        this.total = result.data.total
        this.pageSize = result.data.pageSize
        this.pageNum = result.data.pageNum
        this.tableData = result.data.content || []
      })
    },
    cashTimeChange (value) { // 时间变化
      if (value === '' || value === null) {
        this.searchData.cashTBegin = ''
        this.searchData.cashTEnd = ''
        return
      }
      const array = value.split('到')
      this.searchData.cashTBegin = dateTools.dateTotimestamp(array[0] + ' 00:00:00')
      this.searchData.cashTEnd = dateTools.dateTotimestamp(array[1] + ' 23:59:59')
    },
    toInfo (id) {
      location.href = '#/payment/apply/record/detail?id=' + id
    },
    payChange (value) {
      this.searchData.paystatus = ''
      if (value === 0 || value === 2) {
        this.status = this.status1
      } else if (value === 1) {
        this.status = this.status2
      } else {
        this.status = status.vpay_apply
      }
    }
  }
}, table)
</script>
