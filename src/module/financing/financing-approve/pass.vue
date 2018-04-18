<template>
  <div>
    <div v-title='title'>
      {{title}}
    </div>
    <div class="content-body" style='background: #fff;'>
      <el-row>
        <el-col :span='24' >
          <el-form :inline="true" :model="searchData" class="stand-form " style="margin-top:10px" label-width="100px" >
              <fieldset>
                <el-form-item label="供应商名称">
                  <el-input v-model="form.name" placeholder="请输入供应商名称"></el-input>
                </el-form-item>

                <el-form-item label="凭证编号">
                  <el-input v-model="form.name" placeholder="请输入凭证编号"></el-input>
                </el-form-item>

                <el-form-item label="申请日期" class="last-item">
                  <el-date-picker
                    v-model="form.name"
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
              prop="time"
              label="申请时间"
              align="center"
              width='180'
              :formatter = "dateFormaterPrecise">
            </el-table-column>
            <el-table-column
              prop="name"
              :show-overflow-tooltip="true"
              label="供应商名称"
              width='180'
              align="center"
              >
            </el-table-column>
            <el-table-column
              prop="bank"
              :show-overflow-tooltip="true"
              label="关联核心企业"
              min-width='180'
              align="center"
              >
            </el-table-column>
            <el-table-column
              prop="no"
              label="融资凭证编号"
              align="center"
              width='215'
              >
            </el-table-column>
            <el-table-column
              prop="cash"
              label="申请融资金额（元）"
              align="center"
              width='180'
              >
            </el-table-column>
            <el-table-column
              v-if="detailAccess"
              prop="option"
              label="操作"
              width='100'
              align="center">
              <template scope="scope" >
                <el-button @click='toInfo' type="text" size="small">查看</el-button>
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
import accessControl from 'common/javascript/tools/accessControl.js'

export default {
  name: 'app',
  components: {
  },
  data () {
    return {
      title: '审批通过',
      form: {
        name: '',
        value: ''
      },
      tableData: [{
        index: 1,
        time: '2016.01.01  12:00:00',
        name: '供应商1',
        bank: '核心企业1',
        no: '123456',
        cash: '10000'
      },
      {
        index: 2,
        time: '2016.01.01  12:00:00',
        name: '供应商2',
        bank: '核心企业2',
        no: '123456',
        cash: '10000'
      },
      {
        index: 3,
        time: '2016.01.01  12:00:00',
        name: '供应商3',
        bank: '核心企业3',
        no: '123456',
        cash: '10000'
      },
      {
        index: 4,
        time: '2016.01.01  12:00:00',
        name: '供应商4',
        bank: '核心企业4',
        no: '123456',
        cash: '10000'
      },
      {
        index: 5,
        time: '2016.01.01  12:00:00',
        name: '供应商5',
        bank: '核心企业5',
        no: '123456',
        cash: '10000'
      }],
      detailAccess: false
    }
  },
  mounted () {
    this.detailAccess = accessControl.checkAccess('/financing/intention-approve/pass-detail')
  },
  methods: {
    toInfo () {
      location.href = '#/financing/financing-approve/pass-detail'
    }
  }
}
</script>
