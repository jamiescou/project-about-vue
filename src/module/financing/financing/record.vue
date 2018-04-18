<template>
    <div class="content-body" style='background: #fff;'>
      <el-row>
        <el-col :span='24' >

          <el-form :inline="true"  class="stand-form " style="margin-top:10px" label-width="100px" >
              <fieldset>
                <el-form-item label="凭证编号">
                  <el-input v-model="temp" placeholder="请输入凭证编号"></el-input>
                </el-form-item>

                <el-form-item label="申请机构">
                  <el-input v-model="temp" placeholder="输入申请机构名称"></el-input>
                </el-form-item>

                <el-form-item label="申请日期">
                  <el-date-picker
                    v-model="temp"
                    type="daterange"
                    placeholder="选择日期范围"
                    style="width:200px;"
                    >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="申请金额" class="amount-range last-item">
                  <el-col :span="10">
                    <el-input placeholder="请输入金额" v-model="input4" style="width:150px;">
                      <template slot="append">元</template>
                    </el-input>
                  </el-col>
                  <el-col :span="2" style="text-align:center;width:25px">-</el-col>
                  <el-col :span="10">
                    <el-input placeholder="请输入金额" v-model="input4" style="width:150px;">
                      <template slot="append">元</template>
                    </el-input>
                  </el-col>
                  <el-col :span="2" style="text-align:center;width:25px">
                    <el-button class="button-bubi-theme searchBtn mt3 ml30" type="info" icon="null iconfont icon-search-bt" @click = "">搜索</el-button>
                  </el-col>
                </el-form-item>
              </fieldset>
          </el-form>

        </el-col>
      </el-row>

      <!--表格-->
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
            <el-table-column
              prop="operateTime"
              label="申请时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              :show-overflow-tooltip="true"
              min-width="180"
              label="融资机构">
            </el-table-column>
            <el-table-column
              prop="certificateNo"
              label="凭证编号"
              width = '215'>
            </el-table-column>

            <el-table-column
              prop="sum"
              label="凭证金额（元）"
              :formatter = "moneyShow"
              width="150">
            </el-table-column>
            <el-table-column
              prop="sum"
              label="可融资余额（元）"
              :formatter = "moneyShow"
              width="180">
            </el-table-column>
            <el-table-column
              prop="sum"
              label="申请融资金额（元）"
              :formatter = "moneyShow"
              width="180">
            </el-table-column>

            <el-table-column
              prop="date"
              label="还款日期"
              width="150">
            </el-table-column>

            <el-table-column
              prop="state"
              label="状态"
              width="100">
              <template scope="scope">
                <el-tag type="gray" v-for='item in options' :key="item.index" v-if='scope.row.state===item.value' >
                  {{item.label}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="state"
              fixed="right"
              label="操作"
              width="80">
              <template scope="scope" >
                <el-button  type="text" @click='toInfo' >融资</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <el-row class="mt20 mb20" v-show="tableData.length != 0">
        <el-col>
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
import 'common/sass/module/table.scss'
import 'common/sass/main.scss'
import 'common/sass/module/account.scss'
import vnav from 'components/include/nav'
import left from 'components/include/left'
import vfooter from 'components/include/footer'
import modal from 'components/entries/modal'
import layout from 'components/include/layout-l-r'
import table from 'components/entries/base/table'
import merge from 'webpack-merge'

const base = {
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
      title: '融资意向',
      tab: {
        activeName: 'first'
      },
      currentPage: 1,
      dialogFormVisible: false,
      temp: 1,
      input4: 1,
      states: [{
        value: 1,
        label: '登记待审批'
      }],
      options: [{
        value: 0,
        label: '全部'
      },
      {
        value: 1,
        label: '待审核'
      },
      {
        value: 2,
        label: '审核通过'
      },
      {
        value: 3,
        label: '驳回'
      }],
      tableData: [{
        id: '1',
        no: '1',
        date: '2016-05-02',
        operateTime: '2016-05-02 10:10:10',
        certificateNo: 'B201601010032',
        name: '神州硬件',
        sum: '10000',
        payDate: '2016-05-02',
        pointMember: '神州硬件',
        submitDate: '2016-05-02',
        remarks: '优质凭证',
        cooperate: '无',
        state: 3,
        source: 1
      },
      {
        id: '1',
        no: '1',
        date: '2016-05-02',
        operateTime: '2016-05-02 10:10:10',
        certificateNo: 'B201601010032',
        name: '神州硬件',
        sum: '10000',
        payDate: '2016-05-02',
        pointMember: '神州硬件',
        submitDate: '2016-05-02',
        remarks: '优质凭证',
        cooperate: '无',
        state: 1,
        source: 1
      },
      {
        id: '1',
        no: '1',
        date: '2016-05-02',
        operateTime: '2016-05-02 10:10:10',
        certificateNo: 'B201601010032',
        name: '神州硬件',
        sum: '10000',
        payDate: '2016-05-02',
        pointMember: '神州硬件',
        submitDate: '2016-05-02',
        remarks: '优质凭证',
        cooperate: '无',
        state: 1,
        source: 1
      },
      {
        id: '1',
        no: '1',
        date: '2016-05-02',
        operateTime: '2016-05-02 10:10:10',
        certificateNo: 'B201601010032',
        name: '神州硬件',
        sum: '10000',
        payDate: '2016-05-02',
        pointMember: '神州硬件',
        submitDate: '2016-05-02',
        remarks: '优质凭证',
        cooperate: '已上传',
        state: 1,
        source: 2
      },
      {
        no: '1',
        date: '2016-05-02',
        operateTime: '2016-05-02 10:10:10',
        certificateNo: 'B201601010032',
        name: '神州硬件',
        sum: '10000',
        payDate: '2016-05-02',
        pointMember: '神州硬件',
        submitDate: '2016-05-02',
        remarks: '优质凭证',
        cooperate: '已上传',
        state: 1,
        source: 2
      },
      {
        id: '1',
        no: '1',
        date: '2016-05-02',
        operateTime: '2016-05-02 10:10:10',
        certificateNo: 'B201601010032',
        name: '神州硬件',
        sum: '10000',
        payDate: '2016-05-02',
        pointMember: '神州硬件',
        submitDate: '2016-05-02',
        remarks: '优质凭证',
        cooperate: '已上传',
        state: 1,
        source: 3
      },
      {
        id: '1',
        no: '1',
        date: '2016-05-02',
        operateTime: '2016-05-02 10:10:10',
        certificateNo: 'B201601010032',
        name: '神州硬件',
        sum: '10000',
        payDate: '2016-05-02',
        pointMember: '神州硬件',
        submitDate: '2016-05-02',
        remarks: '优质凭证',
        cooperate: '已上传',
        state: 1,
        source: 4
      },
      {
        id: '1',
        no: '1',
        date: '2016-05-02',
        operateTime: '2016-05-02 10:10:10',
        certificateNo: 'B201601010032',
        name: '神州硬件',
        sum: '10000',
        payDate: '2016-05-02',
        pointMember: '神州硬件',
        submitDate: '2016-05-02',
        remarks: '优质凭证',
        cooperate: '已上传',
        state: 1,
        source: 4
      },
      {
        id: '1',
        no: '1',
        date: '2016-05-02',
        operateTime: '2016-05-02 10:10:10',
        certificateNo: 'B201601010032',
        name: '神州硬件',
        sum: '10000',
        payDate: '2016-05-02',
        pointMember: '神州硬件',
        submitDate: '2016-05-02',
        remarks: '优质凭证',
        cooperate: '已上传',
        state: 1,
        source: 4
      },
      {
        id: '1',
        no: '1',
        date: '2016-05-02',
        operateTime: '2016-05-02 10:10:10',
        certificateNo: 'B201601010032',
        name: '神州硬件',
        sum: '10000',
        payDate: '2016-05-02',
        pointMember: '神州硬件',
        submitDate: '2016-05-02',
        remarks: '优质凭证',
        cooperate: '已上传',
        state: 2,
        source: 4
      }]
    }
  },
  mounted () {

  },
  methods: {
    addContract () {
      this.$refs.addContract.show = true
    },
    stateFormat () {
      return '1'
    },
    handleSizeChange (page, a, b) {
    },
    handleCurrentChange (page, a, b) {
      this.currentPage = page
    },
    toInfo () {
      location.href = '#/financing/financing/detail'
    }
  }
}
export default merge(base, table)
</script>
