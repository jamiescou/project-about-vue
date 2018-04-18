<template>
  <div class="content-area" >

    <div v-title='title'>{{title}}</div>
    <div class="group">
        <div class="span12 path-nav offset0">
            <ol>
                <li>凭证管理</li>>
                <li><strong>{{title}}</strong></li>
            </ol>
        </div>
    </div>
    <div class="content-body" style='background: #fff;'>
      <el-row>
        <el-col :span='24' >
          <el-form :inline="true" :model="searchData" class="stand-form " style="margin-top:10px" label-width="100px" >
              <fieldset>
                <el-form-item label="凭证编号">
                  <el-input v-model="searchData.no" placeholder="请输入凭证编号"></el-input>
                </el-form-item>
                <el-form-item label="指定供应商">
                  <el-input v-model="searchData.companyQstr" placeholder="请输入指定供应商名称"></el-input>
                </el-form-item>
                <el-form-item label="付款日期" class="last-item">
                  <el-date-picker
                    v-model="payDate"
                    type="daterange"
                    placeholder="选择日期范围"
                    style="width:200px;"
                    @change = 'changePayDate'
                    range-separator = " 到 ">
                  </el-date-picker>
                  <el-button class="button-bubi-theme searchBtn" type="info" icon="null iconfont icon-search-bt" @click = "searchVoucher">搜索</el-button>
                </el-form-item>
              </fieldset>
          </el-form>
        </el-col>
      </el-row>

      <el-row style="">
        <el-col :span='24'>
          <el-button-group class="ml18">
            <el-button type="primary"  size='small' icon="null iconfont icon-shanchu" :disabled="selected.length==0" v-if="deleteAccess" @click="deleteVoucher()">删除</el-button>
          </el-button-group>
        </el-col>
      </el-row>

      <el-row style="padding-top:10px">
        <el-col :span='24' >
          <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            @selection-change="selectItem">
            <el-table-column
              type="selection"
              width="50">
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              align='center'
              width="80">
            </el-table-column>
            <el-table-column
              prop="no"
              :show-overflow-tooltip="true"
              label="凭证编号"
              width = '215'>
              <template scope="scope">
                <el-button v-if="detailAccess" @click='toInfo(scope.row.id)' type="text" size="small">{{scope.row.no}}</el-button>
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
              prop="paymentType"
              label="付款方式"
              :formatter = "paymentType"
              width="120">
            </el-table-column>
            <el-table-column
              prop="cashTime"
              label="付款日期"
              :formatter = "dateFormater"
              width="190">
            </el-table-column>
            <el-table-column
              prop="company.name"
              :show-overflow-tooltip="true"
              label="指定供应商"
              min-width="180">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="登记时间"
              :formatter = "dateFormaterPrecise"
              width="190">
            </el-table-column>
            <el-table-column
              v-if="commitAccess || editAccess"
              prop="id"
              fixed="right"
              label="操作"
              width="150">
              <template scope="scope" >
                <el-button v-if='expire[scope.row.id] == 0 && commitAccess' @click='applyApproval(scope.row.id)' type="text" size="small">提交审批</el-button>
                <span v-if='expire[scope.row.id] == 1 && commitAccess' type="text" size="small" style="color:#999; cursor:default; margin-right: 10px;">提交审批</span>
                <el-button v-if='editAccess' @click='toEdit(scope.row.id)' type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <el-row v-show="tableData.length != 0">
        <el-col :spa='24' >
          <el-pagination
            class="page-position-base"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="searchData.pageSize"
            :total="total"
            layout="total, prev, pager, next, jumper">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
import merge from 'webpack-merge'
import config from 'common/config/config'
import table from 'components/entries/base/table'
import dateTools from 'common/javascript/tools/dateTools'
import coreCompanyVoucherService from 'common/api/service/coreCompanyVoucherService'
import accessControl from 'common/javascript/tools/accessControl.js'

const base = {
  name: 'app',
  components: {
  },
  data () {
    return {
      title: '待提交凭证',
      payDate: '',
      expire: [],
      selected: [],
      searchData: {
        no: null,
        companyQstr: null,
        createdCompanyId: null,
        cashTimeBegin: null,
        cashTimeEnd: null,
        origin: 0,
        pageNum: 1,
        pageSize: config.pageSize
      },
      currentPage: 1,
      total: 0,
      tableData: [],
      deleteAccess: false,
      commitAccess: false,
      editAccess: false,
      detailAccess: false
    }
  },
  mounted () {
    this.getGrid()
    this.deleteAccess = accessControl.checkAccess('/voucher/draft/delete')
    this.commitAccess = accessControl.checkAccess('/voucher/draft/commit')
    this.editAccess = accessControl.checkAccess('/voucher/draft/edit')
    this.detailAccess = accessControl.checkAccess('/voucher/draft/detail')
  },
  methods: {
    // 申请审批
    applyApproval (id) {
      coreCompanyVoucherService.applyApproval.remote([id], (result) => {
        if (result.success) {
          this.getGrid()
        } else {
          this.$message.error('提交审批失败!')
        }
      })
    },

    // 删除凭证
    deleteVoucher () {
      const ids = []
      if (window.confirm('确定要删除凭证吗？')) {
        this.selected.forEach(function (v) {
          ids.push(v.id)
        })
        coreCompanyVoucherService.delete.remote(ids, (result) => {
          if (result.success) {
            this.getGrid()
          } else {
            this.$message.error('删除失败!')
          }
        })
      }
    },

    // 查询凭证
    getGrid () {
      let params = this.searchData
      coreCompanyVoucherService.getScratchedVoucher.remote(params, (result) => {
        if (result.success) {
          this.tableData = result.data.content || []
          this.searchData.pageSize = result.data.pageSize
          this.total = result.data.total
          for (var i = 0; i < this.tableData.length; i++) {
            this.expire[this.tableData[i].id] = (this.tableData[i].cashTime > (new Date()).valueOf()) ? 0 : 1
          }
        } else {
          this.$message.error('获取暂存凭证数据失败!')
        }
      })
    },

    // 选择凭证
    selectItem (val) {
      this.selected = val
    },

    // 搜索凭证
    searchVoucher () {
      this.getGrid()
    },

    // 修改付款时间
    changePayDate (value) {
      var arr = value.split(' 到 ')
      this.searchData.cashTimeBegin = dateTools.dateTotimestamp(arr[0] + ' 00:00:00')
      this.searchData.cashTimeEnd = dateTools.dateTotimestamp(arr[1] + ' 23:59:59')
    },
    toEdit (id) {
      location.href = '#/voucher/draft/edit?id=' + id
    },
    toInfo (id) {
      location.href = '#/voucher/draft/detail?id=' + id
    }
  }
}
export default merge(base, table)
</script>
