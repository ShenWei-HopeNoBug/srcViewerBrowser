<template>
  <ul id="images">
    <li v-for="(pathObj,index) in pathList" :key="'img_'+index">
      <img :src="pathObj.path"
           :alt="pathObj.alt"
           :title="pathObj.title"
           @load="loadOn"
           @error="loadErr"
      >
    </li>
  </ul>
</template>

<script>
  import {mapState} from 'vuex'
  import errorImg from '../../assets/media/img/loadError.jpg'
  import outSizeImg from '../../assets/media/img/outSize.jpg'
  import loadImg from '../../assets/media/img/loading.gif'
  import {limitNum} from "../../assets/js/tools";
  // import runImg from '../../assets/media/img/run.gif'

  export default {
    name: "ImgList",
    data() {
      return {
        loadIndex: -1,  //图片从loading更新真实src的索引
        loadSum: 0, //加载完成的图片数量
      }
    },
    methods: {
      //图片加载出错
      loadErr(event) {
        // console.log('err-->', event.target.alt)
        event.target.src = errorImg;
      },
      //图片开始加载
      loadOn(event) {
        this.loadSum++;
        const {start, end} = this.$store.state.pageData;
        if (this.loadSum < end - start) return
        // if (this.loadSum > end - start) {
        //   console.log('reloading...', event.target.alt)
        // }
        this.loadIndex++;
      },
    },
    computed: {
      ...mapState('pageData', ['start']),
      pathList() {
        //显示资源列表
        const {start, end} = this.$store.state.pageData;
        return imgPath.slice(start, end).map((path, index) => {
          let title = path;
          if (path.startsWith('#')) {
            title = path.slice(1);
            path = outSizeImg;
          }
          return {
            path: this.loadIndex >= index ? path : loadImg,
            alt: `img_${index + start + 1}`,
            title,
          }
        })
      },
    },
    watch: {
      //监视是否切换页码
      start() {
        // console.log('-->page change')
        this.loadSum = 0;
        this.loadIndex = -1;
      }
    },
    beforeMount() {
      const range = 5 * imgRow;
      //计算最大页数
      const pathLength = imgPath.length;
      const pageMax = pathLength % range === 0 ?
        pathLength / range : parseInt(pathLength / range) + 1;
      //初始化换页变化量
      const pageTo = limitNum(page, 1, pageMax);
      this.$store.dispatch('pageData/initState', {pageMax, range, pageTo});
    }
  }
</script>

<style scoped>

</style>