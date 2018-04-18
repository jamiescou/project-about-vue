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
                <!-- 隐藏元素占位，解决点击回车页面刷新问题 -->
                <el-form-item label="" v-show='false'>
                  <el-input v-model="searchData.userName"></el-input>
                </el-form-item>

                <el-form-item label="用户名">
                  <el-input v-model="searchData.userName"  placeholder="请输入用户名称"></el-input>
                </el-form-item>
                <el-button class="button-bubi-theme searchBtn" type="info" icon="null iconfont icon-search-bt" @click = "search">搜索</el-button>
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
              prop="createTime"
              label="创建时间"
              :formatter = "dateFormaterPrecise"
              >
            </el-table-column>
            <el-table-column
              prop="userName"
              :show-overflow-tooltip=true
              label="用户名"
              >
            </el-table-column>
            <el-table-column
              prop=""
              label="绑定情况"
              >
              <template scope="scope">
                <span>{{scope.row.bindCert ? '已绑定' : '未绑定'}}</span>
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
import 'common/sass/module/table.scss'
import config from 'common/config/config'
import table from 'components/entries/base/table'
import merge from 'webpack-merge'
import customerUserService from 'common/api/service/customerUserService'

export default merge(table, {
  name: 'app',
  components: {

  },
  data () {
    return {
      title: '用户列表',
      tableData: [],
      total: null,
      searchData: {
        userName: '',
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
      customerUserService.userQuery.remote(this.searchData, (list) => {
        this.tableData = list.content
        this.total = list.total
      })
    }
  }
})
</script>
