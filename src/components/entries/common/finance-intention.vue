<template>
  <el-dialog v-model="show" :title="title" size='small'>
    <div slot='title'>
        <div style="text-align:center;float:left;width:96%;"><h4>{{title}}</h4></div>
    </div>
    <div style="margin-top:26px;color:#000">
      <p><b>甲方（申请人）：{{detail.fromName}} </b></p>
      <p><b>乙方（贷款方）：{{detail.targetName}} </b></p><br>
      <p>
        联系人：{{detail.linkmanName}} &nbsp;&nbsp;
        手机号：{{detail.linkmanPhone}}
      </p><br>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;申请人（{{detail.fromName}}）于{{detail.applyTime}}向我行申请以区块链应收账款管理平台的应收账款凭证作为融资标的申请融资，期限为{{detail.timeLimit}}个月，期望融资额度{{detail.value}}元，利率{{detail.rate}}%。
      </p><br>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;根据以上事项甲乙双方协商，同意在具备资金方融资条件的前提下，就应收账款凭证的融资项目给与信贷支持，具体条件如下：
      </p><br>
      <p>
        1、申请人有融资需求的情况下，保证项目真实存在，手续齐全、合法方可给与支持，如申请人手续不符合资金方要求，资金方有权不予信贷支持。
      </p><br>
      <p>
        2、资金方在申请人手续齐全后，对申请人所提供的凭证进行调查、评估，如调查真实，手续合法，符合融资要求方可进行信贷支持。
      </p><br>
      <p>
        3、本融资意向书仅用于申请人向资金方说明该项目融资意向，资金方将依据《商业银行法》、《贷款通则》等有关规定及资金方有关贷款、评估办法，对项目进行调查评估，最终决定承诺贷款与否。
      </p><br>
    </div>
    <span slot="footer" class="dialog-footer" style="margin: 0px auto;width:60px;display: block;">
      <el-button type="primary" @click="close">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script type="text/javascript">

export default {
  name: 'finance-intention',
  components: {
  },
  props: {
    title: {
      type: String,
      'default': ''
    },
    detail: {
      applyTime: ''
    }
  },
  data () {
    return {
      show: false
    }
  },
  beforeMount () {
    this.$on('toggle-dialog', info => {
      this.show = info.show
    })
  },
  mounted () {
    setTimeout(() => {
      if (this.detail.applyTime) {
        let time = this.detail.applyTime.split('.')
        this.detail.applyTime = time[0] + '年' + time[1] + '月' + time[2] + '日'
      }
    }, 1000)
  },
  methods: {
    close () {
      this.show = false
    }
  }
}

</script>
