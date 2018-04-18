<template>
  <div class="step1-reg">
    <div class="inner-wrap">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <h2 class="tit2">1. 请选择所需认证会员类别，并提交相应认证信息。</h2>
        <el-form-item label="手机号码">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="form.name"></el-input>
          <img class="img-code" src="../../../common/image/u002.png" alt="图形验证码">
        </el-form-item>
        <el-form-item label="短信验证码">
          <el-input class="smscode-input" v-model="form.name"></el-input>
          <el-button class="smscode">发送短信验证码</el-button>
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="protocol">
            <el-checkbox v-model="checkedPromiss" ref='canRead' :disabled="canRead">我已同意<a @click.stop.prevent='dialogToggle'>《区块链应收账款管理平台协议》</a></el-checkbox>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button  type="primary" @click="onSubmit" class="" style="width:180px;">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'step1-reg',
  components: {
  },
  data () {
    return {
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
  methods: {
    onSubmit () {
    },
    login () {
      // 登录
    }
  }
}

</script>
