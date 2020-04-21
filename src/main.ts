import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element'
import axios from 'axios'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
axios.defaults.withCredentials=true;
const http = axios.create({
  baseURL: 'http://127.0.0.1:5757/fy'
  // 允许跨域带token
  // withCredentials: true,
  // headers: {
  //   'Content-Type': 'application/json; charset=utf-8'
  // }
})
// axios.defaults.headers.common['token'] = `${window.sessionStorage.getItem('token')}`
Vue.prototype.$httpajax = http
Vue.prototype.$http = http
Vue.config.productionTip = false
Vue.use(VueQuillEditor)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
