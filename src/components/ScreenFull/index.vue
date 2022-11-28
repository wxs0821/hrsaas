<template>
  <svg-icon icon-class="fullscreen" style="color:#fff; width: 20px; height: 20px" @click="changeScreen" />
</template>

<script>
import ScreenFull from 'screenfull'
export default {
  name: 'ScreenFull',
  methods: {
    //   改变全屏
    changeScreen() {
      if (!ScreenFull.isEnabled) {
        // 此时全屏不可用
        this.$message.warning('此时全屏组件不可用')
        return
      }
      // document.documentElement.requestFullscreen()  原生js调用
      //   如果可用 就可以全屏
      ScreenFull.request()
    }
  }
}
</script>

<style scoped lang='scss'>
.svg-icon {
    color:#fff ;
    width: 20px;
    height: 20px;
    margin-right: 30px;
}
</style>
