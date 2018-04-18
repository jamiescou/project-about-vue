<template>
  <div class="step8-sa">
    <div class="inner-wrap">
      <h2 class="tit2">1. 请选择所需认证会员类别，并提交相应认证信息。</h2>
      <el-form :model="form" :inline="true" :rules="rules" ref="ruleForm" label-width="200px">
        <el-form-item label="机构全称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="机构简称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="社会统一信用代码">
          <el-input v-text=""v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="税务登记号">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人证件类型">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人证件号码">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="证件到期日">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="所在城市">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="注册地址">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>

      <h2 class="tit2">2. 其他信息材料</h2>
      <el-form :model="form" :inline="true" :rules="rules" ref="ruleForm" label-width="200px">
        <el-form-item label="联系人姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="联系人手机号">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <div class="stuff-wrap">
          <div class="stuff-group">
            <div class="stuff-item"><p class="title">企业营业执照</p> <p class="add">+</p></div>
            <div class="stuff-item"><p class="title">法定代表人身份证</p> <p class="add">+</p></div>
            <div class="stuff-item"><p class="title">委托人身份证</p> <p class="add">+</p></div>
          </div>
          <p class="tip"><span class="require">*</span>文件支持：pdf、jpg、png，文件大小10M以下。</p>
        </div>
        <el-button class="okbtn" type="primary" @click="onSubmit">下一步</el-button>
      </el-form>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'step8-sa',
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
