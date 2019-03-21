import Vue from 'vue'
import axios from 'axios'
import Antd from 'ant-design-vue'
import App from './App'
import router from './router'
import store from './store'
import lodash from 'lodash'
import ref from 'vue-ref'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/layout.scss'
import 'ant-design-vue/dist/antd.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(ElementUI);
Vue.use(ref, { name: 'ant-ref' })

window._ = lodash
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
