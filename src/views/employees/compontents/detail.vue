<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户管理" name="first">
          <el-form ref="fromDataRef" :model="fromData" label-width="90px" :rules="fromDataRules">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="fromData.username" />
            </el-form-item>
            <el-form-item label="密码" prop="psd">
              <el-input v-model="fromData.psd" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="saveUserInfo">更新</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="个人详情" name="second">
          <component :is="userComponent" />
        </el-tab-pane>
        <el-tab-pane label="岗位信息" name="three" >
          <component :is="JobInfo" />

        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getUserDetailById, saveUserDetailById } from '@/api/user'
import userComponent from './user-info.vue'
import JobInfo from './job-info.vue'
export default {
  name: 'EmployeeDetail',
  components: {
    userComponent,
    JobInfo
  },
  props: {
    userId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      userComponent,
      JobInfo,
      activeName: 'first',
      fromData: {},
      fromDataRules: {
        username: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        psd: [{ required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 2, max: 9, message: '密码长度6-9位', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.loadDetail()
  },
  methods: {
    async loadDetail() {
      this.fromData = await getUserDetailById(this.userId)
    },
    async saveUserInfo() {
      try {
        await this.$refs.fromDataRef.validate()
        const newRes = Object.assign({}, this.fromData, { password: this.fromData.psd })
        // { ...this.userInfo, password: this.userInfo.password2 }
        saveUserDetailById(newRes)
        this.$message.success('修改用户信息成功')
      } catch (error) {
        console.log('表单验证失败')
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.el-card{
    margin: 20px;
}

</style>
