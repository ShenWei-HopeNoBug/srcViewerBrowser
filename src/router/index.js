import VueRouter from "vue-router";
import ImgList from "../pages/ImgList";
import VideoList from "../pages/VideoList";
import MusicList from "../pages/MusicList";

//��������¶һ��·����
export default new VueRouter({
  routes: [
    {
      path: '/image',
      component: ImgList,
    },
    {
      path: '/video',
      component: VideoList
    },
    {
      path: '/music',
      component: MusicList
    }
  ]
})