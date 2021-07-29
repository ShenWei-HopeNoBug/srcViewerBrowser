//-----创建store
import Vue from 'vue'
import Vuex from 'vuex'
//-----引入需要vuex管理的配置
import pageData from "./pageData";
import modelData from "./modelData";
//使用vuex插件
Vue.use(Vuex);
//*********************************************创建并暴露store
export default new Vuex.Store({
  modules: {
    pageData,
    modelData,
  }
})