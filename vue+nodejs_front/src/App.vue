<template>
  <div id="app">
    <div class="banner">
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'app'
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  html {
    height: 100%;
  }

  body {
    height: 100%;
    background: #eee !important;
  }

  #app {
   // font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-family: "Microsoft YaHei";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

  }

  * {
    margin: 0;
    padding: 0;
  }


</style>
