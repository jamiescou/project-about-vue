<template>
    <div class="content-body">
        <div v-if="hasData === 1">
            <el-row>
              <el-col >
                <el-form :inline="true"  class="stand-form" label-width="100px">
                    <fieldset class="pb0">
                      <el-form-item label="凭证编号">
                        <el-input v-model="searchData.no" placeholder="请输入凭证编号"></el-input>
                      </el-form-item>

                      <el-form-item label="凭证付款方">
                        <el-input v-model="searchData.originCreatedCompanyQStr" placeholder="请输入付款方名称"></el-input>
                      </el-form-item>

                      <el-form-item label="付款日期" class="last-item">
                        <el-date-picker
                          v-model="cashTime"
                          type="daterange"
                          placeholder="选择日期范围"
                          range-separator = " 到 "
                          style="width:200px;"
                          @change = 'changePayDate'
                          >
                        </el-date-picker>
                      </el-form-item>

                      <el-form-item label="凭证余额" class="amount-range last-item">
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

            <!--表格-->
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
                    min-width="140"
                    label="凭证登记方">
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
                    prop="restValue"
                    label="凭证余额（元）"
                    :formatter = "moneyShow"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="originCreateCompany.name"
                    :show-overflow-tooltip="true"
                    min-width="140"
                    label="凭证付款方">
                  </el-table-column>
                  <el-table-column
                    prop="cashTime"
                    label="付款日期"
                    :formatter = "dateFormater"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    v-if='toDetailAccess'
                    prop="state"
                    fixed="right"
                    label="操作"
                    width="100">
                    <template scope="scope" >
                      <el-button type="text" @click='toDetail(scope.row.id)'>融资</el-button>
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
        </div>
        <div v-if="hasData === 2">
            <div class="tc m15"><i class="iconfont icon-iconset0144 cbubi mr5"></i>获取授信信息失败，<span class="cbubi pointer" @click="reload">点击这里</span>刷新重试。</div>
        </div>
    </div>
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
import accessControl from 'common/javascript/tools/accessControl.js'
import supplierService from 'common/api/service/finance-management/supplierService'
import config from 'common/config/config'
import dateTools from 'common/javascript/tools/dateTools'

const base = {
  name: 'app',
  components: {
    vnav: vnav,
    left: left,
    vfooter: vfooter,
    modal: modal,
    layout: layout,
    table: table
  },
  data () {
    return {
      title: '融资意向',
      cashTime: null,
      msgShow: false,
      total: 0,
      hasData: 0,
      searchData: {
        no: null,
        cashTimeBegin: null,
        cashTimeEnd: null,
        originCreatedCompanyQStr: null,
        pageNum: 1,
        pageSize: config.pageSize,
        valueMax: null,
        valueMin: null
      },
      currentPage: 1,
      dialogFormVisible: false,
      temp: 1,
      input4: 1,
      tableData: [],
      detailAccess: false,
      toDetailAccess: false
    }
  },
  mounted () {
    this.detailAccess = accessControl.checkAccess('/financing/financing/voucher/detail')
    this.toDetailAccess = accessControl.checkAccess('/financing/financing/do')
    this.getGrid()
  },
  methods: {
    getGrid () {
      supplierService.voucherQuery.remote(this.searchData, (list) => {
        if (list.success) {
          this.hasData = 1
          this.total = list.data.total
          this.tableData = list.data.content || []
        } else {
          this.hasData = 2
        }
      })
    },
    changePayDate (value) {
      var arr = value.split(' 到 ')
      this.searchData.cashTimeBegin = dateTools.dateTotimestamp(arr[0] + ' 00:00:00')
      this.searchData.cashTimeEnd = dateTools.dateTotimestamp(arr[1] + ' 23:59:59')
    },
    addContract () {
      this.$refs.addContract.show = true
    },
    stateFormat () {
      return '1'
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
    reload () {
      location.reload()
    },
    toDetail (id) {
      location.href = '/#/financing/financing/do?id=' + id
    },
    toInfo (id) {
      location.href = '/#/financing/financing/voucher/detail?id=' + id
    }
  }
}
export default merge(base, table)
</script>
