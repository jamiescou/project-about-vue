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
                <li>我的授信</li>
            </ol>
        </div>
    </div>
    <div class="content-body" style='background: #fff;'>
        <div v-if="hasData === 1">
            <el-row>
              <el-col :span='24' >
                <span class="refresh" v-if='reloadAccess' @click='refreshList' style='top: 13px;'>查询</span>
                <el-form :inline="true" :model="searchData" class="stand-form " style="margin-top:10px" label-width="100px" >
                    <fieldset>
                      <!-- 隐藏元素占位，解决input中点击回车页面刷新问题 -->
                      <!-- <el-form-item label="" v-show='false'>
                        <el-input v-model="searchData.providerName"></el-input>
                      </el-form-item> -->

                      <!-- <el-form-item label="授信日期">
                        <el-date-picker
                          v-model="createTime"
                          type="daterange"
                          placeholder="选择日期范围"
                          style="width:200px;"
                          range-separator='到'
                          @change='createTimeChange'
                          class="last-item"
                          >
                        </el-date-picker>
                      </el-form-item> -->
                      <!-- <el-button class="button-bubi-theme searchBtn" type="info" icon="null iconfont icon-search-bt" @click="search">搜索</el-button> -->
                      <!-- <el-form-item label="" >
                        <el-input v-model="searchData.providerName" placeholder="请输入授信机构名称"></el-input>
                      </el-form-item> -->
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
                    align='center'
                    width="80">
                  </el-table-column>
                  <!-- <el-table-column
                    prop="cT"
                    label="授信时间"
                    :formatter = "dateFormaterPrecise"
                    width = '180'>
                  </el-table-column> -->
                  <!-- <el-table-column
                    prop="providerName"
                    min-width = '180'
                    :show-overflow-tooltip="true"
                    label="授信机构">
                  </el-table-column> -->
                  <el-table-column
                    prop="total"
                    width = '180'
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
                    prop="timeDuring"
                    width = '200'
                    label="授信开始/结束日期">
                  </el-table-column> -->
                  <!-- <el-table-column
                    prop="financingRatio"
                    :formatter = "moneyNarrow"
                    min-width = '180'
                    label="融资比例">
                  </el-table-column> -->
                  <el-table-column
                    prop=""
                    v-if="detailAccess"
                    fixed="right"
                    label="操作"
                    width="150">
                    <template scope="scope" >
                      <el-button type="text" size="small" @click='showAllot(scope.row.id)'>查看授信分配</el-button>
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
import dateTools from 'common/javascript/tools/dateTools'
import accessControl from 'common/javascript/tools/accessControl.js'

const base = {
  name: 'app',
  components: {
  },
  data () {
    return {
      title: '我的授信',
      tableData: [],
      createTime: '',
      hasData: 0,
      searchData: {
        createTimeEnd: null,
        createTimeStart: null,
        endTimeEnd: null,
        endTimeStart: null,
        // providerName: null,
        startTimeEnd: null,
        startTimeStart: null,
        pageSize: config.pageSize,
        pageNum: 1,
        type: null
      }
    }
  },
  beforeMount () {
    this.reloadAccess = accessControl.checkAccess('/credit/enterprise/reload')
    this.detailAccess = accessControl.checkAccess('/credit/enterprise/allot')
    this.getGrid()
  },
  mounted () {
  },
  methods: {
    getGrid () { // 获得表数据
      let params = this.searchData
      credit.myCredit.remote(params, (data) => {
        if (data.success) {
          this.hasData = 1
          this.total = data.data.total
          this.pageSize = data.data.pageSize
          this.pageNum = data.data.pageNum
          this.tableData = data.data.content || []
          Array.map(this.tableData, (item, i) => {
            // let start = dateTools.dateFormater(this.tableData[i].cT, 'YYYY.MM.DD')
            // let end = dateTools.dateFormater(this.tableData[i].endTime, 'YYYY.MM.DD')
            // if (this.tableData[i].fromTime === 0) {
            //   start = '不限'
            // }
            // if (this.tableData[i].endTime === 0) {
            //   end = '不限'
            // }
            let used = this.tableData[i].total - this.tableData[i].value
            // this.tableData[i].timeDuring = start + '-' + end
            this.tableData[i].used = used
          })
        } else {
          this.hasData = 2
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
    // 查看授信
    showAllot (id) {
      location.href = '#/credit/enterprise/allot?id=' + id
    },
    // 查询 （刷新列表）
    refreshList () {
      this.searchData.createTimeStart = null
      this.searchData.createTimeEnd = null
      // this.searchData.providerName = null
      let params = this.searchData
      credit.myCredit.remote(params, (data) => {
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
