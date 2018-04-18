<template>
  <div class="content-area" >

    <div v-title='title'>
      {{title}}
    </div>
    <div class="group">
        <div class="span12 path-nav offset0">
            <ol>
                <li>融资管理</li>>
                <li><strong>{{title}}</strong></li>
            </ol>
        </div>
    </div>
    <el-row>
      <el-col :span='24' v-show='this.searchShow === 1'>
        <el-form :inline="true" class="stand-form " label-width="90px" >
            <fieldset>
              <el-form-item label="贷款方名称">
                <el-input v-model="searchData.targetName" placeholder="请输入贷款方名称"></el-input>
              </el-form-item>

              <el-form-item label="申请日期" class="last-item">
                <el-date-picker
                  v-model="createTime"
                  type="daterange"
                  placeholder="选择日期范围"
                  style="width:200px;"
                  range-separator='到'
                  @change='createTimeChange'
                  >
                </el-date-picker>
                <el-button class="button-bubi-theme searchBtn" type="info" @click = "searchOne">搜索</el-button>
              </el-form-item>
            </fieldset>
        </el-form>
      </el-col>
      <el-col :span='24' v-show='this.searchShow === 2'>
        <el-form :inline="true" class="stand-form " label-width="90px" >
            <fieldset>
              <el-form-item label="贷款方名称">
                <el-input v-model="searchData.targetName" placeholder="请输入贷款方名称"></el-input>
              </el-form-item>

              <el-form-item label="申请日期" class="last-item">
                <el-date-picker
                  v-model="createTime"
                  type="daterange"
                  placeholder="选择日期范围"
                  style="width:200px;"
                  range-separator='到'
                  @change='createTimeChange'
                  >
                </el-date-picker>
                <el-button class="button-bubi-theme searchBtn" type="info" @click = "searchTwo">搜索</el-button>
              </el-form-item>
            </fieldset>
        </el-form>
      </el-col>
      <el-col :span='24' v-show='this.searchShow === 3'>
        <el-form :inline="true" class="stand-form " label-width="90px" >
            <fieldset>
              <el-form-item label="贷款方名称">
                <el-input v-model="searchData.targetName" placeholder="请输入贷款方名称"></el-input>
              </el-form-item>

              <el-form-item label="申请日期" class="last-item">
                <el-date-picker
                  v-model="createTime"
                  type="daterange"
                  placeholder="选择日期范围"
                  style="width:200px;"
                  range-separator='到'
                  @change='createTimeChange'>
                </el-date-picker>
                <el-button class="button-bubi-theme searchBtn" type="info" @click = "searchTird">搜索</el-button>
              </el-form-item>
            </fieldset>
        </el-form>
      </el-col>
    </el-row>
    <el-row style="background:#fff">
      <el-col :span='18'>
        <el-tabs v-model="tab.activeName" @tab-click="tabHandleClick">
          <el-tab-pane label="申请中" name="first" v-if="pendingAccess"></el-tab-pane>
          <el-tab-pane label="申请通过" name="second" v-if="passAccess"></el-tab-pane>
          <el-tab-pane label="申请退回" name="third" v-if="rejectAccess"></el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <router-view></router-view>
  </div>
</template>
<script type="text/javascript">
import 'common/css/lib/iconfont.css'
import 'common/css/lib/motherplate.css'
import 'common/sass/main.scss'
import 'common/sass/module/account.scss'
import vnav from 'components/include/nav'
import left from 'components/include/left'
import vfooter from 'components/include/footer'
import modal from 'components/entries/modal'
import layout from 'components/include/layout-l-r'
import dateTools from 'common/javascript/tools/dateTools'
import table from 'components/entries/base/table'
import merge from 'webpack-merge'
import accessControl from 'common/javascript/tools/accessControl.js'

export default merge(table, {
  name: 'app',
  components: {
    vnav: vnav,
    left: left,
    vfooter: vfooter,
    modal: modal,
    layout
  },
  data () {
    return {
      title: '意向审批',
      tab: {
        activeName: 'second'
      },
      dialogFormVisible: false,
      // 搜索数据
      searchShow: 1,
      createTime: null,
      searchData: {
        targetName: null,
        createTimeBegin: null,
        createTimeEnd: null
      },
      pendingAccess: false,
      passAccess: false,
      rejectAccess: false
    }
  },
  mounted () {
    // 页面刷新tab激活状态改变
    let url = location.href.toString().split('/')
    this.tabActive(url)
    // tab切换索搜数据清空
    this.searchData.targetName = null
    this.createTime = null
    this.searchData.createTimeBegin = null
    this.searchData.createTimeEnd = null
    this.pendingAccess = accessControl.checkAccess('/financing/intention-apply/pending')
    this.passAccess = accessControl.checkAccess('/financing/intention-apply/pass')
    this.rejectAccess = accessControl.checkAccess('/financing/intention-apply/reject')
  },
  methods: {
    tabHandleClick (item) {
      let url = ''
      if (item.name === 'first') {
        this.searchShow = 1
        url = '#/financing/intention-apply/pending'
      } else if (item.name === 'second') {
        this.searchShow = 2
        url = '#/financing/intention-apply/pass'
      } else if (item.name === 'third') {
        this.searchShow = 3
        url = '#/financing/intention-apply/reject'
      }
      this.activeName = item.name
      document.title = item.label
      location.href = url
      // tab切换索搜数据清空
      this.searchData.targetName = null
      this.createTime = null
      this.searchData.createTimeBegin = null
      this.searchData.createTimeEnd = null
    },
    createTimeChange (value) {
      const array = value.split('到')
      if (value === null) {
        this.searchData.createTimeBegin = null
        this.searchData.createTimeEnd = null
      } else {
        this.searchData.createTimeBegin = dateTools.dateTotimestamp(array[0] + ' 00:00:00')
        this.searchData.createTimeEnd = dateTools.dateTotimestamp(array[1] + ' 23:59:59')
      }
    },
    // 页面刷新tab激活状态改变
    tabActive (url) {
      if (url[url.length - 1] === 'pass') {
        this.searchShow = 2
        this.tab.activeName = 'second'
      } else if (url[url.length - 1] === 'reject') {
        this.searchShow = 3
        this.tab.activeName = 'third'
      } else {
        this.searchShow = 1
        this.tab.activeName = 'first'
      }
    },
    // 添加融资意向
    addIntention () {
      location.href = '#/financing/intention-apply/intention'
    },
    searchOne () {
      this.$bus.$emit('search-data-one', this.searchData)
    },
    searchTwo () {
      this.$bus.$emit('search-data-two', this.searchData)
    },
    searchTird () {
      this.$bus.$emit('search-data-third', this.searchData)
    }
  },
  watch: {
    '$route' (to, from) {
      let url = to.path.toString().split('/')
      this.tabActive(url)
    }
  }
})
</script>
