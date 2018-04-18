<template><!-- 流转信息 -->
    <div class="">
        <p class="pb15"><span class="require">*</span>流转信息：记录该笔凭证的转让、融资信息。</p>
        <table class="table-r table-th-block table-data">
            <thead>
                <tr>
                    <th>序号</th>
                    <th>业务时间</th>
                    <th>流转内容</th>
                    <th>凭证编号</th>
                    <th>凭证金额（元）</th>
                    <th>付款日期</th>
                    <th>签收方</th>
                    <th>状态</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in downstreamInfo.data" :key="item.index" :index="index">
                    <td>{{index + 1}}</td>
                    <td>{{item.createTime | timestampToDate}}</td>
                    <td>转让</td>
                    <td>{{item.no}}</td>
                    <td>{{item.total | moneyShow}}</td>
                    <td>{{item.cashTime | timestampToDay}}</td>
                    <td>{{item.company.name}}</td>
                    <td>
                      <span type="gray" v-for='o in statusOptions' :key="o.index" v-if='o.value === item.status'>{{o.label}}</span>
                    </td>
                </tr>
                <tr v-if="downstreamInfo.data.length === 0">
                    <td align="center" colspan="8">{{downstreamInfo.msg}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script type="text/javascript">
import status from 'common/config/status'
import voucherService from 'common/api/service/voucherService'
export default {
  name: 'voucher-downstream',
  props: {
    voucher: null
  },
  data () {
    return {
      voucherId: 0,
      statusOptions: status.downstreamStatus, // 0：待签收、1：已签收、2：拒收、3：已付款
      downstreamInfo: {
        data: [],
        msg: '该凭证尚无流转信息'
      }
    }
  },
  mounted () {
    const self = this
    self.voucherId = this.voucher.voucherId
    self.downstream()
  },
  methods: {
    // 流转信息
    downstream: function () {
      const self = this
      var param = {id: self.voucherId}
      voucherService.downstream.remote(param, (data) => {
        if (data.success) {
          self.downstreamInfo.data = data.data
          self.downstreamInfo.msg = (self.upstreamInfo.data.length === 0) ? '该凭证尚无流转信息' : ''
        } else {
          self.downstreamInfo.data = []
          self.downstreamInfo.msg = '获取流转信息失败'
        }
      })
    }
  }
}

</script>
