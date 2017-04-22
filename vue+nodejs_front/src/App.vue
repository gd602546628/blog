<template>
  <div id="app">
    <music></music>
    <router-view></router-view>
    <div class="footer">
      <div class="wrap">
        <p>由gdd纯手工打造</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import music from './components/music.vue'
  export default {
    name: 'app',
    components:{
        music:music
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  /*播放器歌单列表高度*/
  .aplayer-list{
    height:100px !important;
  }
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
    .footer{
      background: #464c5b;
      height: 100px;
      color:#ffffff;
      margin-top:20px;
       .wrap{
         max-width: 1200px;
         margin: 0 auto;
         display: flex;
         align-items: center;
         height: 100%;
       }
    }

  }

  * {
    margin: 0;
    padding: 0;
  }


</style>
