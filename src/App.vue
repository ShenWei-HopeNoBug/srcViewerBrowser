<template>
  <div id="app">
    <MyHeader/>
    <MyList/>
    <MyFooter/>
  </div>
</template>

<script>
  import MyHeader from "./components/MyHeader";
  import MyList from "./components/showList/MyList";
  import MyFooter from "./components/MyFooter";

  export default {
    name: 'App',
    components: {
      MyHeader,
      MyList,
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
