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
    initState(context, {pageMax, range, pathLength, pageTo}) {
      context.commit('INIT_RANGE', {curPage: pageTo, pageMax, range, pathLength});
      context.commit('PAGE_CHANGE', {pageTo});
    }
  },
  mutations: {
    //改变页码和资源索引范围
    PAGE_CHANGE(state, {pageTo}) {
      // console.log('PAGE_CHANGE',pageTo)
      state.curPage = pageTo;
      state.start = (pageTo - 1) * state.range;
      state.end = limitNum(pageTo * state.range, 1, state.pathLength);
    },
    //初始化换页变化相关量
    INIT_RANGE(state, {curPage, pageMax, range, pathLength}) {
      // console.log('INIT_STATE', {pageMax, range})
      state.curPage = curPage;
      state.pageMax = pageMax;
      state.range = range;
      state.pathLength = pathLength;
    }
  },
  state: {
    curPage: 1, //当前页码
    pageMax: 1, //最大页数
    range: 0, //换页索引变化量
    pathLength: 1, //路径列表长度
    start: 0, //显示资源起始索引
    end: 1, //显示资源结束索引
  }
}