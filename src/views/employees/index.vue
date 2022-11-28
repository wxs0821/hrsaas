<template>
  <div>
    <PageTools is-show-left>
      <template #left>
        有{{ total }}条数据
      </template>
      <template #right>
        <el-button v-if="checkPermission('aa')" type="primary" size="small" @click="onExport">excel导出</el-button>
        <el-button type="success" size="small" @click="$router.push('/import')">excel导入</el-button>
        <el-button type="danger" size="small" @click="isVisible = true">新增员工</el-button>
      </template>
    </PageTools>
    <el-card>
      <el-table :data="list" border stripe>
        <el-table-column label="序号" type="index" width="80" />
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="头像" width="110">
          <template v-slot="{row}">
            <img v-imgerror="defaultImg" :src="row.staffPhoto" class="imgstyle" @click="showQr(row.staffPhoto)">
          </template>
        </el-table-column>
        <el-table-column label="手机号" prop="mobile" width="110" />
        <el-table-column label="工号" prop="workNumber" />
        <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="formatEmplotee" />
        <!-- <el-table-column label="聘用形式">
          <template v-slot="{row}">
            {{ row.formOfEmployment | filterEmplotee }}
          </template>
        </el-table-column> -->
        <el-table-column label="部门" prop="departmentName" />
        <el-table-column label="账户状态">
          <template v-slot="{row}">
            <el-switch :value="row.enableState==1" />
          </template>
        </el-table-column>
        <el-table-column label="入职时间">
          <template v-slot="{row}">
            {{ row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template v-slot="{row}">
            <el-button type="text" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
            <el-button type="text">转正</el-button>
            <el-button type="text">调岗</el-button>
            <el-button type="text">离职</el-button>
            <el-button type="text" @click="onAllot(row.id)">角色</el-button>
            <el-button type="text" @click="onDel(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="pageinfo.page"
        :page-sizes="[10,20,30,40,50]"
        :page-size="pageinfo.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <el-dialog title="二维码" width="30%" :visible="isVisibleQr" @close="onCloseQr">
      <el-row type="flex" justify="center">
        <canvas ref="myCanvas" />
      </el-row>
    </el-dialog>
    <EmployeeDialog v-model="isVisible" @update-list="getList" />
    <RoleDialog v-if="isShowAllot" ref="RoleDialogRef" :is-show-allot.sync="isShowAllot" />
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import employee from '@/api/constant/employees'
import defaultImg from '@/assets/common/bigUserHeader.png'
import EmployeeDialog from './compontents/employee-dialog.vue'
import QrCode from 'qrcode'
import RoleDialog from './compontents/role-dialog.vue'

export default {
  name: 'EmployeePage',
  components: {
    EmployeeDialog,
    RoleDialog
  },
  data() {
    return {
      isShowAllot: false,
      isVisibleQr: false,
      isVisible: false,
      defaultImg,
      pageinfo: {
        page: 1,
        size: 10
      },
      total: 50,
      list: [],
      hireType: employee.hireType
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleSizeChange(newSize) {
      this.pageinfo.size = newSize
      this.getList()
    },
    handleCurrentChange(newPage) {
      this.pageinfo.page = newPage
      this.getList()
    },
    async getList() {
      const { rows, total } = await getEmployeeList(this.pageinfo)
      // rows.forEach(item => {
      //   item.enableState = 1
      // })
      this.list = rows
      this.total = total
    },
    formatEmplotee(row, column, cellValue, index) {
      const hire = this.hireType.find(item => item.id === +cellValue)
      return hire ? hire['value'] : '未知'
    },
    async onDel(id) {
      const res = confirm('确认删除吗？')
      if (res) {
        try {
          await delEmployee(id)
          this.$message.success('删除成功')
          this.getList()
        } catch (error) {
          this.$message.error(error.message)
        }
      } else {
        this.$message.info('取消了删除')
      }
    },
    onExport() {
      const headers = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      import('@/vendor/Export2Excel').then(async excel => {
        const { rows } = await getEmployeeList({ page: 1, size: this.total })
        const data = this.formateData(rows, headers)
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data: data,
          filename: '',
          autoWidth: true,
          bookType: 'xlsx'
        })
      })
    },
    formateData(list, header) {
      return list.map(item => {
        return Object.values(header).map(key => {
          if (key === 'timeOfEntry' || key === 'correctionTime') {
            return this.formatDate(item[key])
          } else if (key === 'formOfEmployment') {
            const person = this.hireType.find(x => x.id === +item[key])
            return person?.value ?? '未知'
            // ??左边为null或undinfind时走右边,比||严谨
          } else {
            return item[key]
          }
        })
      })
    },
    formatDate(numb) {
      const date = new Date(numb)
      const year = date.getFullYear()
      const month = (date.getMonth() + 1 + '').padStart(2, '0')
      const day = (date.getDate() + '').padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    onCloseQr() {
      this.isVisibleQr = false
    },
    showQr(url) {
      if (!url) {
        return this.$message.warning('未更新头像')
      }
      this.isVisibleQr = true
      this.$nextTick(() => {
        QrCode.toCanvas(this.$refs.myCanvas, url)
      })
    },
    onAllot(id) {
      this.isShowAllot = true
      this.$nextTick(async() => {
        await this.$refs.RoleDialogRef.getRoleAllotId(id)
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.el-pagination{
  margin-top: 20px;
  text-align: center;
}
.PageTools{
  margin: 20px;
}
.imgstyle{
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.el-card{
  margin: 20px;
}
</style>
