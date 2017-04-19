<template>
  <div class="artical-wrap">
    <el-menu mode="horizontal" active-name="1" v-on:on-select="select">
      <div class="layout-assistant">
        <Menu-item name="1">查看文章</Menu-item>
        <Menu-item name="2">添加文章</Menu-item>
      </div>
    </el-menu>

    <div class="content-wrap">
      <Add v-show="current==2"></Add>
      <el-main v-show="current==1"></el-main>
      <el-editor v-show="current==3"></el-editor>
    </div>

  </div>
</template>

<script>
  import {Menu} from 'iview'
  import Add from "./back-artical-add.vue"
  import Main from './back-artical-main.vue'
  import edi from './back-artical-editor.vue'
  export default{
    components: {
      'el-menu': Menu,
      Add: Add,
      'el-main': Main,
      'el-editor':edi
    },
    data(){
      return {
        current: 1
      }
    },
    methods: {
      select(name){
        this.current = name
      }
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
  .artical-wrap {
    .content-wrap {
      margin: 40px 60px 0 60px;
    }
  }
</style>
