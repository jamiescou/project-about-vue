<template>
  <div class="content-area" >
    <div v-title='title'>{{title}}</div>
    <div class="group">
        <div class="span12 path-nav offset0">
            <ol>
                <li>企业管理</li>>
                <li><strong>{{title}}</strong></li>
            </ol>
        </div>
    </div>
    <div class="content-body content-style">
      <el-row>
        <el-col :span='8'>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
              <!-- 隐藏元素占位，解决input中点击回车页面刷新问题 -->
              <el-form-item label="" v-show='false'>
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item> 

              <el-form-item label="用户名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-button :disabled="btnDisabled" @click='submit' class="button-bubi-theme searchBtn" type="info" style="margin-left: 100px">提交</el-button>
          </el-form>
        </el-col>
      </el-row>

      <!-- 创建成功弹窗提示 -->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        size="tiny"
        >
        <span>添加成功，请使用用户名：{{ruleForm.name}}，初始密码：a1b2c3d4进行登录</span>
        <span slot="footer" class="dialog-footer" style="text-align: center;display: block">
           <el-button type="primary" @click="ok">好</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/javascript">
import userService from 'common/api/service/userService'
import formExtends from 'components/entries/base/form'
import certService from 'common/api/service/certService'

let instance = null
export default formExtends({
  name: 'app',
  components: {
  },
  data () {
    return {
      title: '新建用户',
      dialogVisible: false,
      btnDisabled: false,
      ruleForm: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '必须填写', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              if (value.length < 4 || value.length > 15) {
                callback('用户名长度为4到15位字符！')
              }
              if (!instance.regular.userName.test(value)) {
                callback('用户名需要字母和数字组合！')
              }
              callback()
            },
            trigger: 'change'
          },
          {
            validator: (rule, value, callback) => {
              const param = {
                name: value
              }
              if (value === '') {
                callback('必须填写')
              }
              if (value.length < 4 || value.length > 15) {
                callback('用户名长度为4到15位字符！')
              }
              if (!instance.regular.userName.test(value)) {
                callback('用户名需要字母和数字组合！')
              }
              certService.checkUserName.remote(param, (data) => {
                if (data.data) {
                  callback('该用户名后台已存在！')
                } else {
                  callback()
                }
              })
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted () {
    instance = this
    this.$refs.ruleForm.resetFields()
  },
  beforeDestroy () {
    this.$refs.ruleForm.resetFields()
  },
  methods: {
    ok () {
      this.dialogVisible = false
      this.$refs.ruleForm.resetFields()
    },
    submit () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.btnDisabled = true
          let param = { 'userName': this.ruleForm.name }
          userService.createstaff.remote(param, list => {
            if (list.data) {
              this.dialogVisible = true
            }
            this.btnDisabled = false // 确保本次请求响应结束
          })
        }
      })
    }
  }
})
</script>
