<template>
  <ul>
    <li v-for="(musicObj,index) in musicList" :key="'music_'+index">
      <!--      <audio :src="musicObj.path"-->
      <!--             controls-->
      <!--      ></audio>-->
    </li>
    <li>
      <MusicPlayer/>
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
  import outSizeMusic from "../assets/media/music/Living In The One.mp3";

  export default {
    name: "MusicList",
    components: {MusicPlayer},
    data() {
      return {}
    },
    methods: {
      ...mapActions('pageData', {initPageState: 'initState'}),
    },
    computed: {
      ...mapState('pageData', ['start', 'end']),
      //----显示资源列表
      musicList() {
        const {start, end} = this
        return musicPath.slice(start, end).map((path, index) => {
          //是否超出大小范围
          if (path.startsWith('#')) {
            path = outSizeMusic;
          }
          return {
            path,
          }
        })
      },
    },
    beforeMount() {
      const range = 3 * musicRow;
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

<style scoped>
  li {
    padding-left: 100px;
  }

  /*audio {*/
  /*  height: 100px;*/
  /*}*/
</style>