<template>
  <ul class="videos">
    <li v-for="(videoObj,index) in videoList" :key="'video_'+index">
      <VideoItem :options="videoObj.options"
                 :path="videoObj.path"
                 :_id="videoObj._id"
      />
    </li>
  </ul>
</template>

<script>
  import {mapActions, mapMutations, mapState} from 'vuex'
  //---组件
  import VideoItem from "../components/VideoItem";
  //---自定义函数
  import {limitNum} from "../assets/js/tools";
  //---资源视频
  import outSizeVideo from '../assets/media/video/outSize.mp4';

  export default {
    name: "VideoList",
    components: {VideoItem},
    methods:{
      ...mapActions('pageData', {initPageState: 'initState'}),
      ...mapMutations('routeData', {setPlayingSum: 'SET_PLAYINGSUM'}),
    },
    computed: {
      ...mapState('pageData', ['start', 'end']),
      //----显示资源列表
      videoList() {
        const {start, end} = this
        return videoPath.slice(start, end).map((path, index) => {
          //是否超出大小范围
          if (path.startsWith('#')) {
            path = outSizeVideo;
          }
          return {
            path,
            _id: `【${start + index + 1}】`,
          }
        })
      },
    },
    watch: {
      //监视页码是否变化
      start() {
        //将页面播放数清零
        this.setPlayingSum({num: 0});
      },
    },
    beforeMount() {
      const range = 2 * videoRow;
      //计算最大页数
      const pathLength = videoPath.length;
      const pageMax = pathLength % range === 0 ?
        pathLength / range : parseInt(pathLength / range) + 1;
      const pageTo = limitNum(videoPage, 1, pageMax);
      //初始化换页变化量
      this.initPageState({pageMax, range, pathLength, pageTo});
      //将页面播放数清零
      this.setPlayingSum({num: 0});
    },
  }
</script>

<style lang="less" scoped>
  @import "../assets/less/params";

  @videoWidth: @mainWidth*0.45; //视频宽度
  @videoLeftMargin: ((@mainWidth)-(@videoWidth)*2)/3; //视频左偏移
  .videos {
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
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12),
      0 20px 20px rgba(95, 23, 101, 0.2);
    }
  }
</style>