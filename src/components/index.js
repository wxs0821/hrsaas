import PageTools from './PageTools/index.vue'
import UploadExcel from './UploadExcel/index.vue'
import ImageUpload from './ImageUpload/index.vue'
export default {
  install(Vue) {
    Vue.component(PageTools.name, PageTools)
    Vue.component(UploadExcel.name, UploadExcel)
    Vue.component('ImageUpload', ImageUpload)
  }
}
