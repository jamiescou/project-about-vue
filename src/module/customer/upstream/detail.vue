<template>
  <div class="content-area" >
    <div v-title='title'>
      {{title}}
    </div>
    <div class="group">
        <div class="span12 path-nav offset0">
            <ol>
                <li><a href="javascript:void()">上游供应商</a></li>>
                <li><a href="javascript:void()"><strong>{{title}}</strong></a></li>
            </ol>
        </div>
    </div>
    <div class="content-body info-manage pt20 pr20 pb40 pl20">
        <div class="item-group">
            <div class="item-tit"></div>
            <div class="item-cnt">
                <table class="table-lr">
                <tbody>
                  <tr>
                      <td class="l" width="25%">创建时间</td>
                      <td class="r" width="25%">{{detail.cT}}</td>
                      <td class="l" width="25%">上游供应商名称</td>
                      <td class="r" width="25%">{{detail.name}}</td>
                  </tr>
                  <tr>
                      <td class="l" width="25%">供应商编号</td>
                      <td class="r" width="25%">{{detail.id}}</td>
                      <td class="l" width="25%">社会统一信用代码</td>
                      <td class="r" width="25%">{{detail.code}}</td>
                  </tr>
                  <tr>
                      <td class="l" width="25%">机构类型</td>
                      <td class="r" width="25%">{{detail.type}}</td>
                      <td class="l" width="25%">法定代表人</td>
                      <td class="r" width="25%">{{detail.detail.corpName}}</td>
                  </tr>
                </tbody>
            </table>
            <el-button class="closeBtn" type="info" @click='close'>关闭</el-button>
            </div>
        </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import 'common/css/lib/iconfont.css'
import 'common/css/lib/motherplate.css'
import 'common/sass/module/table.scss'
import 'common/sass/main.scss'
import 'common/sass/module/supplier.scss'
import modal from 'components/entries/modal'
import layout from 'components/include/layout-l-r'
import supplierService from 'common/api/service/supplierService'
import dateTools from 'common/javascript/tools/dateTools'
import status from 'common/config/type'
import stringTooles from 'common/javascript/tools/stringTools'

export default {
  name: 'app',
  components: {
    modal: modal,
    layout
  },
  data () {
    return {
      title: '基本信息',
      detail: {
        cT: '',
        name: '',
        id: '',
        code: '',
        type: '',
        corpName: ''
      }
    }
  },
  beforeMount () {
    this.realInfo()
  },
  methods: {
    close () {
      location.href = '#/customer/upstream'
    },
    realInfo () {
      this.id = this.$route.query.id
      // 基本信息
      let param = this.id
      supplierService.upstreamAuth.remote(param, (data) => {
        this.detail = data.data
        this.detail.cT = dateTools.dateFormater(this.detail.cT, 'YYYY.MM.DD')
        this.detail.type = status.institutionType[this.detail.detail.type].label
        this.detail.id = stringTooles.completeNo(this.detail.id)
        let codes = this.detail.certificateList
        for (let i = 0; i < codes.length; i++) {
          if (parseInt(codes[i].type) === 0) {
            this.detail.code = codes[i].code
            break
          }
        }
      })
    }
  }
}
</script>
