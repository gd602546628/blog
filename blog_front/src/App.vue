<template>
  <div id="app">
    <music></music>
    <cavans-star class="cavans" v-if="theme==1"></cavans-star>
    <cavans-dot class="cavans" v-if="theme==0"></cavans-dot>
    <router-view></router-view>
    <div class="footer">
      <div class="footer-background"></div>
      <div class="wrap">
        <p>由gdd纯手工打造</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import music from '@/components/music.vue';
  import star from '@/components/cavans-star.vue'
  import dot from '@/components/cavans-dot.vue'
  export default {
    name: 'app',
    components: {
      music: music,
      'cavans-star': star,
      'cavans-dot': dot
    },

    computed: {
      theme(){
        return this.$store.state.theme
      }
    },
    mounted(){

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  /*播放器歌单列表高度*/
  .aplayer-list {
    height: 200px !important;
    overflow-x: visible;
  }

  .aplayer {
    margin: 0 !important;
    background: #fff !important;
  }

  .aplayer-music {
    user-select: none !important;
    cursor: move !important;
  }

  .aplayer-volume {
    background: red !important;
  }

  html {
    height: 100%;
  }

  body {
    height: 100%;
    background: #f5f7f9 !important;
  }

  #app {
    //font-family: PingFang TC,Avenir Next,Helvetica,Arial,Hiragino Sans GB,Microsoft YaHei,sans-serif;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    .footer {
      background: black;
      height: 100px;
      color: #ffffff;
      margin-top: 300px;
      position: relative;
      .footer-background {
        background-image: url('./assets/002.png');
        height: 360px;
        position: absolute;
        bottom: 0px;
        width: 100%;
        background-position: center;
        background-size: auto;
        background-repeat: no-repeat;
        z-index: -1;
      }
      .wrap {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        height: 100%;
      }
    }

    .cavans {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: -2;
    }
  }

  * {
    margin: 0;
    padding: 0;
  }


</style>
