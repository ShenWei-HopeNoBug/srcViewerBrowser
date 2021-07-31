<template>
  <div class="head-bar">
    <button class="btn-pre"
            @click="pageBack"
            :disabled='curPage===1'
    >上一页
    </button>
    <!--基本信息-->
    <div class="info-container">
      <h2>资源预览</h2>
      <h2>(&nbsp;{{start+1}}&nbsp;-&nbsp;{{end}}&nbsp;)</h2>
    </div>
    <!--页数信息-->
    <div class="page-show-container">
      <h2>第&nbsp;{{curPage}}&nbsp;页</h2>
      <h2 class="page-sum">共&nbsp;{{pageMax}}&nbsp;页</h2>
    </div>
    <!--跳转-->
    <div class="page-jump-container">
      <div class="page-jump-area">
        <div class="page-input">
          <span>跳转到第&nbsp;</span>
          <input type="number"
                 min="1"
                 @keyup.enter="pageJump"
                 ref="pageInput"
          >
          <span>&nbsp;页</span>
        </div>
        <button class="btn-jump"
                @click="pageJump"
        >跳转
        </button>
      </div>
    </div>
    <button class="btn-next"
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
    methods: {
      //下一页
      pageForward() {
        let curPage = this.curPage;
        curPage = limitNum(++curPage, 1, this.pageMax);
        //改变显示资源范围
        this.$store.dispatch('pageData/pageChange', {pageTo: curPage});
      },
      //上一页
      pageBack() {
        let curPage = this.curPage;
        curPage = limitNum(--curPage, 1, this.pageMax);
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
        else if (this.curPage === pageTo) return;
        //改变显示资源范围
        this.$store.dispatch('pageData/pageChange', {pageTo, range: this.range});
      }
    },
    computed: {
      ...mapState('pageData', ['pageMax', 'start', 'end', 'range', 'curPage'])
    },
    created() {
      //绑定换页快捷键
      document.onkeyup = (event) => {
        const keyName = event.key.toUpperCase();
        if (keyName === 'D') {
          //下一页
          this.pageForward();
        } else if (keyName === 'A') {
          //上一页
          this.pageBack();
        }
      }
    },
  }
</script>

<style lang="less" scoped>
  @import "../assets/less/params";
  @import "../assets/less/globalStyle";

  @pageBtnWidth: @mainRatio*100px; //版头换页按钮宽度
  @titleWidth: (@mainWidth)-2*@pageBtnWidth; //版头去除按钮主体宽度
  @headHeight: @mainRatio*120px; //版头高度
  //======================
  //         版头
  //======================
  .head-bar {
    .mainArea();
    height: @headHeight;
    line-height: $height;
    font-size: @mainRatio*24px;
    background-color: #D7AEA4;
    border-radius: 6px 6px 0 0;
    text-align: center;
    display: flex;
    justify-content: space-between;
    //按钮统一设置
    button {
      width: @pageBtnWidth;
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

    //换页按钮
    .btn-pre {
      border-radius: 6px 0 0 0;
    }

    .btn-next {
      border-radius: 0 6px 0 0;
    }

    //基本信息
    .info-container {
      height: 100%;
      width: @titleWidth*0.35;
      padding-top: 0.083*@headHeight;

      h2 {
        line-height: 0.416*@headHeight;
      }
    }

    //页数信息
    .page-show-container {
      height: 100%;
      width: (@titleWidth)*0.35;

      h2 {
        display: inline-block;
      }

      .page-sum:before {
        content: "|";
        margin-right: @mainRatio*14px;
        margin-left: @mainRatio*10px;
      }
    }

    //页面跳转
    .page-jump-container {
      height: 100%;
      width: @titleWidth*0.3;
      background-color: #817E7C;

      .page-jump-area {
        height: 100%;
        width: 90%;
        margin: 0 auto;
        text-align: center;
        overflow: hidden;

        .page-input {
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

        .btn-jump {
          display: block;
          margin: @headHeight*0.083 auto;
          width: 60%;
          border-radius: 4px;
        }
      }
    }
  }
</style>