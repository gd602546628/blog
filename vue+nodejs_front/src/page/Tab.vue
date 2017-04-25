<template>
  <div>
    <div class="tabs-wrap">
      <Menu mode="horizontal" theme="dark" :active-name="currentRoute" class="tabs" v-on:on-select="select">

        <Menu-item name="home">
          <Icon type="home"></Icon>
          首页
        </Menu-item>

        <Menu-item name="catagory">
          <Icon type="android-list"></Icon>
          分类
        </Menu-item>

        <Menu-item name="about">
          <Icon type="ios-navigate"></Icon>
          关于
        </Menu-item>
      </Menu>
    </div>

    <div class="content-wrap">
      <div class="content">

        <div class="view">
          <router-view></router-view>
        </div>

        <div class="right-content">
          <login class="login"></login>
          <Card class="weibo">
            <iframe width="100%" height="400" class="share_self" frameborder="0" scrolling="no"
                    src="http://widget.weibo.com/weiboshow/index.php?language=&width=0&height=400&fansRow=1&ptype=1&speed=0&skin=5&isTitle=1&noborder=1&isWeibo=1&isFans=0&uid=2607676964&verifier=fe5f84f0&dpc=1"></iframe>
          </Card>
        </div>
      </div>

      <div class="u_wrap">
        <div id="uyan_frame"></div>
      </div>
    </div>


  </div>


</template>

<script type="text/ecmascript-6">
  import login from '@/components/login.vue';
  export default {
    name: 'tab',
    components: {
      login: login
    },
    data () {
      return {
        currentRoute: 'home'
      }
    },
    methods: {
      select(name){
        this.$router.push(name)
      }
    },

    created(){
      this.currentRoute = this.$route.name;
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  .tabs-wrap {
    background: #464c5b;
    .tabs {
      max-width: 1200px;
      margin: 0 auto;
      height: 40px !important;
      line-height: 40px !important;
      li {
      }
    }
  }

  .content-wrap{
    max-width: 1200px;
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
        max-width: 800px;
      }
    }
    .right-content {
      width: 300px;
      .weibo {
        margin-top: 20px;

      }
    }
  }





</style>




