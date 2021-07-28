//----------------page相关的数据
import {limitNum} from "../assets/js/tools";

export default {
  //---开启命名空间好让 mapState 等识别
  namespaced: true,
  actions: {
    //----改变页码
    pageChange(context, {pageTo}) {
      context.commit('PAGE_CHANGE', {pageTo});
    },
    //----初始化state
    initState(context, {pageMax, range, pageTo}) {
      context.commit('INIT_RANGE', {pageMax, range});
      context.commit('PAGE_CHANGE', {pageTo});
    }
  },
  mutations: {
    //改变页码
    PAGE_CHANGE(state, {pageTo}) {
      // console.log('PAGE_CHANGE',pageTo)
      state.start = (pageTo - 1) * state.range;
      state.end = limitNum(pageTo * state.range, 1, imgPath.length);
    },
    //初始化换页变化相关量
    INIT_RANGE(state, {pageMax, range}) {
      // console.log('INIT_STATE', {pageMax, range})
      state.pageMax = pageMax;
      state.range = range;
    }
  },
  state: {
    pageMax: 1, //最大页数
    start: 0, //显示资源起始索引
    end: 1, //显示资源结束索引
    range: 0, //换页索引变化量
  }
}