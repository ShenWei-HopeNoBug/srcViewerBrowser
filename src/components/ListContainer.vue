<template>
  <div id="list-container" class="clear-fix">
    <div class="spaceBar"></div>
    <div class="splitBar"></div>
    <div class="spaceBar"></div>

    <div class="toggle-banner">
      <div class="pageIcon-container" @click="changePage">
        <span class="iconfont icon-image-fill"
              :class="{'pageIcon-active':curPath==='/image'}"
              id="/image"
        ></span>
        <span class="iconfont icon-video-fill"
              :class="{'pageIcon-active':curPath==='/video'}"
              id="/video"
        ></span>
        <span class="iconfont icon-customerservice-fill"
              :class="{'pageIcon-active':curPath==='/music'}"
              id="/music"
        ></span>
      </div>
      <div v-show="curPath==='/image'" @click="switchImgView" class="imgIcon-container">
        <span class="iconfont icon-picture-fill" :class="{'imgIcon-active':!isGallery}"></span>
        <span class="iconfont icon-gallery-view" :class="{'imgIcon-active':isGallery}"></span>
      </div>
    </div>
    <router-view/>
    <div class="spaceBar"></div>
    <div class="splitBar"></div>
    <div class="spaceBar"></div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import ImgList from "../pages/ImgList"

  import '../assets/iconfont/iconfont.css'

  export default {
    name: "ListContainer",
    components: {
      ImgList,
    },
    data() {
      this.initPath = initPath; //储存初始化路径
      this.routeList = ['/image', '/video', '/music'];  //合法路径集合
      return {
        curPath: '/image'
      }
    },
    methods: {
      //切换图片预览方式(单图/多图)
      switchImgView(event) {
        const classList = [...event.target.classList]
        if (classList.indexOf("imgIcon-active") !== -1) return
        this.$store.commit('modelData/TOGGLE_VIEWER');
      },
      //----切换页面
      changePage(event) {
        const icon = event.target;
        const classList = [...icon.classList];
        if (classList.indexOf("pageIcon-active") !== -1) return
        const curPath = this.$router.history.current.path;
        //切换图片页面
        if (icon.id === '/image') {
          const pageTo = '/image'
          this.curPath = pageTo;
          if (curPath !== pageTo) {
            this.$router.push(pageTo);
          }
          //切换视频页面
        } else if (icon.id === '/video') {
          const pageTo = '/video'
          this.curPath = pageTo;
          if (curPath !== pageTo) {
            this.$router.push(pageTo);
          }
          //切换音乐页面
        } else if (icon.id === '/music') {
          const pageTo = '/music'
          this.curPath = pageTo;
          if (curPath !== pageTo) {
            this.$router.push(pageTo);
          }
        }
      }
    },
    computed: {
      ...mapState('modelData', ['isGallery']),
    },
    mounted() {
      console.log('mounted')
      const curPath = this.$router.history.current.path;
      //重载路径是否合法
      if (curPath === '/' || this.routeList.indexOf(curPath) === -1) {
        this.$router.push(this.initPath)
        this.curPath = this.initPath;
      } else {
        this.curPath = curPath;
      }
    },
    updated() {
      console.log('update')
      const curPath = this.$router.history.current.path;
      if (this.routeList.indexOf(curPath) === -1) {
        this.$router.push(this.initPath)
        this.curPath = this.initPath;
      } else {
        this.curPath = curPath;
      }
    }
  }
</script>

<style lang="less">
  @import "../assets/less/public";

  @imgWidth: @mainWidth/6; //图片宽度
  @imgLeftMargin: @imgWidth/6; //图片左偏移
  @videoWidth: @mainWidth*0.45; //视频宽度
  @videoLeftMargin: ((@mainWidth)-(@videoWidth)*2)/3; //视频左偏移
  //======================
  //        列表区
  //======================
  #list-container {
    .mainArea();
    background-color: #FAEACE;
    //空白行
    .spaceBar {
      .spaceOptions(@h:16px,@backgroundColor: #FAEACE);
    }

    //分隔行
    .splitBar {
      .spaceOptions();
    }

    //------模式切换导航栏
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

    #videos {
      width: 100%;
      margin: 0 auto;

      li {
        display: inline-block;
        width: @videoWidth;
        min-height: $width*9/16+1;
        margin-left: @videoLeftMargin;
        margin-top: @videoLeftMargin/2;
        margin-bottom: @videoLeftMargin/2;
        background-color: #EAFFE3;
        box-sizing: border-box;
        border: rgba(0, 0, 0, 0.6) solid 2px;
        border-radius: 6px;

        video, img {
          margin: 0 auto;
          width: 100%;
          vertical-align: bottom;
          border-radius: 6px 6px 0 0;
        }

        .video-info {
          width: 100%;
          font-size: @mainRatio*20px;
          line-height: @mainRatio*44px;
          text-align: center;
          position: relative;
          //简略信息
          .info-general {
            width: 64%;
            margin: 0 auto;

            span {
              display: inline-block;
              vertical-align: top;

              &:last-child {
                max-width: 70%;
                //超出部分省略
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }

          //详细信息
          .info-details {
            visibility: hidden;
            opacity: 92%;
            box-sizing: border-box;
            background-color: #C66F64;
            padding: @mainRatio*20px;
            width: @videoWidth;
            border: indianred solid 5px;
            border-radius: 8px;
            text-align: left;
            font-size: @mainRatio*16px;
            line-height: @mainRatio*26px;

            position: absolute;
            z-index: 999;
            //三角形
            .tri {
              width: 100%;
              position: absolute;
              top: -60px*@mainRatio;

              .tri-out {
                border: @mainRatio*30px solid;
                border-color: transparent transparent #CD5C5C transparent;
                top: 0;
                position: absolute;
                z-index: 1000;
              }

              .tri-in {
                border: 25px*@mainRatio solid;
                border-color: transparent transparent #C66F64 transparent;
                top: @mainRatio*13px;
                position: absolute;
                z-index: 1001;
              }

              :nth-child(1) {
                left: -5px*@mainRatio;
              }

              :nth-child(2) {
                left: 0;
              }

              :nth-child(3) {
                right: 35px*@mainRatio;
              }

              :nth-child(4) {
                right: 40px*@mainRatio;
              }
            }

            //文字
            span {
              word-break: break-all;
              white-space: pre-wrap;

              &:before {
                content: "file path : ";
              }
            }
          }
        }
      }
    }
  }
</style>