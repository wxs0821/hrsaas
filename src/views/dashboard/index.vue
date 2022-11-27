<template>
  <div class="dashboard-container">
    <PageTools is-show-left>
      <template #left>
        有100条数据
      </template>
      <template #right>
        <el-button type="primary">按钮</el-button>
      </template>
    </PageTools>

    <ImageUpload />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import PageTools from '@/components/PageTools'
import mixin from '@/mixin'
export default {
  name: 'Dashboard',
  components: {
    // PageTools
  },
  mixins: [mixin],
  data() {
    return {
    }
  },
  mounted() {
    // this.sayHello()
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container{
  margin: 20px;
}
</style>
