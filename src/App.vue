<template>
  <div id="app">
    <MyHeader/>
    <ListContainer/>
    <MyFooter/>
  </div>
</template>

<script>
  import MyHeader from "./components/MyHeader";
  import ListContainer from "./components/ListContainer";
  import MyFooter from "./components/MyFooter";

  export default {
    name: 'App',
    components: {
      MyHeader,
      ListContainer,
      MyFooter,
    },
  }
</script>

<style lang="less">
  body {
    background-color: sandybrown;
    color: #3E2121;

    li {
      list-style-type: none;
    }
  }
</style>
