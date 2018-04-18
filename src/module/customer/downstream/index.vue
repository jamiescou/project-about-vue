<template>
  <div class="content-area">

    <div v-title='title'>
      {{title}}
    </div>
    <div class="group">
        <div class="span12 path-nav offset0">
            <ol>
                <li>供应商管理</li>
            </ol>
        </div>
    </div>
    <div class="content-body" style='background: #fff;'>
      <el-row>
        <el-col :span='24' >
          <el-form :inline="true" :model="searchData" class="stand-form " style="margin-top:10px" label-width="100px" >
              <fieldset class="pb0">
                <el-form-item label="供应商名称">
                  <el-input v-model="searchData.name" placeholder="请输入供应商名称"></el-input>
                </el-form-item>

                <el-form-item label="创建日期" class="last-item">
                  <el-date-picker
                    v-model="createTime"
                    type="daterange"
                    placeholder="选择日期范围"
                    style="width:200px;"
                    range-separator='到'
                    @change='createTimeChange'
                    >
                  </el-date-picker>
                  <el-button class="button-bubi-theme searchBtn" type="info" icon="null iconfont icon-search-bt" @click = "search">搜索</el-button>
                </el-form-item>
              </fieldset>
          </el-form>
        </el-col>
      </el-row>
      <el-row class="pl20 mb15" v-if="createAccess">
        <el-col>
          <el-button-group>
            <el-button type="primary" @click="createNum"> + 创建用户</el-button>
          </el-button-group>
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
              prop="cT"
              label="创建时间"
              align="center"
              :formatter = "dateFormaterPrecise">
            </el-table-column>
            <el-table-column
              prop="name"
              :show-overflow-tooltip=true
              align="center"
              label="供应商名称">
            </el-table-column>
            <el-table-column
              prop="supplierId"
              label="供应商编号"
              align="center"
              :formatter = "completeNo">
            </el-table-column>
            <el-table-column
              prop="code"
              align="center"
              label="供应商ERP编号"
              >
            </el-table-column>
            <el-table-column
              prop="inviteCode"
              align="center"
              label="邀请码"
              >
            </el-table-column>
            <el-table-column
              v-if="detailAccess"
              prop="state"
              label="操作"
              width="110"
              align="center">
              <template scope="scope" >
                <el-button @click='toInfo(scope.row.id, scope.row.supplierId)' type="text" size="small">基础信息</el-button>
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
import 'common/sass/module/account.scss'
import 'common/sass/module/table.scss'
import status from 'common/config/status'
import config from 'common/config/config'
import table from 'components/entries/base/table'
import merge from 'webpack-merge'
import supplierService from 'common/api/service/supplierService'
import dateTools from 'common/javascript/tools/dateTools'
import accessControl from 'common/javascript/tools/accessControl.js'

const base = {
  name: 'app',
  components: {
  },
  data () {
    return {
      title: '供应商列表',
      currentPage: 1,
      total: 1,
      pageSize: config.pageSize,
      options: status.vMyCertificate,
      dialogFormVisible: false,
      createTime: '',
      searchData: {
        dateEnd: null,
        dateStart: null,
        name: null,
        pageSize: config.pageSize,
        pageNum: 1
      },
      tableData: [],
      createAccess: false,
      detailAccess: false
    }
  },
  beforeMount () {
    this.getGrid()
  },
  mounted () {
    this.createAccess = accessControl.checkAccess('/customer/downstream/create')
    this.detailAccess = accessControl.checkAccess('/customer/downstream/detail')
  },
  methods: {
    getGrid () { // 获得表数据
      let params = this.searchData
      supplierService.downstreamList.remote(params, (data) => {
        this.total = data.data.total
        this.pageSize = data.data.pageSize
        this.pageNum = data.data.pageNum
        this.tableData = data.data.content || []
      })
    },
    createTimeChange (value) { // 创建时间变化
      const array = value.split('到')
      this.searchData.dateStart = dateTools.dateTotimestamp(array[0] + ' 00:00:00')
      this.searchData.dateEnd = dateTools.dateTotimestamp(array[1] + ' 23:59:59')
    },
    handleSizeChange (page, a, b) {
    },
    toInfo (id, sId) {
      location.href = '#/customer/downstream/detail?id=' + id + '&sId=' + sId
    },
    createNum () {
      location.href = '#/customer/downstream/create'
    }
  }
}

export default merge(base, table)
</script>
