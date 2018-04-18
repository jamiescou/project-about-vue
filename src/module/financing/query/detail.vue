<template>
    <div class="content-area" >
        <div v-title='title'>{{title}}</div>
        <div class="group">
            <div class="span12 path-nav ">
                <ol>
                    <li>融资管理</li>>
                    <li><strong>{{title}}</strong></li>
                </ol>
            </div>
        </div>
        <div class="content-body financing-info pt40 pr20 pb40 pl20">
            <div class="item-group">
                <el-row>
                  <el-col>
                    <div class="item-tit"><span class="item-tit-icon"></span>融资信息</div>
                    <div class="item-cnt">
                        <table class="table-lr">
                            <tbody>
                              <tr>
                                  <td class="l" width="200">申请时间</td>
                                  <td class="r" width="200">{{detail.applyTime | timestampToDateStyle}}</td>
                                  <td class="l" width="200">融资方式</td>
                                  <td class="r" width="200"><span v-for='item in finType' v-if='item.value === detail.finType'>{{item.label}}</span></td>
                              </tr>
                              <tr>
                                  <td class="l">贷款方</td>
                                  <td class="r">{{detail.creditSideName}}</td>
                                  <td class="l">融资金额（元）</td>
                                  <td class="r">{{detail.finAmount | moneyShow}}</td>
                              </tr>
                              <tr>
                                  <!-- <td class="l">融资比例</td>
                                  <td class="r">{{detail.finRatio}}</td> -->
                                  <td class="l">融资状态</td>
                                  <td class="r"><span v-for='item in financingResult' v-if='item.value === detail.finStatus'>{{item.label}}</span></td>
                              </tr>
                              <!-- <tr>
                                  <td class="l" width="200">出账金额（元）</td>
                                  <td class="r" width="200">{{detail.actualAccountAmount | moneyShow}}</td>
                                  <td class="l">回款状态</td>
                                  <td class="r"><span v-for='item in moneyBack' v-if='item.value === detail.repayStatus'>{{item.label}}</span></td>
                              </tr> -->
                            </tbody>
                        </table>
                    </div>
                  </el-col>
                </el-row>
            </div>

            <!-- <div class="item-group">
                <el-row>
                  <el-col>
                    <div class="item-tit"><span class="item-tit-icon"></span>融资申请明细信息</div>
                    <div class="item-cnt">
                        <table class="table-tb">
                            <thead>
                                  <tr>
                                      <th>申请融资凭证编号</th>
                                      <th>凭证付款日期</th>
                                      <th>申请融资凭证金额（元）</th>
                                      <th>实际可融资金额（元）</th>
                                      <th>融资材料</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>00020120170621000001</td>
                                    <td>2017.06.06</td>
                                    <td>10,000,000.00</td>
                                    <td>8,000.00</td>
                                    <td><a class="cbubi table-operation">合同</a><a class="cbubi table-operation">发票</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                  </el-col>
                </el-row>
            </div> -->

            <div class="item-group">
                <el-row>
                  <el-col>
                    <div class="item-tit"><span class="item-tit-icon"></span>凭证信息</div>
                    <div class="item-cnt">
                        <table class="table-tb">
                            <thead>
                                  <tr>
                                      <th>凭证编号</th>
                                      <th>凭证签发方</th>
                                      <th>签发方承诺付款日期</th>
                                      <th>凭证金额（元）</th>
                                      <th>凭证余额（元）</th>
                                      <th>凭证付款方</th>
                                      <th>付款日期</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{voucher.no}}</td>
                                    <td>{{voucher.originCreateCompany.name}}</td>
                                    <td>{{voucher.cashTime | timestampToDateDay}}</td>
                                    <td>{{voucher.total | moneyShow}}</td>
                                    <td>{{voucher.restValue | moneyShow}}</td>
                                    <td>{{voucher.createCompany.name}}</td>
                                    <td>{{voucher.cashTime | timestampToDateDay}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                  </el-col>
                </el-row>
            </div>

            <!-- <div class="item-group">
                <el-row>
                  <el-col>
                    <div class="item-tit"><span class="item-tit-icon"></span>融资申请审批信息</div>
                    <div class="item-cnt">
                        <table class="table-tb">
                            <thead>
                                  <tr>
                                      <th>审批时间</th>
                                      <th>操作人</th>
                                      <th>审批意见</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2017.06.22</td>
                                    <td>007</td>
                                    <td>同意</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                  </el-col>
                </el-row>
            </div> -->

            <el-button class="button"  type="info" @click="close()">关闭</el-button>
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
import supplierService from 'common/api/service/finance-management/supplierService'
import status from 'common/config/status'

export default {
  name: 'app',
  components: {
    vnav: vnav,
    left: left,
    vfooter: vfooter
  },
  data () {
    return {
      title: '融资详情',
      detail: {},
      total: 0,
      voucher: {
        originCreateCompany: {
          name: null
        },
        createCompany: {
          name: null
        }
      },
      financingResult: status.financingResult,
      finType: status.finType,
      moneyBack: status.moneyBack
    }
  },
  mounted () {
    this.getGrid()
  },
  methods: {
    getGrid () {
      let id = this.$route.query.id
      supplierService.financeDetail.remote(id, (list) => {
        this.total = list.data.total
        this.detail = list.data || []
        supplierService.voucherDetail.remote(this.detail.voucherId, (list) => {
          this.voucher = list.data || []
        })
      })
    },
    close () {
      history.go(-1)
    }
  }
}

</script>
