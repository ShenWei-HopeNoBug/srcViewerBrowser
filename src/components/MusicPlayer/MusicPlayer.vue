<template>
  <div class="player">
    <div class="player-disk">
      <MusicDisk :isPlaying="isPlaying"
                 :coverUrl="coverUrl"
      />
    </div>
    <div class="main-area">
      <div class="info">
        <div class="title">{{title}}</div>
        <div class="artist">{{artist?`——${artist}`:''}}</div>
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
</template>

<script>
  import {mapState} from 'vuex'
  //解析音频文件库
  import jsmediatags from '../../assets/js/jsmediatags'
  import MusicDisk from "./MusicDisk";

  export default {
    name: "MusicPlayer",
    props: {
      path: {required: true},
    },
    components: {
      MusicDisk,
    },
    data() {
      this.defaultTitle = ''; //默认歌名(文件名)
      return {
        isPlaying: false,
        title: '',
        artist: '',
        coverUrl: '',
      }
    },
    computed: {
      ...mapState('pageData', ['curPage'])
    },
    mounted() {
      //截取文件名
      const pathArr = this.path.split('/');
      let title = pathArr[pathArr.length - 1];
      //去后缀
      title = title.slice(0, title.lastIndexOf('.'));
      this.defaultTitle = title;
      const basePath = 'http://localhost:8080/'
      try {
        jsmediatags.read(basePath + this.path, {
          onSuccess: (result) => {
            //解析歌曲歌名，歌手，封面
            this.title = result.tags.title;
            this.artist = result.tags.artist;
            const {data} = result.tags.picture;
            if (!data) return
            let base64String = "";
            data.map(value => {
              base64String += String.fromCharCode(value);
            })
            this.coverUrl = `data:${data.format};base64,${window.btoa(base64String)}`;
          },
          onError: () => {
            this.title = this.defaultTitle;
          }
        })
      } catch (e) {
        this.title = this.defaultTitle;
      }
    },
    watch: {
      curPage() {
        //换页停止播放
        this.$refs.player.pause()
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/less/params";

  @musicWidth: @mainWidth*0.4; //视频宽度

  .player {
    position: relative;
    display: flex;
    width: @musicWidth;
    height: @mainRatio*140px;
    border-radius: 8px;
    background-color: #F1F3F4;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12),
    0 20px 20px rgba(95, 23, 101, 0.2);

    .player-disk {
      box-sizing: border-box;
      max-width: 140px;
      flex: 1 0 140px;
      padding: 10px;
    }

    .main-area {
      width: 100%;
      position: relative;

      .info {
        height: 50px;
        /*background-color: skyblue;*/
        padding: 12px 30px;
        line-height: 28px;

        .title {
          /*background-color: yellow;*/
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-bottom: 5px;
        }

        .artist {
          font-size: 14px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }

    audio {
      position: absolute;
      width: 100%;
      bottom: 10px;
    }
  }


</style>