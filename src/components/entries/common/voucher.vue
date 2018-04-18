区块链智能合约编号<template>
  <div class="operation-detail b-voucher-tpl">
      <div class="box" ref='box' v-bind:style="{  backgroundSize:  voucherHeight }">
          <div class="header">
            <!-- <span class="title"> 应收账款凭证 </span> <span class="secondary">{{detail.originCreateCompany.name}}</span>
            <span class="require cashTime font10 ">凭证登记方承诺{{detail.cashDate}}付款。</span>
            <span class="no">NO.{{detail.no}} </span> -->

            <span style="position: absolute; top: 19px; left: 10px; color: #888; ">{{detail.originCreateCompany.name}}</span>
            <span style="position: absolute; top: 49px; left: 10px; color:#e82f3a; font-size: 12px;">凭证登记方承诺{{detail.cashDate}}付款。</span>
            <p class="title-voucher" style="display: block; text-align: center; font-size: 18px; font-weight: 600;"> 应收账款凭证 </p>
            <span class="no">NO.{{detail.no}} </span>
          </div>
          <div class="certificatie-tbale-area">
              <table class="certificate-table">
                  <tbody>
                      <tr>
                          <td rowspan="3" class="center "><span class="text-vertical title-text">付款方</span></td>
                          <td class="center">全称</td>
                          <td colspan="8" style="width:142px;">{{detail.createCompany.name}}</td>
                          <td rowspan="3" class="center "><span class="text-vertical title-text">收款方</span></td>
                          <td colspan="3" class="center">全称</td>
                          <td colspan="10">{{detail.company.name}}</td>
                      </tr>
                      <tr>
                          <td class="center">账号</td>
                          <td colspan="8">{{detail.createCompany.subAccount.no}}</td>
                          <td colspan="3" class="center">账号</td>
                          <td colspan="10">{{detail.company.subAccount.no}}</td>
                      </tr>
                      <tr>
                          <td class="center">开户行</td>
                          <td colspan="8">{{detail.createCompany.subAccount.bankName}}</td>
                          <td colspan="3" class="center">开户行</td>
                          <td colspan="10">{{detail.company.subAccount.bankName}}</td>
                      </tr>
                      <tr>
                          <td colspan="2" rowspan="2" class="center title-text">付款金额</td>
                          <td colspan="9" rowspan="2">{{detail.valueBig}}</td>
                          <td class="center">亿</td>
                          <td class="center">千</td>
                          <td class="center">百</td>
                          <td class="center">十</td>
                          <td class="center">万</td>
                          <td class="center">千</td>
                          <td class="center">百</td>
                          <td class="center">十</td>
                          <td class="center">元</td>
                          <td class="center">角</td>
                          <td class="center">分</td>
                      </tr>
                      <tr>
                          <td v-for='item in detail.valueArray' class="center" >{{item}}</td>
                      </tr>
                      <tr>
                          <td colspan="2" style="height: 40px;" class="center title-text noborder">付款日期</td>
                          <td colspan="9" class="noborder">{{detail.cashDate}}</td>
                          <td colspan="11" class="noborder"></td>
                      </tr>
                      <tr class="tr-remark">
                          <td colspan="2" class="center noborder title-text">
                            <div class="remark">凭证备注</div>
                            <div class="remark" v-show='detail.blockchainaddress'>区块链智能合约编号</div>
                          </td>
                          <td colspan="20" class="noborder">
                            <div class="remark">{{detail.remark}}</div>
                            <div class="remark" v-show='detail.blockchainaddress'>{{detail.blockchainaddress}}</div>
                          </td>
                          <div class="sign-ellipse" style="position:absolute;">
                            <span>{{detail.createCompany.name}}</span><span>应收账款凭证</span>
                          </div>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
  </div>
</template>

<script type="text/javascript">
import 'common/css/lib/iconfont.css'
import 'common/css/lib/motherplate.css'
import 'common/sass/module/regular.scss'
import 'common/sass/module/account.scss'
// import model from 'common/api/voucherTemplate'
import smallToBig from 'common/javascript/tools/smallToBig'
import dateTools from 'common/javascript/tools/dateTools'
import moneyTools from 'common/javascript/tools/moneyTools'
export default {
  name: 'c-voucher',
  components: {
  },
  props: {
    voucher: {
      type: Object,
      default: {
        no: null,
        cashDate: null,
        valueBig: null,
        valueArray: null,
        remark: null,
        hasBlockChainNo: null,
        origincreateCompany: {
          name: null
        },
        createCompany: {
          name: null,
          subAccount: {
            no: null,
            bankName: null
          }
        },
        company: {
          name: null,
          subAccount: {
            no: null,
            bankName: null
          }
        }
      }
    }
  },
  data () {
    return {
      isBig: true,
      detail: this.voucher,
      voucherHeight: '930px 400px'
    }
  },
  beforeMount () {
    this.$bus.$on('voucher-refurbish', info => {
      this.detail = info
      if (typeof this.detail.cashTime === 'string') {
        this.detail.cashDate = this.detail.cashTime
      } else {
        this.detail.cashDate = this.dateFormater(parseInt(this.detail.cashTime))
      }
      if (!isNaN(this.detail.cashTime)) {
        this.detail.cashDate = this.dateFormater(parseInt(this.detail.cashTime))
      }
      this.dealVaule(this.detail.value)
      this.detail.valueBig = smallToBig(this.detail.value)
      // if (this.detail.createCompany.name.length > 13) {
      //   this.isBig = false
      // }
    })

    this.dealVaule(this.detail.value)
    this.detail.valueBig = smallToBig(this.detail.value)
    if (typeof this.detail.cashTime === 'string') {
      this.detail.cashDate = this.detail.cashTime
    } else {
      this.detail.cashDate = this.dateFormater(parseInt(this.detail.cashTime))
    }
    if (!isNaN(this.detail.cashTime)) {
      this.detail.cashDate = this.dateFormater(parseInt(this.detail.cashTime))
    }
  },
  mounted () {
    // const me = this
    // setTimeout(function () {
    //   me.detail.cashDate = me.dateFormater(me.detail.cashTime)
    // }, 1000)

    this.detail.valueBig = smallToBig(parseFloat(this.detail.value))
    // let name = this.detail.createCompany
    // if (name !== null && name.length > 13) {
    //   this.isBig = false
    // }

    // 根据表格高度设置背景图高度
    // setTimeout(() => {
    //   this.voucherHeight = this.$refs.box.getBoundingClientRect().height + 'px'
    //   this.voucherHeight = '930px ' + this.voucherHeight
    // }, 300)
  },
  methods: {
    // 日期转时间戳
    dateFormater (value) {
      return dateTools.dateFormater(value, 'YYYY.MM.DD')
    },
    dealVaule (value) {
      const sum = 11
      if (!value) value = 0
      value = moneyTools.accMul(parseFloat(value).toFixed(2), 100)
      value = parseInt(value)
      let array = value.toString().split('')
      let tempArray = []
      let i = 0
      while (i < sum) {
        tempArray.push('')
        i++
      }
      Array.map(array, (item, index) => {
        let l = sum - array.length + index
        tempArray[l] = item
      })
      this.detail.valueArray = tempArray
    }
  }
}

</script>

<style scoped>
  .operation-detail{
    background:#fff;
  }
  .title-voucher::before{content:''; position:absolute; top: 35px; left: 50%; margin-left: -60px; width:120px; height:2px; background:#f6ca93;}
  .title-voucher::after{content:''; position:absolute; top: 40px; left: 50%; margin-left: -40px; width:80px; height:2px; background:#f6ca93;}
</style>
