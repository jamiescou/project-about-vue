<!-- 我的授信 cl -->
<template>
  <div class="content-area">

    <div v-title='title'>
      {{title}}
    </div>
    <div class="group">
        <div class="span12 path-nav offset0">
            <ol>
                <li>授信管理</li>>
                <li>授信信息</li>
            </ol>
        </div>
    </div>
    <div class="content-body" style='background: #fff;'>
        <div v-if="hasData1 === 1 && hasData2 === 1">
            <el-row>
              <el-col :span='24' >
                <div class="item-group pt30">
                    <div class="item-cnt" style="width: 90%">
                      <table class="table-lr">
                        <tbody>
                          <tr>
                              <td class="l" width="12%">授信额度（元）</td>
                              <td class="r" width="12%">{{creditValue.total | moneyShow(10000)}}</td>
                              <td class="l" width="12%">已使用额度（元）</td>
                              <td class="r" width="12%">{{creditValue.used | moneyShow(10000)}}</td>
                              <td class="l" width="12%">可使用额度（元）</td>
                              <td class="r" width="12%">{{creditValue.value | moneyShow(10000)}}</td>
                              <!-- <td class="l" width="16%">融资比例</td>
                              <td class="r" width="16%">{{creditValue.financingRatio | moneyShow(10000)}}</td> -->
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <span class="refresh" @click='refreshList' style="top: -70px">查询</span>
                </div>
              </el-col>
            </el-row>

            <el-row style="padding-top:10px">
              <el-col :span='24' >
                <div class="item-group pt-pl20">
                    <div class="item-tit"><span class="item-tit-icon"></span>已申请融资凭证列表</div>
                </div>
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
                    prop="applyTime"
                    label="时间"
                    min-width='130'
                    :formatter = "dateFormaterPrecise">
                  </el-table-column>
                  <!-- <el-table-column
                    prop="finAmount"
                    :formatter = "moneyNarrow"
                    label="申请额度（元）">
                  </el-table-column> -->
                  <el-table-column
                    prop="voucherNo"
                    min-width='160'
                    label="凭证编号">
                  </el-table-column>
                  <el-table-column
                    prop="total"
                    min-width='120'
                    label="凭证金额（元）"
                    :formatter = "moneyShow">
                  </el-table-column>
                  <el-table-column
                    prop="balance"
                    min-width='120'
                    label="凭证余额（元）"
                    :formatter = "moneyShow">
                  </el-table-column>
                  <el-table-column
                    prop="finStatusVO"
                    label="状态">
                    <template scope="scope">
                      <el-tag type="gray" v-for='item in financingResult' :key="item.index" v-if='scope.row.finStatusVO===item.value' >
                        {{item.label}}
                      </el-tag>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column
                    v-if="detailAccess"
                    prop=""
                    fixed="right"
                    label="操作"
                    width="150">
                    <template scope="scope" >
                      <el-button type="text" size="small" v-if="detailAccess" @click='showDetail(scope.row.id)'>详情</el-button>
                    </template>
                  </el-table-column> -->
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
                  :page-size="pageSize"
                  layout="total, prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
              </el-col>
            </el-row>
        </div>
        <div v-if="hasData1 === 2 || hasData2 === 2">
            <div class="tc m15"><i class="iconfont icon-iconset0144 cbubi mr5"></i>获取授信信息失败，<span class="cbubi pointer" @click="reload">点击这里</span>刷新重试。</div>
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
import 'common/sass/module/credit.scss'
import table from 'components/entries/base/table'
import merge from 'webpack-merge'
import config from 'common/config/config'
import credit from 'common/api/service/credit'
import dateTools from 'common/javascript/tools/dateTools'
import accessControl from 'common/javascript/tools/accessControl.js'
import status from 'common/config/status'

const base = {
  name: 'app',
  components: {
  },
  data () {
    return {
      title: '我的授信',
      tableData: [],
      creditValue: {},
      createTime: '',
      total: null,
      hasData1: 0,
      hasData2: 0,
      searchData: {
        // supplierId: null,
        pageSize: config.pageSize,
        pageNum: 1
      },
      financingResult: status.financingResult
    }
  },
  beforeMount () {
    this.creditUsed()
    this.getGrid()
  },
  mounted () {
    this.detailAccess = accessControl.checkAccess('/financing/query/detail')
  },
  methods: {
    // 获取授信额度使用情况
    creditUsed () {
      credit.creditUsed.remote((data) => {
        if (data.success) {
          this.hasData1 = 1
          this.creditValue = data.data
          this.creditValue.used = this.creditValue.total - this.creditValue.value
        } else {
          this.hasData1 = 2
        }
      })
    },
    getGrid () { // 获得表数据
      let params = this.searchData
      credit.detailQuery.remote(params, (data) => {
        if (data.success) {
          this.hasData2 = 1
          this.total = data.data.total
          this.pageSize = data.data.pageSize
          this.pageNum = data.data.pageNum
          this.tableData = data.data.content || []
        } else {
          this.hasData2 = 2
        }
      })
    },
    createTimeChange (value) {
      const array = value.split('到')
      this.searchData.createTimeStart = dateTools.dateTotimestamp(array[0] + ' 00:00:00')
      this.searchData.createTimeEnd = dateTools.dateTotimestamp(array[1] + ' 23:59:59')
    },
    reload () {
      location.reload()
    },
    refreshList () {
      credit.creditUsed.remote((data) => {
        if (data.success) {
          this.hasData1 = 1
          this.creditValue = data.data
          this.creditValue.used = this.creditValue.total - this.creditValue.value
          this.$message.success('刷新成功')
        } else {
          this.hasData1 = 2
        }
      })
    },
    // 查看授信
    showDetail () {
      location.href = '#/financing/query/detail?id=' + 5
    }
  }
}

export default merge(base, table)
</script>
