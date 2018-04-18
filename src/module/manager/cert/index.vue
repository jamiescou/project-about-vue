<template>
  <div class="content-area" >
    <div v-title='title'>{{title}}</div>
    <div class="group">
        <div class="span12 path-nav offset0">
            <ol>
                <li></li>>
                <li><strong>{{title}}</strong></li>
            </ol>
        </div>
    </div>
    <div class="content-body" style='background: #fff;'>
      <el-row>
        <el-col :span='24' >
          <el-form :inline="true" :model="searchData" class="stand-form " style="margin-top:10px" >
              <fieldset>
                <el-form-item label="用户名" label-width="80px">
                  <el-input v-model="searchData.userName"  placeholder="请输入用户名称"></el-input>
                </el-form-item>
                <el-form-item label="数字证书（DN码）" label-width="150px">
                  <el-input v-model="searchData.serialNo"  placeholder="请输入数字证书（DN码）"></el-input>
                </el-form-item>
                <el-button class="button-bubi-theme searchBtn" type="info" icon="null iconfont icon-search-bt" @click = "search">搜索</el-button>
              </fieldset>
          </el-form>
        </el-col>
      </el-row>

      <el-row style="padding-top:10px">
        <el-col :span='24' >
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="createTime"
              label="添加时间"
              min-width='180'
              :formatter = "dateFormaterPrecise"
              >
            </el-table-column>
            <el-table-column
              prop="serialNo"
              :show-overflow-tooltip=true
              label="数字证书（DN码）"
              min-width='220'
              >
            </el-table-column>
            <el-table-column
              prop="userName"
              :show-overflow-tooltip=true
              label="用户名"
              min-width='150'
              >
            </el-table-column>
            <el-table-column
              prop=""
              label="绑定情况"
              min-width='150'
              >
              <template scope="scope">
                <span>{{scope.row.userId === null ? '未绑定' : '已绑定'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="remark"
              :show-overflow-tooltip=true
              label="数字证书备注"
              min-width='180'
              >
            </el-table-column>
            <el-table-column
              prop=""
              label="操作"
              align='center'
              v-if="setAccessAccess || editRemarkAccess || editUserAccess"
              min-width='260'>
              <template scope="scope">
                <el-button v-if="setAccessAccess && userName !== scope.row.userName" @click="setAccess(scope.row.id)" type="text" size="small">设置权限</el-button>
                <el-button v-if="setAccessAccess && userName === scope.row.userName" type="text" size="small" style="color:#999; cursor:default;">设置权限</el-button>
                <el-button v-if="editRemarkAccess" @click="remarkEdit(scope.row.id)" type="text" size="small">编辑备注</el-button>
                <el-button v-if='editUserAccess && scope.row.userId === null'  @click='userEdit(scope.row.id)' type="text" size="small">关联用户</el-button>
                <el-button v-if='editUserAccess && scope.row.userId !== null' type="text" size="small" style="color:#999; cursor:default;">关联用户</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <el-row v-show="tableData.length != 0">
        <el-col :span='24' >
          <el-pagination
            class="page-position-base"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-col>
      </el-row>

      <!-- 编辑备注弹窗 -->
      <el-dialog title="编辑备注" :visible.sync="remarkVisible" class="remark" :before-close="remarkClose">
        <el-form :model="remark" ref='remark' :rules="rules">
          <!-- 隐藏元素占位，解决input中点击回车页面刷新问题 -->
          <el-form-item label="" v-show='false'>
            <el-input v-model="remark.remark"></el-input>
          </el-form-item>

          <el-form-item prop='remark' label="备注名" label-width='70px' style="width: 90%">
            <el-input v-model="remark.remark" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button type="primary" @click="remarkSave">保存</el-button>
          <el-button @click="remarkClose">关闭</el-button>
        </div>
      </el-dialog>
      <!-- 关联用户弹窗 -->
      <el-dialog title="关联用户" :visible.sync="userVisible" class="remark" :before-close="userClose">
        <el-form :model="user" ref='user' :rules="rules">
          <!-- 隐藏元素占位，解决input中点击回车页面刷新问题 -->
          <el-form-item label="" v-show='false'>
            <el-input v-model="remark.remark"></el-input>
          </el-form-item>

          <el-form-item prop="name" label="用户名" label-width='70px' style="width: 90%">
            <el-input v-model="user.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button type="primary" @click="userSubmit">提交</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>
<script type="text/javascript">
import 'common/sass/module/table.scss'
import 'common/sass/main.scss'
import config from 'common/config/config'
import table from 'components/entries/base/table'
import merge from 'webpack-merge'
import certService from 'common/api/service/certService'
import accessControl from 'common/javascript/tools/accessControl.js'
import manager from 'module/manager/service/manager'
import CFCATools from 'common/javascript/features/cfca'

export default merge(table, {
  name: 'app',
  components: {
  },
  data () {
    return {
      title: '证书列表',
      tableData: [],
      searchData: {
        serialNo: null,
        userName: null,
        pageNum: 1,
        pageSize: config.pageSize
      },
      userName: '',
      // 编辑备注相关数据
      remarkVisible: false,
      remark: {
        remark: ''
      },
      certId: '',
      // 关联用户相关数据
      userVisible: false,
      user: {
        name: ''
      },
      setAccessAccess: false,
      editRemarkAccess: false,
      editUserAccess: false,
      rules: {
        remark: [
          { required: true, message: '请填写备注名', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              if (value.length > 10) {
                callback('请输入10位以内的备注名')
              } else {
                callback()
              }
            },
            trigger: 'change'
          }
        ],
        name: [
          { required: true, message: '必须填写', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              if (value.length < 4 || value.length > 15) {
                callback('用户名长度为4到15位字符！')
              }
              let reg = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{4,15}$/
              if (!reg.test(value)) {
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
              let reg = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{4,15}$/
              if (!reg.test(value)) {
                callback('用户名需要字母和数字组合！')
              }
              certService.checkName.remote(param, (data) => {
                if (data.data) {
                  callback()
                } else {
                  callback('当前用户不存在')
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
    this.userName = sessionStorage.getItem('userName')
    this.getGrid()
  },
  methods: {
    getGrid () { // 获得表数据
      this.searchData.serialNo = this.searchData.serialNo === '' ? null : this.searchData.serialNo
      this.searchData.userName = this.searchData.userName === '' ? null : this.searchData.userName
      certService.certQuery.remote(this.searchData, list => {
        this.tableData = list.content
        this.total = list.total
      })
      this.setAccessAccess = accessControl.checkAccess('/manager/cert/set-access')
      this.editRemarkAccess = accessControl.checkAccess('/manager/cert/edit-remark')
      this.editUserAccess = accessControl.checkAccess('/manager/cert/edit-user')
    },
    // 编辑备注
    remarkEdit (id) {
      this.certId = id
      this.remarkVisible = true
    },
    setAccess (id) {
      location.href = '#/manager/cert/set-access?id=' + id
    },
    // 保存更改的备注
    remarkSave () {
      this.$refs.remark.validate((valid) => {
        if (valid) {
          let param = {
            id: this.certId,
            remark: this.remark.remark
          }
          certService.updateremark.remote(param, list => {
            if (list) {
              this.remark.remark = ''
              this.remarkVisible = false
              this.$refs.remark.resetFields()
              this.getGrid()
            }
          })
        }
      })
    },
    // 关闭修改备注弹窗
    remarkClose () {
      this.$refs.remark.resetFields()
      this.remark.remark = ''
      this.remarkVisible = false
    },
    // 关联用户
    userEdit (id) {
      this.certId = id
      this.userVisible = true
    },
    // 关联用户提交
    userSubmit () {
      this.$refs.user.validate((valid) => {
        if (valid) {
          let param = {
            certId: this.certId,
            userName: this.user.name
          }
          certService.usercert.remote(param, list => {
            if (list) {
              let hash = list.data.hash
              let blob = list.data.blob
              let url = '/service/usercert/create'
              // CFCATools.selectCert()
              CFCATools.selectCert('', '', '', false)
              manager.blobSign(hash, blob, url, response => {
                this.user.name = ''
                this.userVisible = false
                this.getGrid()
              })
              // manager.blobSign(hash, blob, url)
              // this.user.name = ''
              // this.userVisible = false
              // this.getGrid()
            }
          })
        }
      })
    },
    // 关闭关联用户弹窗
    userClose () {
      this.$refs.user.resetFields()
      this.user.name = ''
      this.userVisible = false
    }
  }
})
</script>
<style media="screen">
  .remark .el-dialog--small {
    width: 38%
  }
  .remark .el-dialog__body {
    padding-bottom: 0
  }
</style>
