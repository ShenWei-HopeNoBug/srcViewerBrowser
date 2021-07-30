//----------------模组相关的数据

export default {
  namespaced: true,
  actions: {},
  mutations: {
    //切换单/多图预览模式
    TOGGLE_VIEWER(state) {
      state.isGallery = !state.isGallery;
    },
    //设置视频播放状态
    SET_PLAYING(state, {num}) {
      state.playSum = num
    }
  },
  state: {
    isGallery: false,  //是否为多图预览模式
    playSum: 0,  //正在播放视频数
  }
}