

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
                            <td class="l" width="25%">注册时间</td>
                            <td class="r" width="75%">2016.01.01 12:00:00</td>
                        </tr>
                        <tr>
                            <td class="l" width="25%">注册手机号</td>
                            <td class="r" width="75%">18610567075</td>
                        </tr>
                        <tr>
                            <td class="l" width="25%">区块链账户地址</td>
                            <td class="r" width="75%">bubijjhdkaqei9aohfnamxlaijdhgbama1hgkamaahgjaca</td>
                        </tr>
                        <tr>
                            <td class="l" width="25%">区块链账户地址</td>
                            <td class="r" width="75%">bubijjhdkaqei9aohfnamxlaijdhgbama1hgkamaahgjaca</td>
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
      <div  v-if ="whichShow==2" style="background:#fff;overflow:hidden;padding:0px 10px 20px 10px">
        <div class="content-body info-manage pt20 pr20 pb40 pl20">
            <div class="item-group">
                <div class="item-cnt">
                  <table class="table-r table-th-block table-data">
                      <thead>
                          <tr>
                              <th>序号</th>
                              <th>签署/变更时间</th>
                              <th>协议名称</th>
                              <th>协议编号</th>
                              <th>操作</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td>1</td>
                              <td>2016.01.01  12:00:00</td>
                              <td>区块链应收账款管理平台协议</td>
                              <td>hkf9691hgjagh1u5nt8105b31hk</td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>2</td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>3</td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>4</td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>5</td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                          </tr>
                      </tbody>
                  </table>
                </div>
            </div>
        </div>
      </div>
      <div  v-if ="whichShow==3" style="background:#fff;overflow:hidden;padding:0px 10px 20px 10px">
        <div class="item-group">
          <div class="item-tit"></div>
          <div class="item-cnt">
            <el-form :label-position="labelPosition" label-width="200px" ref="formLabelAlign" :model="formLabelAlign">
              <el-row>
                <el-col :span="9">
                  <div>
                    <el-form-item label="授信额度（元）：">
                     <el-input v-model="form.name"></el-input>
                    </el-form-item>
                   </div>
                 </el-col>
              </el-row>
              <el-row style="padding-left:200px">
                 <el-col :span="24">
                   <div class="el-form-item">
                       <table class="table-lr">
                         <tbody>
                           <tr>
                               <td class="l" width='25%'>客户已用额度（元）</td>
                               <td class="r" width='25%'>0</td>
                               <td class="l" width='25%'>客户可用额度（元）</td>
                               <td class="r" width='25%'></td>
                           </tr>
                         </tbody>
                       </table>
                   </div>
                 </el-col>
              </el-row>
              <el-row>
                <el-col :span="9">
                    <el-form-item label="授信开始日期：">
                      <el-date-picker
                      v-model="form.value"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions0">
                      </el-date-picker>
                    </el-form-item>
                 </el-col>
                 <el-col :span="15">
                 </el-col>
              </el-row>
              <el-row>
                <el-col :span="9">
                  <el-form-item label="授信结束日期：">
                    <el-date-picker
                    v-model="form.value"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions0">
                    </el-date-picker>
                  </el-form-item>
                 </el-col>
                 <el-col :span="15"></el-col>
              </el-row>
              <el-row>
                <el-col :span="9">
                  <div>
                    <el-form-item label="结息周期：">
                      <el-select v-model="form.value" placeholder="按月">
                        <el-option label="按月" value="shanghai"></el-option>
                        <el-option label="按季度" value="beijing"></el-option>
                        <el-option label="半年度" value="shang"></el-option>
                        <el-option label="年度" value="bei"></el-option>
                      </el-select>
                    </el-form-item>
                   </div>
                 </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
          </el-form>
          <el-row>
            <el-col>
                <div class="font1" style="width:927px;margin:20px auto;">
                  <div style="padding: 5px 0">审批结果</div>
                  <el-form class="demo-ruleForm">
                     <el-form-item label="" prop="form.name">
                       <el-input
                         type="textarea"
                         :autosize="{ minRows: 2, maxRows: 4}"
                         placeholder="请输入审批意见。"
                         v-model="form.name">
                       </el-input>
                     </el-form-item>
                  </el-form>
                </div>
                <div class="group form-row " style="margin:20px;">
                    <span class="wrapper center">
                      <el-button class="button-bubi-theme" type="info" size="small" @click = "reject">不通过</el-button>
                      <el-button class="button-bubi-theme" type="info" size="small" @click = "redirect">通过</el-button>
                    </span>
                </div>
            </el-col>
          </el-row>
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
        {name: '实名信息', selected: false},
        {name: '协议/合同', selected: false},
        {name: '授信', selected: false}
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
