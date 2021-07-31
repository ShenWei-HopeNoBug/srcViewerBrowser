<template>
  <div class="toggle-banner">
    <div class="pageIcon-container" @click="changeRoute">
        <span class="iconfont icon-image-fill"
              :class="{'pageIcon-active':curRoute==='/image'}"
              id="/image"
        ></span>
      <span class="iconfont icon-video-fill"
            :class="{'pageIcon-active':curRoute==='/video'}"
            id="/video"
      ></span>
      <span class="iconfont icon-customerservice-fill"
            :class="{'pageIcon-active':curRoute==='/music'}"
            id="/music"
      ></span>
    </div>
    <div v-show="curRoute==='/image'" @click="switchImgView" class="imgIcon-container">
      <span class="iconfont icon-picture-fill" :class="{'imgIcon-active':!isGallery}"></span>
      <span class="iconfont icon-gallery-view" :class="{'imgIcon-active':isGallery}"></span>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import '../assets/iconfont/iconfont.css'

  export default {
    name: "MyNavigate",
    data() {
      this.routeList = ['/image', '/video', '/music'];  //合法路径集合
      return {}
    },
    methods: {
      ...mapMutations('routeData', {
        setRoute: 'SET_CURROUTE',
        toggleViewer: 'TOGGLE_VIEWER',
      }),
      //切换图片预览方式(单图/多图)
      switchImgView(event) {
        const classList = [...event.target.classList]
        if (classList.indexOf("imgIcon-active") !== -1) return
        this.toggleViewer();
      },
      //----切换页面
      changeRoute(event) {
        const icon = event.target;
        //点击区域是否合法
        const classList = [...icon.classList];
        if (classList.indexOf("pageIcon-active") !== -1) return
        const curRoute = this.$router.history.current.path;
        //切换路由是否合法
        const route = icon.id;
        if(this.routeList.indexOf(route) !== -1){
          //切到指定路由并保存
          this.setRoute({route})
          if (curRoute !== route) {
            this.$router.push(route);
          }
        }
      }
    },
    computed: {
      ...mapState('routeData', ['curRoute', 'isGallery']),
    }
  }
</script>

<style lang="less" scoped>
  @import "../assets/less/params";

  @imgWidth: @mainWidth/6; //图片宽度
  @imgLeftMargin: @imgWidth/6; //图片左偏移
  //模式切换导航栏
  .toggle-banner {
    display: flex;
    justify-content: space-between;
    height: 32px;
    line-height: 32px;

    //切换页面
    .pageIcon-container {
      span {
        font-size: 32px;
        vertical-align: center;
        margin-left: @imgLeftMargin;
      }

      .pageIcon-active {
        color: orangered;
      }
    }

    //切换图片预览
    .imgIcon-container {
      span {
        vertical-align: center;
        font-size: 24px;
        margin-right: @imgLeftMargin;
      }

      .imgIcon-active {
        color: orangered;
      }
    }
  }
</style>