<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="clickcompany">
      <el-tab-pane label="角色管理" name="role">
        <el-button type="success" icon="el-icon-plus" size="middle" @click="isVisible=true">添加角色</el-button>
        <el-table
          :data="roleList"
          stripe
          border
          style="width: 100%"
        >
          <el-table-column
            label="序号"
            width="80"
            type="index"
          />
          <el-table-column
            prop="name"
            label="角色"
            width="180px"
          />
          <el-table-column
            prop="description"
            label="描述"
          />
          <el-table-column
            label="操作"
            width="290px"
          >
            <!-- <template slot-scope="scope"> -->
            <template v-slot="{row}">
              <el-button type="success" size="small" @click="getAllot(row.id)">分配权限</el-button>
              <el-button type="primary" size="small" @click="onEditRole(row.id)">编辑</el-button>
              <el-button type="danger" size="small" @click="onRelRole(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          :current-page="pageinfo.page"
          :page-sizes="[2, 5, 7, 10]"
          :page-size="pageinfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-tab-pane>

      <el-tab-pane label="公司信息" name="company">
        <el-alert
          title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
          type="info"
          :closable="false"
          show-icon
        />
        <el-form ref="form" label-width="80px">
          <el-form-item label="公司名称">
            <el-input v-model="companyInfo.name" disabled />
          </el-form-item>
          <el-form-item label="公司地址">
            <el-input v-model="companyInfo.companyAddress" disabled />
          </el-form-item>
          <el-form-item label="公司邮箱">
            <el-input v-model="companyInfo.mailbox" disabled />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="companyInfo.remarks" disabled type="textarea" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <RoleDialog ref="roleDialogRef" :is-visible.sync="isVisible" @updateList="UpdateList" />
    <AllotDialog ref="AllotDialogRef" :is-show-allot-dialog.sync="isShowAllotDialog" />
  </div>
</template>

<script>
import { getRoleList, getCompanyInfo, deleteRole } from '@/api/role'
import { mapGetters } from 'vuex'
import RoleDialog from './components/role-dialog.vue'
import AllotDialog from './components/allot-dialog.vue'

export default {
  name: 'SettingName',
  components: {
    RoleDialog,
    AllotDialog
  },
  data() {
    return {
      isShowAllotDialog: false,
      isVisible: false,
      pageinfo: {
        page: 1, // 当前显示第几页，默认第 1 页
        pagesize: 2 // 当前每页显示多少条，默认每页显示 2 条
      },
      total: 10,
      roleList: [],
      companyInfo: {},
      activeName: 'role'
    }
  },
  mounted() {
    this.RoleList()
  },
  methods: {
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.pageinfo.pagesize = newSize
      this.RoleList()
    },
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.pageinfo.page = newPage
      this.RoleList()
    },
    async RoleList() {
      const { rows, total } = await getRoleList(this.pageinfo)
      this.roleList = rows
      this.total = total
    },
    async clickcompany() {
      if (this.activeName === 'company') {
        if (!Object.keys(this.companyInfo).length) {
          this.companyInfo = await getCompanyInfo(this.companyId)
        }
      }
    },
    async onRelRole(id) {
      try {
        await this.$confirm('您确定要删除吗？')
        await deleteRole(id)
        if (this.roleList.length === 1) {
          this.pageinfo.page >= 2 ? this.pageinfo.page-- : this.pageinfo.page = 1
        }
        this.$message.success('删除成功')
        this.RoleList()
      } catch (error) {
        this.$message.info('您取消了删除')
      }
    },
    UpdateList() {
      this.RoleList()
    },
    async onEditRole(id) {
      await this.$refs.roleDialogRef.getRole(id)
      this.isVisible = true
    },
    async getAllot(id) {
      this.isShowAllotDialog = true
      await this.$refs.AllotDialogRef.getRoleDetailByid(id)
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  }
}
</script>

<style lang='scss' scoped>
  .el-tabs{
    margin: 20px;
  }
  .el-pagination{
    text-align: center;

  }
  .el-table{
    margin: 10px 0;
  }
  .el-alert{
    margin-bottom: 20px;
  }
</style>
