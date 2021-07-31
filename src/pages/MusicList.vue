<template>
  <ul>
    <li v-for="(musicObj,index) in musicList" :key="'music_'+index"
    >{{musicObj.path}}</li>
  </ul>
</template>

<script>
  import {limitNum} from "../assets/js/tools";
  import {mapState} from "vuex";
  import outSizeMusic from "../assets/media/video/outSize.mp4";

  export default {
    name: "MusicList",
    data() {
      return {}
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
      this.$store.dispatch('pageData/initState', {pageMax, range, pageTo, pathLength});
    },
  }
</script>

<style scoped>

</style>