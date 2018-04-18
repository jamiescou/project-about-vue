<template><!-- 付款记录 -->
    <div class="">
        <table class="table-r table-th-block table-data">
            <thead>
                <tr>
                    <th>序号</th>
                    <th>审批通过时间</th>
                    <th>申请付款金额（元）</th>
                    <th>凭证金额（元）</th>
                    <th>待付款金额（元）</th>
                    <th>付款审批员ID</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in Obj.data" :key="item.index" :index="index">
                    <td>{{index + 1}}</td>
                    <td>{{item.updateTime | timestampToDate}}</td>
                    <td>{{item.value | moneyShow}}</td>
                    <td>{{item.total | moneyShow}}</td>
                    <td>{{item.restValue | moneyShow}}</td>
                    <td>{{item.operatorId}}</td>
                </tr>
                <tr v-if="Obj.data.length === 0">
                    <td align="center" colspan="6">{{Obj.msg}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script type="text/javascript">
import voucherService from 'common/api/service/voucherService'
export default {
  name: 'voucher-payRecord',
  props: {
    voucher: null
  },
  data () {
    return {
      voucherId: 0,
      Obj: {
        data: [],
        msg: '暂无数据'
      }
    }
  },
  mounted () {
    this.voucherId = this.voucher.voucherId
    this.getPayRecord()
  },
  methods: {
    getPayRecord: function () {
      voucherService.getpayRecord.remote({voucherId: this.voucherId}, (result) => {
        if (result.success) {
          this.Obj.data = result.data
          this.Obj.msg = (this.Obj.data.length === 0) ? '暂无数据' : ''
        } else {
          this.Obj.data = []
          this.Obj.msg = '获取操作日志失败'
        }
      })
    }
  }
}
</script>
