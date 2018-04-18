<!-- 授信分配 cl -->
<template>
  <div class="content-area">

    <div v-title='title'>
      {{title}}
    </div>
    <div class="group">
        <div class="span12 path-nav offset0">
            <ol>
                <li>我的授信</li>>
                <li>授信分配</li>
            </ol>
        </div>
    </div>
    <div class="content-body" style='background: #fff;'>
        <div v-if="hasData === 1">
            <el-row>
              <el-col :span='24' >
                <span class="refresh" v-if="reloadAccess" @click='refreshList'>查询</span>
                <el-form :inline="true" :model="searchData" class="stand-form " style="margin-top:10px" label-width="100px" >
                    <fieldset>
                      <!-- 隐藏元素占位，解决input中点击回车页面刷新问题 -->
                      <el-form-item label="" v-show='false'>
                        <el-input v-model="searchData.supplierName"></el-input>
                      </el-form-item>

                      <el-form-item label="分配企业" class="last-item">
                        <el-input v-model="searchData.supplierName" placeholder="请输入企业名称"></el-input>
                        <el-button class="button-bubi-theme searchBtn" type="info" icon="null iconfont icon-search-bt" @click="search">搜索</el-button>
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
                    prop="supplierName"
                    min-width = '180'
                    label="供应商">
                  </el-table-column>
                  <el-table-column
                    prop="total"
                    min-width = '180'
                    :formatter = "moneyNarrow"
                    label="授信额度（元）">
                  </el-table-column>
                  <el-table-column
                    prop="used"
                    min-width = '180'
                    :formatter = "moneyNarrow"
                    label="已使用额度（元）">
                  </el-table-column>
                  <el-table-column
                    prop="value"
                    min-width = '180'
                    :formatter = "moneyNarrow"
                    label="可使用额度（元）">
                  </el-table-column>
                  <!-- <el-table-column
                    prop="financingRatio"
                    :formatter = "moneyNarrow"
                    min-width = '180'
                    label="融资比例">
                  </el-table-column> -->
                  <!-- <el-table-column
                    prop=""
                    v-if="detailAccess"
                    fixed="right"
                    label="操作"
                    width="150">
                    <template scope="scope" >
                      <el-button type="text" size="small" @click='showDetail(scope.row.supplierId)'>查看详情</el-button>
                    </template>
                  </el-table-column> -->
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
                  :page-size="pageSize"
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
      hasData: 0,
      createTime: '',
      searchData: {
        creditId: null,
        pageSize: config.pageSize,
        pageNum: 1,
        supplierName: null
      }
    }
  },
  mounted () {
    this.reloadAccess = accessControl.checkAccess('/credit/enterprise/allot/reload')
    this.detailAccess = accessControl.checkAccess('/credit/enterprise/detail')
    this.searchData.creditId = this.$route.query.id
    this.getGrid()
  },
  methods: {
    getGrid () { // 获得表数据
      let params = this.searchData
      credit.allot.remote(params, (data) => {
        if (data.success) {
          this.hasData = 1
          this.total = data.data.total
          this.pageSize = data.data.pageSize
          this.pageNum = data.data.pageNum
          this.tableData = data.data.content || []
          Array.map(this.tableData, (item, i) => {
            let used = this.tableData[i].total - this.tableData[i].value
            this.tableData[i].used = used
          })
        } else {
          this.hasData = 2
        }
      })
    },
    reload () {
      location.reload()
    },
    // 查看授信
    showDetail (id) {
      location.href = '#/credit/enterprise/detail?id=' + id
    },
    refreshList () {
      this.searchData.providerName = null
      let params = this.searchData
      credit.allot.remote(params, (data) => {
        if (data.success) {
          this.hasData = 1
          this.total = data.data.total
          this.pageSize = data.data.pageSize
          this.pageNum = data.data.pageNum
          this.tableData = data.data.content || []
          Array.map(this.tableData, (item, i) => {
            let used = this.tableData[i].total - this.tableData[i].value
            this.tableData[i].used = used
          })
          this.$message.success('刷新成功')
        } else {
          this.hasData = 2
        }
      })
    }
  }
}

export default merge(base, table)
</script>
