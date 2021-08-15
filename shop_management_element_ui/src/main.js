import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'plugins/element.js'
import TreeTable from 'vue-table-with-tree-grid'

// 导入全局样式
import 'assets/css/global.css'

// 导入字体图标
import 'assets/fonts/iconfont.css'

// 导入 axios
import axios from 'axios'

import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

// 导入 echarts
import echarts from 'components/goods/echartsUi.js'

// 挂载到 vue 原型对象上
Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts

// 配置请求的根路径
// 本机地址
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
// 远程后台地址
// 请求拦截器
axios.interceptors.request.use(config => {
  // 在最后必须 return config
  // 设置 headers 中的 Authorization 值
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)

Vue.filter('dataFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  // yyyy-mm-dd hh:mm:ss
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

Vue.use(VueQuillEditor /* { default global options } */)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
