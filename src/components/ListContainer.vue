<template>
  <div class="list-container">
    <div class="spaceBar"></div>
    <div class="splitBar"></div>
    <div class="spaceBar"></div>
    <MyNavigate/>
    <router-view/>
    <div class="spaceBar"></div>
    <div class="splitBar"></div>
    <div class="spaceBar"></div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import MyNavigate from "./MyNavigate";

  export default {
    name: "ListContainer",
    components: {
      MyNavigate
    },
    data() {
      this.initPath = initPath; //储存初始化路径
      this.routeList = ['/image', '/video', '/music'];  //合法路径集合
      return {}
    },
    methods: {
      ...mapMutations('routeData', {setRoute: 'SET_CURROUTE'}),
    },
    mounted() {
      const curRoute = this.$router.history.current.path;
      //重载路径是否合法
      if (curRoute === '/' || this.routeList.indexOf(curRoute) === -1) {
        this.$router.push(this.initPath)
        this.setRoute({route: this.initPath})
      } else {
        this.setRoute({route: curRoute})
      }
    },
    updated() {
      const curRoute = this.$router.history.current.path;
      //更新路径是否合法
      if (this.routeList.indexOf(curRoute) === -1) {
        this.$router.push(this.initPath)
        this.setRoute({route: this.initPath})
      } else {
        this.setRoute({route: curRoute})
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../assets/less/globalStyle";
  @import "../assets/less/optionalStyle";
  //======================
  //        列表区
  //======================
  .list-container {
    .mainArea();
    background-color: #FAEACE;
    //空白行
    .spaceBar {
      .spaceOptions(@h:16px,@backgroundColor: #FAEACE);
    }

    //分隔行
    .splitBar {
      .spaceOptions();
    }
  }
</style>