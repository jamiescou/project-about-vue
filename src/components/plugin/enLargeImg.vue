<!-- 功能：图片预览 cl -->
<template>
  <div>
    <div class="largeContainer">
      <div class="box-image-wrapper fl">
        <img :src="data" :class="{rotate90:rotate==1,rotate180:rotate==2,rotate270:rotate==3,rotate0:rotate==0,bigImg:true}" @click="enSmallImg"><br>
        <div style="width: 100px;margin: 0 auto">
          <img src="../../common/image/left.png" class='circle' @click="rotateImg">
          <img src="../../common/image/right.png" class='circle' style="margin-left:40px" @click="rotateImgBack">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'enLargeImg',
  data () {
    return {
      rotate: 0
    }
  },
  props: {
    data: ''
  },
  mounted () {
  },
  methods: {
    rotateImg () {
      if (this.rotate === 0) {
        this.rotate = 1
      } else if (this.rotate === 1) {
        this.rotate = 2
      } else if (this.rotate === 2) {
        this.rotate = 3
      } else {
        this.rotate = 0
      }
    },
    rotateImgBack () {
      if (this.rotate === 0) {
        this.rotate = 3
      } else if (this.rotate === 1) {
        this.rotate = 0
      } else if (this.rotate === 2) {
        this.rotate = 1
      } else {
        this.rotate = 2
      }
    },
    enSmallImg () {
      this.$emit('imgClose')
      this.rotate = 0
    }
  }
}
</script>

<style scoped lang='scss'>
.largeContainer{
    top: 0;
    right: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(55,55,55,0.9);
    z-index: 22;
    box-sizing: border-box;
}
.box-image-wrapper{
    top: 0;
    position: fixed;
    width: 100%;
    height: 90%;
    z-index: 33;
    text-align: center;
}
.smallImg{
  height:80px;
  width:80px;
  float:left;
  margin-left: 20px;
  cursor: pointer;
}
.sideClick{
  height:100%;
  width:6%;
  cursor: pointer;
  div{
    position:absolute;
    z-index:44;
    background-color: rgba(40,40,40,0.8);
    height:100%;
    width: 6%;
  }
}
.sideClickFade{
  height:100%;
  width:6%;
  cursor: pointer;
  div{
    position:absolute;
    z-index:44;
    background-color: rgba(40,40,40,0);
    height:100%;
    width: 6%;
  }
}
.clickArrow{
  height:100px;
  width:50%;
  margin-left: 25%;
  margin-top: 350px;
}
.clickArrowFade{
  display: none;
}
.rotate0{
  transform: rotate(0deg);
}
.rotate90{
  transform: rotate(90deg);
}
.rotate180{
  transform: rotate(180deg);
}
.rotate270{
  transform: rotate(270deg);
}
.fr{
  float: right;
}
.fl{
  float:left;
}
.circle {
  position:absolute;
  z-index:55;
  width: 30px;
  height: 30px;
  margin-top:10px;
  cursor: pointer;
  background: rgba(55, 55, 55, 0.1)
}
.bigImg {
  height:100%;
  width: 80%\9;
  margin:0 auto;
  cursor: pointer;
}
</style>
