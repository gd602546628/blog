<template>
  <div class="back-catagory">
    <el-menu mode="horizontal" active-name="1" v-on:on-select="select">
      <div class="layout-assistant">
        <Menu-item name="1">查看歌单</Menu-item>
        <Menu-item name="2">添加歌单</Menu-item>
      </div>
    </el-menu>

    <div class="content-wrap">
      <el-main v-show="current==1"></el-main>
     <add v-show="current==2"></add>
    </div>
  </div>
</template>

<script>
  import {Menu, MenuItem} from 'iview';
  import Add from '@/components/backMusic/back-music-add';
  import Main from '@/components/backMusic/back-music-main.vue';
  export default {
    components: {
      'el-menu': Menu,
      'Menu-item': MenuItem,
      'add':Add,
      'el-main':Main
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
  .back-catagory {
    .content-wrap {
      margin: 40px 60px 0 60px;
    }
  }
</style>
