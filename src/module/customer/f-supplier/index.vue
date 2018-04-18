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
    <div class="content-body" style='background: #fff; padding-top: 20px'>
      <el-row>
        <el-col :span='24' >
          <el-form :inline="true" :model="searchData" class="stand-form " style="margin-top:10px" label-width="100px" >
              <fieldset>
                <el-form-item label="供应商名称">
                  <el-input v-model="form.name" placeholder="请输入供应商名称"></el-input>
                </el-form-item>

                <el-form-item label="状态">
                  <el-select v-model="form.value" placeholder="全部">
                    <el-option label="全部" value="shanghai"></el-option>
                    <el-option label="融资意向申请" value="beijing"></el-option>
                    <el-option label="融资申请" value="shang"></el-option>
                    <el-option label="待审批" value="bei"></el-option>
                    <el-option label="审批通过" value="sha"></el-option>
                    <el-option label="审批不通过" value="be"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="关联日期" class="last-item">
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
              label="关联时间"
              align="center"
              width='180'
              :formatter = "dateFormaterPrecise">
            </el-table-column>
            <el-table-column
              prop="name"
              :show-overflow-tooltip="true"
              label="供应商名称"
              min-width='180'
              align="center">
            </el-table-column>
            <el-table-column
              prop="bank"
              :show-overflow-tooltip="true"
              label="关联核心企业"
              width='180'
              align="center">
            </el-table-column>
            <el-table-column
              prop="person"
              :show-overflow-tooltip="true"
              label="联系人姓名"
              align="center"
              width='160'>
            </el-table-column>
            <el-table-column
              prop="phone"
              label="联系人手机号"
              width='180'
              align="center">
            </el-table-column>
            <el-table-column
              v-if="detailAccess"
              prop="option"
              width='100'
              label="操作"
              align="center">
              <template scope="scope" >
                <el-button @click='toInfo' type="text" size="small">基础信息</el-button>
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
      title: '供应商',
      form: {
        name: '',
        value: ''
      },
      tableData: [{
        index: 1,
        time: '2016.01.01  12:00:00',
        name: '供应商1',
        bank: '核心企业1',
        person: '联系人1',
        phone: '18888888888'
      },
      {
        index: 2,
        time: '2016.01.01  12:00:00',
        name: '供应商2',
        bank: '核心企业2',
        person: '联系人2',
        phone: '18888888888'
      },
      {
        index: 3,
        time: '2016.01.01  12:00:00',
        name: '供应商3',
        bank: '核心企业3',
        person: '联系人3',
        phone: '18888888888'
      },
      {
        index: 4,
        time: '2016.01.01  12:00:00',
        name: '供应商4',
        bank: '核心企业4',
        person: '联系人4',
        phone: '18888888888'
      },
      {
        index: 5,
        time: '2016.01.01  12:00:00',
        name: '供应商5',
        bank: '核心企业5',
        person: '联系人5',
        phone: '18888888888'
      }],
      detailAccess: false
    }
  },
  mounted () {
    this.detailAccess = accessControl.checkAccess('/customer/f-supplier/detail')
  },
  methods: {
    toInfo () {
      location.href = '#/customer/f-supplier/detail'
    }
  }
}
</script>
