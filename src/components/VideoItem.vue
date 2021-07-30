<template>
  <div class="video-container vjs-big-play-centered">
    <video class="video-js replaceStyle"
           ref="videoPlayer"
    ></video>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  //---第三方视频插件
  import videojs from 'video.js';
  import 'video.js/dist/video-js.css'
  //---视频资源
  import outSizeVideo from '../assets/media/video/outSize.mp4';
  import errorVideo from '../assets/media/video/loadError.mp4'
  import testVideo from '../assets/media/video/3Ddemo.mp4'

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
        default() {
          return errorVideo;
        }
      }
    },
    data() {
      return {}
    },
    computed: {
      ...mapState('modelData', ['playSum']),
      ...mapState('pageData', ['start']),
    },
    watch: {
      //监视传入的path是否变化
      path() {
        this.player.src([
          {src: testVideo},
          {src: errorVideo}
        ])
      },
    },
    mounted() {
      //默认配置
      const defaultOptions = {
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
        if (this.playSum > 0) {
          this.player.pause()
        }
        //计数器+1
        this.$store.commit('modelData/SET_PLAYING', {num: this.playSum + 1});
      })
      //暂停事件
      this.player.on('pause', () => {
        //计数器-1
        this.$store.commit('modelData/SET_PLAYING', {num: this.playSum - 1});
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
  //容器
  .video-container {
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
</style>