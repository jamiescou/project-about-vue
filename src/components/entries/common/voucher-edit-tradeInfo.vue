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
                            :file-list="oldContractFiles"
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
                        :before-upload="invoiceFileBeforeUpload"
                        :file-list="oldInvoiceFiles">
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
                        :before-upload="otherFileBeforeUpload"
                        :file-list="oldOtherFiles">
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
import arrayTools from 'common/javascript/tools/arrayTools'
export default {
  name: 'voucher-edit-tradeInfo',
  props: {
    vouId: null
  },
  data () {
    return {
      voucherId: null,
      tradeGoods: null,
      oldContractFiles: [],
      oldInvoiceFiles: [],
      oldOtherFiles: [],
      contractFiles: [],
      invoiceFiles: [],
      otherFiles: [],
      delOldFile: [],
      uploadFile: [], // 用户最终需要上传的新文件列表（暂无用）
      deletedFile: [], // 用户最终要删除的文件
      contractNoFlag: false,
      goodsInfoFlag: false,
      disabled: false,
      formField2: {
        deleteFlag: false,
        detailId: null,
        contractNo: null,
        goodsInfo: null
      },
      rules: {
        contractNo: [
          // {required: true, message: '必须填写', trigger: 'blur'}, // 不能使用该语句，因为要告知父级及时更新状态
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
  beforeMount () {
    const self = this
    self.oldFiles = {}
    this.$bus.$on('voucher-tradeinfo-fiels', info => {
      self.oldFiles = info
      for (var i = 0; i < self.oldFiles.length; i++) {
        if (info[i].detail.fileType === 0 && info[i].detail.name !== '') {
          self.formField2.contractNo = info[i].detail.name
          self.formField2.goodsInfo = info[i].detail.content
          self.formField2.detailId = info[i].detail.detailId
          break
        }
      }
      self.getOldFiles()
    })
    this.$bus.$on('contractStatus', info => {
      this.$refs.formField2.validateField('contractNo')
      this.$refs.formField2.validateField('goodsInfo')
    })
  },
  mounted () {
    this.voucherId = this.vouId
  },
  methods: {
    getOldFiles () {
      var i = 0
      for (i; i < this.oldFiles.length; i++) {
        if (this.oldFiles[i].type === 0) {
          this.oldContractFiles.push(this.oldFiles[i])
          // this.contractFiles.push(this.oldFiles[i].fileId)
        } else if (this.oldFiles[i].type === 1) {
          this.oldInvoiceFiles.push(this.oldFiles[i])
          // this.invoiceFiles.push(this.oldFiles[i].fileId)
        } else if (this.oldFiles[i].type === 2) {
          this.oldOtherFiles.push(this.oldFiles[i])
          // this.otherFiles.push(this.oldFiles[i].fileId)
        }
      }
      this.$bus.$emit('voucher-tradeinfo', this.files())
    },
    // 合同信息文件上传
    contractFileBeforeUpload (file, fileList) {
      return this.FileBeforeUpload(file, fileList)
    },
    // 成功 - 合同信息文件上传
    contractFileHandleSuccess (response, file, fileList) {
      // this.uploadFile.push(file.response.data)
      this.contractFiles.push(response.data)
      this.$bus.$emit('voucher-tradeinfo', this.files())
    },
    // 移除 - 合同信息文件上传
    contractFileHandleRemove (file, fileList) {
      if (file.response) {
        // 新上传文件的移除
        this.removeByValue(this.contractFiles, file.response.data)
      } else {
        // 原有文件的移除
        this.removeByValue2(this.oldContractFiles, file.fileId)
      }
      // this.formField2.deleteFlag = true
      this.$bus.$emit('voucher-tradeinfo', this.files())
    },

    // 发票信息文件上传
    invoiceFileBeforeUpload (file, fileList) {
      return this.FileBeforeUpload(file, fileList)
    },
    // 成功 - 发票信息文件上传
    invoiceFileHandleSuccess (response, file, fileList) {
      // this.uploadFile.push(file.response.data)
      this.invoiceFiles.push(response.data)
      this.$bus.$emit('voucher-tradeinfo', this.files())
    },
    // 移除 - 发票信息文件上传
    invoiceFileHandleRemove (file, fileList) {
      if (file.response) {
        // 新上传文件的删除
        this.removeByValue(this.invoiceFiles, file.response.data)
      } else {
        // 原有文件的移除
        this.delOldFile.push(file.fileId)
        // this.removeByValue2(this.oldInvoiceFiles, file.fileId)
      }
      this.$bus.$emit('voucher-tradeinfo', this.files())
    },

    // 其他信息文件上传
    otherFileBeforeUpload (file, fileList) {
      return this.FileBeforeUpload(file, fileList)
    },
    // 成功 - 其他信息文件上传
    otherFileHandleSuccess (response, file, fileList) {
      // this.uploadFile.push(file.response.data)
      this.otherFiles.push(response.data)
      this.$bus.$emit('voucher-tradeinfo', this.files())
    },
    // 移除 - 其他信息文件上传
    otherFileHandleRemove (file, fileList) {
      if (file.response) {
        // 新上传文件的删除
        this.removeByValue(this.otherFiles, file.response.data)
      } else {
        // 原有文件的移除
        this.delOldFile.push(file.fileId)
        // this.removeByValue2(this.oldOtherFiles, file.fileId)
      }
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
    // 移除文件
    removeFile (obj, file) {
      if (file.response) {
        this.removeByValue(obj, file.response.data)
      } else {
        this.removeByValue(obj, file.fileId)
      }
      this.$bus.$emit('voucher-tradeinfo', this.files())
    },
    removeByValue (arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
          arr.splice(i, 1)
          break
        }
      }
    },
    removeByValue2 (arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].fileId === val) {
          arr.splice(i, 1)
          break
        }
      }
    },
    // 文件
    files () {
      // var flag = false
      var filesArr = []
      // 修改了文件，编号等修改也在此处理
      if (this.contractFiles.length) {
        for (var i = 0; i < this.contractFiles.length; i++) {
          if (i === 0) {
            // flag = true
            filesArr.push({
              fileId: this.contractFiles[i],
              fileType: 0,
              detailId: this.formField2.detailId,
              name: this.formField2.contractNo,
              content: this.formField2.goodsInfo
            })
          }
        }
      } else if (this.oldContractFiles.length) {
        // 只修改了编号
        for (i = 0; i < this.oldContractFiles.length; i++) {
          if (i === 0) {
            filesArr.push({
              fileId: this.oldContractFiles[i].fileId,
              fileType: 0,
              detailId: this.formField2.detailId,
              name: this.formField2.contractNo,
              content: this.formField2.goodsInfo
            })
          }
        }
      } else {
        // 删除了文件，编号等修改也在此处理
        filesArr.push({
          fileId: null,
          fileType: 0,
          detailId: this.formField2.detailId,
          name: this.formField2.contractNo,
          content: this.formField2.goodsInfo
        })
      }

      if ((this.contractFiles.length + this.oldContractFiles.length) >= 1) {
        this.disabled = true
      } else {
        this.disabled = false
      }

      for (i = 0; i < this.invoiceFiles.length; i++) {
        filesArr.push({
          fileId: this.invoiceFiles[i],
          fileType: 1,
          name: null,
          content: null
        })
      }

      for (i = 0; i < this.oldInvoiceFiles.length; i++) {
        if (this.delOldFile && arrayTools.contains(this.delOldFile, this.oldInvoiceFiles[i].fileId)) {
          filesArr.push({
            fileId: null,
            fileType: 1,
            detailId: this.oldInvoiceFiles[i].detail.detailId,
            name: null,
            content: null
          })
        } else {
          filesArr.push({
            fileId: this.oldInvoiceFiles[i].fileId,
            fileType: 1,
            detailId: this.oldInvoiceFiles[i].detail.detailId,
            name: null,
            content: null
          })
        }
      }

      for (i = 0; i < this.otherFiles.length; i++) {
        filesArr.push({
          fileId: this.otherFiles[i],
          fileType: 2,
          name: null,
          content: null
        })
      }

      for (i = 0; i < this.oldOtherFiles.length; i++) {
        if (this.delOldFile && arrayTools.contains(this.delOldFile, this.oldOtherFiles[i].fileId)) {
          filesArr.push({
            fileId: null,
            fileType: 2,
            detailId: this.oldOtherFiles[i].detail.detailId,
            name: null,
            content: null
          })
        } else {
          filesArr.push({
            fileId: this.oldOtherFiles[i].fileId,
            fileType: 2,
            detailId: this.oldOtherFiles[i].detail.detailId,
            name: null,
            content: null
          })
        }
      }
      return filesArr
    }
  }
}
</script>
<style>
.disabled .el-button{border-color:#ccc; background:#ccc;}
</style>
