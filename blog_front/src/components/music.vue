<template>
  <div>
    <div v-show="hide" class="open-bar" @click="show">
      <Icon type="chevron-right"></Icon>
    </div>
    <transition name="move">

      <div v-show="!hide" class="music-wrap">
        <div class="content">
          <div class="title">来点音乐吧</div>
          <div class="music-list">
            <div v-for="(item,index) in musicList"
                 class="music-list-item"
                 :style="{backgroundImage: 'url(' + item.coverImg + ')'}"
                 @click="toPlay(item,index)"
                 @mouseover="mouseIn(index)"
                 @mouseout="mouseOut(index)"
            >
              <h3 class="name">
                {{item.name}}
              </h3>
              <div class="icon-wrap" v-show="hoverIndex==index||currentPlay==index">
                <Icon type="pause" class="play-icon" v-if="currentPlay==index"></Icon>
                <Icon type="play" class="play-icon" v-else></Icon>
              </div>
            </div>
          </div>

        </div>
        <div class="close-bar" @click="close">
          <Icon type="chevron-left"></Icon>
        </div>
      </div>
    </transition>

    <div class="music-player" ref="playerWrap">
      <a-player :music="songs"
                mutex mode="circulation"
                v-if="songs.length>0"
                theme="#ffffff"
                ref="player"
      ></a-player>
    </div>
  </div>
</template>

<script>
  import VueAplayer from 'vue-aplayer'
  import Api from '../api/api'
  import {Drag} from '../class/drag'
  export default {

    components: {
      'a-player': VueAplayer
    },
    data(){
      return {
        hide: true,
        musicList: [],
        songs: [],
        play: false,
        currentPlay: -1,
        hoverIndex: -1
      }
    },
    methods: {
      show(){
        this.hide = false
      },
      close(){
        this.hide = true
      },
      toPlay(item, index){
        if (this.currentPlay == index) {//点击的歌单是正在播放的歌单
          let aplayer = this.$refs.player.control;

          new Drag(this.$refs.playerWrap)
          if (this.play) {
            aplayer.pause();
            this.play = false;
            item.play = 1;
          } else {
            aplayer.play();
            this.play = true;
            item.play = 2;
          }
        } else {
          this.songs = [];
          this.$nextTick(() => {
            this.songs = this.musicList[index].list;
            this.$nextTick(function () {
              let aplayer = this.$refs.player.control;
              aplayer.play();
              this.play = true;
              this.currentPlay = index
              new Drag(this.$refs.playerWrap)
            })
          })

        }
      },

      mouseIn(index){
        this.hoverIndex = index
      },

      mouseOut(index){
        this.hoverIndex = -1
      }

    },
    created(){
      Api.getMusicList({all: true}).then((data) => {
        this.musicList = data.data.data;

      })

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
    width: 40px;
    cursor: pointer;
    font-size: 30px;
    z-index: 10;
   /* background: #ffffff;*/
  /*  box-shadow: 3px 0px 2px #dfdfdf;*/
  }

  .music-wrap {

    &.move-enter, &.move-leave-active {
      transition: all 0.3s ease-in-out;
      transform: translateX(-100%);
    }
    &.move-enter-active, &.move-leave {
      transition: all 0.3s ease-in-out;
    }

    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 10;
    display: flex;
    overflow: scroll;

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
      .title {
        line-height: 40px;
        text-align: center;
        font-size: 24px;
        background: #FFF;
        margin-top: 10px;
        box-shadow: 0 3px 3px #dfdfdf;
        position: absolute;
        width: 100%;
        z-index: 1;
      }
      .music-list {
        display: flex;
        flex-wrap: wrap;
        margin-top: 70px;
        .music-list-item {
          width: 160px;
          height: 160px;
          margin-left: 50px;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          position: relative;
          overflow: hidden;
          margin-top: 40px;
          .play-icon {
            font-size: 30px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -7px;
            margin-top: -15px;
            color: red;
          }
          &:hover {
            .name {
              bottom: 0px;
            }
          }
          .name {
            position: absolute;
            left: 0;
            right: 0;
            bottom: -40px;
            max-height: 40px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            background: rgba(0, 0, 0, .5);
            color: #FFF;
            padding: 5px 8px;
            transition: bottom 0.3s;
          }
        }
      }

    }
  }

  .music-player {
    width: 300px;
    position: fixed;
    bottom: 50px;
    right: 0;
    z-index: 100;
    cursor: move;
    user-select: none;
  }
</style>
