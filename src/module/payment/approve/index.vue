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

                <el-form-item label="凭证金额" class="amount-range last-item">
                  <el-col :span="10">
                    <el-input placeholder="请输入金额" v-model="searchData.valueMin" style="width:150px;" @change='cashChange(searchData.valueMin,"valueMin")'>
                      <template slot="append">元</template>
                    </el-input>
                  </el-col>
                  <el-col :span="2" style="text-align:center;width:25px">-</el-col>
                  <el-col :span="10">
                    <el-input placeholder="请输入金额" v-model="searchData.valueMax" style="width:150px;" @change='cashChange(searchData.valueMax,"valueMax")'>
                      <template slot="append">元</template>
                    </el-input>
                  </el-col>
                  <el-col :span="2" style="text-align:center;width:25px">
                    <el-button class="button-bubi-theme searchBtn" type="info" icon="null iconfont icon-search-bt" @click = "search">搜索</el-button>
                  </el-col>
                  <el-col :span="10" style="position:absolute;top:30px;color:red" v-if='msgShow'>
                     请输入数字
                  </el-col>
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
              width="180">
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
              width="150">
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
              prop="file"
              label="贸易信息"
              :formatter = "dealOperate"
              width="150">
            </el-table-column>
            <el-table-column
              v-if="approveAccess"
              prop="state"
              fixed="right"
              label="操作"
              width="80">
              <template scope="scope" >
                <el-button type="text" size="small" @click='approve(scope.row.id)' >审批</el-button>
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
import 'common/sass/module/account.scss'
import 'common/sass/module/table.scss'
import modal from 'components/entries/modal'
import layout from 'components/include/layout-l-r'
import config from 'common/config/config'
import model from 'common/api/voucherTemplate'
import table from 'components/entries/base/table'
import merge from 'webpack-merge'
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
      title: '凭证付款',
      tab: {
        activeName: 'first'
      },
      cashTime: null,
      msgShow: false,
      searchData: {
        cashTBegin: null,
        cashTEnd: null,
        companyQStr: null,
        companyStr: null,
        valueMax: null,
        valueMin: null,
        no: null,
        pageSize: config.pageSize,
        pageNum: 1,
        paystatus: [0],
        status: [0],
        originCreatedCompanyStr: null
      },
      currentPage: 1,
      dialogFormVisible: false,
      tableData: [],
      detailAccess: false,
      approveAccess: false
    }
  },
  beforeMount () {
    this.searchData.status = [0]
  },
  mounted () {
    this.detailAccess = accessControl.checkAccess('/payment/approve/index/detail')
    this.approveAccess = accessControl.checkAccess('/payment/approve/approve')
    this.getGrid()
  },
  methods: {
    addContract () {
      this.$refs.addContract.show = true
    },
    stateFormat () {
      return '1'
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
      const array = value.split('到')
      this.searchData.cashTBegin = dateTools.dateTotimestamp(array[0] + ' 00:00:00')
      this.searchData.cashTEnd = dateTools.dateTotimestamp(array[1] + ' 23:59:59')
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
    handleSizeChange (page, a, b) {
    },
    approve (id) {
      location.href = '#/payment/approve/approve?id=' + id
    },
    toInfo (id) {
      location.href = '#/payment/approve/index/detail?id=' + id
    }
  }
}, table)
</script>
