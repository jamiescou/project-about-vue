<!-- 我的授信 cl -->
<template>
  <div class="content-area">

    <div v-title='title'>
      {{title}}
    </div>
    <div class="group">
        <div class="span12 path-nav offset0">
            <ol>
                <li>我的授信</li>>
                <li>查看详情</li>
            </ol>
        </div>
    </div>
    <div class="content-body" style='background: #fff;'>
      <el-row>
        <p class="refresh" v-if="reloadAccess" @click='refresh'>查询</p>
      </el-row>
      <el-row style="padding-top:10px">
        <el-col :span='24' >
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="supplierName"
              min-width = '180'
              label="供应商">
            </el-table-column>
            <el-table-column
              prop="applyTime"
              label="时间"
              :formatter = "dateFormaterPrecise"
              width = '180'>
            </el-table-column>
            <el-table-column
              prop="creditAmount"
              min-width = '180'
              :formatter = "moneyNarrow"
              label="已使用额度（元）">
            </el-table-column>
            <el-table-column
              prop="voucherNo"
              min-width = '180'
              label="凭证编号">
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
import accessControl from 'common/javascript/tools/accessControl.js'

const base = {
  name: 'app',
  components: {
  },
  data () {
    return {
      title: '授信分配',
      tableData: [],
      createTime: '',
      searchData: {
        supplierId: null,
        pageSize: config.pageSize,
        pageNum: 1
      }
    }
  },
  beforeMount () {
    this.getGrid()
    this.total = 1
    this.searchData.supplierId = this.$route.query.id
    // this.searchData.supplierId = 5
  },
  mounted () {
    this.reloadAccess = accessControl.checkAccess('/credit/enterprise/allot/reload')
  },
  methods: {
    getGrid () { // 获得表数据
      let params = this.searchData
      credit.detailQuery.remote(params, (data) => {
        this.total = data.data.total
        this.pageSize = data.data.pageSize
        this.pageNum = data.data.pageNum
        this.tableData = data.data.content || []
      })
    },
    // 查看授信
    showDetail () {
      location.href = '#/credit/detail'
    }
  }
}

export default merge(base, table)
</script>
