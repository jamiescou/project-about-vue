<template>
  <div class="content-area" >
    <div v-title='title'>
      {{title}}
    </div>
      <div class="group">
          <div class="span12 path-nav ">
              <ol>
                  <li><a href="#">供应商管理</a></li>>
                  <li><a href="#"><strong>{{title}}</strong></a></li>
              </ol>
          </div>
      </div>
      <div class="content-body">
          <div class="tab-bar " style="padding:40px 5px;">
            <span class="span-wrap">
              <span
              class="tab-button"
              v-for="(item, index) in tabsData"
              :index = "index"
              v-show="item.access"
              v-bind:class="item.selected ? 'active':''"
              @click="tabChange(index)">
                {{item.name}}
              </span>
            </span>
          </div>
      </div>
      <div style="overflow:hidden;background:#fff;" v-if ="whichShow==0 && tabsData[0].access">
        <div class="content-body info-manage pt20 pr20 pb40 pl20">
            <div class="item-group">
                <div class="item-cnt">
                  <table class="table-lr">
                    <tbody>
                      <tr>
                          <td class="l" width="25%">供应商名称</td>
                          <td class="r" width="25%">{{detail.name}}</td>
                          <td class="l" width="25%">供应商ERP编号</td>
                          <td class="r" width="25%">{{detail.code}}</td>
                      </tr>
                      <tr>
                          <td class="l" width="25%">邀请码通知方式</td>
                          <td class="r" width="25%">{{detail.contactType}}</td>
                          <td class="l" width="25%">手机号码/邮箱</td>
                          <td class="r" width="25%">{{detail.contact}}</td>
                      </tr>
                      <tr>
                          <td class="l" width="25%">创建时间</td>
                          <td class="r" width="25%">{{detail.cT}}</td>
                          <td class="l" width="25%">登录账号</td>
                          <td class="r" width="25%">{{detail.userName}}</td>
                      </tr>
                      <tr>
                          <td class="l" width="25%">供应商编号</td>
                          <td class="r" width="25%">{{detail.supplierId}}</td>
                          <td class="l" width="25%">区块链账户</td>
                          <td class="r" width="25%">{{detail.companyBlockChainAddr}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
            </div>
        </div>
      </div>
      <div v-if="whichShow==1 && tabsData[1].access" style="background:#fff;overflow: hidden;padding:0px 10px 20px 10px;">
        <div v-if="tabsData[1].data !== null" class="content-body info-manage pt20 pr20 pb40 pl20">
            <div class="item-group">
                <div class="item-tit"><span class="item-tit-icon"></span>企业信息</div>
                <div class="item-cnt">
                  <table class="table-lr">
                    <tbody>
                      <tr>
                          <td class="l" width="25%">认证时间</td>
                          <td class="r" width="25%">{{realName.cT}}</td>
                          <td class="l" width="25%">机构全称</td>
                          <td class="r" width="25%">{{realName.name}}</td>
                      </tr>
                      <tr>
                          <td class="l" width="25%">机构类型</td>
                          <td class="r" width="25%">{{realName.type}}</td>
                          <td class="l" width="25%">社会统一信用代码</td>
                          <td class="r" width="25%">{{realName.code}}</td>
                      </tr>
                      <tr>
                          <td class="l" width="25%">税务登记号</td>
                          <td class="r" width="25%">{{realName.taxCode}}</td>
                          <td class="l" width="25%">法定代表人</td>
                          <td class="r" width="25%">{{realName.detail.corpName}}</td>
                      </tr>
                      <tr>
                          <td class="l" width="25%">法定代表人证件类型</td>
                          <td class="r" width="25%">{{realName.corpCardType}}</td>
                          <td class="l" width="25%">法定代表人证件号码</td>
                          <td class="r" width="25%">{{realName.detail.corpCardId}}</td>
                      </tr>
                      <tr>
                          <td class="l" width="25%">证件到期日</td>
                          <td class="r" width="25%">{{realName.detail.corpCardDate | timestampToDay}}</td>
                          <td class="l" width="25%"></td>
                          <td class="r" width="25%"></td>
                      </tr>
                      <tr>
                          <td class="l" width="25%">所在城市</td>
                          <td class="r" width="25%">{{realName.city}}</td>
                          <td class="l" width="25%">注册地址</td>
                          <td class="r" width="25%">{{realName.detail.address}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
            </div>
            <div class="item-group">
                <div class="item-tit"><span class="item-tit-icon"></span>其他信息材料</div>
                <div class="item-cnt">
                <table class="table-lr">
                    <tbody>
                      <tr>
                          <td class="l" width="25%">联系人姓名</td>
                          <td class="r" width="25%">{{realName.detail.linkmanName}}</td>
                          <td class="l" width="25%">联系人手机号</td>
                          <td class="r" width="25%">{{realName.detail.linkmanPhone}}</td>
                      </tr>
                    </tbody>
                </table>
                </div>
                <div class="item-cnt">
                  <div class="group one-row">
                      <div class="span3 offset1 ">
                          <div class="image-content">
                              <span class="title">营业执照</span>
                              <img alt="" :src="'/service/file/image/download/' + realName.busy">
                          </div>
                      </div>
                      <div class="span3">
                          <div class="image-content">
                              <span class="title">代表人身份证</span>
                              <img alt="" :src="'/service/file/image/download/' + realName.detail.corpCardFileId">
                          </div>
                      </div>

                      <div class="span3">
                          <div class="image-content">
                              <span class="title">委托人身份证</span>
                              <img alt="" :src="'/service/file/image/download/' + realName.detail.clientCardFileId">
                          </div>
                      </div>
                  </div>
                </div>
            </div>
        </div>
        <div v-if='tabsData[1].data === null' class="noDataMsg"><i class="el-icon-warning"></i> 尚未进行实名认证</div>
      </div>
      <div v-if="whichShow==2 && tabsData[2].access" style="background:#fff;overflow:hidden;padding:0px 10px 20px 10px">
        <div v-if ="tabsData[2].data !== null" class="content-body info-manage pt20 pr20 pb40 pl20">
            <div class="item-group">
                <div class="item-cnt">
                  <table class="table-lr">
                    <tbody>
                      <tr>
                          <td class="l" width="25%">账户名</td>
                          <td class="r" width="25%">{{sonInfo.companyName}}</td>
                          <td class="l" width="25%">开户行</td>
                          <td class="r" width="25%">{{sonInfo.financialName}}</td>
                      </tr>
                      <tr>
                          <td class="l" width="25%">子账户号</td>
                          <td class="r" width="25%">{{sonInfo.no}}</td>
                          <td class="l" width="25%">区块链账户</td>
                          <td class="r" width="25%">{{sonInfo.blockchainAddress}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
            </div>
        </div>
        <div v-if='tabsData[2].data === null' class="noDataMsg">
          <i class="el-icon-warning"></i> 尚未进行实名认证，子账户信息需通过实名认证后提供
        </div>
      </div>
  </div>

</template>

<script type="text/javascript">

import 'common/css/lib/iconfont.css'
import 'common/css/lib/motherplate.css'
import 'common/sass/module/regular.scss'
import 'common/sass/module/account.scss'
import 'common/sass/module/table.scss'
import supplierService from 'common/api/service/supplierService'
import dateTools from 'common/javascript/tools/dateTools'
import status from 'common/config/type'
import tools from 'common/javascript/tools/tools'
import region from 'common/config/region'
import stringTooles from 'common/javascript/tools/stringTools'
import accessControl from 'common/javascript/tools/accessControl.js'

export default {
  name: 'app',
  data () {
    return {
      title: '基础信息',
      file: [],
      tabsData: [
        {name: '账号信息', selected: false, access: false, data: null},
        {name: '实名信息', selected: false, access: false, data: null}
      ],
      detail: {
        name: '',
        code: '',
        contactType: '',
        contact: '',
        cT: '',
        invite: ''
      },
      realName: {
        cT: 0,
        name: '',
        type: '',
        code: '',
        taxCode: '',
        detail: {
          corpName: '',
          corpCardId: '',
          corpCardDate: '',
          address: '',
          linkmanName: '',
          linkmanPhone: '',
          corpCardFileId: '',
          clientCardFileId: ''
        },
        corpCardType: '',
        city: '',
        contactName: '',
        contactPhone: ''
      },
      sonInfo: '',
      whichShow: 0,
      id: null,
      sId: null
    }
  },
  mounted () {
    this.tabsData[0].access = accessControl.checkAccess('/customer/downstream/detail/account') //
    this.tabsData[0].selected = this.tabsData[0].access // 激活还是不激活与权限一致，无权限：不激活；有权限：激活
    this.tabsData[1].access = accessControl.checkAccess('/customer/downstream/detail/real-name')
    this.tabsData[1].selected = this.tabsData[1].access ? !this.tabsData[0].selected : this.tabsData[1].access // 无权限：不激活；有权限：第1个tab未激活才激活
    // this.tabsData[2].access = accessControl.checkAccess('/customer/downstream/detail/sub-account')
    // this.tabsData[2].selected = this.tabsData[2].access ? !this.tabsData[0].selected && !this.tabsData[1].selected : this.tabsData[2].access // 无权限：不激活；有权限：第1个和第2个tab未激活才激活
    this.whichShow = this.tabsData[0].selected ? 0 : (this.tabsData[1].selected ? 1 : 0)
    this.getVoucher()
  },
  methods: {
    tabChange: function (index) {
      this.tabsData.forEach(function (item) {
        item.selected = false
      })
      this.$bus.$emit('voucher-refurbish', this.detail)
      this.tabsData[index].selected = true
      this.whichShow = index
    },
    getVoucher () {
      this.id = this.$route.query.id
      this.sId = this.$route.query.sId
      // 账户信息
      if (this.tabsData[0].access) {
        supplierService.downstreamInfo.remote(this.id, (data) => {
          this.detail = data.data || this.detail
          this.detail.contactType = this.detail.contactType ? '邮件通知' : '短息通知'
          this.detail.supplierId = stringTooles.completeNo(this.detail.supplierId)
          this.detail.cT = dateTools.dateFormater(this.detail.cT, 'YYYY.MM.DD')
        })
      }
      // 实名信息
      if (this.tabsData[1].access) {
        supplierService.downstreamAuth.remote(this.sId, (data) => {
          this.tabsData[1].data = data.data
          this.realName = data.data || this.realName
          let codes = this.realName.certificateList
          for (let i = 0; i < codes.length; i++) {
            if (parseInt(codes[i].type) === 0) {
              this.realName.code = codes[i].code
              this.realName.busy = codes[i].fileId
            } else if (parseInt(codes[i].type) === 1) {
              this.realName.taxCode = codes[i].code
            }
          }
          this.realName.type = status.institutionType[this.realName.detail.type].label
          this.realName.cT = dateTools.dateFormater(this.realName.cT, 'YYYY.MM.DD')
          this.realName.corpCardDate = (this.realName.corpCardDate === 0) ? '' : dateTools.dateFormater(this.realName.corpCardDate, 'YYYY.MM.DD')
          this.realName.corpCardType = this.realName.detail.corpCardType !== '' ? status.corpIDType[this.realName.detail.corpCardType].label : ''
          this.realName.city = this.realName.detail.city ? region.city[this.realName.detail.city - 1].name : ''
          Array.map(this.realName.fileList, (item, i, arr) => {
            this.file[item.fileType] = tools.getUrl() + '/service/file/image/download/' + item.fileId
          })
        })
      }
      // 子账户信息
      if (this.tabsData[2].access) {
        supplierService.downstreamSon.remote(this.sId, (data) => {
          this.tabsData[2].data = data.data
          this.sonInfo = data.data.accountList[0] || this.sonInfo
        })
      }
    }
  }
}

</script>

<style>
  .input-width{
    position:relative;
    width:160px;

  }
  .input-width input{
    padding:5px 0px;

  }
  .transferable-funds{
    position: relative;
    margin:10px 0px;
    float: left;
    height: auto;
    overflow: auto;
  }
  .transferable-funds span{
    position: relative;
    float:left;
    padding:6px 0px;

  }
  .operation-detail{
    background:#fff;
  }
  .table-base td {
    border: 1px solid #e4e4e4;
  }
  .table-box {
    width: 900px;
  }
</style>
