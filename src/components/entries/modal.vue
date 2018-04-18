<style>
.slide-fade-enter-active {
  opacity:2;
  transition: opacity 1.6s ease;
}
.slide-fade-leave-active {
  opacity: 0;
  transition: opacity 1.8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
  opacity: 0;
}

</style>

<template>
  <transition name="slide-fade">
  <div  class="modalDialog" v-if="show" >
    <div  class="cash-certificate" :style="{width:width+'px'}">
        <a @click.stop = "mchannel" title="Close" class="close">X</a>
        <div class="title">{{title}}</div>
        <div class="area ">
            <slot>请添加slot内容给组件！</slot>
        </div>

        <div class="group button-bar" style="margin-top:30px;">
            <div class="span3 offset3">
                <div class="button-sm" @click.stop = "mchannel">{{channel}}</div>
            </div>
            <div class="span6">
                <div class="button-sm" @click.stop = "mconfirm">{{confirm}}</div>
            </div>
        </div>
    </div>
</div>
</transition>

</template>

<script>

import 'common/css/lib/iconfont.css'
import 'common/css/lib/motherplate.css'
import 'common/sass/module/index.scss'
export default {
  name: 'modal',
  props: {
    title: {
      type: String,
      'default': ''
    },
    channel: {
      type: String,
      'default': '取消'
    },
    confirm: {
      type: String,
      'default': '确定'
    },
    width: {
      type: Number,
      'default': '675'
    },
    height: {
      type: Number,
      'default': ''
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    mchannel (event) {
      this.show = false
      this.$emit('on-channel', event)
    },
    mconfirm (event) {
      this.$emit('on-confirm', event)
      this.show = false
    }
  }
}

</script>
