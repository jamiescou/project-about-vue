<template>
  <div>
    <div v-title='title'>
      {{title}}
    </div>
    <div class="content-body" style='background: #fff;'>
      <el-row style="padding-top:10px">
        <el-col :span='24' >
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="80">
            </el-table-column>
            <el-table-column
              prop="fromName"
              :show-overflow-tooltip="true"
              label="供应商名称"
              min-width='180'
              align="center">
            </el-table-column>
            <el-table-column
              prop="value"
              label="期望融资额度（元）"
              align="center"
              min-width='180'
              :formatter = "moneyNarrow"
              >
            </el-table-column>
            <el-table-column
              prop="enquiry.timeLimit"
              label="申请期限（月）"
              align="center"
              min-width='180'>
            </el-table-column>
            <el-table-column
              prop="rate"
              label="期望利率（％）"
              align="center"
              :formatter = "rateNarrow"
              min-width='180'
              >
            </el-table-column>
            <el-table-column
              prop="enquiry.linkmanName"
              :show-overflow-tooltip="true"
              label="联系人"
              width='180'
              align="center">
            </el-table-column>
            <el-table-column
              prop="enquiry.linkmanPhone"
              :show-overflow-tooltip="true"
              label="手机号"
              width='180'
              align="center">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="申请时间"
              align="center"
              width='180'
              :formatter = "dateFormaterPrecise">
            </el-table-column>
            <el-table-column
              v-if="detailAccess"
              prop="option"
              label="操作"
              width='100'
              align="center">
              <template scope="scope" >
                <el-button  @click='toInfo(scope.row.id)' type="text" size="small">查看</el-button>
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
import table from 'components/entries/base/table'
import merge from 'webpack-merge'
import bankService from 'common/api/service/finance-management/bankService'
import config from 'common/config/config'
import accessControl from 'common/javascript/tools/accessControl.js'

export default merge(table, {
  name: 'app',
  components: {
  },
  data () {
    return {
      title: '审批退回',
      form: {
        name: '',
        value: ''
      },
      searchData: {
        createTimeBegin: null,
        createTimeEnd: null,
        creditSideName: '',
        targetName: '',
        pageNum: 1,
        pageSize: config.pageSize
      },
      tableData: [],
      detailAccess: false
    }
  },
  mounted () {
    // 搜索框数据
    this.$bus.$on('finance-data-third', (data) => {
      this.searchData.createTimeBegin = data.createTimeBegin
      this.searchData.createTimeEnd = data.createTimeEnd
      this.searchData.creditSideName = data.creditSideName
      this.getGrid()
    })
    this.getGrid()
    this.detailAccess = accessControl.checkAccess('/financing/intention-approve/reject-detail')
  },
  beforeDestroy () {
    // 销毁bus监听事件，避免多次触发
    this.$bus.$off('finance-data-third')
  },
  methods: {
    getGrid () {
      bankService.queryRejected.remote(this.searchData, (list) => {
        this.total = list.data.total
        this.tableData = list.data.content
        this.tableData.map((item, i) => {
          item.value = list.data.content[i].enquiry.value
          item.rate = list.data.content[i].enquiry.rate
          item.createTime = list.data.content[i].enquiry.createTime
          item.fromName = list.data.content[i].companyName
          item.createTime = list.data.content[i].enquiry.createTime
        })
      })
    },
    toInfo (id) {
      location.href = '#/financing/intention-approve/reject-detail?id=' + id
    }
  }
})
</script>
