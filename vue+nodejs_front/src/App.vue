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
  html{
    height: 100%;
  }
  body{
   height: 100%;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

  }
/*.banner{
  background-image:url('./assets/banner.jpg');

  overflow: scroll;
  position: fixed;
  top:0;
  border-bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.2;
  height: 100%;
  width: 100%;
  filter: blur(0px);
}*/
  * {
    margin: 0;
    padding: 0;
  }


</style>
