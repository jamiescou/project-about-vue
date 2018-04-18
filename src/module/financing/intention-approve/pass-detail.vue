<template>
    <div class="content-area" >
        <div v-title='title'>{{title}}</div>
        <div class="group">
            <div class="span12 path-nav offset0">
                <ol>
                    <li>融资管理</li>>
                    <li><strong>{{title}}</strong></li>
                </ol>
            </div>
        </div>
        <div class="content-body financing-info pt20 pr20 pb40 pl20">
            <div class="item-group">
                <el-row>
                  <el-col>
                    <div class="item-tit"><span class="item-tit-icon"></span>申请信息</div>
                    <div class="item-cnt">
                        <table class="table-lr">
                            <tbody>
                              <tr>
                                  <td class="l" width="200">供应商名称</td>
                                  <td class="r" width="200">{{detail.fromName}}</td>
                                  <td class="l" width="200">期望融资额度（元）</td>
                                  <td class="r" width="200">{{detail.value}}</td>
                              </tr>
                              <tr>
                                  <td class="l">申请期限（月）</td>
                                  <td class="r">{{detail.timeLimit}}</td>
                                  <td class="l">期望利率（%）</td>
                                  <td class="r">{{detail.rate}}%</td>
                              </tr>
                              <tr>
                                  <td class="l" width="200">联系人</td>
                                  <td class="r" width="200">{{detail.linkmanName}}</td>
                                  <td class="l">手机号</td>
                                  <td class="r">{{detail.linkmanPhone}}</td>
                              </tr>
                              <tr>
                                  <td class="l" width="200">申请时间</td>
                                  <td class="r" width="200">{{detail.createTime}}</td>
                                  <td class="l">状态</td>
                                  <td class="r">审批通过</td>
                              </tr>
                            </tbody>
                        </table>
                        <div class="font2 mt20">
                          附：<a class="spointer" @click="letterDialog">《融资意向书》</a>
                        </div>
                        <div class="cnt">
                          <intention  ref='intentDialog' :detail='detail' title='融资意向书'></intention>
                        </div>
                    </div>
                  </el-col>
                </el-row>
            </div>
            <div class="item-group">
                <el-row>
                  <el-col>
                    <div class="item-tit"><span class="item-tit-icon"></span>审批信息</div>
                    <div class="item-cnt">
                      <div style="color: #e82f3a;padding-bottom:10px;">＊ 凭证融资信息以审批信息为准。</div>
                        <table class="table-lr">
                            <tbody>
                              <tr>
                                  <td class="l" width="200">融资额度（元）</td>
                                  <td class="r" width="200">{{reply.value}}</td>
                                  <td class="l" width="200">融资比率（%）</td>
                                  <td class="r" width="200">{{reply.ratio}}%</td>
                              </tr>
                              <tr>
                                  <td class="l">利率（%）</td>
                                  <td class="r">{{reply.rate}}%</td>
                                  <td class="l">还款方式</td>
                                  <td class="r">{{repayType}}</td>
                              </tr>
                              <tr>
                                  <td class="l" width="200">融资所需材料</td>
                                  <td class="r" width="200"><span v-for='(item, index) in reply.file'>{{fileType[item]}}<span v-if='(index + 1) < reply.file.length'>、</span></span></td>
                                  <td class="l">审批时间</td>
                                  <td class="r">{{reply.approvalTime}}</td>
                              </tr>
                              <tr>
                                  <td class="l" width="200">审批意见</td>
                                  <td class="r" width="200">{{this.reply.enquiryTask.reason}}</td>
                                  <td class="l"></td>
                                  <td class="r"></td>
                              </tr>
                            </tbody>
                        </table>
                    </div>
                  </el-col>
                </el-row>
            </div>

            <el-button class="closeBtn"  type="info" @click="close()">关闭</el-button>
      </div>
  </div>

</template>

<script type="text/javascript">

import 'common/css/lib/iconfont.css'
import 'common/css/lib/motherplate.css'
import 'common/sass/module/regular.scss'
import 'common/sass/module/table.scss'
import vnav from 'components/include/nav'
import left from 'components/include/member-left'
import vfooter from 'components/include/footer'
import intention from 'components/entries/common/finance-intention'
import bankService from 'common/api/service/finance-management/bankService'
import moneyTools from 'common/javascript/tools/moneyTools'
import dateTools from 'common/javascript/tools/dateTools'
import file from 'common/config/file'
import type from 'common/config/type'

export default {
  name: 'app',
  components: {
    vnav: vnav,
    left: left,
    vfooter: vfooter,
    intention
  },
  data () {
    return {
      title: '详情',
      detail: {
        fromName: '',
        value: '',
        timeLimit: '',
        rate: '',
        createTime: ''
      },
      reply: {
        enquiryTask: {
          reason: null
        },
        file: null,
        value: null,
        ratio: null
      },
      fileType: null,
      repayType: null
    }
  },
  mounted () {
    this.detailInfo()
  },
  methods: {
    detailInfo () {
      let param = this.$route.query.id
      bankService.detail.remote(param, (detail) => {
        this.detail = detail.data.enquiryTask.enquiry || this.detail
        this.detail.value = moneyTools.moneyNarrow(this.detail.value) || ''
        this.detail.rate = moneyTools.rateNarrow(this.detail.rate)
        this.detail.createTime = dateTools.dateFormater(this.detail.createTime, 'YYYY.MM.DD HH:mm:ss')
        this.detail.applyTime = dateTools.dateFormater(this.detail.applyTime, 'YYYY.MM.DD')
        this.detail.targetName = detail.data.enquiryTask.targetName
        this.detail.fromName = detail.data.enquiryTask.companyName

        this.reply = detail.data
        this.reply.approvalTime = dateTools.dateFormater(detail.data.enquiryTask.approvalTime, 'YYYY.MM.DD HH:mm:ss')
        this.reply.value = moneyTools.moneyNarrow(detail.data.value) || ''
        this.reply.ratio = moneyTools.rateNarrow(this.reply.ratio)
        this.reply.rate = moneyTools.rateNarrow(this.reply.rate)
        this.fileType = file.financeFile
        this.repayType = type.repayType[this.reply.repayType].label
      })
    },
    close () {
      history.go(-1)
    },
    // 融资意向书
    letterDialog () {
      const intentInfo = {
        show: true
      }
      this.$refs.intentDialog.$emit('toggle-dialog', intentInfo)
    }
  }
}

</script>

<style scoped>
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
</style>
