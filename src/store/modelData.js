//----------------模组相关的数据

export default {
  //---开启命名空间好让 mapState 等识别
  namespaced: true,
  actions: {},
  mutations: {
    TOGGLE_VIEWER(state) {
      state.isGallery = !state.isGallery;
    }
  },
  state: {
    isGallery: false,  //图片模式是否为多图模式
  }
}