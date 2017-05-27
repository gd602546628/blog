<template>
  <div class="back-catagory">
    <el-menu mode="horizontal" active-name="1" v-on:on-select="select">
      <div class="layout-assistant">
        <Menu-item name="1">查看分类</Menu-item>
        <Menu-item name="2">添加分类</Menu-item>
      </div>
    </el-menu>

    <div class="content-wrap">
      <el-main v-show="current==1"></el-main>
      <el-add v-show="current==2"></el-add>
    </div>
  </div>
</template>

<script>
  import {Menu, MenuItem} from 'iview';
  import Main from "@/components/backCategory/back-catagory-main.vue";
  import Add from  "@/components/backCategory/back-catagory-add.vue";
  export default {
    components: {
      'el-menu': Menu,
      'Menu-item': MenuItem,
      'el-main': Main,
      'el-add': Add
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
