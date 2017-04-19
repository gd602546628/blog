<template>

  <div class="layout" v-if="isAdmin">
    <el-menu mode="horizontal" theme="dark" active-name="1" class="topNav">
      <div class="layout-nav">

        <Menu-item name="1" @click="toUser()">
          <Icon type="ios-navigate"></Icon>
          用户管理
        </Menu-item>


        <Menu-item name="2" @click=toCategory()>
          <Icon type="ios-keypad"></Icon>
          分类管理
        </Menu-item>


      </div>
    </el-menu>

    <router-view class="layout-content"></router-view>
  </div>

  <div v-else class="noPowerToback">对不起，只有管理员才能进入后台管理</div>

</template>

<script type="text/ecmascript-6">
  import {Icon, MenuItem, Menu, Breadcrumb, BreadcrumbItem} from 'iview';
  import router from"../router/index"
  export default {
    components: {
      Icon: Icon,
      'Menu-item': MenuItem,
      'el-menu': Menu,
      'Breadcrumb': Breadcrumb,
      'Breadcrumb-item': BreadcrumbItem
    },
    data(){
      return {
        isAdmin: false
      }
    },
    methods: {
      toUser(){
        console.log(1)
        router.push('user');
      },
      toCategory(){
        console.log(2)
        router.push('category')
      }
    },
    created(){
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
  }
</style>
