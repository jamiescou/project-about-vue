<template><!-- 溯源信息 -->
    <div class="">
        <p class="pb15"><span class="require">*</span>操作日志：显示该笔凭证登记/审批等信息。</p>
        <table class="table-r table-th-block table-data">
            <thead>
                <tr>
                    <th>序号</th>
                    <th>操作时间</th>
                    <th>操作内容</th>
                    <th>状态</th>
                    <th>备注</th>
                    <th>操作员ID</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in operationLog.data" :key="item.index" :index="index">
                    <td>{{index + 1}}</td>
                    <td>{{item.createTime | timestampToDate}}</td>
                    <td>
                      <span v-for='o in operationLogActionOption' :key="o.index" v-if='o.value===item.action'>{{o.label}}</span>
                    </td>
                    <td>
                      <span v-for='o in operationLogStatusOption' :key="o.index" v-if='o.value===item.status'>{{o.label}}</span>
                    </td>
                    <td>{{item.remark | dealNull}}</td>
                    <td>{{item.userId}}</td>
                </tr>
                <tr v-if="operationLog.data.length === 0">
                    <td align="center" colspan="6">{{operationLog.msg}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script type="text/javascript">
import status from 'common/config/status'
import voucherService from 'common/api/service/voucherService'
export default {
  name: 'voucher-operationLog',
  props: {
    voucher: null
  },
  data () {
    return {
      voucherId: 0,
      operationLogStatusOption: status.operationLogStatus,
      operationLogActionOption: status.operationLogAction,
      operationLog: {
        data: [],
        msg: '暂无数据'
      }
    }
  },
  mounted () {
    this.voucherId = this.voucher.voucherId
    this.getOperationLog()
  },
  methods: {
    // 操作日志
    getOperationLog: function () {
      voucherService.getOperationLog.remote({voucherId: this.voucherId}, (result) => {
        if (result.success) {
          this.operationLog.data = result.data.content
          this.operationLog.msg = (this.operationLog.data.length === 0) ? '暂无数据' : ''
        } else {
          this.operationLog.data = []
          this.operationLog.msg = '获取操作日志失败'
        }
      })
    }
  }
}
</script>
