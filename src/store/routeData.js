//----------------模组相关的数据

export default {
  namespaced: true,
  actions: {},
  mutations: {
    //切换单/多图预览模式
    TOGGLE_VIEWER(state) {
      state.isGallery = !state.isGallery;
    },
    //设置媒体播放总数
    SET_PLAYINGSUM(state, {num}) {
      state.playingSum = num
    },
    //设置当前路由路径
    SET_CURROUTE(state, {route}) {
      state.curRoute = route
    }
  },
  state: {
    curRoute: '/',  //当前路由路径
    isGallery: false,  //是否为多图预览模式
    playingSum: 0,  //正在播放媒体数
  }
}