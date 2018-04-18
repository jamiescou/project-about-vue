<template>
  <div class="content-area">

    <div v-title='title'>
      {{title}}
    </div>
    <div class="group">
        <div class="span12 path-nav offset0">
            <ol>
                <li>客户管理</li>>
                <li>{{title}}</li>
            </ol>
        </div>
    </div>
    <div class="content-body" style='background: #fff;'>
      <el-row>
        <el-col :span='24' >
          <el-form :inline="true" :model="searchData" class="stand-form" style="margin-top:10px;padding-left: 10px" label-width="100px" >
              <fieldset>
                <el-form-item label="核心企业名称">
                  <el-input v-model="searchData.companyQStr" placeholder="请输入核心企业名称"></el-input>
                </el-form-item>

                <el-form-item label="账号状态">
                  <el-select v-model="searchData.no" placeholder="全部">
                    <el-option label="全部" value="shanghai"></el-option>
                    <el-option label="待审批" value="beijing"></el-option>
                    <el-option label="审批通过" value="shanghai"></el-option>
                    <el-option label="审批不通过" value="beijing"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="注册日期" class="last-item">
                  <el-date-picker
                    v-model="searchData.createTime"
                    type="daterange"
                    placeholder="选择日期范围"
                    style="width:200px;"
                    range-separator='到'
                    @change='createTimeChange'
                    >
                  </el-date-picker>
                  <el-button class="button-bubi-theme searchBtn" type="info" @click = "search">搜索</el-button>
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
              align="center"
              width="80">
            </el-table-column>
            <el-table-column
              prop="createdTime"
              label="注册时间"
              align="center"
              width='180'
              :formatter = "dateFormaterPrecise">
            </el-table-column>
            <el-table-column
              prop=""
              :show-overflow-tooltip="true"
              label="核心企业名称"
              min-width='150'>
            </el-table-column>
            <el-table-column
              prop=""
              :show-overflow-tooltip="true"
              label="联系人姓名"
              width='140'
              align="center">
            </el-table-column>
            <el-table-column
              prop=""
              label="联系人手机号"
              width='150'
              align="center">
            </el-table-column>
            <el-table-column
              prop="no"
              label="供应商编号"
              align="center"
              width='170'>
            </el-table-column>
            <el-table-column
              prop=""
              label="状态"
              width='170'
              align="center">
            </el-table-column>
            <el-table-column
              v-if="detailAccess" 
              prop="state"
              label="操作"
              width='100'
              align="center">
              <template scope="scope" >
                <el-button @click='toInfo(scope.row.id)' type="text" size="small">基础信息</el-button>
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
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="1000">
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
import model from 'common/api/voucherTemplate'
import status from 'common/config/status'
import config from 'common/config/config'
import table from 'components/entries/base/table'
import merge from 'webpack-merge'
import accessControl from 'common/javascript/tools/accessControl.js'

const base = {
  name: 'app',
  components: {
  },
  data () {
    return {
      title: '核心企业',
      currentPage: 1,
      total: 1,
      pageSize: config.pageSize,
      options: status.vMyCertificate,
      dialogFormVisible: false,
      cashTimeBegin: '',
      searchData: {
        cashTime: null,
        createTime: null,
        createdTimeBegin: null,
        createdTimeEnd: null,
        cashTimeBegin: null,
        cashTimeEnd: null,
        companyQStr: '海尔',
        no: null,
        status: null,
        pageSize: config.pageSize,
        pageNum: 1
      },
      tableData: [],
      detailAccess: false
    }
  },
  mounted () {
    this.detailAccess = accessControl.checkAccess('/customer/f-core-enterprise/detail')
  },
  beforeMount () {
    this.getGrid()
  },
  methods: {
    getGrid () { // 获得表数据
      let params = this.searchData
      this.$http.post('/service/template/voucher/query', params, response => {
        // 数据模型处理
        let result = model[response.config.url](response, this)
        this.total = result.data.total
        this.pageSize = result.data.pageSize
        this.pageNum = result.data.pageNum
        this.tableData = result.data.content
      })
    },
    createTimeChange (value) { // 创建时间变化
      const array = value.split('到')
      this.searchData.createdTimeBegin = array[0]
      this.searchData.createdTimeEnd = array[1]
    },
    cashTimeChange (value) { // 时间变化
      const array = value.split('到')
      this.searchData.cashTimeBegin = array[0]
      this.searchData.cashTimeEnd = array[1]
    },
    handleSizeChange (page, a, b) {
    },
    toInfo (id) {
      location.href = '#/customer/f-core-enterprise/detail?id=' + id
    },
    createNum () {
      // location.href = '#/account/member-apply/create'
    }
  }
}

export default merge(base, table)
</script>
