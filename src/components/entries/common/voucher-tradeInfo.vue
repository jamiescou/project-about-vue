<template>
    <div class="b-voucher-tradeinfo">
        <table class="table-lr">
            <tbody>
                <tr>
                    <td width="25%" class="l">合同信息</td>
                    <td width="75%" class="r">
                      <el-form ref="formField2" :rules="rules" :model="formField2">
                        <el-form-item label="基础合同编号" label-width="120px" prop="contractNo" :class="{'is-required': true}" style="margin-top:30px;">
                            <el-input style="width:487px"
                              size="small"
                              placeholder="请输入基础合同编号，不得多于30个数字，字母，文字的组合"
                              v-model="formField2.contractNo">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="交易商品" label-width="120px" prop="goodsInfo" :class="{'is-required': true}">
                          <el-input style="width:487px"
                            type="textarea"
                            :rows="4"
                            placeholder="请输入交易商品，不得多于100个字符"
                            v-model="formField2.goodsInfo">
                          </el-input>
                        </el-form-item>
                        <el-form-item class="contract-info" label="合同信息" :class="disabled ? 'disabled' : ''" label-width="120px">
                          <el-upload
                            action="service/file/upload"
                            name="multipartFile"
                            :on-success="contractFileHandleSuccess"
                            :on-remove="contractFileHandleRemove"
                            :before-upload="contractFileBeforeUpload"
                            :disabled="disabled">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip"></div>
                          </el-upload>
                        </el-form-item>
                      </el-form>
                    </td>
                </tr>
                <tr>
                    <td width="25%" class="l">发票信息</td>
                    <td width="75%" class="r">
                      <el-upload
                        action="service/file/upload"
                        name="multipartFile"
                        :on-success="invoiceFileHandleSuccess"
                        :on-remove="invoiceFileHandleRemove"
                        :before-upload="invoiceFileBeforeUpload">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip"></div>
                      </el-upload>
                    </td>
                </tr>
                <tr>
                    <td width="25%" class="l">其他信息</td>
                    <td width="75%" class="r">
                      <el-upload
                        action="service/file/upload"
                        name="multipartFile"
                        :on-success="otherFileHandleSuccess"
                        :on-remove="otherFileHandleRemove"
                        :before-upload="otherFileBeforeUpload">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip"></div>
                      </el-upload>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script type="text/javascript">
import 'common/sass/module/component.scss'
export default {
  name: 'voucher-tradeinfo',
  data () {
    return {
      contractFileArr: [],
      invoiceFileArr: [],
      otherFileArr: [],
      contractNoFlag: false,
      goodsInfoFlag: false,
      disabled: false,
      formField2: {
        contractNo: null,
        goodsInfo: null
      },
      rules: {
        contractNo: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                // 实现上面注释的 required 功能
                this.contractNoFlag = false
                this.$bus.$emit('voucher-tradeinfo', this.files())
                this.$bus.$emit('contractInfo', {status: this.goodsInfoFlag && this.contractNoFlag, goodsInfo: this.formField2.goodsInfo, contractNo: this.formField2.contractNo})
                callback(new Error('必须填写'))
              } else if (value && value.length > 30) {
                this.contractNoFlag = false
                this.$bus.$emit('voucher-tradeinfo', this.files())
                this.$bus.$emit('contractInfo', {status: this.goodsInfoFlag && this.contractNoFlag, goodsInfo: this.formField2.goodsInfo, contractNo: this.formField2.contractNo})
                callback(new Error('不得多于30个数字，字母，文字的组合'))
              } else if (!/^[0-9a-zA-Z\u4e00-\u9fa5]*$/.test(value)) {
                this.contractNoFlag = false
                this.$bus.$emit('voucher-tradeinfo', this.files())
                this.$bus.$emit('contractInfo', {status: this.goodsInfoFlag && this.contractNoFlag, goodsInfo: this.formField2.goodsInfo, contractNo: this.formField2.contractNo})
                callback(new Error('不得输入特殊字符'))
              } else {
                this.contractNoFlag = true
                this.$bus.$emit('voucher-tradeinfo', this.files())
                this.$bus.$emit('contractInfo', {status: this.goodsInfoFlag && this.contractNoFlag, goodsInfo: this.formField2.goodsInfo, contractNo: this.formField2.contractNo})
                callback()
              }
            },
            trigger: 'blur' }
        ],
        goodsInfo: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                // 实现上面注释的 required 功能
                this.goodsInfoFlag = false
                this.$bus.$emit('voucher-tradeinfo', this.files())
                this.$bus.$emit('contractInfo', {status: this.goodsInfoFlag && this.contractNoFlag, goodsInfo: this.formField2.goodsInfo, contractNo: this.formField2.contractNo})
                callback(new Error('必须填写'))
              } else if (value && value.length > 100) {
                this.goodsInfoFlag = false
                this.$bus.$emit('voucher-tradeinfo', this.files())
                this.$bus.$emit('contractInfo', {status: this.goodsInfoFlag && this.contractNoFlag, goodsInfo: this.formField2.goodsInfo, contractNo: this.formField2.contractNo})
                callback(new Error('不得多于100个字符'))
              } else {
                this.goodsInfoFlag = true
                this.$bus.$emit('voucher-tradeinfo', this.files())
                this.$bus.$emit('contractInfo', {status: this.goodsInfoFlag && this.contractNoFlag, goodsInfo: this.formField2.goodsInfo, contractNo: this.formField2.contractNo})
                callback()
              }
            },
            trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.$bus.$on('contractStatus', info => {
      this.$refs.formField2.validateField('contractNo')
      this.$refs.formField2.validateField('goodsInfo')
    })
  },
  methods: {

    // 合同信息文件上传
    contractFileBeforeUpload (file, fileList) {
      return this.FileBeforeUpload(file, fileList)
    },
    // 成功 - 合同信息文件上传
    contractFileHandleSuccess (response, file, fileList) {
      this.contractFileArr.push(response.data)
      this.$bus.$emit('voucher-tradeinfo', this.files())
    },
    // 移除 - 合同信息文件上传
    contractFileHandleRemove (file, fileList) {
      this.removeByValue(this.contractFileArr, file.response.data)
      this.$bus.$emit('voucher-tradeinfo', this.files())
    },

    // 发票信息文件上传
    invoiceFileBeforeUpload (file, fileList) {
      return this.FileBeforeUpload(file, fileList)
    },
    // 成功 - 发票信息文件上传
    invoiceFileHandleSuccess (response, file, fileList) {
      this.invoiceFileArr.push(response.data)
      this.$bus.$emit('voucher-tradeinfo', this.files())
    },
    // 移除 - 发票信息文件上传
    invoiceFileHandleRemove (file, fileList) {
      this.removeByValue(this.invoiceFileArr, file.response.data)
      this.$bus.$emit('voucher-tradeinfo', this.files())
    },

    // 其他信息文件上传
    otherFileBeforeUpload (file, fileList) {
      return this.FileBeforeUpload(file, fileList)
    },
    // 成功 - 其他信息文件上传
    otherFileHandleSuccess (response, file, fileList) {
      this.otherFileArr.push(response.data)
      this.$bus.$emit('voucher-tradeinfo', this.files())
    },
    // 移除 - 其他信息文件上传
    otherFileHandleRemove (file, fileList) {
      this.removeByValue(this.otherFileArr, file.response.data)
      this.$bus.$emit('voucher-tradeinfo', this.files())
    },
    // 文件上传
    FileBeforeUpload (file, fileList) {
      const fileType = (file.type === 'application/pdf')
      const isLt3M = (file.size / 1024 / 1024 < 3)
      if (!fileType) {
        this.$message.error('格式要求PDF')
      }
      if (!isLt3M) {
        this.$message.error('文件大小不能超过 3MB')
      }
      return fileType && isLt3M
    },
    // 文件
    files () {
      var flag = false
      var filesArr = []
      for (var i = 0; i < this.contractFileArr.length; i++) {
        if (i === 0) {
          flag = true
          filesArr.push({
            fileId: this.contractFileArr[i],
            fileType: 0,
            name: this.formField2.contractNo,
            content: this.formField2.goodsInfo
          })
        } else {
          filesArr.push({
            fileId: this.contractFileArr[i],
            fileType: 0,
            name: null,
            content: null
          })
        }
      }
      if (this.contractFileArr.length >= 1) {
        this.disabled = true
      } else {
        this.disabled = false
      }
      for (i = 0; i < this.invoiceFileArr.length; i++) {
        filesArr.push({
          fileId: this.invoiceFileArr[i],
          fileType: 1,
          name: null,
          content: null
        })
      }
      for (i = 0; i < this.otherFileArr.length; i++) {
        filesArr.push({
          fileId: this.otherFileArr[i],
          fileType: 2,
          name: null,
          content: null
        })
      }
      if (!flag) {
        filesArr.push({
          fileId: null,
          fileType: 0,
          name: this.formField2.contractNo,
          content: this.formField2.goodsInfo
        })
      }
      return filesArr
    },
    removeByValue (arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
          arr.splice(i, 1)
          break
        }
      }
    }
  }
}
</script>
<style>
.disabled .el-button{border-color:#ccc; background:#ccc;}
</style>
