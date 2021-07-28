<template>
  <div id="footer">
    <span>作者：路边的灰机场</span>
  </div>
</template>

<script>
  export default {
    name: "MyFooter",
    data() {
      return {}
    },
  }
</script>

<style lang="less" scoped>
  @import "../assets/less/public";

  @footHeight: @mainRatio*140px;
  //======================
  //         页脚
  //======================
  #footer {
    .mainArea();
    height: @footHeight;
    background-color: #9B5050;
    line-height: @footHeight*0.857;
    padding-top: @footHeight*0.071;
    text-align: center;
    font-size: @mainRatio*48px;
  }
</style>