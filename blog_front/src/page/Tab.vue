<template>
  <div>
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
        </ul>
      </div>
      <div class="lines" :class="{star:theme==1}">
        {{lines}}
      </div>
    </div>

    <div class="content-wrap">
      <div class="view-background"></div>
      <div class="content">
        <div class="view">
          <router-view></router-view>
        </div>

        <div class="right-content">
          <!--  <Card class="weibo">
              <iframe width="100%" height="400" class="share_self" frameborder="0" scrolling="no"
                      src="http://widget.weibo.com/weiboshow/index.php?language=&width=0&height=400&fansRow=1&ptype=1&speed=0&skin=5&isTitle=1&noborder=1&isWeibo=1&isFans=0&uid=2607676964&verifier=fe5f84f0&dpc=1"></iframe>
            </Card>-->
          <catagory-card></catagory-card>
        </div>
      </div>
      <div class="u_wrap">
        <div id="uyan_frame"></div>
      </div>
    </div>

  </div>


</template>

<script type="text/ecmascript-6">
  import catagoryCard from '../components/catagoryCard.vue'
  export default {
    name: 'tab',
    components: {
      'catagory-card': catagoryCard
    },
    data () {
      return {
        currentRoute: 'home',
        lines: '',
        theme: localStorage.theme || 1
      }
    },
    methods: {
      select(name){
        this.$router.push(name)
      }
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
      this.currentRoute = this.$route.name;
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
      background-image: url('../assets/1.jpg');
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
      &.star {
        color: #ffffff;
        text-shadow:4px 4px 4px #000000;
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

  .content-wrap {
    max-width: 80%;
    margin: 0 auto;
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
    }
  }


</style>




