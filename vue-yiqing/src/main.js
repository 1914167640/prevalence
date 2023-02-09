import Vue from 'vue'
import App from './App.vue'
import router from './router'
import viewNav from '@/view/viewNav'
import './assets/css/reset.css'
import './plugin/vant'
import './mock/mockServer'
Vue.config.productionTip = false

import API from '@/api'
Vue.prototype.$API = API

Vue.component('viewNav' , viewNav)

// import echart from './plugin/echarts'
// Vue.use(echart)
import echarts2 from './plugin/echarts'
Vue.use(echarts2)

new Vue({
  render: h => h(App) ,
  beforeCreate(){ //安装全局事件总线
    Vue.prototype.$bus = this
  } , 
  router  
}).$mount('#app')
