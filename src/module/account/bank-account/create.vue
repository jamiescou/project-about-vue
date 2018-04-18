<template>
  <div class="content-area" >
    <div v-title='title'>
      {{title}}
    </div>
    <div class="group">
        <div class="span12 path-nav offset0">
            <ol>
                <li><a href="javascript:void()">信息管理</a></li>>
                <li><a href="javascript:void()"><strong>{{title}}</strong></a></li>
            </ol>
        </div>
    </div>
    <div class="content-body account-manage account-bank pt20 pr20 pb40 pl20">
        <div class="item-group">
            <div class="item-tit"><!-- <span class="item-tit-icon"></span> --></div>
            <div class="item-cnt">
                <div class="inner-wrap">
                    <p class="top-tip"><i class="iconfont icon-iconset0144"></i>添加/绑定的银行账户必须与子账户所属方为同名账户。</p>
                    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
                      <el-form-item label="银行账户类型">
                        对公账户
                      </el-form-item>
                      <el-form-item label="银行开户名">
                        公司名称
                      </el-form-item>
                      <el-form-item label="开户银行">
                        <el-select v-model="form.region" placeholder="请选择">
                          <el-option label="请选择" value="s"></el-option>
                          <el-option label="招商银行" value="shanghai"></el-option>
                          <el-option label="平安银行" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item class="select-group" label="银行所在地区">
                        <el-select v-model="form.name" placeholder="请选择省份">
                          <el-option label="请选择" value="shanghai"></el-option>
                          <el-option label="北京市" value="shanghai1"></el-option>
                          <el-option label="河北省" value="beijing"></el-option>
                          <el-option label="黑龙江省" value="shanghai2"></el-option>
                        </el-select>
                        <el-select v-model="form.name" placeholder="请选择城市">
                          <el-option label="请选择" value="shanghai5"></el-option>
                          <el-option label="西城区" value="shanghai3"></el-option>
                          <el-option label="东城区" value="beijing"></el-option>
                          <el-option label="朝阳区" value="shanghai4"></el-option>
                          <el-option label="海淀区" value="beijing1"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="支行名称">
                        <el-select v-model="form.name" placeholder="请选择支行名称">
                          <el-option label="请选择" value="shanghai"></el-option>
                          <el-option label="招商银行远大路支行" value="beijing"></el-option>
                          <el-option label="招商银行首体支行" value="shanghai"></el-option>
                          <el-option label="招商银行望京支行" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="银行账户号">
                        <el-input v-model="form.name"></el-input>
                        <el-input class="remark" placeholder="最多8个字" v-model="form.name" v-if="addRemark===1"></el-input>
                        <span class="cbubi" v-if="addRemark===0" @click="addRemark=1">添加备注名</span>
                      </el-form-item>
                      <el-form-item label="">
                        <input type="radio" name="radio1" v-model="form.name" value="1"/> 出金账户
                        <span style="margin-right: 30px"></span>
                        <input type="radio" name="radio1" v-model="form.name" value="2"/> 融资账户
                      </el-form-item>
                      <el-form-item>
                        <el-button class="okbtn" type="primary" @click="onSubmit">确定添加</el-button>
                      </el-form-item>
                    </el-form>
                    <p class="bottom-tip c999"><span class="require">*</span>融资款将打入融资账户，建议与融资机构开户行保持一致。<br/>提现时资金转入出金账户，出金账户应为同名实体账户。</p>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import 'common/css/lib/iconfont.css'
import 'common/css/lib/motherplate.css'
import 'common/sass/main.scss'
import 'common/sass/module/account.scss'
import 'common/sass/module/table.scss'
import modal from 'components/entries/modal'
import layout from 'components/include/layout-l-r'

export default {
  name: 'app',
  components: {
    modal: modal,
    layout
  },
  data () {
    return {
      title: '添加银行账户',
      addRemark: 0,
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
  },
  methods: {
    onSubmit () {
    }
  }
}
</script>
