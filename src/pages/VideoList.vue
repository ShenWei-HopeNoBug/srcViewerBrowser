<template>
  <ul class="videos">
    <li v-for="(videoObj,index) in videoList" :key="'video_'+index">
      <VideoItem class="video-component"
                 :options="videoObj.options"
                 :path="videoObj.path"
      />
      <!--视频信息-->
      <div class="video-info">
        <div class="info-general">
          <span>{{videoObj._id}}</span>
          <span>{{videoObj.path}}</span>
        </div>
        <div class="info-details">
          <span>{{videoObj.path}}</span>
          <div class="tri">
            <div class="tri-out"></div>
            <div class="tri-in"></div>
            <div class="tri-out"></div>
            <div class="tri-in"></div>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
  import {mapState} from 'vuex'
  //---组件
  import VideoItem from "../components/VideoItem";
  //---自定义函数
  import {limitNum} from "../assets/js/tools";
  //---资源视频
  import outSizeVideo from '../assets/media/video/outSize.mp4';

  export default {
    name: "VideoList",
    components: {VideoItem},
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
            //传给组件的配置
            options: {
              preload: 'auto',
            }
          }
        })
      },
    },
    watch: {
      //监视页码是否变化
      start() {
        //将页面播放数清零
        this.$store.commit('modelData/SET_PLAYING', {num: 0});
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
      this.$store.dispatch('pageData/initState', {pageMax, range, pageTo, pathLength});
      //将页面播放数清零
      this.$store.commit('modelData/SET_PLAYING', {num: 0})
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
      //视频组件样式
      .video-component {
        width: (@videoWidth)-4px;
        height: $width*9/16+1;
        vertical-align: bottom;
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
    }
  }
</style>