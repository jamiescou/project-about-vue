<template>
  <el-dialog v-model="show" :title="title" size='small'>
    <div slot='title'>
        <div style="text-align:center;float:left;width:96%;"><h4>{{title}}</h4></div>
    </div>
    <div style="margin-top:26px;">
      <p>您好:</p>
      <p>
        我公司为[ {{companyName}} ]（以下简称“买方”）的产品供应商，现因经营发展的需要，我公司现将与买方已经及将要订立的全部商务合同项下的全部应收账款以及全部应收账款所享有的全部权利转让给XXX公司（授信支持方）。
      </p>
      <p>
        据此，本公司声明并承诺如下：
      </p>
      <p>
        一、截至承诺书出具日，我公司未将与买方已经及将要订立的全部商务合同项下的全部应收账款以及全部应收账款所享有的全部权利以包括但不限于转让、赠与、设定担保权益等的任何方式处分给其他银行及任何第三方。
      </p>
      <p>
        二、截至承诺书出具日，我公司不存在任何可能不利的影响我公司转让与买方已经及将要订立的全部商务合同项下的全部应收账款以及全部应收账款所享有的全部权利的司法/行政程序，双方不存在任何尚未解决的和可预见将要发生的贸易纠纷。
      </p>
      <p>
        三、业务合作期间，未经XXX公司书面同意，我公司不会将与买方已经及将要订立的任何商务合同项下的任何应收账款以及任何应收账款所享有的任何权利以包括但不限于转让、赠与、设定担保权益等任何方式处分给其他银行及任何第三方，否则，由此引起的任何损失，本公司将承担全部赔偿责任。
      </p>
      <p>
        四、如果XXX公司因受让了应收账款债权，而被买方或第三人追索，我公司同意承担全部责任并赔偿XXX公司因此遭受的全部损失。
      </p>
      <p>
        五、本公司不以与买方之间的任何纠纷为由拒绝履行本承诺书项下的义务，也不因此实施任何影响XXX公司行使并实现应收账款债权的行为。
      </p>
      <p>
        六、本公司如果以任何理由拒绝履行本承诺书项下的义务或实施了任何影响XXX公司行使并实现应收账款债权的行为，在XXX公司或买方要求本公司承担法律责任时，本公司将放弃相关抗辩权利，并承担给XXX公司造成的一切损失。
      </p>
      <p>
        七、本承诺书自出具之日起生效。
      </p>
    </div>
    <div>
      <div>
        {{date}}
      </div>
      <div style="float:right">
        {{companyName}}
      </div>
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
      date: '',
      companyName: ''
    }
  },
  beforeMount () {
    this.$on('toggle-dialog', info => {
      this.show = info.show
      this.companyName = info.companyName
    })
  },
  mounted () {
    this.date = dateTools.dateFormater('YYYY年MM月DD日')
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
</style>
