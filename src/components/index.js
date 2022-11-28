import PageTools from './PageTools/index.vue'
import UploadExcel from './UploadExcel/index.vue'
import ImageUpload from './ImageUpload/index.vue'
import ScreenFull from './ScreenFull/index.vue'
import ThemePicker from './ThemePicker/index.vue'
import WorkCalender from './work-calendar/index.vue'
export default {
  install(Vue) {
    Vue.component(PageTools.name, PageTools)
    Vue.component(UploadExcel.name, UploadExcel)
    Vue.component('ImageUpload', ImageUpload)
    Vue.component(ScreenFull.name, ScreenFull)
    Vue.component(ThemePicker.name, ThemePicker)
    Vue.component(WorkCalender.name, WorkCalender)
  }
}
