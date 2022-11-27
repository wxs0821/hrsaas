<template>
  <el-dialog
    :title="`${title}子部门`"
    :visible.sync="dialogVisible"
    width="40%"
    :before-close="onClose"
  >
    <el-form ref="deptFormRef" :model="deptForm" :rules="deptFormRules" label-width="80px">
      <el-form-item prop="name" label="部门名称">
        <el-input v-model="deptForm.name" style="width:100%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item prop="code" label="部门编码">
        <el-input v-model="deptForm.code" style="width:100%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item prop="manager" label="部门负责人">
        <el-select v-model="deptForm.manager" style="width:100%" placeholder="请选择" @focus="onFocus">
          <el-option v-for="item in simpleList" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item prop="introduce" label="部门介绍">
        <el-input v-model="deptForm.introduce" style="width:100%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="info" size="small" @click="onClose">取 消</el-button>
      <el-button type="primary" size="small" @click="onSubmit">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { getSimpleList, getDepartments, addDepartments, getDepartDetail, updateDepartments } from '@/api/departments'
export default {
  props: {
    dialogVisible: Boolean,
    deptId: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    const checkDeptName = async(rule, value, cb) => {
      const { depts } = await getDepartments()
      let isRepeat
      if (this.deptForm.id) {
        isRepeat = depts.filter(dept => this.deptForm.pid === dept.pid && this.deptForm.id !== dept.id).some(item => item.name === value)
      } else {
        isRepeat = depts.filter(dept => this.deptId === dept.pid).some(item => item.name === value)
      }

      isRepeat ? cb(new Error(`同级下已存在${value}部门`)) : cb()
    }
    const checkDeptCode = async(rule, value, cb) => {
      const { depts } = await getDepartments()
      let isRepeat
      if (this.deptForm.id) {
        isRepeat = depts.filter(dept => dept.id !== this.deptForm.id).some(item => item.code === value)
      } else {
        isRepeat = depts.some(item => item.code === value)
      }
      isRepeat ? cb(new Error(`已存在${value}编码`)) : cb()
    }
    return {
      simpleList: [],
      deptForm: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '', // 部门介绍
        pid: ''
      },
      deptFormRules: {
        name: [
          {
            required: true, message: '部门名称不能为空', trigger: 'blur'
          },
          {
            min: 3, max: 10, message: '在3-10个字符之间', trigger: 'blur'
          },
          {
            validator: checkDeptName, trigger: 'blur'
          }
        ],
        code: [
          {
            required: true, message: '部门名称不能为空', trigger: 'blur'
          },
          {
            min: 3, max: 10, message: '在3-10个字符之间', trigger: 'blur'
          },
          {
            validator: checkDeptCode, trigger: 'blur'
          }
        ],
        manager: [
          {
            required: true, message: '部门负责人不能为空', trigger: 'blur'
          },
          {
            min: 1, max: 10, message: '在1-10个字符之间', trigger: 'blur'
          }
        ],
        introduce: [
          {
            required: true, message: '部门介绍不能为空', trigger: 'blur'
          },
          {
            min: 1, max: 100, message: '在1-100个字符之间', trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    title() {
      return this.deptForm.id ? '编辑' : '添加'
    }
  },
  methods: {
    async onFocus() {
      this.simpleList = await getSimpleList()
    },
    async onSubmit() {
      try {
        if (this.deptForm.id) {
          await this.$refs.deptFormRef.validate()
          await updateDepartments(this.deptForm)
        } else {
          await this.$refs.deptFormRef.validate()
          this.deptForm.pid = this.deptId
          await addDepartments(this.deptForm)
        }
      } catch (error) {
        console.log('验证不通过')
      }
      this.$message.success(`${this.deptForm.id ? '修改' : '添加'}表单成功`)
      this.onClose()
      this.$emit('updateDepartments')
    },
    async deptDailog(id) {
      this.deptForm = await getDepartDetail(id)
      // console.log(getDepartDetail(id))
    },
    onClose() {
      this.deptForm = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '', // 部门介绍
        pid: ''
      }
      this.$refs.deptFormRef.resetFields()
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style>

</style>
