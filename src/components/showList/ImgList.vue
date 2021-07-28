<template>
  <ul id="images" @click="imgView">
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
  import {mapState} from 'vuex'
  //---图片预览库
  import Viewer from 'viewerjs'
  import 'viewerjs/dist/viewer.css'
  //---img
  import errorImg from '../../assets/media/img/loadError.jpg'
  import outSizeImg from '../../assets/media/img/outSize.jpg'
  import loadImg from '../../assets/media/img/loading.gif'
  import {limitNum} from "../../assets/js/tools"
  // import runImg from '../../assets/media/img/run.gif'

  export default {
    name: "ImgList",
    data() {
      return {
        loadIndex: -1,  //图片从loading更新真实src的索引
        loadStart: false, //加载完成的图片数量
        titleList: [],  //已经加载的图片标题数组
      }
    },
    methods: {
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

        // if(this.loadingSum===0)){
        //   this.gallery = new Viewer(document.getElementById('images'));
        // }
      },
      //----图片点击冒泡
      imgView(event) {
        const img = event.target;
        console.log('click...', img.alt)
        // if(this.gallery)return
        // console.log(this.gallery)
        // if(this.gallery){
        //   this.gallery.show()
        // }
        //动态绑定预览事件
        // if (!img.hasBind) {
        //   img.hasBind=true;
        //   new Viewer(img).show();
        //   return
        // }
        // console.log(img.viewer)
        // img.viewer.destroy()
      }
    },
    computed: {
      ...mapState('pageData', ['start', 'end']),
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
      //----处于loading状态的图片数
      loadingSum() {
        const range = this.end - this.start;
        const count = this.titleList.slice(0, range)
          .reduce((total, item) => {
            return total + (item === '#loading#' ? 1 : 0)
          }, 0)
        // console.log(range, '-->', count)
        return count
      }
    },
    watch: {
      //----是否切换页码
      start() {
        console.log('-->page change')
        this.loadStart = false;
        this.loadIndex = -1;
        // if (this.loadingSum !== 0) {
        //   console.log('----->未加载完!', this.loadingSum)
        // }

        // this.titleList.
        // if(this.gallery){
        //   this.gallery.destroy()
        // }
      }
    },
    beforeMount() {
      const range = 5 * imgRow;
      //计算最大页数
      const pathLength = imgPath.length;
      const pageMax = pathLength % range === 0 ?
        pathLength / range : parseInt(pathLength / range) + 1;
      const pageTo = limitNum(page, 1, pageMax);
      //初始化换页变化量
      this.$store.dispatch('pageData/initState', {pageMax, range, pageTo});
      //初始化私有响应式变量
      this.titleList = new Array(range).fill('')
    }
  }
</script>

<style scoped>

</style>