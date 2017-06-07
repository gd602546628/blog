<template>
  <div :class="{overHide:showMenu}" @click="hideMenu()">
    <div class="tabs-wrap">
      <div class="tabs-background" :class="{star:theme==1}"></div>
      <div class="tabs-contant">
        <ul class="tabs">
          <li @click="select('home')">
            <Icon type="home" class="icon"></Icon>
            首页
          </li>
          <li @click="select('catagory')">
            <Icon type="ios-pricetags" class="icon"></Icon>
            分类
          </li>
          <li @click="select('lab')">
            <Icon type="ios-flask-outline" class="icon"></Icon>
            实验室
          </li>
          <li @click="select('about')">
            <Icon type="android-contact" class="icon"></Icon>
            关于
          </li>
          <li @mouseenter="showSkin()" @mouseleave="hideSkin()">
            <Icon type="tshirt" class="icon"></Icon>
            换肤
            <transition name="fromTop">
              <div class="skin" v-show="skinShow" @mouseenter="showSkin()">
                <p @click="changeSkin('dot')">
                  <Icon type="ios-sunny-outline"></Icon>
                </p>
                <p @click="changeSkin('star')">
                  <Icon type="ios-moon-outline"></Icon>
                </p>
              </div>
            </transition>
          </li>
        </ul>
      </div>
      <div class="lines" :class="{star:theme==1}">
        {{lines}}
      </div>
    </div>

    <div class="tab-menu" :class="{showMenu:showMenu}">
      <div class="menu-icon" @click="switchMenu($event)">
        <Icon type="navicon"></Icon>
      </div>
    </div>
    <div class="menu-content" :class="{showMenu1:showMenu}">
      <ul class="menu-content-ul">
        <li @click="select('home')">首页</li>
        <li @click="select('catagory')">分类</li>
        <li @click="select('lab')">实验室</li>
        <li @click="select('about')">关于</li>

       <!-- <li @click="menuShowSkin($event)">换肤</li>-->

      </ul>
    </div>


    <div class="content-wrap" :class="{showMenu:showMenu}">
      <div class="content">
        <div class="view">
          <router-view></router-view>
        </div>

        <div class="right-content">
          <wei-bo></wei-bo>
          <catagory-card></catagory-card>
        </div>
      </div>

      <!--<div class="u_wrap">
        <div id="uyan_frame"></div>

      </div>-->
    </div>

    <transition name="showTop">
      <div class="toTop" @click="toTop" ref="toTop" v-show="showTop">
      </div>
    </transition>
  </div>


</template>

<script type="text/ecmascript-6">
  import catagoryCard from '@/components/catagoryCard.vue';
  import animation from '@/class/animation/animation';
  import WeiBo from '@/components/weibo.vue';
 // import{Icon} from 'iview'
  export default {
    name: 'tab',
    components: {
      'catagory-card': catagoryCard,
      'wei-bo': WeiBo,
      /*'Icon':Icon*/
    },
    data () {
      return {
        currentRoute: 'home',
        lines: '',
        skinShow: false,
        timer: null,
        showTop: false,
        showMenu: false
      }
    },

    computed: {
      theme(){
        return this.$store.state.theme
      }
    },
    methods: {

      select(name){
        this.$router.push(name)
      },

      changeSkin(theme){
        this.$store.commit(theme)
      },

      showSkin(){
        clearTimeout(this.timer);
        this.skinShow = true;
      },
      hideSkin(){
        this.timer = setTimeout(() => {
          this.skinShow = false;
        }, 500)
      },

      toTop(){
        let el = document.body;
        animation.animation(el, {scrollTop: 0}, 300, 'Cubic.easeOut')
      },

      switchMenu(e){
        e.stopPropagation()
        this.showMenu = !this.showMenu
      },

      hideMenu(){
        this.showMenu = false;
      },

     /* menuShowSkin(e){
        this.theme == 0 ? this.$store.commit('star') : this.$store.commit('dot')
      }*/

    },

    created(){
      let linesArr = [];
      let lines = '俺は海贼王になる男だ!';
      let _this = this
      for (let word of lines) {
        let ani = function () {
          return new Promise((res, rej) => {
            setTimeout(() => {
              _this.lines += word
              res()
            }, 250)
          });
        }
        linesArr.push(ani)
      }
      async function animation() {
        for (let fn of linesArr) {
          await fn()
        }
      }

      animation();
    },

    mounted(){
      let body = document.body
      let _this = this
      body.onscroll = function () {
        let height = document.body.clientHeight - 200;
        let scrollTop = body.scrollTop
        if (scrollTop >= height) {
          _this.showTop = true
        } else {
          _this.showTop = false
        }
      }
    }


  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  .tabs-wrap {
    height: 650px;
    .tabs-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 650px;
      background-image: url('../../assets/1.jpg');
      background-size: cover;
      background-position: bottom;
      z-index: -1;
      opacity: 0.7;
      &.star {
        opacity: 0.3;
      }
    }

    .lines {
      height: 400px;
      width: 100%;
      text-align: center;
      line-height: 400px;
      font-size: 40px;
      font-weight: bold;
      text-shadow: 4px 4px 4px #eee;
      &.star {
        color: #ffffff;
        text-shadow: 4px 4px 4px #000000;
      }
    }
    .tabs-contant {
      width: 100%;
      height: 40px;
      background: rgba(0, 0, 0, 0.7);
      line-height: 40px;
      .tabs {
        max-width: 80%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        height: 100%;
        li {
          font-size: 14px;
          color: #ffffff;
          font-weight: bold;
          cursor: pointer;
          height: 100%;
          width: 100px;
          text-align: center;
          position: relative;
          .skin {
            cursor: pointer;
            position: absolute;
            top: 40px;
            left: 0;
            width: 100px;
            transition: all 0.3s ease-in-out;
            &.fromTop-enter, &.fromTop-leave-active {
              transform: translateY(-100px);
            }
            p {
              background: rgba(0, 0, 0, 0.7);
              font-size: 30px;
            }
          }
          .icon {
            margin-right: 10px;
          }
          &:hover {
            background: #47456D;
          }
        }
      }
    }

  }

  .showMenu {
    transform: translateX(80%);
  }

  .showMenu1 {
    transform: translateX(100%);
  }

  .overHide {
    overflow: hidden;
  }

  .menu-content {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 80%;
    background: black;
    z-index:5;
    left: -80%;
    transition: all 0.3s ease;
    display: none;
    .menu-content-ul {
      margin: 20px 0 0 30px;
      li {
        color: #ffffff;
        font-size: 16px;
        margin-bottom: 20px;
      }
    }

  }

  .tab-menu {
    transition: all 0.3s ease;
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    background: rgba(0, 0, 0, 1);
    z-index: 10;
    display: none;
    .menu-icon {
      color: #ffffff;
      font-size: 2rem;
      width: 70px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

  }

  .content-wrap {
    max-width: 80%;
    margin: 0 auto;
    transition: all 0.3s ease;
    // transition: all 0.3s ease;
    .u_wrap {
      margin-top: 50px;
    }
    .content {
      display: flex;
      margin-top: 60px;
      justify-content: center;
      width: 100%;
      .view {
        flex: 1;
        margin-right: 100px;
        max-width: 70%;
        .view-background {

        }
      }
    }
    .right-content {
      width: 30%;
      .weibo {
        margin-bottom: 20px;

      }
    }
  }

  .toTop {
    position: fixed;
    top: 0;
    right: 20px;
    width: 100px;
    height: 900px;
    cursor: pointer;
    background-image: url('../../assets/scroll.png');
    background-repeat: no-repeat;
    transition: all 0.5s ease-in-out;
    &.showTop-enter {
      transform: translateY(-900px);
    }
    &.showTop-leave-active {
      transform: translateY(-900px);
    }
  }

  @media screen and (max-width: 800px) {
    .toTop {
      display: none;
    }
    .content-wrap {
      max-width: 100%;
      .content {
        .view {
          margin: 0;
          max-width: 90%;
        }
      }
    }
    .right-content {
      display: none;
    }
    .tabs-wrap {
      display: none;
    }
    .tab-menu {
      display: block;
    }
    .menu-content {
      display: block;
    }
  }


</style>




