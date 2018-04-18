

<template>
  <div class="content-area" >
    <div v-title='title'>
      {{title}}
    </div>
      <div class="group">
          <div class="span12 path-nav ">
              <ol>
                  <li><a href="#">客户管理</a></li>>
                  <li><a href="#"><strong>{{title}}</strong></a></li>
              </ol>
          </div>
      </div>
      <div class="content-body">
          <div class="tab-bar " style="padding:40px 5px;" >
            <span class="span-wrap">
              <span
              class="tab-button"
              v-for="(item, index) in tabsData"
              :index = "index"
              v-bind:class="item.selected ? 'active':''"
              @click="tabChange(index)"
              >
              {{item.name}}
              </span>
            </span>
          </div>
      </div>
      <div style="overflow:hidden;background:#fff;" v-if ="whichShow==0">
        <div class="content-body info-manage pt20 pr20 pb40 pl20">
            <div class="item-group">
                <div class="item-cnt">
                  <table class="table-lr">
                      <tbody>
                        <tr>
                            <td class="l" width="25%">供应商名称</td>
                            <td class="r" width="75%">供应商1</td>
                        </tr>
                        <tr>
                            <td class="l" width="25%">供应商编号</td>
                            <td class="r" width="75%">12345678</td>
                        </tr>
                        <tr>
                            <td class="l" width="25%">创建核心企业</td>
                            <td class="r" width="75%">核心企业1</td>
                        </tr>
                        <tr>
                            <td class="l" width="25%">区块链账户</td>
                            <td class="r" width="75%"></td>
                        </tr>
                        <tr>
                            <td class="l" width="25%">系统账号</td>
                            <td class="r" width="75%">12345678</td>
                        </tr>
                        <tr>
                            <td class="l" width="25%">创建时间</td>
                            <td class="r" width="75%">2016.01.01 12:00:00</td>
                        </tr>
                      </tbody>
                  </table>
                </div>
            </div>
        </div>
      </div>
      <div  v-if ="whichShow==1" style="background:#fff;overflow: hidden;padding:0px 10px 20px 10px;">
        <div class="content-body info-manage pt20 pr20 pb40 pl20">
            <div class="item-group">
                <div class="item-cnt">
                  <table class="table-lr">
                    <tbody>
                      <tr>
                          <td class="l" width="25%">认证时间</td>
                          <td class="r" width="25%">2016.01.01 12:00:00</td>
                          <td class="l" width="25%">机构全称</td>
                          <td class="r" width="25%">珠海钢铁制造技术有限公司</td>
                      </tr>
                      <tr>
                          <td class="l" width="25%">机构简称</td>
                          <td class="r" width="25%"></td>
                          <td class="l" width="25%">社会统一信用代码</td>
                          <td class="r" width="25%">555666777</td>
                      </tr>
                      <tr>
                          <td class="l" width="25%">税务登记号</td>
                          <td class="r" width="25%">2555648589845246</td>
                          <td class="l" width="25%">组织机构代码</td>
                          <td class="r" width="25%"></td>
                      </tr>
                      <tr>
                          <td class="l" width="25%">机构类型</td>
                          <td class="r" width="25%"></td>
                          <td class="l" width="25%">所在城市</td>
                          <td class="r" width="25%"></td>
                      </tr>
                      <tr>
                          <td class="l" width="25%">注册地址</td>
                          <td class="r" width="25%"></td>
                          <td class="l" width="25%">注册资本</td>
                          <td class="r" width="25%"></td>
                      </tr>
                      <tr>
                          <td class="l" width="25%">通讯地址</td>
                          <td class="r" width="25%"></td>
                          <td class="l" width="25%">邮政编码</td>
                          <td class="r" width="25%"></td>
                      </tr>
                      <tr>
                          <td class="l" width="25%">法定代表人</td>
                          <td class="r" width="25%"></td>
                          <td class="l" width="25%">法定代表人证件类型</td>
                          <td class="r" width="25%"></td>
                      </tr>
                      <tr>
                          <td class="l" width="25%">法定代表人证件号码</td>
                          <td class="r" width="25%"></td>
                          <td class="l" width="25%">证件有效期</td>
                          <td class="r" width="25%"></td>
                      </tr>
                      <tr>
                          <td class="l" width="25%">经营范围</td>
                          <td class="r" width="25%"></td>
                          <td class="l" width="25%"></td>
                          <td class="r" width="25%"></td>
                      </tr>
                      <tr>
                          <td class="l" width="25%">联系人姓名</td>
                          <td class="r" width="25%"></td>
                          <td class="l" width="25%">联系人手机号码</td>
                          <td class="r" width="25%"></td>
                      </tr>
                      <tr>
                          <td class="l" width="25%">联系人证件类型</td>
                          <td class="r" width="25%"></td>
                          <td class="l" width="25%">证件号码</td>
                          <td class="r" width="25%"></td>
                      </tr>
                      <tr>
                          <td class="l" width="25%">证件有效期</td>
                          <td class="r" width="25%"></td>
                          <td class="l" width="25%">联系人邮箱</td>
                          <td class="r" width="25%"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
            </div>
            <div class="item-group">
                <div class="item-cnt">
                </div>
                <div class="item-cnt">
                  <div class="group one-row">
                      <div class="span3 offset1 ">
                          <div class="image-content">
                              <span class="title">营业执照</span>
                              <img alt="" src="../../../common/image/u4942.jpg">
                          </div>
                      </div>
                      <div class="span3">
                          <div class="image-content">
                              <span class="title">代表人身份证</span>
                              <img alt="" src="../../../common/image/u4944.jpg">
                          </div>
                      </div>

                      <div class="span3">
                          <div class="image-content">
                              <span class="title">委托人身份证</span>
                              <img alt="" src="../../../common/image/u4944.jpg">
                          </div>
                      </div>
                  </div>
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
import 'common/sass/module/account.scss'
import 'common/sass/module/table.scss'
// import smallToBig from 'common/javascript/tools/smallToBig'
// import dateTools from 'common/javascript/tools/dateTools'
import cvoucher from 'components/entries/common/voucher'

export default {
  name: 'app',
  components: {
    cvoucher: cvoucher
  },
  data () {
    return {
      title: '核心企业',
      form: {
        name: '',
        value: ''
      },
      tabsData: [
        {name: '账号信息', selected: true},
        {name: '实名信息', selected: false}
      ],
      whichShow: 0,
      id: null
    }
  },
  methods: {
    tabChange: function (index) {
      this.tabsData.forEach(function (item) {
        item.selected = false
      })
      this.$bus.$emit('voucher-refurbish', this.detail)
      this.tabsData[index].selected = true
      this.whichShow = index
    }
  }
}

</script>
