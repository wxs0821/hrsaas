<template>
  <el-dialog title="分配权限" :visible="isShowAllotDialog" @close="onClose">
    <el-tree
      ref="treeRef"
      :data="allotList"
      show-checkbox
      node-key="id"
      :check-strictly="true"
      default-expand-all
      :props="defaultProps"
    />
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="onSubmit">确定</el-button>
        <el-button size="small" @click="onClose">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getPermissionList } from '@/api/permisson'
import { list2tree } from '@/utils/index'
import { getRoleDetail, assignPerm } from '@/api/role'

export default {
  name: 'AllotDialog',
  props: {
    isShowAllotDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      allotList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      Roleid: ''
    }
  },
  mounted() {
    this.getPermList()
  },
  methods: {
    async getPermList() {
      const res = await getPermissionList()
      this.allotList = list2tree(res, '0')
    },
    async getRoleDetailByid(id) {
      this.Roleid = id
      const { permIds } = await getRoleDetail(id)
      //   console.log(permIds)
      this.$refs.treeRef.setCheckedKeys(permIds)
    },
    onClose() {
      this.$emit('update:isShowAllotDialog', false)
    },
    async onSubmit() {
      const inputParmas = {
        id: this.Roleid,
        permIds: this.$refs.treeRef.getCheckedKeys()
      }
      try {
        await assignPerm(inputParmas)
        this.onClose()
        this.$message.success('分配权限成功')
      } catch (error) {
        this.$message.error('分配权限失败')
      }
    }
  }
}
</script>

<style>

</style>
