<template>
  <div class="step4-cca">
    <div class="inner-wrap">

      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="200px" class="form-register">
        <h2 class="tit2">1. 企业信息</h2>

        <el-form-item label="机构全称">
          <el-input v-model="formData.name" :disabled='true'></el-input>
        </el-form-item>
        <!-- <el-form-item label="机构简称">
          <el-input v-model="form.name"></el-input>
        </el-form-item> -->
        <el-form-item label="社会统一信用代码">
          <el-input v-text="" v-model="formData.code" :disabled='true'></el-input>
        </el-form-item>
        <el-form-item label="机构类型" prop='type'>
          <el-select v-model="form.type"  placeholder="请选择">
            <el-option
              v-for="item in mechanisms"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="税务登记号" prop='taxCode'>
          <el-input v-model="form.taxCode" ></el-input>
        </el-form-item>
        <el-form-item label="法定代表人" prop='corpName'>
          <el-input v-model="form.corpName"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人证件类型" prop="corpCardType">
          <el-select v-model="form.corpCardType"  placeholder="请选择">
            <el-option
              v-for="item in documentType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="法定代表人证件号码" prop='corpCardId'>
          <el-input v-model="form.corpCardId"></el-input>
        </el-form-item>
        <el-form-item label="证件到期日" prop='corpCardDate'>
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model = "form.corpCardDate"
            :picker-options="pickerOptions"
            style="width:250px"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="所在城市" >
          <el-select v-model="form.city" filterable placeholder="请选择">
            <el-option
              v-for="item in citys"
              :key="item.CityID"
              :label="item.name"
              :value="item.CityID.toString()">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="注册地址" >
          <el-input v-model="form.address"></el-input>
        </el-form-item>

        <h2 class="tit2">2. 其他信息材料</h2>

        <el-form-item label="联系人姓名" >
          <el-input v-model="form.contactName"></el-input>
        </el-form-item>
        <el-form-item  label="联系人手机号" >
          <el-input v-model="form.contactPhone"></el-input>
        </el-form-item>

        <div class="stuff-wrap">
          <div class="stuff-group">
            <el-upload
              class="avatar-uploader"
              name="multipartFile"
              :action="uploadPath"
              :show-file-list="false"
              :on-success="companyInfoSuccess"
              :before-upload="beforeImageUpload">
              <div class="stuff-item" v-if='companyInfoImg===""'>
                <p class="title">企业营业执照</p>
                <p class="add">+</p>
              </div>
              <div class='imgContainer' v-if='companyInfoImg!==""'>
                <img :src='companyInfoImg'/>
                <div class="imgPreview">
                  <span  @click.stop='imgPreview(companyInfoImg)'>预览</span><b></b>
                  <span>编辑</span>
                </div>
              </div>
            </el-upload>

            <el-upload
              class="avatar-uploader"
              name="multipartFile"
              :action="uploadPath"
              :show-file-list="false"
              :on-success="userIdSuccess"
              :before-upload="beforeImageUpload">
              <div class="stuff-item" v-if='companyIDImg===""'><p class="title">法定代表人身份证</p> <p class="add">+</p></div>
              <div class='imgContainer' v-if='companyIDImg!==""'>
                <img :src='companyIDImg'/>
                <div class="imgPreview">
                  <span  @click.stop='imgPreview(companyIDImg)'>预览</span><b></b>
                  <span>编辑</span>
                </div>
              </div>
            </el-upload>

            <el-upload
              class="avatar-uploader"
              name="multipartFile"
              :action="uploadPath"
              :show-file-list="false"
              :on-success="contactFileSuccess"
              :before-upload="beforeImageUpload">
              <div class="stuff-item" v-if='userIDImg===""'><p class="title">委托人身份证</p> <p class="add">+</p></div>
              <div class='imgContainer' v-if='userIDImg!==""'>
                <img :src='userIDImg'/>
                <div class="imgPreview">
                  <span  @click.stop='imgPreview(userIDImg)'>预览</span><b></b>
                  <span>编辑</span>
                </div>
              </div>
            </el-upload>
            <el-upload
              v-if = 'role===1'
              class="avatar-uploader"
              name="multipartFile"
              :action="uploadPath"
              :show-file-list="false"
              :on-success="reportSuccess"
              :before-upload="beforeImageUpload">
              <div class="stuff-item" v-if='reportImg===""'>
                <p class="title">评级报告</p>
                <p class="add">+</p>
              </div>
              <div class='imgContainer' v-if='reportImg!==""'>
                <img :src='reportImg'/>
                <div class="imgPreview">
                  <span  @click.stop='imgPreview(reportImg)'>预览</span><b></b>
                  <span>编辑</span>
                </div>
              </div>
            </el-upload>

            <!-- 图片预览编辑 cl -->
            <component :is="enLargeImg" :data="files" v-if='imgShow' @imgClose='imgShow=false'></component>
          </div>
          <p class="tip"><span class="require">*</span>文件支持：jpg，文件大小3M以下。</p>
        </div>

        <el-form-item style="margin-top:20px;margin-bottom:20px;">
          <el-button class="okbtn" type="primary" @click="onSubmit">下一步</el-button>
        </el-form-item>
        <div style="border: 1px solid transparent"></div>
      </el-form>

    </div>
  </div>
</template>


<script type="text/javascript">
import region from 'common/config/region'
import CFCATools from 'common/javascript/features/cfca'
import formExtends from 'components/entries/base/form'
import certService from 'common/api/service/certService'
import cookieTools from 'common/javascript/tools/cookieTools'
import merge from 'webpack-merge'
import type from 'common/config/type'
import 'common/sass/module/member.scss'

export default formExtends({
  name: 'step4-cca',
  components: {
  },
  data () {
    return {
      enLargeImg: null,
      userIDImg: '',
      companyIDImg: '',
      companyInfoImg: '',
      reportImg: '',
      form: {
        address: '',
        businessFileId: 0,
        city: '',
        contactFileId: 0,
        contactName: '',
        contactPhone: '',
        corpCardDate: '',
        corpCardId: '',
        corpCardType: '',
        corpFileId: 0,
        corpName: '',
        reportFileId: 0,
        taxCode: '',
        type: ''
      },

      formData: {
        issuerDn: '',
        serialNo: '',
        signStr: '',
        name: '',
        code: ''
      },
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      rules: {
        name: [
          { required: true, message: '请填写机构全称！', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择机构类型！', trigger: 'change', type: 'number' }
        ],
        taxCode: [
          { required: true, message: '请填写税务登记号！', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              let code = this.methods.isTaxCode(value, callback)
              if (!code) {
                callback(new Error('必须为15-18位数字或字母'))
              } else if (value.length === 18 && value !== this.data().formData.code) {
                callback(new Error('请与社会统一信用代码保持一致'))
              }
              callback()
            },
            trigger: 'change'
          }
        ],
        corpName: [
          { required: true, message: '请选填写法定代表人！', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              this.methods.isChinese(value, callback)
            },
            trigger: 'change'
          }
        ],
        corpCardType: [
          { required: true, message: '请选择证件类型！', trigger: 'change', type: 'number' }
        ],
        corpCardId: [
          { required: true, message: '请填写证件号码！', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              this.methods.isCardNo(value, callback)
            },
            trigger: 'change'
          }
        ],
        corpCardDate: [
          { type: 'date', required: true, message: '请选择证件到期日！', trigger: 'change' }
        ],
        city: [
          { required: true, message: '请选择所在城市！', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请填写注册地址！', trigger: 'change' }
        ],
        contactName: [
          { required: true, message: '请填写联系人姓名！', trigger: 'change' }
        ],
        contactPhone: [
          { required: true, message: '请填写联系人手机号！', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              this.methods.isPhone(value, callback)
            },
            trigger: 'change'
          }
        ]
      },
      citys: region.city,
      mechanisms: type.institutionType,
      documentType: type.corpIDType,
      role: 1,
      // 图片预览数据
      imgShow: false,
      files: {}
    }
  },
  mounted () {
    certService.getCurrentCompany.remote({}, (info) => {
      this.formData.name = info.data.name
      let codes = info.data.certificateList
      for (let i = 0; i < codes.length; i++) {
        if (parseInt(codes[i].type) === 0) {
          this.formData.code = codes[i].code
          break
        }
      }
    })
    this.role = parseInt(cookieTools.getCookie('role'))
  },
  methods: {
    onSubmit () {
      if (this.form.businessFileId === 0) {
        this.$bus.$emit('message-error', {message: '上传企业营业执照！'})
        return
      }
      if (this.form.corpFileId === 0) {
        this.$bus.$emit('message-error', {message: '上传法定代表人身份证！'})
        return
      }
      if (this.form.contactFileId === 0) {
        this.$bus.$emit('message-error', {message: '上传委托人身份证！'})
        return
      }

      if (this.form.reportFileId === 0 && this.role === 1) {
        this.$bus.$emit('message-error', {message: '上传评级报告！'})
        return
      }
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // CFCATools.selectCert()
          CFCATools.selectCert('', '', '', false)
          const info = CFCATools.getInfo()

          this.formData.issuerDn = info.issuerDN
          this.formData.serialNo = info.serialNumber
          let param = merge({}, this.formData)
          // param.corpCardDate = this.form.corpCardDate.getTime()

          param.subjoinInfo = merge({}, this.form)
          param.subjoinInfo.corpCardDate = param.subjoinInfo.corpCardDate.getTime()
          param.subjoinInfo.type = parseInt(param.subjoinInfo.type)
          param.subjoinInfo.corpCardType = parseInt(param.subjoinInfo.corpCardType)

          param.signStr = this.sign(JSON.stringify(param.subjoinInfo))
          certService.addCompanyInfo.remote(param, (data) => {
            this.$bus.$emit('on-step', 3)
          })
        }
      })
    },
    companyInfoSuccess (info) {
      this.form.businessFileId = info.data
      this.companyInfoImg = this.getImagePath(info.data)
    },
    userIdSuccess (info) {
      this.form.corpFileId = info.data
      this.companyIDImg = this.getImagePath(info.data)
    },
    contactFileSuccess (info) {
      this.form.contactFileId = info.data
      this.userIDImg = this.getImagePath(info.data)
    },
    reportSuccess (info) {
      this.form.reportFileId = info.data
      this.reportImg = this.getImagePath(info.data)
    },
    // 图片预览
    imgPreview (url) {
      require.ensure(['components/plugin/enLargeImg'], () => {
        const enLargeImg = require('components/plugin/enLargeImg')
        this.enLargeImg = this.$vue.component('imgPreview', enLargeImg)
        this.imgShow = true
        this.files = url
      }, 'enLargeImg')
    }
  }
})

</script>
<style scoped>
.avatar-uploader{
  float:left;
  /*margin-right:50px\9;*/
}
.b-reg .step4-cca .stuff-item {
  position: relative;
  margin-right:22px;
}
.avatar-uploader img{
  width:130px;
  height:120px;
  margin-right:22px
}
</style>
