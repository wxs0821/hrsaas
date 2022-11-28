<template>
  <el-dialog title="新增员工" :visible="value" width="35%" @close="onClose">
    <el-form ref="employeeFormRef" label-width="80px" :model="employeeForm" :rules="employeeFormRules">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="employeeForm.username" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="employeeForm.mobile" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="employeeForm.timeOfEntry" type="date" placeholder="请选择日期" class="inputWidth" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="employeeForm.formOfEmployment" class="inputWidth">
          <el-option v-for="item in hireType" :key="item.id" :value="item.id" :label="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="employeeForm.workNumber" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-cascader
          v-model="employeeForm.departmentName"
          :options="depts"
          :props="{label:'name',value: 'name',checkStrictly: true}"
          class="inputWidth"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="employeeForm.correctionTime" type="date" placeholder="请选择日期" class="inputWidth" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="onClose">取消</el-button>
          <el-button type="primary" size="small" @click="onSubmit">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import HireType from '@/api/constant/employees'
import { list2tree } from '@/utils/index'
import { getDepartments } from '@/api/departments'
import { addEmployee } from '@/api/employees'

export default {
  name: 'EmployeeDialog',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hireType: HireType.hireType,
      employeeForm: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      depts: [],
      employeeFormRules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' }, {
            min: 1, max: 6, message: '用户姓名为1-6位'
          }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' }, {
            pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
          }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '入职时间', trigger: 'blur' }
        ],
        correctionTime: [
          { required: true, message: '转正时间', trigger: 'blur' }
        ]
      }

    }
  },
  mounted() {
    this.loadDepts()
  },
  methods: {
    onClose() {
      this.$refs.employeeFormRef.resetFields()
      this.$emit('input', false)
    },
    async loadDepts() {
      const res = await getDepartments()
      this.depts = list2tree(res.depts, '')
    //   console.log(this.depts)
    },
    handleChange(value) {
      this.employeeForm.departmentName = value[value.length - 1]
    },
    async onSubmit() {
      try {
        await this.$refs.employeeFormRef.validate()
        await addEmployee(this.employeeForm)
        this.$message.success('添加员工成功')
        this.onClose()
        this.$emit('update-list')
      } catch (error) {
        console.log('表单验证错误')
      }
    }
  }

}
</script>

<style lang='scss' scoped>
.inputWidth{
    width: 100%;
}
</style>
