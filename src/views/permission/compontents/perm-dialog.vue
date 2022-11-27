<template>
  <el-dialog :visible="isShowDialog" :title="formData.id?'编辑权限':'添加权限'" @close="onClose">

    <el-form ref="formDataRef" :model="formData" :rules="formDataRules" label-width="120px">
      <el-form-item label="权限名称" prop="name">
        <el-input v-model="formData.name" style="width:90%" />
      </el-form-item>
      <el-form-item label="权限标识" prop="code">
        <el-input v-model="formData.code" style="width:90%" />
      </el-form-item>
      <el-form-item label="权限描述">
        <el-input v-model="formData.description" style="width:90%" />
      </el-form-item>
      <el-form-item label="开启">
        <el-switch
          v-model="formData.enVisible"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" type="primary" @click="onSubmit">确定</el-button>
        <el-button size="small" @click="onClose">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { addPermission, getPermissionDetail, updatePermission } from '@/api/permisson'
export default {
  name: 'PermDialog',
  props: {
    isShowDialog: {
      type: Boolean,
      default: false
    },
    type: {
      type: Number,
      default: 1
    },
    id: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      formData: {
        name: '',
        code: '',
        description: '',
        enVisible: '',
        type: '',
        pid: ''
      },
      formDataRules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    onClose() {
      this.formData = {
        name: '',
        code: '',
        description: '',
        enVisible: '',
        type: '',
        pid: ''
      }
      this.$refs.formDataRef.resetFields()
      this.$emit('update:isShowDialog', false)
    },
    async onSubmit() {
      await this.$refs.formDataRef.validate()
      try {
        if (this.formData.id) {
          await updatePermission(this.formData)
          this.$message.success('修改权限成功')
        } else {
          this.formData.type = this.type
          this.formData.pid = this.id
          await addPermission(this.formData)
          this.$message.success('添加权限成功')
        }
        this.onClose()
        this.$emit('getLoad')
      } catch (error) {
        if (!error) {
          console.log('验证表单失败')
        }
      }
    },
    async getDetail(id) {
      this.formData = await getPermissionDetail(id)
    }
  }
}
</script>

<style>

</style>
