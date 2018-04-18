<template>
  <div class="content-area" >
    <div v-title='title'>
    {{title}}
  </div>
    <div class="group">
        <div class="span12 path-nav ">
            <ol>
                <li><a href="#">供应商管理</a></li>>
                <li><a href="#"><strong>{{title}}</strong></a></li>
            </ol>
        </div>
    </div>
    <div class="content-body user-manage user-supplier pt40 pr20 pb40 pl20">
        <div class="inner-wrap">
            <el-form :model="formField" :rules="rules" ref="ruleForm" label-width="170px">
              <el-form-item label="供应商名称" prop="name">
                <el-input v-model="formField.name"></el-input><br>
                <span class="right-tip">供应商企业名称，建议与企业ERP系统中名称保持一致。</span>
              </el-form-item>
              <el-form-item label="供应商ERP编号" prop="code">
                <el-input v-model="formField.code"></el-input><br>
                <span class="right-tip">供应商唯一标识，建议与企业ERP系统中编号保持一致。</span>
              </el-form-item>
              <!-- <el-form-item label="选择邀请码通知方式">
                <el-radio class="radio" v-model="formField.contactType" label="0">短息通知</el-radio>
                <el-radio class="radio" v-model="formField.contactType" label="1">邮件通知</el-radio>
                <span class="right-tip" style="margin-left: 135px;">供应商只有使用邀请码才能注册区块链应收账款管理平台。</span>
              </el-form-item> -->
              <!-- <el-form-item label="手机号码/邮箱" prop="contact">
                <el-input v-model="formField.contact"></el-input>
                <span class="right-tip">供应商用来接收开户通知的手机号码或邮箱。</span>
              </el-form-item> -->
              <el-form-item>
                <el-button class="okbtn" type="primary" @click="onSubmit" :disabled="btnHide">确认创建</el-button>
              </el-form-item>

              <!-- 邀请码弹窗 -->
              <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                size="tiny"
                :before-close="handleClose">
                <span>创建供应商{{formField.name}}成功，邀请码为<span style="color: red">{{invite}}</span>，请您记录邀请码并且告知供应商，邀请码可以在供应商列表中查看。</span>
                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="ok">好</el-button>
                </span>
              </el-dialog>
            </el-form>
        </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import 'common/css/lib/iconfont.css'
import 'common/css/lib/motherplate.css'
import 'common/sass/module/table.scss'
import 'common/sass/main.scss'
import 'common/sass/module/supplier.scss'
import modal from 'components/entries/modal'
import layout from 'components/include/layout-l-r'
import supplierService from 'common/api/service/supplierService'
import formExtends from 'components/entries/base/form'

// let instance = null
export default formExtends({
  name: 'app',
  components: {
    modal: modal,
    layout
  },
  data () {
    return {
      title: '添加账号',
      radio: null,
      invite: null, // 邀请码
      dialogVisible: false,
      formField: {
        name: '',
        code: '',
        contactType: 0,
        contact: ''
      },
      btnHide: false,
      rules: {
        name: [
          { required: true, message: '必须填写', trigger: 'change' },
          { min: 1, max: 50, message: '长度在1-50个字符之间', trigger: 'change' }
        ]
        // code: { min: 0, max: 50, message: '长度在0-50个字符之间', trigger: 'change' },
        // contact: [
        //   { required: true, message: '必须填写', trigger: 'change' },
        //   {
        //     validator: (rule, value, callback) => {
        //       if (instance.formField.contactType === '0') {
        //         instance.isPhone(value, callback)
        //       } else if (instance.formField.contactType === '1') {
        //         instance.isEmail(value, callback)
        //       } else {
        //         callback('请选择邀请码通知方式')
        //       }
        //     },
        //     trigger: 'change'
        //   }
        // ]
      }
    }
  },
  mounted () {
    // instance = this
  },
  methods: {
    ok () {
      this.dialogVisible = false
      this.$refs.ruleForm.resetFields()
    },
    onSubmit () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let params = this.formField
          // 按钮置灰，避免多次请求
          this.btnHide = true
          supplierService.createdUser.remote(params, (data) => {
            this.dialogVisible = true
            this.formField.name = ''
            this.formField.code = ''
            this.invite = data.data
            // this.formField.contactType = ''
            // this.formField.contact = ''
            this.btnHide = false
            // let msg = '邀请码已发出，等待供应商创建账号。'
            // let sref = '#/assistant/success?content=' + msg + ' &active=/customer/downstream'
            // location.href = sref
          }).catch(error => {
            this.dialogVisible = false
            this.btnHide = false
            console.log(error)
          })
        }
      })
    }
  }
})
</script>
