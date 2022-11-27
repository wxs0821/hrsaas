<template>
  <el-dialog title="添加角色" width="40%" :visible="isShowAllot" @close="onClose">
    <el-checkbox-group v-model="checkList" v-loading="isLoading">
      <el-checkbox v-for="item in RoleAllotList" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <el-row type="flex" justify="center">
        <el-button size="small" type="info">取消</el-button>
        <el-button size="small" type="primary" @click="onSubmit">确定</el-button>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getRoleAllot, addRloeAllot } from '@/api/role'
import { getUserDetailById } from '@/api/user'
export default {
  name: 'RoleDialog',
  props: {
    isShowAllot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isLoading: false,
      RoleId: '',
      checkList: [],
      RoleAllotList: []
    }
  },
  mounted() {
    this.getRoleAllot()
    this.isLoading = true
  },
  methods: {
    async getRoleAllot() {
      const { rows } = await getRoleAllot()
      // console.log(rows)
      this.RoleAllotList = rows
      this.isLoading = false
    },
    async onSubmit() {
      try {
        await addRloeAllot({ id: this.RoleId, roleIds: this.checkList })
        this.$message.success('分配角色成功')
        this.onClose()
      } catch (error) {
        console.log('提交角色权限失败')
      }
    },
    onClose() {
      this.$emit('update:isShowAllot', false)
      this.checkList = []
    },
    async getRoleAllotId(id) {
      this.RoleId = id
      const { roleIds } = await getUserDetailById(id)
      this.checkList = roleIds || []
    }
  }
}
</script>

<style>

</style>
