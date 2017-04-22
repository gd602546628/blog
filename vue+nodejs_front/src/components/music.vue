<template>
  <div>
    <div v-show="hide" class="open-bar" @click="show">
      <Icon type="chevron-right"></Icon>
    </div>
    <transition name="move">
      <div v-show="!hide" class="music-wrap">
        <div class="content">
         <div style="width: 300px">
           <a-player :music="songs" mutex  mode="circulation"></a-player>
         </div>
        </div>
        <div class="close-bar" @click="close">
          <Icon type="chevron-left"></Icon>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import VueAplayer from 'vue-aplayer'
  export default {

    components: {
      'a-player': VueAplayer
    },
    data(){
      return {
        hide: true,
        songs: [
          {
            title: 'あっちゅ～ま青春!',
            author: '七森中☆ごらく部',
            url: 'http://devtest.qiniudn.com/あっちゅ～ま青春!.mp3',
            pic: 'http://devtest.qiniudn.com/あっちゅ～ま青春!.jpg'
          },
          {
            title: 'secret base~君がくれたもの~',
            author: '茅野愛衣',
            url: 'http://devtest.qiniudn.com/secret base~.mp3',
            pic: 'http://devtest.qiniudn.com/secret base~.jpg'
          },
          {
            title: '回レ！雪月花',
            author: '小倉唯',
            url: 'http://devtest.qiniudn.com/回レ！雪月花.mp3',
            pic: 'http://devtest.qiniudn.com/回レ！雪月花.jpg'
          }
        ]
      }
    },
    methods: {
      show(){
        this.hide = false
      },
      close(){
        this.hide = true
      }
    },
    created(){


    }

  }

</script>

<style lang='scss' rel='stylesheet/scss' scoped>
  .open-bar {
    position: fixed;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4%;
    cursor: pointer;
    font-size: 30px;
    z-index: 10;
  }

  .music-wrap {

    &.move-enter, &.move-leave-active {
      transition: all 0.3s ease;
      transform: translateX(-100%);
    }

    &.move-enter-active, &.move-leave {
      transition: all 0.3s ease;
    }

    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 10;
    display: flex;

    .close-bar {
      height: 100%;
      width: 4%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      cursor: pointer;
    }
    .content {
      flex: 1;
    }
  }

</style>
