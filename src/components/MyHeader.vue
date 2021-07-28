<template>
  <div id="head-bar">
    <button id="btn-pre"
            @click="pageBack"
            :disabled='curPage===1'
    >上一页
    </button>
    <!--基本信息-->
    <div id="title-container">
      <h2>资源预览</h2>
      <h2 id="img-num">( {{start+1}} - {{end}} )</h2>
    </div>
    <!--页数信息-->
    <div id="page-show-container">
      <h2 id="page">第 {{curPage}} 页</h2>
      <h2 id="page-sum">共 {{pageMax}} 页</h2>
    </div>
    <!--跳转-->
    <div id="page-jump-container">
      <div id="page-jump">
        <div>
          <span>跳转到第&nbsp;</span>
          <input id="page-input"
                 type="number"
                 min="1"
                 ref="pageInput"
          >
          <span>&nbsp;页</span>
        </div>
        <button id="btn-jump"
                @click="pageJump"
        >跳转
        </button>
      </div>
    </div>
    <button id="btn-next"
            @click="pageForward"
            :disabled='curPage===pageMax'
    >下一页
    </button>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {limitNum} from "../assets/js/tools";

  export default {
    name: "MyHeader",
    data() {
      return {
        curPage: 1,
      }
    },
    methods: {
      //下一页
      pageForward() {
        let curPage = this.curPage;
        curPage = limitNum(++curPage, 1, this.pageMax);
        this.curPage = curPage;
        //改变显示资源范围
        this.$store.dispatch('pageData/pageChange', {pageTo: curPage});
      },
      //上一页
      pageBack() {
        let curPage = this.curPage;
        curPage = limitNum(--curPage, 1, this.pageMax);
        this.curPage = curPage;
        //改变显示资源范围
        this.$store.dispatch('pageData/pageChange', {pageTo: curPage});
      },
      //页面跳转
      pageJump() {
        const pageToStr = this.$refs.pageInput.value;
        this.$refs.pageInput.value = '';
        //没输入
        if (!pageToStr) return;
        const pageTo = parseInt(pageToStr);
        const checkNum = limitNum(pageTo, 1, this.pageMax);
        //输入超出范围
        if (pageTo !== checkNum) {
          alert(`输入页码必须为一个 1 到 ${this.pageMax} 的整数`);
          return;
        }
        //输入页码为当前页码
        else if (pageTo === this.curPage) return;
        this.curPage = pageTo;
        //改变显示资源范围
        this.$store.dispatch('pageData/pageChange', {pageTo, range: this.range});
      }
    },
    computed: {
      ...mapState('pageData', ['pageMax', 'start', 'end', 'range'])
    },
    beforeMount() {
      this.curPage = limitNum(page, 1, this.pageMax)
    }
  }
</script>

<style lang="less" scoped>
  @import "../assets/less/public";

  @pageBtnWith: @mainRatio*100px; //版头换页按钮宽度
  @titleWidth: (@mainWidth)-2*@pageBtnWith; //版头去除按钮主体宽度
  @headHeight: @mainRatio*120px;
  //======================
  //         版头
  //======================
  #head-bar {
    .mainArea();
    height: @headHeight;
    line-height: $height;
    font-size: @mainRatio*24px;
    background-color: #D7AEA4;
    border-radius: 6px 6px 0 0;
    text-align: center;
    display: flex;
    //--------------统一设置
    button {
      width: @pageBtnWith;
      font-size: @mainRatio*20px;
      box-sizing: border-box;
      border: rgba(0, 0, 0, 0.2) solid 2px;
      color: rgba(0, 0, 0, 0.65);
      background-color: #F2F2F7;

      &:hover:not(:disabled) {
        color: black;
        background-color: ghostwhite;
      }

      &:disabled {
        color: rgba(0, 0, 0, 0.2);
        background-color: #EDEDF2;
      }
    }

    #btn-pre {
      border-radius: 6px 0 0 0;
    }

    #btn-next {
      border-radius: 0 6px 0 0;
    }

    //--------------其他
    #title-container {
      height: 100%;
      width: @titleWidth*0.35;
      padding-top: 0.083*@headHeight;

      h2 {
        line-height: 0.416*@headHeight;
      }
    }

    #page-show-container {
      height: 100%;
      width: (@titleWidth)*0.35;

      h2 {
        display: inline-block;
      }

      #page-sum:before {
        content: "|";
        margin-right: @mainRatio*14px;
        margin-left: @mainRatio*10px;
      }
    }

    #page-jump-container {
      height: 100%;
      width: @titleWidth*0.3;
      background-color: #817E7C;

      #page-jump {
        height: 100%;
        width: 90%;
        margin: 0 auto;
        text-align: center;
        overflow: hidden;

        div {
          padding: @mainRatio*9px 0;
          height: @headHeight*0.35;
          line-height: $height;
          color: white;

          input {
            width: @mainRatio*80px;
            height: @headHeight*0.25;
            font-size: @mainRatio*24px;
          }
        }

        #btn-jump {
          display: block;
          margin: @headHeight*0.083 auto;
          width: 60%;
          border-radius: 4px;
        }
      }
    }
  }

</style>