<template>

  <div class="layout" v-if="isAdmin">
    <Menu mode="horizontal" theme="dark" :active-name="activeRoute" class="topNav" v-on:on-select="select">
      <div class="layout-nav">

        <Menu-item name="user">
          <Icon type="ios-person"></Icon>
          用户管理
        </Menu-item>


        <Menu-item name="category">
          <Icon type="ios-keypad"></Icon>
          分类管理
        </Menu-item>

        <Menu-item name="artical">
          <Icon type="ios-list"></Icon>
          文章管理
        </Menu-item>

        <Menu-item name="music">
          <Icon type="ios-list"></Icon>
          音乐管理
        </Menu-item>

        <Menu-item name="laboratory">
          <Icon type="ios-list"></Icon>
          实验室管理
        </Menu-item>

      </div>
    </Menu>
    <router-view class="layout-content"></router-view>
  </div>

  <div v-else class="noPowerToback">
    <div class="tittle">
      一不小心被你发现了这里，可是只能管理员才能进入后台页面哦。
    </div>
    <login class="login"></login>
  </div>

</template>

<script type="text/ecmascript-6">
  //import {Icon, MenuItem, Menu, Breadcrumb, BreadcrumbItem} from 'iview';
  import router from"../../router/index";
  import login from '../../components/login.vue';
  export default {
    components: {
     /* Icon: Icon,
      'Menu-item': MenuItem,
      'el-menu': Menu,*/
      'login': login
    },
    data(){
      return {
        isAdmin: false,
        activeRoute: ''
      }
    },
    methods: {
      select(name){
        router.push(name)
      }
    },
    created(){

      this.activeRoute = this.$route.name;//初始化时高亮TAB
      if (sessionStorage.userInfo) {
        if (JSON.parse(sessionStorage.userInfo).isAdmin) {
          this.isAdmin = true
        }
      }
    }

  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  .layout {
    .topNav, .layout-assistant {
      display: flex;
      align-items: center;
      justify-content: center;
    }

  }

  .noPowerToback {
    font-size: 40px;
    margin: 0 auto;
    .tittle {
      text-align: center;
      margin-bottom: 30px;
    }
    .login {
      margin: 0 auto;
    }
  }
</style>
