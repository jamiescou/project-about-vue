<template>
  <div class="content-area" >
    <div v-title='title'>
      {{title}}
    </div>
    <div class="group">
        <div class="span12 path-nav offset0">
            <ol>
                <li>账户管理</li>>
                <li><strong>{{title}}</strong></li>
            </ol>
        </div>
    </div>
    <div class="content-body account-manage account-sub pt20 pr20 pb40 pl20">
        <div class="item-group">
            <div class="item-tit"><span class="item-tit-icon"></span>基础信息</div>
            <div class="item-cnt">
                <div class="pd250" style="position:relative; padding-right:280px;">
                    <table class="table-lr">
                        <tbody>
                          <tr>
                              <td class="l" width="25%">账户名称</td>
                              <td class="r" width="25%">{{baseInfo.companyName}}</td>
                              <td class="l" width="25%">开户行</td>
                              <td class="r" width="25%">{{baseInfo.bankName}}</td>
                          </tr>
                          <tr>
                              <td class="l" width="25%">子账户号</td>
                              <td class="r" width="25%">{{baseInfo.bankNo}}</td>
                              <td class="l" width="25%">认证时间</td>
                              <td class="r" width="25%">{{baseInfo.time | timestampToDate}}</td>
                          </tr>
                          <tr>
                              <td class="l" width="25%">区块链账户</td>
                              <td class="r" width="25%" colspan="3"><p>{{baseInfo.blockchainAddress}}</p></td>
                          </tr>
                        </tbody>
                    </table>
                    <div class="status-group" v-if="realnameAccess || (!bindCard && bindBankAccountAccess) || (bindCard && bankAccountAccess)">
                        <h3>账户状态</h3>
                        <div class="status-item" v-if="realnameAccess">
                            <span class="status-item-name">实名信息</span>
                            <el-button class="active" type="primary" size="small" @click="toRealName">已实名认证</el-button>
                        </div>
                        <div class="status-item" v-if="(!bindCard && bindBankAccountAccess) || (bindCard && bankAccountAccess)">
                            <span class="status-item-name">银行账户绑定</span>
                            <span v-if='!bindCard'>
                              <el-button type="primary" size="small" @click="toBindBankAccount">未绑定</el-button>
                            </span>
                            <el-button v-if='bindCard' type="primary" size="small">已绑定</el-button>
                        </div>
                        <!-- <div class="status-item">
                            <span class="status-item-name">功能设置</span>
                            <el-button class="gray" type="primary" size="small">未设置</el-button>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="item-group">
            <div class="item-tit"><span class="item-tit-icon"></span>资金信息<span class="c999 ml15">（因对账有时延，可点击<span class="ml10 mr10" @click="refresh" :class="refreshStatus === true ? 'cbubi pointer' : ''">刷新</span>获取最新资金信息）</span></div>
            <div class="item-cnt">
                <ul class="money-group">
                    <li class="money-item">
                        <p class="money-name">总金额（元）</p>
                        <p class="money-value cbubi">{{account.totalBalance | moneyShow(100)}}</p>
                    </li>
                    <li class="money-item">
                        <p class="money-name">不可用金额（元）<!--<span class="pointer" @click="freezeDetail()">明细</span>--></p>
                        <p class="money-value cbubi">{{account.djBalance | moneyShow(100)}}</p>
                    </li>
                    <li class="money-item">
                        <p class="money-name">可用金额（元）</p>
                        <p class="money-value cbubi">{{account.kyBalance | moneyShow(100)}}</p>
                    </li>
                    <li class="money-item recharge">
                        <!-- <el-button type="primary" size="small" @click="toRecharge">提现</el-button> -->
                        <!-- <el-button type="primary" size="small" @click="onSubmit">充值</el-button> -->
                    </li>
                </ul>
            </div>
        </div>

        <div class="item-group">
            <div class="item-tit"><span class="item-tit-icon"></span>账单记录</div>
            <div class="item-cnt">
              <ul class="tab-group">
                <li class="tab-item">最新 {{txRecord.length}}条 记录</li>
                <!-- <li class="tab-item"><a @click="toRechargeRecord">充值记录</a></li>
                <li class="tab-item"><a @click="toCashRecord">提现记录</a></li> -->
              </ul>
              <table class="table-r table-th-block table-data">
                  <thead>
                      <tr>
                          <th>出/入账时间</th>
                          <th>流水号</th>
                          <th>凭证编号</th>
                          <th>类型</th>
                          <th>入账（元）</th>
                          <th>出账（元）</th>
                          <th>余额（元）</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="item in txRecord" :key="item.index">
                          <td>{{item.accountTime | timestampToDateStyle}}</td>
                          <td>{{item.serialNo}}</td>
                          <td>{{item.voucherNo}}</td>
                          <td>
                            <span v-show='item.bizType === "transfer" && item.txType === "1"'>收款</span>
                            <span v-show='item.bizType === "transfer" && item.txType === "0"'>付款</span>
                            <span v-show='item.bizType === "recharge"'>充值</span>
                            <span v-show='item.bizType === "withdraw"'>提现</span>
                          </td>
                          <td><span v-show='item.txType === "1"'>{{item.amount | moneyShow(100)}}</span></td>
                          <td><span v-show='item.txType === "0"'>{{item.amount | moneyShow(100)}}</span></td>
                          <td>{{item.accountBalance | moneyShow(100)}}</td>
                      </tr>
                      <tr v-if="txRecord.length === 0">
                          <td align="center" colspan="7">暂无数据</td>
                      </tr>
                  </tbody>
              </table>
              <a class="fr cbubi" v-if="tradeRecordAccess" @click="toTradeRecord(baseInfo.bankNo)">查看所有账单记录</a>
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
import layout from 'components/include/layout-l-r'
import subAccountService from 'common/api/service/subAccountService'
// import dispatch from 'module/member/service/dispatch'
import bankAccountService from 'common/api/service/bankAccountService'
import accessControl from 'common/javascript/tools/accessControl.js'

export default {
  name: 'app',
  components: {
    layout: layout
    // dispatch: dispatch
  },
  data () {
    return {
      title: '子账户',
      refreshStatus: true,
      bindCard: false, // 是否绑定银行卡
      baseInfo: {
        companyName: '',
        bankName: '',
        bankNo: '',
        time: ''
      },
      account: {
        totalBalance: 0,
        djBalance: 0,
        kyBalance: 0
      },
      txRecord: [],
      tradeRecordAccess: false
    }
  },
  mounted () {
    this.getBaseInfo()
    this.getAccount()
    this.getTxRecord()
    this.checkCard()
    this.tradeRecordAccess = accessControl.checkAccess('/account/sub-account/trade-record')
    this.realnameAccess = accessControl.checkAccess('/user/real-name')
    this.bankAccountAccess = accessControl.checkAccess('/account/bank-account')
    this.bindBankAccountAccess = accessControl.checkAccess('/account/bank-account/add')
  },
  methods: {
    refresh () {
      if (this.refreshStatus === true) {
        this.refreshStatus = false
        this.synAccBalance()
      }
    },
    // 获取是否绑定银行卡
    checkCard () {
      let param = {
        no: null,
        pageNum: 1,
        pageSize: 1
      }
      bankAccountService.queryBank.remote(param, (list) => {
        if (list.data.content.length === 0) {
          this.bindCard = false
        } else {
          this.bindCard = true
        }
      })
    },
    // 基础信息
    getBaseInfo () {
      const self = this
      var param = {comId: 1}
      subAccountService.getBaseInfo.remote(param, (data) => {
        self.baseInfo.companyName = data.data.companyName
        self.baseInfo.bankName = data.data.bankName
        self.baseInfo.bankNo = data.data.bankNo
        self.baseInfo.time = data.data.authenticationTime
        self.baseInfo.blockchainAddress = data.data.blockchainAddress
      })
    },

    synAccBalance () {
      const self = this
      var param = null
      subAccountService.synAccBalance.remote(param, (data) => {
        if (data.success) {
          setTimeout(function () {
            self.getAccount()
            self.getTxRecord()
            self.refreshStatus = true
          }, 3000)
        } else {
          self.$message.error('刷新失败!')
        }
      })
    },

    // 资金信息
    getAccount () {
      const self = this
      var param = null
      subAccountService.getAccount.remote(param, (data) => {
        if (data.success) {
          self.account.djBalance = data.data.djBalance
          self.account.kyBalance = data.data.kyBalance
          self.account.totalBalance = data.data.totalBalance
        } else {
          self.$message.error('获取资金信息失败!')
        }
      })
    },

    // 交易记录 bizType账户类型、accountTimeType时间类型、txType入账类型支出0收入1全部2、start开始页、
    getTxRecord () {
      const self = this
      var param = {
        pageSize: 10,
        pageNum: 1,
        txType: 2
      }
      subAccountService.getTxRecord.remote(param, (data) => {
        if (data.success) {
          self.txRecord = data.data.detail
        } else {
          self.$message.error('获取交易列表失败!')
        }
      })
    },

    // 实名信息
    toRealName () {
      location.href = '#/user/real-name'
      // if (dispatch.isCoreCompany()) {
      //   location.href = '#/user/real-name'
      // } else {
      //   location.href = '#/usre/real-name'
      // }
    },
    // 绑定银行账户
    toBindBankAccount () {
      location.href = '#/account/bank-account/add'
    },
    // 冻结明细
    freezeDetail () {
      alert('功能紧锣密鼓开发中')
    },
    // 提现
    toRecharge () {
      location.href = '#/account/sub-account/cash'
    },
    // 交易记录
    toTradeRecord (no) {
      location.href = '#/account/sub-account/trade-record?no=' + no
    },
    // 提现记录
    toCashRecord () {
      location.href = '#/account/sub-account/trade-record-cash'
    },
    // 充值记录
    toRechargeRecord () {
      location.href = '#/account/sub-account/trade-record-recharge'
    }
  }
}
</script>
