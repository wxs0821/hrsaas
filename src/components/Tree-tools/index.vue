<template>
  <el-row type="flex" justify="space-between" align="middle" class="rowStyle">
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>
          <span style="margin-right: 30px">{{ treeNode.manager }} </span>
        </el-col>
        <el-col>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="delete">删除子部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>

      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'TreeTools',
  props: {
    treeNode: {
      type: Object,
      default: () => {}
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCommand(command) {
      // switch (command) {
      //   case 'add':
      //     this.$emit('add-dept', this.treeNode.id)
      //     break
      //   case 'edit':
      //     this.$emit('edit-dept', this.treeNode.id)
      //     break
      //   case 'del':
      //     this.$emit('del-dept', this.treeNode.id)
      //     break
      // }
      this.$emit(`${command}-dept`, this.treeNode.id)
    }
  }
}
</script>

<style lang='scss' scoped>
.rowStyle{
    width:100%;
    margin: 30px 0;
}

</style>
