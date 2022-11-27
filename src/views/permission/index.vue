<template>
  <div>
    <PageTools :is-show-left="false">
      <template #right>
        <el-button type="primary" size="small" @click="addbtn(1,'0')"><i class="el-icon-plus" />新增员工</el-button>
      </template>
    </PageTools>
    <el-card class="cardmagin">
      <el-table :data="PermissionList" border stripe row-key="id" default-expand-all="true">
        <el-table-column label="名称" prop="name" />
        <el-table-column align="center" label="标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="center" label="操作" width="280px">
          <template v-slot="{row}">
            <el-button size="mini" type="primary" @click="addbtn(2,row.id)">添加</el-button>
            <el-button size="mini" type="success" @click="editbtn(row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="delbtn(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <PermDialog :id="id" ref="PermDialogRef" :is-show-dialog.sync="isShowDialog" :type="type" @getLoad="getLoadList" />
  </div>
</template>

<script>
import { getPermissionList, delPermission } from '@/api/permisson'
import { list2tree } from '@/utils/index'
import PermDialog from './compontents/perm-dialog.vue'
export default {
  name: 'PermissionPage',
  components: {
    PermDialog
  },
  data() {
    return {
      isShowDialog: false,
      PermissionList: [],
      type: 0,
      id: ''
    }
  },
  mounted() {
    this.getPermissionList()
  },
  methods: {
    async  getPermissionList() {
      const list = await getPermissionList()
      this.PermissionList = list2tree(list, '0')
    },
    addbtn(type, id) {
      this.isShowDialog = true
      this.type = type
      this.id = id
    },
    getLoadList() {
      this.type = 0
      this.id = ''
      this.getPermissionList()
    },
    async delbtn(id) {
      const res = confirm('确定删除吗？')
      if (res) {
        try {
          await delPermission(id)
          this.getPermissionList()
          this.$message.success('删除成功')
        } catch (error) {
          this.$message.danger('删除失败')
        }
      }
    },
    async editbtn(id) {
      await this.$refs.PermDialogRef.getDetail(id)
      this.isShowDialog = true
    }
  }

}
</script>

<style scoped lang='scss'>
.cardmagin{
  margin: 20px;
}
</style>
