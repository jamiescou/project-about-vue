<template>
    <div class="content-area" >
        <div v-title='title'>{{title}}</div>
        <div class="group">
            <div class="span12 path-nav ">
                <ol>
                    <li><a href="javascript:void()">融资管理</a></li>>
                    <li><a href="javascript:void()"><strong>{{title}}</strong></a></li>
                </ol>
            </div>
        </div>
        <div class="content-body financing-info pt40 pr20 pb40 pl20">
            <div class="item-group">
                <el-row>
                  <el-col>
                    <div class="item-tit"><span class="item-tit-icon"></span>融资申请基本信息</div>
                    <div class="item-cnt">
                        <table class="table-lr">
                            <tbody>
                              <tr>
                                  <td class="l" width="200">申请时间</td>
                                  <td class="r" width="200">2016.01.01 12:00:00</td>
                                  <td class="l" width="200">供应商名称</td>
                                  <td class="r" width="200">布比（北京）网络技术有限公司</td>
                              </tr>
                              <tr>
                                  <td class="l">委托支付申请书</td>
                                  <td class="r" style='color:lightblue'>查看文件</td>
                                  <td class="l">凭证质押申请书</td>
                                  <td class="r" style='color:lightblue'>查看文件</td>
                              </tr>
                              <tr>
                                  <td class="l" width="200">审批状态</td>
                                  <td class="r" width="200">待审批</td>
                                  <td class="l">放款状态</td>
                                  <td class="r">未放款</td>
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
                    <div class="item-tit"><span class="item-tit-icon"></span>融资申请明细信息</div>
                    <div class="item-cnt">
                      <table class="table-tb">
                          <thead>
                                <tr>
                                    <th>申请融资凭证编号</th>
                                    <th>凭证付款日期</th>
                                    <th>申请融资凭证金额（元）</th>
                                    <th>实际可融资金额（元）</th>
                                    <th>融资材料</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td>B201601010032</td>
                                  <td>2016.01.01</td>
                                  <td>100,000</td>
                                  <td>8,000</td>
                                  <td><a class="table-operation">合同</a><a class="table-operation">发票</a></td>
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
                    <div class="item-tit"><span class="item-tit-icon"></span>使用计划</div>
                    <div class="item-cnt">
                        <table class="table-tb">
                            <thead>
                                  <tr>
                                      <th>序号</th>
                                      <th>收款人账户名</th>
                                      <th>收款人开户行</th>
                                      <th>收款人账户号</th>
                                      <th>付款金额（元）</th>
                                      <th>款项用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>B201601010032</td>
                                    <td>2016.01.01</td>
                                    <td>100,000</td>
                                    <td>8,000</td>
                                    <td>合同发票</td>
                                    <td>合同发票</td>
                                </tr>
                                <tr>
                                    <td>B201601010032</td>
                                    <td>2016.01.01</td>
                                    <td>100,000</td>
                                    <td>8,000</td>
                                    <td>合同发票</td>
                                    <td>合同发票</td>
                                </tr>
                                <tr>
                                    <td>B201601010032</td>
                                    <td>2016.01.01</td>
                                    <td>100,000</td>
                                    <td>8,000</td>
                                    <td>合同发票</td>
                                    <td>合同发票</td>
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
                    <div class="item-tit"><span class="item-tit-icon"></span>审批结果</div>
                    <div class="item-cnt">
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入审批意见。"
                        v-model="form.name">
                      </el-input>
                    </div>
                  </el-col>
                </el-row>
            </div>

            <div class="group form-row ">
                <span class="wrapper center">
                  <el-button class="button-bubi-theme" type="info" size="small" @click = "cancle">返回</el-button>
                  <el-button class="button-bubi-theme" type="info" size="small" @click = "cancle">不通过</el-button>
                  <el-button class="button-bubi-theme" type="info" size="small" @click = "redirect">通过</el-button>
                </span>
            </div>

      </div>
  </div>

</template>

<script type="text/javascript">

import 'common/css/lib/iconfont.css'
import 'common/css/lib/motherplate.css'
import 'common/sass/module/regular.scss'
import 'common/sass/module/table.scss'
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
      title: '审批详情',
      form: {
        name: ''
      }
    }
  },
  methods: {
    redirect () {
      var sref = '#/financing/financing-approve/success?content=融资申请审批成功！ &active=/financing/financing-approve'
      location.href = sref
    },
    cancle () {
      history.go(-1)
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
