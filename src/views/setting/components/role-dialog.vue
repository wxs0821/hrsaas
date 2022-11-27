<template>
  <div>
    <el-dialog :title="`${getTitle()}角色`" :visible="isVisible" @close="onClose">
      <el-form ref="roleFormRef" :model="roleForm" :rules="roleFormRules" label-width="130px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="onClose">取消</el-button>
        <el-button type="success" @click="onConfirm">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { addRole, getRoleDetail, updateRole } from '@/api/role'
export default {
  name: 'RoleDialog',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roleForm: {
        name: '',
        description: ''
      },
      roleFormRules: {
        name: [
          { required: true, message: '角色名称为必填项', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onClose() {
      this.roleForm = {
        name: '',
        description: ''
      }
      this.$refs.roleFormRef.resetFields()
      this.$emit('update:isVisible', false)
    },
    async onConfirm() {
      try {
        await this.$refs.roleFormRef.validate()
        if (this.roleForm.id) {
          await updateRole(this.roleForm)
        } else {
          await addRole(this.roleForm)
        }
        this.$message.success(`${this.roleForm.id ? '编辑' : '添加'}角色成功`)
        this.onClose()
        this.$emit('updateList')
      } catch (error) {
        console.log('验证未通过')
      }
    },
    async getRole(id) {
      this.roleForm = await getRoleDetail(id)
    },
    getTitle() {
      return this.roleForm.id ? '编辑' : '添加'
    }
  }
}
</script>

<style>

</style>
