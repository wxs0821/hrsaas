<template>
  <div>
    <el-upload
      action="#"
      :on-preview="onPreview"
      :limit="1"
      :http-request="httpRequest"
      list-type="picture-card"
      :file-list="fileList"
      :on-remove="onRemove"
      :on-change="onChange"
      :before-upload="onBeforeUpload"
      :class="{'img-upload':fileList.length===1 }"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-show="isShow" :text-inside="true" style="width:155px" :stroke-width="26" :percentage="percentage" />
    <el-dialog :visible="isVisible" width="30%" @close="onClose">
      <img :src="imgSrc" style="width:100%">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'

const cos = new COS({
  SecretId: 'AKIDc3GF1c1DB5nHYdWDgvxlMj281g7a0DE2', // 身份识别 ID
  SecretKey: 'jFZhfS5Zu69zfAVinjXEl7KMEvTs4D9s' // 身份密钥
})

export default {
  name: 'ImageUpload',
  data() {
    return {
      fileList: [],
      imgSrc: '',
      isVisible: false,
      currentFileUid: '',
      percentage: 0,
      isShow: false
    }
  },
  methods: {
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file) {
      this.imgSrc = file.url
      this.isVisible = true
    },
    onClose() {
      this.isVisible = false
      this.imgSrc = ''
    },
    onChange(file, fileList) {
      console.log(file)
      console.log(fileList)

      this.fileList = fileList.map(item => item)
    },
    onBeforeUpload({ size, type, uid }) {
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png', 'image/png']
      const maxSize = 5 * 1024 * 1024
      if (!types.includes(type)) {
        this.$message.warning(`图片格式${type}不合法,请重新上传`)
        return Promise.reject(`图片格式${type}不合法,请重新上传`)
      }
      if (size > maxSize) {
        this.$message.warning(`图片过大,请重新上传`)
        return false
      }
      console.log('检查通过')
      this.currentFileUid = uid
      return true
    },
    httpRequest(params) {
      //   console.log(params.file)
      this.isShow = true
      if (params.file) {
        // 执行上传操作
        cos.putObject({
          Bucket: 'hrsass-1315219515', // 存储桶
          Region: 'ap-nanjing', // 地域
          Key: params.file.name, // 文件名
          Body: params.file, // 要上传的文件对象
          StorageClass: 'STANDARD', // 上传的模式类型 直接默认 标准模式即可
          // 上传到腾讯云 =》 哪个存储桶 哪个地域的存储桶 文件  格式  名称 回调
          onProgress: (progressData) => {
            this.percentage = progressData.percent * 100
          }
        }, (err, data) => {
          // data返回数据之后 应该如何处理
          console.log(err || data)
          if (!err && data?.statusCode === 200) {
            this.fileList = this.fileList.map(item => {
              if (this.currentFileUid === item.uid) {
                return {
                  url: 'https://' + data.Location,
                  upload: true
                }
              }
              return item
            })
            setTimeout(() => {
              this.isShow = false
              this.percentage = 0
            }, 1500)
          }
        })
      }
    }
  }
}

</script>

<style scoped lang='scss'>

</style>
