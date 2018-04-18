<template>
  <div class="content-area" >
    <div v-title='title'>
      {{title}}
    </div>
    <div class="group">
        <div class="span12 path-nav offset0">
            <ol>
                <li><a href="javascript:void()">企业管理</a></li>>
                <li><a href="javascript:void()"><strong>{{title}}</strong></a></li>
            </ol>
        </div>
    </div>
    <div class="content-body info-manage pt20 pr20 pb40 pl20">
        <div class="item-group" v-if="accessFlag">
          <div class="item-tit"><span class="item-tit-icon"></span>设置权限</div>
          <div class="item-cnt">
            <el-tree
            :data="accessTree"
            show-checkbox
            ref="tree"
            node-key="code"
            :default-checked-keys="defaultChecked"
            :default-expand-all="true"
            :check-strictly="true"
            @check-change="change"
            :props="defaultProps">
            </el-tree>
          </div>
        </div>
        <div class="tc" v-if="accessFlag">
          <el-button class="button-bubi-theme center-ie9" size="small" type="info" @click="saveAccess">保存</el-button>
        </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import 'common/css/lib/iconfont.css'
import 'common/css/lib/motherplate.css'
import 'common/sass/main.scss'
import 'common/sass/module/table.scss'
import 'common/sass/module/account.scss'
import modal from 'components/entries/modal'
import layout from 'components/include/layout-l-r'
import arrayTools from 'common/javascript/tools/arrayTools.js'
import accessControl from 'common/javascript/tools/accessControl.js'
import accessControlService from 'common/api/service/accessControlService'
import resourceSort from 'common/config/resource'

export default {
  name: 'app',
  components: {
    modal: modal,
    layout
  },
  data () {
    return {
      title: '设置权限',
      accessFlag: false,
      accessTree: [],
      defaultChecked: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      flag: true
    }
  },
  mounted () {
    this.certId = this.$route.query.id
    this.getAccessByCertId()
  },
  methods: {
    saveAccess () {
      var hashChild = false
      var keys = this.$refs.tree.getCheckedKeys()
      var resource = accessControl.getAllAccess()
      var children = []
      for (var i = 0; i < keys.length; i++) {
        for (var j = 0; j < resource.length; j++) {
          if (parseInt(keys[i]) === resource[j].id && resource[j].children_select === 1) {
            children = accessControl.getChildrenId(parseInt(keys[i]))
            hashChild = false
            for (var k = 0; k < children.length; k++) {
              if (arrayTools.contains(keys, '0' + children[k])) {
                hashChild = true
              }
            }
            if (!hashChild) {
              this.$message.error('请为 ' + resource[j].name + ' 配置子权限')
              return false
            }
          }
        }
      }
      var data = {
        'certId': this.certId,
        'privilegeCodes': keys
      }
      accessControlService.save.remote(data, (res) => {
        if (res.success) {
          this.$message.success('成功')
        } else if (res.error.errorCode) {
          this.$message.error('请设置权限')
        } else {
          this.$message.error(res.error.errorMessage)
        }
      })
    },
    getAccessByCertId () {
      accessControlService.getAccessByCertId.remote({id: this.certId}, (res) => {
        if (res.success) {
          this.accessTree = this.privilegesSort(res.data.privileges)
          this.defaultChecked = res.data.codeChecked
          this.accessFlag = true
        }
      })
    },
    privilegesSort (resourceArr) {
      var topMenu = []
      var newData = []
      var menuSort = resourceSort.menuSort

      for (var i = 0; i < resourceArr.length; i++) {
        if (resourceArr[i].code === '080401') {
          continue
        }
        if (resourceArr[i].parentCode === '0') {
          var obj = {code: null, name: null, parentCode: null, sort: null}
          obj.code = resourceArr[i].code
          obj.name = resourceArr[i].name
          obj.parentCode = resourceArr[i].parentCode
          obj.sort = 0
          topMenu.push(obj)
        } else {
          newData.push(resourceArr[i])
        }
      }
      for (var j = 0; j < topMenu.length; j++) {
        for (i = menuSort.length - 1; i >= 0; i--) {
          if (topMenu[j].code === '0' + menuSort[i].id) {
            topMenu[j].sort = menuSort[i].sort
          }
        }
      }

      var tmpCode = null
      var tmpName = null
      var tmpParentCode = null
      var tmpSort = null

      for (i = 0; i < topMenu.length; i++) {
        for (j = i + 1; j < topMenu.length; j++) {
          if (topMenu[i].code === topMenu[j].code) {
            continue
          }
          if (topMenu[i].sort > topMenu[j].sort) {
            tmpCode = topMenu[j].code
            tmpName = topMenu[j].name
            tmpParentCode = topMenu[j].parentCode
            tmpSort = topMenu[j].sort

            topMenu[j].code = topMenu[i].code
            topMenu[j].name = topMenu[i].name
            topMenu[j].parentCode = topMenu[i].parentCode
            topMenu[j].sort = topMenu[i].sort

            topMenu[i].code = tmpCode
            topMenu[i].name = tmpName
            topMenu[i].parentCode = tmpParentCode
            topMenu[i].sort = tmpSort
          }
        }
      }
      return this.getAccessTree(topMenu.concat(newData), '0')
    },
    getAccessTree (arr, code) {
      var tree = []
      for (var i = 0; i < arr.length; i++) {
        var json = arr[i]
        if (json.parentCode === code) {
          var tmp = {code: json.code, name: json.name, parentCode: json.parentCode}
          tmp.children = this.getAccessTree(arr, json.code)
          tree.push(tmp)
        }
      }
      return tree
    },
    setCheckedKeys (addId, detId) {
      var keys = this.$refs.tree.getCheckedKeys()
      // 往keys添加权限
      for (var i = 0; i < addId.length; i++) {
        if (keys.indexOf(addId[i]) === -1) {
          keys.push(addId[i])
        }
      }
      // 从keys移除权限
      for (var j = 0; j < detId.length; j++) {
        if (arrayTools.contains(keys, detId[j] + '')) {
          arrayTools.remove(keys, detId[j] + '')
        }
      }
      var self = this
      this.$refs.tree.setCheckedKeys(keys)
      setTimeout(function () {
        self.flag = true
      }, 50)
    },
    change (data, checked, indeterminate) {
      if (this.flag) {
        this.flag = false
        var pId = []
        var childId = []
        var addId = []
        var detId = []
        if (checked === true) {
          // 添加权限：父权限+子权限
          pId = accessControl.getParentId(parseInt(data.code))
          childId = accessControl.getChildrenId(parseInt(data.code))
          addId = pId.concat(childId)
        } else {
          // 删除权限：本身+子权限
          detId = accessControl.getChildrenId(parseInt(data.code))
        }
        for (var i = 0; i < addId.length; i++) {
          addId[i] = '0' + addId[i]
        }
        for (i = 0; i < detId.length; i++) {
          detId[i] = '0' + detId[i]
        }
        this.setCheckedKeys(addId, detId)
      }
    }
  }
}
</script>
