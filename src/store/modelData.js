//----------------ģ����ص�����

export default {
  //---���������ռ���� mapState ��ʶ��
  namespaced: true,
  actions: {},
  mutations: {
    TOGGLE_VIEWER(state) {
      state.isGallery = !state.isGallery;
    }
  },
  state: {
    isGallery: false,  //ͼƬģʽ�Ƿ�Ϊ��ͼģʽ
  }
}