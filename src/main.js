import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import SIdentify from './views/identify'

import './styles/base.less'
import './assets/font/iconfont.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

Vue.use(VueAxios, axios)
axios.defaults.baseURL = "http://119.3.104.39:2302/api/"
Vue.use(SIdentify)