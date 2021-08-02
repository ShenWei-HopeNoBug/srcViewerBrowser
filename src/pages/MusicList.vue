<template>
  <ul class="musics">
    <li v-for="(musicObj,index) in musicList" :key="'music_'+index">
      <MusicPlayer :path="musicObj.path"
                   :title="musicObj.title"
                   :artist="musicObj.artist"
                   :coverUrl="musicObj.coverUrl"
      />
    </li>
  </ul>
</template>

<script>
  import {mapActions, mapState} from "vuex";
  //---自定义函数
  import {limitNum} from "../assets/js/tools";
  //---组件
  import MusicPlayer from "../components/MusicPlayer/MusicPlayer";
  //---资源
  import outSizeImg from '../assets/media/img/outSize.jpg'
  // import test from 'B:/python-test/project2/public_GUI/cover/Living In The One.jpeg'
  // import test2 from "../assets/media/music/Living In The One.mp3";

  export default {
    name: "MusicList",
    components: {MusicPlayer},
    methods: {
      ...mapActions('pageData', {initPageState: 'initState'}),
    },
    computed: {
      ...mapState('pageData', ['start', 'end']),
      //----显示资源列表
      musicList() {
        const {start, end} = this
        return musicPath.slice(start, end).map(pathObj => {
          let {path, title, artist, coverUrl} = pathObj
          //截取文件名去后缀
          if (!title) {
            const pathArr = path.split('/');
            title = pathArr[pathArr.length - 1];
            title = title.slice(0, title.lastIndexOf('.'));
          }
          //判断大小是否超范围
          if (path.startsWith('#')) {
            coverUrl = outSizeImg;
          }
          return {
            path,
            title,
            artist,
            coverUrl,
          }
        })
      },
    },
    beforeMount() {
      const range = 2 * musicRow;
      //计算最大页数
      const pathLength = musicPath.length;
      const pageMax = pathLength % range === 0 ?
        pathLength / range : parseInt(pathLength / range) + 1;
      const pageTo = limitNum(musicPage, 1, pageMax);
      //初始化换页变化量
      this.initPageState({pageMax, range, pathLength, pageTo});
    },
  }
</script>

<style lang="less" scoped>
  @import "../assets/less/params";

  @musicWidth: @mainWidth*0.4; //视频宽度
  @mucisLeftMargin: ((@mainWidth)-(@musicWidth)*2)/3; //视频左偏移
  .musics {
    width: 100%;
    margin: 0 auto;

    li {
      display: inline-block;
      width: @musicWidth;
      min-height: 140px;
      margin-left: @mucisLeftMargin;
      margin-top: @mucisLeftMargin/2;
      margin-bottom: @mucisLeftMargin/2;
      box-sizing: border-box;
      border-radius: 6px;
    }
  }


</style>