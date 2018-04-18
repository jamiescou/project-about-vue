<template>
    <el-dialog v-model="show" :title="title" size='small'>
        <div slot='title'>
            <div style="text-align:center;float:left;width:96%;"><h4>{{title}}</h4></div>
        </div>
        <div style="margin-top:26px;">
            <p>本公司：<span class="underline" v-html="partya"></span></p>
            <p class="mb30">付款银行账户：<span class="underline" v-html="partyaBank"></span></p>
            <p>本公司声明并承诺如下：</p>
            <p class="text-indet">一、在 <span class="underline" v-html="payDate"></span> 前无条件支付总额为 <span class="underline" v-html="payAmount"></span> （人民币大写：<span class="underline" v-html="payAmount2"></span>）的应付账款至 <span class="underline" v-html="partyb"></span> （回款银行账户：<span class="underline" v-html="partybBank"></span>）。</p>
            <p class="text-indet">二、同意本公司所签发的应收账款凭证可以进行转让拆分，知晓并同意应收账款凭证持有人到贵阳银行进行质押/保理融资。</p>
            <p class="text-indet mb30">三、承诺不存在任何尚未解决的和可预见将要发生的商业纠纷，且不以任何纠纷为由拒绝履行本承诺函项下的义务，无条件付款。</p>
            <p class="text-indet mb30">本承诺函自出具之日起生效。</p>
            <p class="text-indet" style="text-align:right;">承诺人：{{partya}}</p>
            <p class="text-indet" style="text-align:right;">{{date}}</p>
        </div>
        <span slot="footer" class="dialog-footer" style="margin: 0px auto;width: 60px;display: block;">
            <el-button type="primary" @click="agreeMent">同意</el-button>
        </span>
    </el-dialog>
</template>
<script type="text/javascript">
import dateTools from 'common/javascript/tools/dateTools'

export default {
  name: 'c-letter0',
  components: {
  },
  props: {
    title: {
      type: String,
      'default': ''
    }
  },
  data () {
    return {
      show: false,
      partya: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
      partyaBank: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
      payDate: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
      payAmount: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
      payAmount2: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
      partyb: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
      partybBank: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
      date: dateTools.dateFormater('YYYY年MM月DD日')
    }
  },
  beforeMount () {
    this.$on('toggle-dialog', info => {
      this.show = info.show
      if (info.partya) {
        this.partya = info.partya
      }
      if (info.partyaBank) {
        this.partyaBank = info.partyaBank
      }
      if (info.payDate) {
        this.payDate = dateTools.dateFormater(info.payDate, 'YYYY年MM月DD日')
      }
      if (info.payAmount) {
        this.payAmount = '￥' + info.payAmount
      }
      if (info.payAmount2) {
        this.payAmount2 = info.payAmount2
      }
      if (info.partyb) {
        this.partyb = info.partyb
      }
      if (info.partybBank) {
        this.partybBank = info.partybBank
      }
    })
  },
  mounted () {
  },
  methods: {
    agreeMent () {
      this.show = false
      this.$emit('read-letter')
    }
  }
}

</script>
<style media="screen">
  body{padding-right:0px!important;}
  p{word-break: break-all; word-wrap: break-word; line-height:40px;}
  .underline{padding-bottom:1px; text-decoration: none; border-bottom: 1px solid; word-break: break-all; word-wrap: break-word;}
  .text-indet{text-indent: 2em;}
</style>
