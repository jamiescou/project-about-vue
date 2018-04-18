<template>
    <div class="content-body repay mt20 mr20 mb20 ml20 pt20 pr20 pb40 pl20">
        <div class="item-group">
            <el-row>
              <el-col>
                <div class="item-tit"><span class="item-tit-icon"></span>子账户信息</div>
                <div class="item-cnt">
                    <table class="table-lr">
                        <tbody>
                          <tr>
                              <td class="l" width="200">子账户号</td>
                              <td class="r" width="200">9709285970284757592</td>
                              <td class="l" width="200">账户可用余额（元）</td>
                              <td class="r" width="200">30,000,000.00</td>
                          </tr>
                        </tbody>
                    </table>
                </div>
              </el-col>
            </el-row>
        </div>

        <div class="item-group">
            <el-row>
              <el-col>
                <div class="item-tit"><span class="item-tit-icon"></span>融资信息</div>
                <div class="item-cnt">
                    <table class="table-lr">
                        <tbody>
                          <tr>
                              <td class="l" width="200">融资银行账户</td>
                              <td class="r" width="200">62250000342598735644</td>
                              <td class="l" width="200">融资放款金额（元）</td>
                              <td class="r" width="200">20,000,000.00</td>
                          </tr>
                          <tr>
                              <td class="l">放款时间</td>
                              <td class="r">2016.03.20 16:10:10</td>
                              <td class="l">融资到期日</td>
                              <td class="r">2016.06.30</td>
                          </tr>
                          <tr>
                              <td class="l" width="200">融资利率</td>
                              <td class="r" width="200">12%</td>
                              <td class="l">结息周期</td>
                              <td class="r">月度</td>
                          </tr>
                          <tr>
                              <td class="l" width="200">利息金额</td>
                              <td class="r" width="200">2,000.00</td>
                              <td class="l"></td>
                              <td class="r"></td>
                          </tr>
                        </tbody>
                    </table>
                </div>
              </el-col>
            </el-row>
        </div>

        <div class="item-group">
            <el-row>
              <el-col>
                <div class="item-tit"><span class="item-tit-icon"></span>应还款信息</div>
                <div class="item-cnt">
                    <table class="table-lr" style="width:50%">
                        <tbody>
                          <tr>
                              <td class="l" width="25%">融资应还总额（元）</td>
                              <td class="r" width="25%">20,002,000.00</td>
                          </tr>
                        </tbody>
                    </table>
                    <p class="tip mt10">融资应还总额＝融资放款金额＋利息金额</p>
                    <p class="c999 mt30" style="font-size:14px;"><i class="iconfont icon-iconset0144" style="margin-right:10px; color:orange; vertical-align: middle;"></i>确认后，将该笔融资款从您的子账户余额划拨至融资账户。</p>
                </div>
              </el-col>
            </el-row>
        </div>

        <div class="button-group mt15 mb15">
            <!-- <p><i class="iconfont icon-iconset0144"></i>子账户余额不足，请充值后，进行还款。</p> -->

            <el-button class="cancel mr20" type="info" @click="goback">取消</el-button>
            <el-button class="confirm" type="info" @click="submit">确认</el-button>
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

export default {
  name: 'app',
  components: {
    vnav: vnav,
    left: left,
    vfooter: vfooter
  },
  data () {
    return {
      title: '还款'
    }
  },
  methods: {
    goback () {
      history.go(-1)
    },
    submit () {
      this.$prompt('请输入支付密码', '支付密码', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        location.href = '#/supplier/financing-pay/repay-record-detail'
      }).catch(() => {
      })
    }
  }
}

</script>

<style>
  .input-width{
    position:relative;
    width:160px;

  }
  .input-width input{
    padding:5px 0px;

  }
  .transferable-funds{
    position: relative;
    margin:10px 0px;
    float: left;
    height: auto;
    overflow: auto;
  }
  .transferable-funds span{
    position: relative;
    float:left;
    padding:6px 0px;

  }
  .operation-detail{
    background:#fff;
  }
</style>
