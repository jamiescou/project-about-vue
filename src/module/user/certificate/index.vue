<template>
  <div class="content-area" >
    <div v-title='title'>
      {{title}}
    </div>
    <div class="group">
        <div class="span12 path-nav offset0">
            <ol>
                <li><a href="javascript:void()">信息管理</a></li>>
                <li><a href="javascript:void()"><strong>{{title}}</strong></a></li>
            </ol>
        </div>
    </div>
    <div class="content-body info-manage pt20 pr20 pb40 pl20">
        <div class="item-group">
            <div class="item-tit"><span class="item-tit-icon"></span>{{title}}</div>
            <div class="item-cnt">
              <el-row style="padding-top:10px">
                <el-col :span='24' >
                  <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%">
                    <el-table-column
                      type="index"
                      label="序号"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="createTime"
                      label="绑定时间"
                      :formatter = "dateFormaterPrecise"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="serialNo"
                      label="数字证书（DN码）"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="remark"
                      :show-overflow-tooltip=true
                      label="证书备注"
                      >
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
    </div>
  </div>
</template>
<script type="text/javascript">
import 'common/sass/module/table.scss'
import 'common/sass/main.scss'
import config from 'common/config/config'
import table from 'components/entries/base/table'
import merge from 'webpack-merge'
import certService from 'common/api/service/certService'

export default merge(table, {
  name: 'app',
  components: {
  },
  data () {
    return {
      title: '证书信息',
      tableData: [],
      searchData: {
        pageNum: 1,
        pageSize: config.pageSize
      }
    }
  },
  mounted () {
    this.getGrid()
  },
  methods: {
    getGrid () { // 获得表数据
      certService.certCurrent.remote(this.searchData, list => {
        this.tableData = list.content
        this.total = list.total
      })
    }
  }
})
</script>
