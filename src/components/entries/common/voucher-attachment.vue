<template><!-- 贸易信息 -->
    <div class="tradeinfo">
        <div v-show="files.length != 0" style="width:100%">
            <p><span class="require">*</span><span>凭证相关的贸易信息可点击下面的文件链接进行下载。</span></p>
            <table class="table-lr table-th-block table-data mb40">
                <tbody>
                    <tr>
                        <td width="25%" class="l">合同信息</td>
                        <td width="75%" class="r">
                          <ul class="contract-group">
                            <li class="clearfix contract-item">
                              <label class="fl">基础合同编号：</label>
                              <span class="fl">{{contract.no}}</span>
                            </li>
                            <li class="clearfix contract-item">
                              <label class="fl">交易商品：</label>
                              <span class="fl">{{contract.goodsInfo}}</span>
                            </li>
                            <li class="clearfix contract-item">
                              <label class="fl">合同附件：</label>
                              <span class="fl">
                                <div class="file-item" v-for="item in files" v-show='item.type === 0'>
                                  <a :href="item.downUrl">{{item.name}}</a>
                                </div>
                              </span>
                            </li>
                          </ul>
                        </td>
                    </tr>
                    <tr>
                        <td width="25%" class="l">发票信息</td>
                        <td width="75%" class="r">
                            <div class="file-item" v-for="item in files" v-show='item.type === 1'><a :href="item.downUrl">{{item.name}}</a></div>
                        </td>
                    </tr>
                    <tr>
                        <td width="25%" class="l">其他信息</td>
                        <td width="75%" class="r">
                            <div class="file-item" v-for="item in files" v-show='item.type === 2'><a :href="item.downUrl">{{item.name}}</a></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p class="c999 mt30 ml30" style="width:100%; text-align:center" v-show="files.length == 0">该凭证未上传贸易信息</p>
    </div>
</template>

<script type="text/javascript">
export default {
  name: 'voucher-attachment',
  props: {
    voucher: null
  },
  data () {
    return {
      contract: {
        no: null,
        goodsInfo: null
      },
      files: []
    }
  },
  mounted () {
    const self = this
    self.files = this.voucher.files
    for (var i = 0; i < self.files.length; i++) {
      if (self.files[i].detail.name) {
        self.contract.no = self.files[i].detail.name
        self.contract.goodsInfo = self.files[i].detail.content
      }
    }
  }
}

</script>
