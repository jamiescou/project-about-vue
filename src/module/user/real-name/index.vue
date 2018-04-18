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
    <div class="content-body info-manage pt20 pr20 pb40 pl20">
        <div class="item-group">
            <div class="item-tit"><span class="item-tit-icon"></span>机构/企业信息</div>
            <div class="item-cnt">
              <table class="table-lr">
                <tbody>
                  <tr>
                      <td class="l" width="25%">认证时间</td>
                      <td class="r" width="25%">{{realName.cT | timestampToDate}}</td>
                      <td class="l" width="25%">机构全称</td>
                      <td class="r" width="25%">{{realName.name}}</td>
                  </tr>
                  <tr>
                      <td class="l" width="25%">机构类型</td>
                      <td class="r" width="25%">{{realName.type}}</td>
                      <td class="l" width="25%">社会统一信用代码</td>
                      <td class="r" width="25%">{{realName.code}}</td>
                  </tr>
                  <tr>
                      <td class="l" width="25%">税务登记号</td>
                      <td class="r" width="25%">{{realName.taxCode}}</td>
                      <td class="l" width="25%">法定代表人</td>
                      <td class="r" width="25%">{{realName.corpName}}</td>
                  </tr>
                  <tr>
                      <td class="l" width="25%">法定代表人证件类型</td>
                      <td class="r" width="25%">{{realName.corpCardType}}</td>
                      <td class="l" width="25%">法定代表人证件号码</td>
                      <td class="r" width="25%">{{realName.detail.corpCardId}}</td>
                  </tr>
                  <tr>
                      <td class="l" width="25%">证件到期日</td>
                      <td class="r" width="25%">{{realName.detail.corpCardDate | timestampToDay}}</td>
                      <td class="l" width="25%">所在城市</td>
                      <td class="r" width="25%">{{realName.city}}</td>
                  </tr>
                  <tr>
                      <td class="l" width="25%">注册地址</td>
                      <td class="r" width="25%">{{realName.detail.address}}</td>
                      <td class="l" width="25%"></td>
                      <td class="r" width="25%"></td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
        <div class="item-group">
            <div class="item-tit"><span class="item-tit-icon"></span>其他信息材料</div>
            <div class="item-cnt">
              <table class="table-lr">
                <tbody>
                  <tr>
                      <td class="l" width="25%">联系人姓名</td>
                      <td class="r" width="25%">{{realName.detail.linkmanName}}</td>
                      <td class="l" width="25%">联系人手机号</td>
                      <td class="r" width="25%">{{realName.detail.linkmanPhone}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
        <div class="item-group">
            <div class="item-tit"><span class="item-tit-icon"></span>材料</div>
            <div class="item-cnt">
                <el-row>
                  <el-col v-for='item in realName.files' :span="6" :key="item.id">
                    <div class="image-content">
                      <span class="title" >{{types[item.fileType]}}</span>
                      <div class='imgContainer'>
                        <img alt="" :src="'/service/file/image/download/' + item.fileId">
                        <div class="imgPreview" @click.stop='imgPreview("/service/file/image/download/" + item.fileId)'>
                          预览
                        </div>
                      </div>
                    </div>
                  </el-col>
                  <el-col v-if='realName.companyReportFileId' :span="6">
                    <div class="image-content">
                      <span class="title" >{{types[3]}}</span>
                      <div class='imgContainer'>
                        <img alt="" :src="'/service/file/image/download/' + realName.companyReportFileId">
                        <div class="imgPreview" @click.stop='imgPreview("/service/file/image/download/" + realName.companyReportFileId)'>
                          预览
                        </div>
                      </div>
                    </div>
                  </el-col>
                  <!-- 图片预览 cl-->
                  <component :is="enLargeImg" :data="files" v-if='imgShow' @imgClose='imgShow=false'></component>
                </el-row>
            </div>
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
import infoManageService from 'common/api/service/infoManageService'
import type from 'common/config/type'
import region from 'common/config/region'
import 'common/sass/module/member.scss'

export default {
  name: 'app',
  components: {
    modal: modal,
    layout: layout,
    type: type,
    region: region
  },
  data () {
    return {
      title: '实名认证信息',
      enLargeImg: null,
      types: {
        0: '企业营业执照',
        1: '法人身份证',
        2: '委托人身份证',
        3: '评级报告'
      },
      realName: {
        cT: '',
        name: '',
        code: '',
        type: '',
        taxCode: '',
        corpName: '',
        corpCardType: '',
        detail: {
          corpCardId: '',
          address: '',
          corpCardDate: '',
          city: ''
        },
        files: []
      },
      // 图片预览数据
      imgShow: false,
      files: {}
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // 实名信息
      var param = {}
      infoManageService.getRealName.remote(param, (data) => {
        this.realName = data.data
        let codes = this.realName.certificateList
        for (let i = 0; i < codes.length; i++) {
          if (parseInt(codes[i].type) === 0) {
            this.realName.code = codes[i].code
            this.realName.busy = codes[i].fileId
          } else if (parseInt(codes[i].type) === 1) {
            this.realName.taxCode = codes[i].code
          }
        }
        this.realName.corpName = this.realName.detail.corpName
        this.realName.type = type.institutionType[this.realName.detail.type].label
        this.realName.corpCardType = type.corpIDType[this.realName.detail.corpCardType].label
        this.realName.city = this.realName.detail.city ? region.city[this.realName.detail.city - 1].name : ''
        this.realName.files = [{
          fileType: 0,
          fileId: this.realName.busy
        },
        {
          fileType: 1,
          fileId: this.realName.detail.corpCardFileId
        },
        {
          fileType: 2,
          fileId: this.realName.detail.clientCardFileId
        }]
      })
      this.getPath()
    },
    getPath () {
      const files = this.realName.files
      if (files) {
        files.forEach((info) => {
        })
      }
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
}
</script>

<style scoped>
.imgContainer, .imgPreview {
  width: 150px;
  text-align: center;
}
.imgContainer > img {
  max-height: 130px\9;
}
</style>
