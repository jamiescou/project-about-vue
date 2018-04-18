<template>
    <div class="content-area" >
        <div v-title='title'>{{title}}</div>
        <div class="group">
            <div class="span12 path-nav ">
                <ol>
                    <li><a href="javascript:void()">账户管理</a></li>>
                    <li><a href="javascript:void()"><strong>{{title}}</strong></a></li>
                </ol>
            </div>
        </div>
        <div class="content-body financing-info pt40 pr20 pb40 pl20">
            <div class="item-group">
                <div class="item-tit"><!--<span class="item-tit-icon"></span>--></div>
                <div class="item-cnt">
                    <table class="table-lr table-th-block table-data mb40">
                        <tbody>
                            <tr>
                                <td width="25%" class="l">添加时间</td>
                                <td width="75%" class="r">{{detail.cT}}</td>
                            </tr>
                            <tr>
                                <td width="25%" class="l">银行账户名</td>
                                <td width="75%" class="r">{{detail.companyName}}</td>
                            </tr>
                            <tr>
                                <td width="25%" class="l">所属银行</td>
                                <td width="75%" class="r">{{detail.issuer.bankName}}</td>
                            </tr>
                            <tr>
                                <td width="25%" class="l">银行所在地区</td>
                                <td width="75%" class="r">{{detail.issuer.city.province.name}}{{detail.issuer.city.name}}</td>
                            </tr>
                            <tr>
                                <td width="25%" class="l">支行名称</td>
                                <td width="75%" class="r">{{detail.issuer.name}}</td>
                            </tr>
                            <tr>
                                <td width="25%" class="l">银行账户号</td>
                                <td width="75%" class="r">{{detail.no}}</td>
                            </tr>
                            <tr>
                                <td width="25%" class="l">账户号类型</td>
                                <td width="75%" class="r">{{detail.businessScope}}</td>
                            </tr>
                            <tr>
                                <td width="25%" class="l">备注名</td>
                                <td width="75%" class="r">
                                   <span v-if='!edit'>{{detail.remark}}</span>
                                   <el-input v-if='edit' class="remark" placeholder="备注名20字以内" v-model="detail.remark" @change='markChange'></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td width="25%" class="l">区块链账户</td>
                                <td width="75%" class="r">{{detail.blockchainAddress}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="button-group mt30" v-if="updateAccess">
                        <el-button type="primary" @click="goback">{{btnInnerHTML}}</el-button>
                    </div>
                </div>
            </div>
      </div>
  </div>

</template>

<script type="text/javascript">

import 'common/css/lib/iconfont.css'
import 'common/css/lib/motherplate.css'
import 'common/sass/module/regular.scss'
import 'common/sass/module/table.scss'
import 'common/sass/module/supplier.scss'
import vnav from 'components/include/nav'
import left from 'components/include/member-left'
import vfooter from 'components/include/footer'
import bankAccountService from 'common/api/service/bankAccountService'
import dateTools from 'common/javascript/tools/dateTools'
import bank from 'common/config/bank'
import accessControl from 'common/javascript/tools/accessControl.js'

export default {
  name: 'app',
  components: {
    vnav: vnav,
    left: left,
    vfooter: vfooter
  },
  data () {
    return {
      title: '银行账户详情',
      edit: false,
      id: null, // 卡的id
      btnInnerHTML: '修改',
      detail: {
        issuer: {
          bankName: '',
          city: {
            province: {
              name: ''
            }
          }
        }
      }
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.updateAccess = accessControl.checkAccess('/account/bank-account/detail/updateRemark')
    bankAccountService.queryDetail.remote(this.id, (info) => {
      this.detail = info.data
      this.detail.companyName = sessionStorage.getItem('currentCompany')
      this.detail.cT = dateTools.dateFormater(this.detail.cT, 'YYYY.MM.DD HH:mm:ss')
      this.detail.businessScope = bank.businessScope[this.detail.businessScope]
    })
  },
  methods: {
    // 限制备注20字以内
    markChange (value) {
      if (value.length > 20) {
        this.$message.error('备注20字以内')
        this.detail.remark = value.substring(0, 20)
      }
    },
    goback () {
      if (this.btnInnerHTML === '修改') {
        this.edit = true
        this.btnInnerHTML = '提交'
      } else if (this.btnInnerHTML === '提交') {
        this.edit = false
        this.btnInnerHTML = '修改'
        let param = {
          id: this.id,
          remark: this.detail.remark
        }
        bankAccountService.updateremark.remote(param, (info) => {
        })
      }
    }
  }
}
</script>
