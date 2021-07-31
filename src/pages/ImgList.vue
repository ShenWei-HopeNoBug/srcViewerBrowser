<template>
  <ul class="clear-fix image-container" @click="imgView">
    <li v-for="(pathObj,index) in pathList" :key="'img_'+index">
      <img :src="pathObj.path"
           :alt="pathObj.alt"
           :title="pathObj.title"
           :id="index"
           @load="loadOn"
           @error="loadErr"
      >
    </li>
  </ul>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import '../assets/iconfont/iconfont.css'
  import {limitNum} from "../assets/js/tools"
  //---图片预览库
  import Viewer from 'viewerjs'
  import 'viewerjs/dist/viewer.css'
  //---img
  import errorImg from '../assets/media/img/loadError.jpg'
  import outSizeImg from '../assets/media/img/outSize.jpg'
  import loadImg from '../assets/media/img/loading.gif'

  export default {
    name: "ImgList",
    data() {
      const range = 5 * imgRow;
      //非响应式变量
      this.gallery = undefined; //多图模式Viewer实例容器
      this.imgViewObj = {}  //单图模式Viewer实例容器
      //响应式变量
      return {
        loadIndex: -1,  //图片从loading更新真实src的索引
        loadStart: false, //加载完成的图片数量
        titleList: new Array(range).fill(''),  //已经加载的图片标题数组
      }
    },
    methods: {
      ...mapActions('pageData', {initPageState: 'initState'}),
      //----图片加载出错
      loadErr(event) {
        event.target.src = errorImg;
      },
      //----图片开始加载
      loadOn(event) {
        const img = event.target
        // console.log('loading...', img.alt)
        const imgId = parseInt(img.id)
        if (this.titleList[imgId] === img.title) return
        // console.log(this.titleList[imgId])
        //触发loadStartSign重新计算
        this.titleList.splice(imgId, 1, img.title);
        // console.log('----->', this.titleList[imgId])

        //开始加载真实路径
        const range = this.end - this.start;
        if (this.loadingSum === range) {
          this.loadStart = true
        }
        //触发pathList重新计算
        if (this.loadStart) {
          this.loadIndex++;
        }
      },
      //----图片点击冒泡
      imgView(event) {
        const img = event.target;
        //只响应有id的图片区域
        if (!img.id) return
        // console.log('click...', img.alt)
        const imgId = parseInt(img.id)
        //动态绑定预览事件
        if (!this.isGallery) {
          //单图模式并显示
          if (!this.imgViewObj[imgId]) {
            const viewer = new Viewer(img);
            this.imgViewObj[imgId] = viewer;
            viewer.show()
          }
        } else if (!this.gallery) {
          //多图模式并切到选中图片
          this.gallery = new Viewer(event.currentTarget)
          this.gallery.view(imgId)
        }
      },
      //---销毁指定模式Viewer实例
      viewerDestroy(isGallery) {
        if (isGallery) {
          //销毁多图模式Viewer实例
          if (this.gallery) {
            this.gallery.destroy()
            this.gallery = undefined;
          }
        } else {
          //销毁所有单图模式Viewer实例
          Object.values(this.imgViewObj).map(viewer => {
            viewer.destroy()
          })
          this.imgViewObj = {}
        }
      }
    },
    computed: {
      ...mapState('pageData', ['start', 'end']),
      ...mapState('routeData', ['isGallery']),
      //----显示资源列表
      pathList() {
        const {start, end} = this
        return imgPath.slice(start, end).map((path, index) => {
          let title = '#loading#';
          if (this.loadIndex < index) {
            //loading状态
            path = loadImg;
          } else {
            //加载真实路径状态
            title = path;
            //判断大小超出标志
            if (path.startsWith('#')) {
              title = path.slice(1);
              path = outSizeImg;
            }
          }
          return {
            //顺序改变path触发响应式update
            path,
            alt: `img_${index + start + 1}`,
            title
          }
        })
      },
      //----页面处于loading状态的图片数
      loadingSum() {
        const range = this.end - this.start;
        return this.titleList.slice(0, range)
          .reduce((total, item) => {
            return total + (item === '#loading#' ? 1 : 0)
          }, 0)
      }
    },
    watch: {
      //----是否切换页码
      start() {
        // console.log('-->page change')
        this.loadStart = false;
        this.loadIndex = -1;
        //销毁Viewer实例
        this.viewerDestroy(this.isGallery)
      },
      //----是否切换单图/多图模式
      isGallery() {
        //销毁Viewer实例
        this.viewerDestroy(!this.isGallery)
      }
    },
    beforeMount() {
      const range = 5 * imgRow;
      //计算最大页数
      const pathLength = imgPath.length;
      const pageMax = pathLength % range === 0 ?
        pathLength / range : parseInt(pathLength / range) + 1;
      const pageTo = limitNum(imgPage, 1, pageMax);
      //初始化换页变化量
      this.initPageState({pageMax, range, pathLength, pageTo});
    },
  }
</script>

<style lang="less" scoped>
  @import "../assets/less/params";

  @imgWidth: @mainWidth/6; //图片宽度
  @imgLeftMargin: @imgWidth/6; //图片左偏移
  //======================
  //      图片列表区
  //======================
  //-----展示区
  .image-container {
    width: 100%;
    margin: 0 auto;

    li {
      float: left;
      width: @imgWidth;
      height: $width;
      margin-left: @imgLeftMargin;
      margin-top: @imgLeftMargin/2;
      margin-bottom: @imgLeftMargin/2;
      box-sizing: border-box;
      border: rgba(0, 0, 0, 0.6) solid 2px;
      border-radius: 6px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>