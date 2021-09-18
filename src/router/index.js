import VueRouter from "vue-router";
// import ImgList from "../pages/ImgList";
// import VideoList from "../pages/VideoList";
// import MusicList from "../pages/MusicList";

//注册并暴露路由
export default new VueRouter({
  routes: [
    {
      path: '/image',
      component: () => import(/* webpackChunkName: "image-vm" */ "../pages/ImgList"),
      beforeEnter: (to, from, next) => {
        document.title = '图片预览';
        next();
      }
    },
    {
      path: '/video',
      component: () => import(/* webpackChunkName: "video-vm" */ "../pages/VideoList"),
      beforeEnter: (to, from, next) => {
        document.title = '视频预览';
        next();
      }
    },
    {
      path: '/music',
      component: ()=> import(/* webpackChunkName: "music-vm" */ "../pages/MusicList"),
      beforeEnter: (to, from, next) => {
        document.title = '音乐预览';
        next();
      }
    }
  ]
})