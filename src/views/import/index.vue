<template>
  <UploadExcel :on-success="onSuccess" />
</template>

<script>
import { importEmployee } from '@/api/employee'
export default {
  data() {
    return {
    }
  },
  methods: {
    async onSuccess({ results }) {
      console.log(results)
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '聘用形式': 'formOfEmployment',
        '部门': 'departmentName'
      }
      const arr = ['入职日期', '转正日期']
      const data = results.map(item => {
        const userInfo = {}

        Object.keys(item).forEach(key => {
          if (arr.includes(key)) {
            userInfo[userRelations[key]] = new Date(this.formatDate(item[key], '/'))
          } else {
            userInfo[userRelations[key]] = item[key]
          }
        })
        return userInfo
      })
      try {
        await importEmployee(data)
        this.$message.success('批量导入成功')
        this.$router.back()
      } catch (error) {
        this.$message.success('批量导入失败')
      }
    },
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style>

</style>
