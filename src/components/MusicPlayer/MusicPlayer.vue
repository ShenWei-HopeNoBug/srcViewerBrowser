<template>
  <div class="player">
    <div class="player-disk">
      <MusicDisk :isPlaying="isPlaying"
                 :coverUrl="coverUrl"
      />
    </div>
    <div class="main-area">
      <div class="audio-container">
        <div class="info"
             :class="{'info-detail':showDetail}"
             @dblclick="showDetail=!showDetail"
        >
          <div class="title"
               :style="{whiteSpace:showDetail?'':'nowrap'}"
          >{{title}}
          </div>
          <div class="artist"
               :style="{whiteSpace:showDetail?'':'nowrap',opacity:artist?1:0}"
          >{{artist}}
          </div>
          <div class="file-path" v-show="showDetail">{{fullPath}}</div>
        </div>
        <audio :src="path"
               preload="auto"
               controls
               ref="player"
               @play="isPlaying=true"
               @pause="isPlaying=false"
        ></audio>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  //解析音频文件库(解析不了非服务器资源)
  // import jsmediatags from '../../assets/js/jsmediatags'
  import MusicDisk from "./MusicDisk";

  export default {
    name: "MusicPlayer",
    props: {
      path: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      artist: {
        type: String,
        default: ''
      },
      coverUrl: {
        type: String,
        default: ''
      }
    },
    components: {
      MusicDisk,
    },
    data() {
      return {
        isPlaying: false,
        showDetail: false,
      }
    },
    // methods: {
    //   // getInfo() {
    //   //   //截取文件名
    //   //   const pathArr = this.path.split('/');
    //   //   let title = pathArr[pathArr.length - 1];
    //   //   //去后缀
    //   //   const defaultTitle = title.slice(0, title.lastIndexOf('.'));
    //   //   // const basePath = 'file:///'
    //   //   try {
    //   //     jsmediatags.read(this.path, {
    //   //       onSuccess: (result) => {
    //   //         console.log('解析成功')
    //   //         //解析歌曲歌名，歌手，封面
    //   //         this.title = result.tags.title;
    //   //         this.artist = result.tags.artist;
    //   //         const {data} = result.tags.picture;
    //   //         if (!data) return
    //   //         let base64String = "";
    //   //         data.map(value => {
    //   //           base64String += String.fromCharCode(value);
    //   //         })
    //   //         this.coverUrl = `data:${data.format};base64,${window.btoa(base64String)}`;
    //   //       },
    //   //       onError: () => {
    //   //         console.log('解析失败')
    //   //         this.title = defaultTitle;
    //   //       }
    //   //     })
    //   //   } catch (e) {
    //   //     console.log('解析报错')
    //   //     this.title = defaultTitle;
    //   //   }
    //   // }
    // },
    computed: {
      ...mapState('pageData', ['curPage']),
      //要显示的完整路径
      fullPath() {
        let curPath = this.path;
        if (curPath.startsWith('#')) {
          curPath = curPath.slice(1)
        }
        return curPath
      }
    },
    watch: {
      curPage() {
        //换页停止播放并重新解析信息
        this.isPlaying = false;
        this.$refs.player.pause();
        this.showDetail = false;
      },
    },
  }
</script>

<style lang="less" scoped>
  @import "../../assets/less/params";

  @musicWidth: @mainWidth*0.4; //音频播放器宽度
  @musicHeight: @mainRatio*140px; //音频播放器高度
  .player {
    position: relative;
    display: flex;
    width: @musicWidth;
    height: @musicHeight;
    border-radius: 8px;
    background-color: #F1F3F4;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12),
    0 20px 20px rgba(95, 23, 101, 0.2);

    .player-disk {
      box-sizing: border-box;
      max-width: @musicHeight;
      flex: 1 0 @musicHeight;
      padding: @mainRatio*10px;
    }

    .main-area {
      flex: 1;
      position: relative;
      box-sizing: border-box;
      width: (@musicWidth)-@musicHeight;

      .audio-container {
        width: 100%;
        position: relative;
        top: 100%;
        transform: translateY(-120%);

        audio {
          width: 100%;
        }

        //基本信息
        .info {
          width: 100%;
          box-sizing: border-box;
          padding: 0 @mainRatio*30px;
          line-height: @mainRatio*28px;

          position: absolute;
          bottom: 100%;

          transition: all 0.4s ease;

          .title {
            margin-top: @mainRatio*10px;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: @mainRatio*5px;
          }

          .artist {
            width: 100%;
            font-size: @mainRatio*14px;
            overflow: hidden;
            text-overflow: ellipsis;

            &:before {
              content: '—— ';
            }
          }

          .file-path {
            width: 100%;
            font-size: @mainRatio*14px;

            &:before {
              content: 'file : ';
            }
          }
        }

        //详细信息
        .info-detail {
          z-index: 99;
          border-radius: 8px 8px 0 0;
          opacity: 0.9;
          background-color: #F1F3F4;
          word-break: break-all;
          white-space: pre-wrap;
          box-shadow: 4px 0 4px 0 rgba(0, 0, 0, 0.05),
          4px 0 4px 0 rgba(95, 23, 101, 0.05);
        }
      }
    }
  }


</style>