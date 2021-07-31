<template>
  <div>
    <div class="video-container vjs-big-play-centered">
      <video class="video-js replaceStyle"
             ref="videoPlayer"
      ></video>
    </div>
    <div class="video-info">
      <div class="info-general">
        <span>{{_id}}</span>
        <span>{{path}}</span>
      </div>
      <div class="info-details">
        <span>{{path}}</span>
        <div class="tri">
          <div class="tri-out"></div>
          <div class="tri-in"></div>
          <div class="tri-out"></div>
          <div class="tri-in"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  //---第三方视频插件
  import videojs from 'video.js';
  import 'video.js/dist/video-js.css'
  //---视频资源
  import outSizeVideo from '../assets/media/video/outSize.mp4';
  import errorVideo from '../assets/media/video/loadError.mp4'
  // import testVideo from '../assets/media/video/3Ddemo.mp4'

  export default {
    name: "VideoItem",
    props: {
      //视频设置
      options: {
        type: Object,
        default() {
          return {};
        }
      },
      //资源路径
      path: {
        type: String,
        required: true
      },
      _id: {
        type: String,
        required: true
      }
    },
    methods: {
      ...mapMutations('routeData', {setPlayingSum: 'SET_PLAYINGSUM'}),
    },
    computed: {
      ...mapState('routeData', ['playingSum']),
      ...mapState('pageData', ['start']),
    },
    watch: {
      //监视传入的path是否变化
      path() {
        this.player.src([
          {src: this.path},
          {src: errorVideo}
        ])
      },
    },
    mounted() {
      //默认配置
      const defaultOptions = {
        preload: 'auto',
        sources: [
          {src: this.path},
          {src: errorVideo}
        ]
      }
      //创建实例
      this.player = videojs(
        this.$refs.videoPlayer,
        {
          ...defaultOptions,
          ...this.options
        });
      //文件加载出错或超大小设置为不可控
      this.player.on('loadstart', function () {
        const src = this.src()
        if (src === errorVideo || src === outSizeVideo) {
          this.controls(false)
        } else {
          this.controls(true)
        }
      })
      //播放事件
      this.player.on('play', () => {
        //限制一个页面只有一个视频播放
        if (this.playingSum > 0) {
          this.player.pause()
        }
        //计数器+1
        this.setPlayingSum({num: this.playingSum + 1});
      })
      //暂停事件
      this.player.on('pause', () => {
        //计数器-1
        this.setPlayingSum({num: this.playingSum - 1});
      });
      //加载出错加载错误视频
      this.player.on('error', function () {
        this.src(errorVideo)
      })
    },
    beforeDestroy() {
      //销毁实例
      if (this.player) {
        this.player.dispose()
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../assets/less/params";
  @videoWidth: @mainWidth*0.45; //视频宽度
  //容器
  .video-container {
    width: (@videoWidth)-4px;
    height: $width*9/16+1;
    vertical-align: bottom;
    position: relative;
    margin: 0 auto;
    border-radius: 6px 6px 0 0;
  }

  //覆盖样式
  .replaceStyle {
    height: 100%;
    width: 100%;
    border-radius: 6px 6px 0 0;
  }

  video {
    width: 100%;
    border-radius: 6px 6px 0 0;
  }

  //视频信息
  .video-info {
    width: 100%;
    font-size: @mainRatio*20px;
    line-height: @mainRatio*44px;
    text-align: center;
    position: relative;

    //悬停显示详细信息
    &:hover {
      .info-details {
        visibility: visible;
      }
    }

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
      opacity: 0.92;
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
      //信息框三角形
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

      //路径完整信息
      span {
        word-break: break-all;
        white-space: pre-wrap;

        &:before {
          content: "file path : ";
        }
      }
    }
  }
</style>