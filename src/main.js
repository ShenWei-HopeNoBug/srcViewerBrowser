import Vue from 'vue'
//引入vue路由
import VueRouter from "vue-router"
import App from './App.vue'
import store from './store'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
