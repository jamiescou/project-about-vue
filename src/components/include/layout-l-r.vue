
<template>
  <el-row class="content-m" style="height:100%;">

    <!-- top start-->
    <el-col :span="24" style="height:100%;">

      <el-row  class='register' style="">
        <!-- left start-->
        <el-col :span="4" class = 'left-content'  ref="left" v-bind:style="{  height: height + 'px' }">
          <slot name="left" ></slot>
        </el-col>
        <!-- left end-->
        <!-- right start-->
        <el-col :span="20"   ref="right">
          <el-row>
            <el-col :span="24">
              <slot name="header"></slot>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <slot name="nav"></slot>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <slot name="body"></slot>
            </el-col>
          </el-row>
        </el-col>
        <!-- right end-->
      </el-row>
      <!--top end -->

      <!-- footer start-->
      <el-row  style="bottom:0px;height:36px;width:100%;">
        <el-col :span="24">
          <slot name="footer"></slot>
        </el-col>
      </el-row>
      <!-- footer start-->
    </el-col>

  </el-row>
</template>

<script type="text/javascript">
import Vue from 'vue'
import {
  Row,
  Col
} from 'element-ui'
Vue.use(Row)
Vue.use(Col)

const footHeight = 36
export default {
  name: 'app',
  props: {
    title: {
      type: String,
      'default': '布盟科技'
    }
  },
  data () {
    return {
      toupdate: true,
      height: document.body.scrollHeight - footHeight
    }
  },
  mounted () {
    // 关于页面缩放的触发时间
    const that = this
    let right = this.$refs.right.$el
    let left = this.$refs.left.$children[0].$el
    this.$bus.$on('left-resize', () => {
      let rightHeight = right.getBoundingClientRect().height
      let leftHeight = left.getBoundingClientRect().height
      let height = rightHeight > leftHeight ? rightHeight : leftHeight
      let scrollHeight = document.body.clientHeight - footHeight
      height = scrollHeight >= height ? scrollHeight : height
      if (height !== that.height) {
        that.height = height
      }
    })

    window.onresize = function () {
      let right = that.$refs.right.$el
      let left = that.$refs.left.$children[0].$el
      let rightHeight = right.getBoundingClientRect().height
      let leftHeight = left.getBoundingClientRect().height
      let height = rightHeight > leftHeight ? rightHeight : leftHeight
      let scrollHeight = document.body.clientHeight - footHeight
      height = scrollHeight >= height ? scrollHeight : height
      if (height !== that.height) {
        that.height = height
      }
    }
  },

  updated () {
    const that = this
    let right = that.$refs.right.$el
    let left = that.$refs.left.$children[0].$el
    let rightHeight = right.getBoundingClientRect().height
    let leftHeight = left.getBoundingClientRect().height
    let height = rightHeight > leftHeight ? rightHeight : leftHeight
    let scrollHeight = document.body.clientHeight - footHeight
    height = scrollHeight >= height ? scrollHeight : height
    if (height !== that.height) {
      that.height = height
    }
  },
  methods: {
  },
  watch: {
    height (val) {
      // 优化页面拖拽过快 页面卡顿
      if (!this.timer) {
        this.height = val
        this.timer = true
        let that = this
        setTimeout(function () {
          that.timer = false
        }, 400)
      }
    }
  }

}
</script>
