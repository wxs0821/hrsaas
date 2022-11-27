<template>
  <div class="app-container">
    <el-card class="box-card">

      <tree-tools :tree-node="company" is-root @add-dept="addDept" />

      <hr>
      <el-row>
        <el-tree v-loading="loading" :data="departs" :props="defaultProps" default-expand-all>
          <template v-slot="{data}">

            <tree-tools :tree-node="data" @delete-dept="onDelDept" @add-dept="addDept" @edit-dept="editDept" />

          </template>
        </el-tree>
      </el-row>
    </el-card>
    <deptDialog ref="deptDailogRef" :dialog-visible.sync="dialogVisible" :dept-id="deptId" @updateDepartments="updatedepartments" />
  </div>
</template>

<script>
import TreeTools from '@/components/Tree-tools'
import { getDepartments, delDepartments } from '@/api/departments'
import { list2tree } from '@/utils/index'
import deptDialog from './components/dept-dialog.vue'
export default {
  name: 'DepartMents',
  components: {
    TreeTools,
    deptDialog
  },
  data() {
    return {
      loading: true,
      deptId: '',
      dialogVisible: false,
      company: { name: '', manager: '负责人' },
      departs: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted() {
    this.lodDeptsList()
  },
  methods: {
    async  lodDeptsList() {
      const res = await getDepartments()
      this.company.name = res.companyName
      this.departs = list2tree(res.depts, '')
      this.loading = false
    },
    async onDelDept(id) {
      try {
        const res = await this.$confirm('您确定要删除吗？')
        if (res === 'confirm') {
          await delDepartments(id)
          this.lodDeptsList()
        }
      } catch (error) {
        console.log('出错了')
      }
    },
    addDept(deptId) {
      this.dialogVisible = true
      this.deptId = deptId
    },
    async editDept(id) {
      await this.$refs.deptDailogRef.deptDailog(id)
      this.dialogVisible = true
    },
    updatedepartments() {
      this.lodDeptsList()
    }
  }
}
</script>

<style lang='scss' scoped>
.app-container{
  .box-card{
    padding: 40px;
  }
  .el-dropdown-selfdefine{
    font-size: 17px;
}

}

</style>
