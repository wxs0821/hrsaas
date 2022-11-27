<template>
  <div>
    <el-card>
      <el-row type="flex" align="middle">
        <el-col v-if="isShowLeft" :span="12">
          <i class="el-icon-info" />
          <slot name="left" />
        </el-col>
        <el-col :span="isShowLeft?12:24">
          <el-row type="flex" justify="end">
            <slot name="right" />
          </el-row>

        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'PageTools',
  props: {
    isShowLeft: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang='scss' scoped>
.el-card{
    margin: 20px;
}
</style>
