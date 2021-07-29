<template>
  <div id="list-container" class="clear-fix">
    <div class="spaceBar"></div>
    <div class="bar"></div>
    <div class="spaceBar"></div>
    <ImgList/>
    <div class="spaceBar"></div>
    <div class="bar"></div>
    <div class="spaceBar"></div>
  </div>
</template>

<script>
  import ImgList from "./ImgList";

  export default {
    name: "MyList",
    components: {
      ImgList,
    },
    data() {
      return {}
    },
  }
</script>

<style lang="less">
  @import "../../assets/less/public";

  @imgWidth: @mainWidth/6; //图片宽度
  @imgLeftMargin: @imgWidth/6; //图片左偏移
  @videoWidth: @mainWidth*0.45; //视频宽度
  @videoLeftMargin: ((@mainWidth)-(@videoWidth)*2)/3; //视频左偏移
  //======================
  //        列表区
  //======================
  #list-container {
    .mainArea();
    background-color: #FAEACE;

    .spaceBar {
      .spaceOptions(@h:16px,@backgroundColor: #FAEACE);
    }

    .bar {
      .spaceOptions();
    }

    #videos {
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

        video, img {
          margin: 0 auto;
          width: 100%;
          vertical-align: bottom;
          border-radius: 6px 6px 0 0;
        }

        .video-info {
          width: 100%;
          font-size: @mainRatio*20px;
          line-height: @mainRatio*44px;
          text-align: center;
          position: relative;
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
            opacity: 92%;
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
            //三角形
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

            //文字
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
  }
</style>