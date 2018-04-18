<template><!-- 溯源信息 -->
    <div class="">
        <p class="pb15"><span class="require">*</span>溯源信息：显示该笔凭证历史来源信息。</p>
        <table class="table-r table-th-block table-data">
            <thead>
                <tr>
                    <th>序号</th>
                    <th>业务时间</th>
                    <th>业务内容</th>
                    <th>凭证编号</th>
                    <th>付款方</th>
                    <th>收款方</th>
                    <th>凭证金额（元）</th>
                    <th>付款日期</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in upstreamInfo.data" :key="item.index" :index="index">
                    <td>{{index + 1}}</td>
                    <td>{{item.createTime | timestampToDate}}</td>
                    <td>转让</td>
                    <td>{{item.no}}</td>
                    <td>{{item.createCompany.name}}</td>
                    <td>{{item.company.name}}</td>
                    <td>{{item.total | moneyShow}}</td>
                    <td>{{item.cashTime | timestampToDay}}</td>
                </tr>
                <tr v-if="upstreamInfo.data.length === 0">
                    <td align="center" colspan="8">{{upstreamInfo.msg}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script type="text/javascript">
import voucherService from 'common/api/service/voucherService'
export default {
  name: 'voucher-upstream',
  props: {
    voucher: null
  },
  data () {
    return {
      voucherId: 0,
      upstreamInfo: {
        data: [],
        msg: '该凭证尚无溯源信息'
      }
    }
  },
  mounted () {
    const self = this
    self.voucherId = this.voucher.voucherId
    self.upstream()
  },
  methods: {
    // 溯源信息
    upstream: function () {
      const self = this
      var param = {id: self.voucherId}
      voucherService.upstream.remote(param, (data) => {
        if (data.success) {
          self.upstreamInfo.data = data.data
          self.upstreamInfo.msg = (self.upstreamInfo.data.length === 0) ? '该凭证尚无溯源信息' : ''
        } else {
          self.upstreamInfo.data = []
          self.upstreamInfo.msg = '获取溯源信息失败'
        }
      })
    }
  }
}
</script>
