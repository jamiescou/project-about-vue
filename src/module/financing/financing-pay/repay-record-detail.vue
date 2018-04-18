<template>
    <div class="content-body mt20 mr20 mb20 ml20 pt40 pr20 pb40 pl20">
        <div class="item-group">
            <el-row>
              <el-col>
                <div class="item-tit"><span class="item-tit-icon"></span>还款详情</div>
                <div class="item-cnt">
                    <table class="table-lr">
                        <tbody>
                          <tr>
                              <td class="l" width="200">还款时间</td>
                              <td class="r" width="200">2016.05.20</td>
                              <td class="l" width="200">状态</td>
                              <td class="r" width="200">银行处理中</td>
                          </tr>
                          <tr>
                              <td class="l" width="200">融资放款金额（元）</td>
                              <td class="r" width="200">20,000,000.00</td>
                              <td class="l" width="200">融资利率</td>
                              <td class="r" width="200">12%</td>
                          </tr>
                          <tr>
                              <td class="l" width="200">融资利息（元）</td>
                              <td class="r" width="200">100,000.00</td>
                              <td class="l" width="200">结息周期</td>
                              <td class="r" width="200">月度</td>
                          </tr>
                          <tr>
                              <td class="l" width="200">实际还款（元）</td>
                              <td class="r" width="200">20,100,000.00</td>
                              <td class="l" width="200"></td>
                              <td class="r" width="200"></td>
                          </tr>
                          <tr>
                              <td class="l" width="200">还款子账户号</td>
                              <td class="r" width="200">9709285970284757592</td>
                              <td class="l" width="200">融资银行账户</td>
                              <td class="r" width="200">9709285970284757592</td>
                          </tr>
                        </tbody>
                    </table>
                </div>
              </el-col>
            </el-row>
        </div>

        <div class="button-group mt15 mb15">
            <el-button class="cancel mr20" type="info" @click="goback()">关闭</el-button>
        </div>
    </div>
</template>

<script type="text/javascript">
import 'common/css/lib/iconfont.css'
import 'common/css/lib/motherplate.css'
import 'common/sass/module/table.scss'
import 'common/sass/module/regular.scss'
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
      title: '还款详情'
    }
  },
  methods: {
    goback () {
      location.href = '#/supplier/financing-pay/record'
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
