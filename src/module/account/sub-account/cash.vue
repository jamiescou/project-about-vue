<template>
  <div class="content-area" >
    <div v-title='title'>
      {{title}}
    </div>
    <div class="group">
        <div class="span12 path-nav offset0">
            <ol>
                <li><a href="javascript:void()">用户管理</a></li>>
                <li><a href="javascript:void()"><strong>{{title}}</strong></a></li>
            </ol>
        </div>
    </div>
    <div class="content-body account-manage account-cash pt20 pr20 pb40 pl20">
        <div class="item-group" v-if="hashBind===0">
            <div class="item-tit"><!--<span class="item-tit-icon"></span>交易记录--></div>
            <div class="item-cnt">
                <div class="c666">
                  <span>子账户：</span><span>90693719606817696</span>
                  <span class="ml40">可用金额（元）：</span><span>1,000,000.00</span>
                </div>
                <div class="">
                  <el-button class="fr" type="primary" size="small" @click="toCashRecord">提现记录</el-button>
                </div>
                <div class="bind-bank mt40">
                  可将子账户可用余额转入贵公司的银行账户。<el-button class="ml15 mr15" type="primary" size="small" @click="toBindBankAccount">添加银行账户</el-button><span class="font0 c999">该银行卡无需开通网银。</span>
                </div>
            </div>
        </div>
        <div class="item-group" v-if="hashBind===1">
            <div class="item-tit"><!--<span class="item-tit-icon"></span>交易记录--></div>
            <div class="item-cnt">
                <div class="c666 mb15" style="margin-left:45px;">
                  <span class="c333">子账户：</span><span>90693719606817696</span>
                  <span class="c333 ml40">可用金额（元）：</span><span>1,000,000.00</span>
                  <el-button class="fr" type="primary" size="small" @click="toCashRecord">提现记录</el-button>
                </div>
                <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
                  <el-form-item label="收款账户">
                    <div class="payee fl">
                      <div class="">中国招商银行北京保福寺支行</div>
                      <div class="">0000 1111 2222 3333</div>
                      <div class="">提现</div>
                    </div>
                    <div class="cbubi" @click="dialogFormVisible=true">转账到其他账户</div>
                  </el-form-item>
                  <el-form-item label="转账金额">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="通知收款方">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button class="okbtn" type="primary" @click="hashBind=2">下一步</el-button>
                  </el-form-item>
                </el-form>
            </div>
        </div>

        <el-dialog title="转账到其他账户" v-model="dialogFormVisible">
          <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="银行户名">
              公司名称
            </el-form-item>
            <el-form-item label="所属银行">
              <el-select v-model="form.name" placeholder="请选择银行户名">
                <el-option label="招商银行" value="shanghai"></el-option>
                <el-option label="平安银行" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="select-group" label="银行所在地区">
              <el-select v-model="form.name" placeholder="请选择省份">
                <el-option label="北京市" value="shanghai"></el-option>
                <el-option label="河北省" value="beijing"></el-option>
              </el-select>
              <el-select v-model="form.name" placeholder="请选择城市">
                <el-option label="西城区" value="shanghai"></el-option>
                <el-option label="东城区" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="支行名称">
              <el-select v-model="form.name" placeholder="请选择支行名称">
                <el-option label="招商银行保福寺支行" value="shanghai"></el-option>
                <el-option label="招商银行远大路支行" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="银行账户号">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
        <cashConfirm v-show="hashBind===2"></cashConfirm>
    </div>
  </div>
</template>
<script type="text/javascript">
import 'common/css/lib/iconfont.css'
import 'common/css/lib/motherplate.css'
import 'common/sass/main.scss'
import 'common/sass/module/table.scss'
import 'common/sass/module/account.scss'
import vnav from 'components/include/nav'
import left from 'components/include/left'
import vfooter from 'components/include/footer'
import modal from 'components/entries/modal'
import layout from 'components/include/layout-l-r'
import cashConfirm from 'module/account/my-children-account/cash-confirm'

export default {
  name: 'app',
  components: {
    vnav: vnav,
    left: left,
    vfooter: vfooter,
    modal: modal,
    layout: layout,
    cashConfirm: cashConfirm
  },
  data () {
    return {
      title: '子账户提现',
      hashBind: 1,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
      }
    }
  },
  mounted () {
    this.$bus.$on('cashConfirm', info => {
      this.hashBind = 1
    })
  },
  methods: {
    onSubmit () {
    },
    toBindBankAccount () {
      location.href = '#/account/bank-account/add'
    },
    // 提现记录
    toCashRecord () {
      location.href = '#/account/my-children-account/trade-record-cash'
    }
  }
}
</script>
